const form = document.querySelector("#form")
const userName = document.querySelector(".username")
const password = document.querySelector(".password")

userName.focus()
let userIndex;
let checkPass = false
let checkUsername = false


form.addEventListener("submit", function(e){
    e.preventDefault()
    let test = JSON.parse(localStorage.getItem("users"))
    if(userName.value.length>0 && password.value.length==0){
        userName.previousElementSibling.textContent = "Wrong username or password"
        userName.previousElementSibling.classList.add("wrong")
    }else if(userName.value.length==0 && password.value.length>0){
        userName.previousElementSibling.textContent = "Wrong username or password"
        userName.previousElementSibling.classList.add("wrong")
    }
    if(userName.value.length === 0 && password.value.length === 0){
        userName.nextElementSibling.textContent = "Enter username"
        userName.nextElementSibling.classList.add("wrong")
        password.nextElementSibling.textContent = "This hole can not be empty"
        password.nextElementSibling.classList.add("wrong")
    }    
    if(userName.value.length > 0 && password.value.length > 0){
        test.map((e,i)=>{
            if(e.username == userName.value && e.password == password.value){
                checkUsername = true
                userIndex = i
            }
        })
        if(checkUsername){
            if(test[userIndex].img != ""){
                location.pathname = "../pages/chat.html"
            }else{
                location.pathname = "../pages/profileAvatar.html"
            }
        }else{
            userName.previousElementSibling.textContent = "Wrong username or password"
            userName.previousElementSibling.classList.add("wrong")
        }
        
    }
    checkPass = false
    checkUsername = false
})



userName.addEventListener("input", function(){
    userName.previousElementSibling.textContent = ""
    userName.nextElementSibling.textContent = ""
    password.nextElementSibling.textContent = ""
})
password.addEventListener("input", function(){
    userName.previousElementSibling.textContent = ""
    userName.nextElementSibling.textContent = ""
    password.nextElementSibling.textContent = ""
})

