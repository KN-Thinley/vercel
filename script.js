const studentID = document.querySelector('#id')
        const userName = document.querySelector('#name')

        var selectedRow = null;
        function onFormSubmit(){
            // Changing back
            document.getElementById("button").value = "ADD";
            if (stdid() && name()){
                var formData = readFormData();
            if(selectedRow == null)
                insertNewRecord(formData);
            
            else 
                updateFormData(formData);
            
            resetForm();
            }
            
        }

        //read data
        function readFormData(){
            var formData = {};
            formData['id'] = document.getElementById('id').value;
            formData['name'] = document.getElementById('name').value;
            return formData;
        }

        //create data
        function insertNewRecord(data){
            var table = document.getElementById('stdList').getElementsByTagName('tbody')[0];
            var newRow = table.insertRow(table.length);
            cell1 = newRow.insertCell(0);
            cell1.innerHTML = data.id;
            cell2 = newRow.insertCell(1);
            cell2.innerHTML = data.name;
            cell3 = newRow.insertCell(2);
            cell3.innerHTML = '<a onClick = "onEdit(this)">Edit</a>';
            cell4 = newRow.insertCell(3);
            cell4.innerHTML = '<a onClick = "onDelete(this)">Delete</a>';
        }
        
        //resetting the form
        function resetForm(){
            document.getElementById('id').value = '';
            document.getElementById('name').value = '';
            selectedRow = null;
        }

        //the edit button
        function onEdit(td){
            //for the add button to change to update 
            document.getElementById('button').value = 'UPDATE'
            selectedRow = td.parentElement.parentElement;
            document.getElementById('id').value = selectedRow.cells[0].innerHTML;
            document.getElementById('name').value = selectedRow.cells[1].innerHTML;

        }
        function onDelete(td){
            if(confirm('Are you sure to DELETE this record?')){
                row = td.parentElement.parentElement;
                document.getElementById('stdList').deleteRow(row.rowIndex);
                resetForm()
            }
        }
        function updateFormData(formData){
            selectedRow.cells[0].innerHTML = formData.id;
            selectedRow.cells[1].innerHTML = formData.name;
        }

        //for the form validation
        const isRequired = value => value === '' ? true:false;
        
        //check the length of the username 
        const isBetween = (length, min, max) => length<min || length>max ? false : true;
        

        //display the error message
        const displayError =  (input, message) => {
            //get the col-2 element
            const formField = input.parentElement;

            //add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            //show the error message
            const error = formField.querySelector('small');
            error.textContent = message; 

        }

        //display the success validation
        const displaySuccess = (input) => {
            //get the col-2 element
            const formField = input.parentElement;

            //remove the error class
            formField.classList.remove('error');
            formField.classList.add('success');

            //hide the error message
            const error = formField.querySelector('small');
            error.textContent = '';
        }

        //function for the name to only accept letters and not special characters
        const validName = (username) => {
            const re = /^[A-Za-z\s]*$/
            return re.test(username)
        }

        //function for the student id to start with SOC and then 8 numbers
        const validStdID = (studentid) =>{
            const re = /SOC.[0-9]/
            return re.test(studentid)
        }
        //studentID validation
        function name(){
            let valid = false;
            const max = 25, min = 3;

            const username = userName.value.trim();

            if(isRequired(username)){
                displayError(userName, 'Username cannot be blank!')
            }
            else if(!isBetween(username.length, min, max)){
                displayError(userName, `Username must be between ${min} and ${max}`)
            }
            else if(!validName(username)){
                displayError(userName, 'Username cannot contain any numbers or special characters')
            }
            else{
                displaySuccess(userName);
                valid = true;
            }
            return valid
            
        }

        function stdid(){
            let valid = false;
            
            const studentid = studentID.value.trim();

            if(isRequired(studentid)){
                displayError(studentID, 'Student ID cannot be blank!')
            }
            else if (studentid.length != 11){
                displayError(studentID, `Student ID should be 11 characters long`) 
            }
            else if(!validStdID(studentid)){
                displayError(studentID, 'Student ID must start with "SOC" and then your enrollment number')
            }
            else{
                displaySuccess(studentID)
                valid = true
            }
            return valid
        
        }