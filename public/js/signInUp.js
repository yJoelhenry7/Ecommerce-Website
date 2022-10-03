const pwShowHide = document.querySelectorAll('.showHidePw');
const pwdFields = document.querySelectorAll('.password');


// function to checkpassword
function checkPassword(){
    let password = document.getElementById("password").value;
    let cnfrmPassword = document.getElementById("cnfrmpassword").value;
    let messages = document.getElementById("message");
    if(password.length != 0){
        if(password !== cnfrmPassword ){
            messages.style.display= "inline-block";
            messages.textContent = "Password don't match";
            messages.style.backgroundColor = "#ff4d4d";
    }
}
}
// js code to show/hide password and change icon
pwShowHide.forEach(eyeIcon =>{
    eyeIcon.addEventListener("click", ()=>{
        pwdFields.forEach(pwField =>{
            if(pwField.type ==="password"){
                pwField.type = "text";

                pwShowHide.forEach(icon =>{
                    icon.classList.replace("uil-eye-slash","uil-eye");
                })
            }else{
                pwField.type ="password";

                pwShowHide.forEach(icon =>{
                    icon.classList.replace("uil-eye","uil-eye-slash");
                })
            }
        })
    })
})