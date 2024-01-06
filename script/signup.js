import {signUpUserName,signUpConfirmPassword, signUpPassword, signUpUserEmail,  signUpform, usersData} from "./elements.js"
let passwordPassed = false
let emailPassed = false
let userNamePassed = false
let isThereUserEmail = false
let isThereUserName = false

signUpUserName.focus()

class User{
    constructor(username, email, password){
        this.username = username
        this.email = email
        this.password = password
        this.img = ""
    }
}





signUpform.addEventListener("submit", function(e){
    e.preventDefault()
    let test = JSON.parse(localStorage.getItem("users")) || []
    
    signUpUserName.nextElementSibling.textContent = ""
    signUpConfirmPassword.nextElementSibling.textContent = ""
    signUpPassword.nextElementSibling.textContent = ""
    signUpUserEmail.nextElementSibling.textContent = ""
    if(passwordPassed && emailPassed && userNamePassed){
        test.forEach(e=>{
            if(e.email == signUpUserEmail.value){
                isThereUserEmail = true
            }
            if(e.username == signUpUserName.value){
                isThereUserName = true
            }
        })
        if(isThereUserEmail){
            signUpUserEmail.nextElementSibling.textContent = "This email was registered"
            signUpUserEmail.nextElementSibling.classList.remove("pass")
            signUpUserEmail.nextElementSibling.classList.add("wrong")            
        }
        if(isThereUserName){
            signUpUserName.nextElementSibling.textContent = "This username was registered"
            signUpUserName.nextElementSibling.classList.remove("pass")
            signUpUserName.nextElementSibling.classList.add("wrong")
        }
        if(isThereUserEmail == false && isThereUserName == false){
            let userData = new User(signUpUserName.value,signUpUserEmail.value,signUpPassword.value)
            usersData.push(userData)
            localStorage.setItem("users", JSON.stringify(usersData))
            signUpUserName.previousElementSibling.textContent = "Signed Up Successfully" 
            signUpUserName.previousElementSibling.classList.add("passed") 
            setTimeout(() => {
                location.pathname = "../pages/index.html"
            }, 3000);
        }
        
        isThereUserEmail = false
        isThereUserName = false
        
    }   
    
    
    
    
    else if((passwordPassed, emailPassed) && userNamePassed == false){
        signUpUserName.nextElementSibling.classList.add("wrong")
        signUpUserName.nextElementSibling.textContent = "Username is required"
    }else if((passwordPassed, userNamePassed) && emailPassed == false){
        signUpUserEmail.nextElementSibling.classList.add("wrong")
        signUpUserEmail.nextElementSibling.textContent = "Email is required"
    }else if((userNamePassed, emailPassed) && passwordPassed == false){
        signUpPassword.nextElementSibling.classList.remove("passed")
        signUpPassword.nextElementSibling.classList.add("wrong")
        signUpPassword.nextElementSibling.textContent = "Passwords is required"
        signUpConfirmPassword.nextElementSibling.classList.remove("passed")
        signUpConfirmPassword.nextElementSibling.classList.add("wrong")
        signUpConfirmPassword.nextElementSibling.textContent = "Passwords is required"
    }else if(signUpUserName.value.length === 0){
        signUpUserName.nextElementSibling.classList.add("wrong")
        signUpUserName.nextElementSibling.textContent = "Username is required"
    }
})



signUpUserName.addEventListener("input",function(){
    signUpUserName.value.length > 0 ? userNamePassed = true : userNamePassed = false
    signUpUserName.nextElementSibling.textContent = ""
})


signUpUserEmail.addEventListener("input", function(){
    const mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(signUpUserEmail.value)
    signUpUserEmail.nextElementSibling.textContent = ""
    if(mailReg){
        signUpUserEmail.nextElementSibling.textContent = ""
        signUpUserEmail.classList.add("pass")
        emailPassed = true
    }
    else if(signUpUserEmail.value.length === 0){
        signUpUserEmail.nextElementSibling.textContent = ""
        signUpUserEmail.classList.remove("pass")
        
    }
    else{        
        signUpUserEmail.classList.remove("pass")
        signUpUserEmail.nextElementSibling.classList.add("wrong")
        signUpUserEmail.nextElementSibling.textContent = "Input Full Mail"
        emailPassed = false
    }
})




