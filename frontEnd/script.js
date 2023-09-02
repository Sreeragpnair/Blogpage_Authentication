


function validateName(){
    let nameError = document.getElementById('userName-error');
    let name =document.getElementById('userName');
    
    if(name.value.trim() == ''){
        nameError.innerHTML = 'Username cannot be blank';
        return false;
    }
    else if(name.value.length < 5){
        nameError.innerHTML = 'Username should be more than 5 characters';
        return false;
    }
    else{
        nameError.innerHTML ='';
        return true;
    }
}

function validateEmail(){
    let email = document.getElementById('email');
    let emailError = document.getElementById('email-error');

    let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if(email.value.trim() ==''){
        emailError.innerHTML = 'Email cannot be blank!!';
        return false;
    }else if( !email.value.match(regEx)){
        emailError.innerHTML = 'Enter a valid Email';
        return false;
    }else{
        emailError.innerHTML = '';
        return true;
    }
}

function validatePassword(){
    let password = document.getElementById('password');
    let passwordError = document.getElementById('password-error');
    
    if(password.value.trim()==''){
        passwordError.innerHTML = 'Password cannot be blank!!';
        return false;
    }else if(password.value.length < 6 || password.value.length > 10){
        passwordError.innerHTML = 'Password length 6-10 characters'
        return false;
    }else{
        passwordError.innerHTML = '';
        return true;
    }
}

function validateRepeat(){
    let password = document.getElementById('password');
    let repeatPassword = document.getElementById('repeat');
    let repeatError = document.getElementById('repeat-error');

    if(password.value != repeatPassword.value){
        repeatError.innerHTML = 'Password mismatch';
        return false;
    }
    else{
        repeatError.innerHTML ='';
        return true;
    }
}

function validateForm(){
    if(!validateName()|| !validateEmail() || !validatePassword() || !validateRepeat()){
        return false;
    }
    else{
        return true;
    }
}