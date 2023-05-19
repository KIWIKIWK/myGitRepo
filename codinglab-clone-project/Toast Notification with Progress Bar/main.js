const toast=document.querySelector(".toast");
const btn=document.querySelector(".btn-toast");
const close=document.querySelector(".close");
const progress=document.querySelector(".progress-bar");

let timer1,timer2;

btn.addEventListener("click",()=>{
    clearTimeout(timer1);
    clearTimeout(timer2);
    toast.classList.add("active");
    progress.classList.add("active");
    btn.style.pointerEvents="none";
    timer1=setTimeout(()=>{
        toast.classList.remove("active");
        btn.style.pointerEvents="auto";
        timer2=setTimeout(()=>{
            progress.classList.remove("active");
        },300);
    },5000);
});

close.addEventListener("click",()=>{
    clearTimeout(timer1);
    clearTimeout(timer2);
    toast.classList.remove("active");
    timer2=setTimeout(()=>{
        progress.classList.remove("active");
        btn.style.pointerEvents="auto";
    },300);
});