signUpPassword.addEventListener("input", function(){
    const pass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(signUpPassword.value)

    if(pass && signUpPassword.value === signUpConfirmPassword.value){
        signUpPassword.classList.add("pass")
        signUpConfirmPassword.classList.add("pass")
        signUpPassword.nextElementSibling.textContent = ""
        signUpConfirmPassword.nextElementSibling.textContent = ""
        passwordPassed = true
    }
    else if(signUpPassword.value.length === 0){
        signUpPassword.nextElementSibling.textContent = ""
    }
    else if(pass){        
        signUpPassword.classList.remove("pass")
        signUpConfirmPassword.classList.remove("pass")
        signUpPassword.nextElementSibling.classList.remove("wrong")
        signUpPassword.nextElementSibling.classList.add("passed")
        signUpPassword.nextElementSibling.textContent = "Passed"
        passwordPassed = false
        if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(signUpConfirmPassword.value)){
            signUpPassword.nextElementSibling.classList.add("passed")
            signUpPassword.nextElementSibling.textContent = "Passed"
            passwordPassed = false
            if(signUpConfirmPassword.value != signUpPassword.value && signUpConfirmPassword.value.length == signUpPassword.value.length){
                signUpConfirmPassword.nextElementSibling.textContent = "Passwords not matching"
            }else if(signUpConfirmPassword.value.length < signUpPassword.value.length){
                signUpPassword.nextElementSibling.classList.add("passed")
                signUpPassword.nextElementSibling.classList.remove("wrong")
                signUpPassword.nextElementSibling.textContent = "Passed"
                signUpConfirmPassword.nextElementSibling.classList.add("wrong")         
                signUpConfirmPassword.nextElementSibling.classList.remove("passed")         
                signUpConfirmPassword.nextElementSibling.textContent = "Passwords not matching"
                
            }
        }
    }
    else{
        signUpPassword.classList.remove("pass")
        signUpConfirmPassword.classList.remove("pass")
        signUpPassword.nextElementSibling.classList.remove("passed")
        signUpPassword.nextElementSibling.classList.add("wrong")
        signUpPassword.nextElementSibling.textContent = "at least 1 upper and  1 lower letter and 1 symbol and 1 number"
        passwordPassed = false
        if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(signUpConfirmPassword.value)){  
            signUpConfirmPassword.nextElementSibling.classList.add("passed")         
            signUpConfirmPassword.nextElementSibling.textContent = "Passed"
            passwordPassed = false
            if(signUpConfirmPassword.value != signUpPassword.value && signUpConfirmPassword.value.length == signUpPassword.value.length){
                signUpPassword.nextElementSibling.textContent = "Passwords not matching"
            }
        }
        }
})


signUpConfirmPassword.addEventListener("input", function(){
    const pass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(signUpConfirmPassword.value)
    
    if(pass && signUpPassword.value === signUpConfirmPassword.value){
        signUpConfirmPassword.classList.add("pass")
        signUpPassword.classList.add("pass")
        signUpPassword.nextElementSibling.textContent = ""
        signUpConfirmPassword.nextElementSibling.textContent = ""
        passwordPassed = true
    }
    else if(signUpConfirmPassword.value.length === 0){
        signUpConfirmPassword.nextElementSibling.textContent = ""
    }
    else if(pass){        
        signUpConfirmPassword.classList.remove("pass")
        signUpConfirmPassword.nextElementSibling.classList.remove("wrong")
        signUpConfirmPassword.nextElementSibling.classList.add("passed")
        signUpConfirmPassword.nextElementSibling.textContent = "Passed"
        passwordPassed = false
        if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(signUpPassword.value)){
            signUpPassword.nextElementSibling.classList.add("passed")
            signUpPassword.nextElementSibling.textContent = "Passed"
            passwordPassed = false
            if(signUpConfirmPassword.value != signUpPassword.value && signUpConfirmPassword.value.length == signUpPassword.value.length){
                signUpConfirmPassword.nextElementSibling.textContent = "Passwords not matching"
            }else if(signUpConfirmPassword.value.length < signUpPassword.value.length){
                signUpPassword.nextElementSibling.classList.add("passed")
                signUpPassword.nextElementSibling.classList.remove("wrong")
                signUpPassword.nextElementSibling.textContent = "Passed"
                signUpConfirmPassword.nextElementSibling.classList.add("wrong")         
                signUpConfirmPassword.nextElementSibling.classList.remove("passed")         
                signUpConfirmPassword.nextElementSibling.textContent = "Passwords not matching"
                console.log(1);
            }
        }
    }
    else{
        signUpConfirmPassword.classList.remove("pass")
        signUpPassword.classList.remove("pass")
        signUpConfirmPassword.nextElementSibling.classList.remove("passed")
        signUpConfirmPassword.nextElementSibling.classList.add("wrong")
        signUpConfirmPassword.nextElementSibling.textContent = "at least 1 upper and  1 lower letter and 1 symbol and 1 number"
        passwordPassed = false        
        if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(signUpPassword.value)){
            signUpPassword.nextElementSibling.classList.add("passed")
            signUpPassword.nextElementSibling.textContent = "Passed"
            passwordPassed = false
            if(signUpConfirmPassword.value != signUpPassword.value && signUpConfirmPassword.value.length == signUpPassword.value.length){
                signUpConfirmPassword.nextElementSibling.textContent = "Passwords not matching"
            }else if(signUpConfirmPassword.value.length < signUpPassword.value.length){
                signUpConfirmPassword.nextElementSibling.textContent = "Passwords not matching"
            }
        }
        
    }
})
