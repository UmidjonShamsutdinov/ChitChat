// SIGN UP VARIABLES

const signUpform = document.querySelector("#sign-up-form")
const signUpUserName = document.querySelector(".sign-up-username")
const signUpUserEmail = document.querySelector(".sign-up-email")
const signUpPassword = document.querySelector(".sign-up-password")
const signUpConfirmPassword = document.querySelector(".sign-up-confirm")
const usersData = JSON.parse(localStorage.getItem("users")) || []
export {signUpConfirmPassword, signUpPassword, signUpUserEmail, signUpUserName, signUpform, usersData}
