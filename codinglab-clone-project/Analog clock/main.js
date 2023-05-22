const modeBtn=document.querySelector(".mode-btn");
const bodyDark=document.querySelector("body");
const indTime=document.querySelectorAll(".hand");

const updateTime = ()=>{
    const date = new Date();
    const secs=date.getSeconds();
    const mins=date.getMinutes();
    let hours=date.getHours();
    if(hours>=12){
        hours-=12;
    }
    hours= (hours * 3600 + mins*60 + secs);
    indTime[0].style.transform=`rotate(${secs* 360 / 60}deg)`;
    indTime[1].style.transform=`rotate(${mins* 360 / 60}deg)`;
    indTime[2].style.transform=`rotate(${hours* 360 / 43200}deg)`;
}

// console.log(date.getHours(),date.getSeconds(),date.getMinutes());

modeBtn.addEventListener("click",()=>{
    bodyDark.classList.toggle("dark");
});
setInterval(updateTime,1000);