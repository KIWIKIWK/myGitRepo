const dLeftBtn=document.querySelector(".double-left");
const leftBtn=document.querySelector(".left");
const dRightBtn=document.querySelector(".double-right");
const rightBtn=document.querySelector(".right");
const indexNum=document.querySelectorAll(".num");
let pageCount=1;

function giveDisabled(p){
    if(p===1){
        dLeftBtn.disabled=true;
        leftBtn.disabled=true;
        dRightBtn.disabled=false;
        rightBtn.disabled=false;
    }else if(p===5){
        dLeftBtn.disabled=false;
        leftBtn.disabled=false;
        dRightBtn.disabled=true;
        rightBtn.disabled=true;
    }else{
        dLeftBtn.disabled=false;
        leftBtn.disabled=false;
        dRightBtn.disabled=false;
        rightBtn.disabled=false;
    }
}
function conActive(){
    indexNum.forEach((n)=>{
        if(n.classList.contains("active")){
            n.classList.remove("active");
        }
    })
}

indexNum.forEach((n,i)=>{
    n.addEventListener("click",()=>{
        conActive();
        n.classList.add("active");
        pageCount=i+1;
        giveDisabled(pageCount);
    });
})

leftBtn.addEventListener("click",()=>{
    conActive();
    pageCount--;
    indexNum[pageCount-1].classList.add("active");
    giveDisabled(pageCount);
});
rightBtn.addEventListener("click",()=>{
    conActive();
    pageCount++;
    indexNum[pageCount-1].classList.add("active");
    giveDisabled(pageCount);
});
dLeftBtn.addEventListener("click",()=>{
    conActive();
    pageCount=1;
    indexNum[pageCount-1].classList.add("active");
    giveDisabled(pageCount);
});
dRightBtn.addEventListener("click",()=>{
    conActive();
    pageCount=5;
    indexNum[pageCount-1].classList.add("active");
    giveDisabled(pageCount);
});