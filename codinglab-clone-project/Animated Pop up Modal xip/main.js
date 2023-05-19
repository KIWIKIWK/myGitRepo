const container=document.querySelector(".container");
const modalBack= document.querySelector(".modal-back");
const modal=document.querySelector(".modal");

const hireBtn=document.querySelector(".btn");
const cancel=document.querySelector(".cancel");
const cancelicon=document.querySelector(".bx-x");

container.classList.remove("notransition");
modalBack.classList.remove("notransition");
modal.classList.remove("notransition");

hireBtn.addEventListener("click",()=>{
    modalBack.classList.add("show");
});

cancel.addEventListener("click",()=>{
    modalBack.classList.remove("show");
});

cancelicon.addEventListener("click",()=>{
    modalBack.classList.remove("show");
});

