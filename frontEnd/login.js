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



function validateForm(){
    if(!validateName() || !validatePassword()){
        return false;
    }
    else{
        return true;
    }
}