const toggle=document.querySelector(".toggle");
const toggleSwitch=document.querySelector(".switch");
const closeBtn=document.querySelector(".btn");
const sidebar=document.querySelector(".sidebar");
const body=document.querySelector("body");

console.log(toggle,closeBtn,sidebar)

closeBtn.addEventListener("click",()=>{
    if(sidebar.classList.contains("close")){
        sidebar.classList.remove("close");
        closeBtn.classList.replace("bx-chevron-right","bx-chevron-left");
    }else{
        sidebar.classList.add("close");
        closeBtn.classList.replace("bx-chevron-left","bx-chevron-right");
    }
});

toggleSwitch.addEventListener("click",()=>{
    if(toggleSwitch.classList.contains("active")){
        toggleSwitch.classList.remove("active");
        body.classList.remove("dark");
        toggle.querySelector(".text").innerHTML="Dark mode";
        toggle.querySelector("i").classList.replace("bx-sun","bx-moon");
    } else{
        toggleSwitch.classList.add("active");
        body.classList.add("dark");
        toggle.querySelector(".text").innerHTML="Light mode";
        toggle.querySelector("i").classList.replace("bx-moon","bx-sun");
    }
});