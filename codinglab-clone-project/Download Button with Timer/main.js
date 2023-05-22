const downBtn=document.querySelector(".down-btn");
const fileLink = "https://drive.google.com/uc?export=download&id=1aYiaLn3YOjL-_o5QBCy7tU1epqA6gZoi";
// location.href = fileLink;
let fileDowned=false;

downBtn.addEventListener("click",()=>{
    if(fileDowned){
        location.href = fileLink;
        return;
    }
    let timer=10;
    downBtn.classList.add("active");
    downBtn.querySelector(".text").innerHTML=`Your download will begin in <b>${timer}</b> seconds`
    const oneTimer = setInterval(()=>{
        timer--;
        downBtn.querySelector(".text").innerHTML=`Your download will begin in <b>${timer}</b> seconds`
    },1000);
    setTimeout(()=>{
        clearInterval(oneTimer);
        downBtn.querySelector(".text").textContent="Your file is downloading";
        setTimeout(()=>{
            location.href = fileLink;
            downBtn.querySelector(".text").textContent="Download Again";
            downBtn.classList.remove("active");
            downBtn.classList.add("again");
            fileDowned=true;
        },2000);
    },11000);
});