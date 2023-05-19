const minus=document.querySelector(".minus");
const plus=document.querySelector(".plus");
const count=document.querySelector(".count");
let num=1;
count.textContent="01";

minus.addEventListener("click",()=>{
    if(num===1){
        return;
    }
    num--;
    if(num<10){
        count.textContent="0"+`${num}`;
    }else{
        count.textContent=`${num}`;
    }
});
plus.addEventListener("click",()=>{
    num++;
    if(num<10){
        count.textContent="0"+`${num}`;
    }else{
        count.textContent=`${num}`;
    }
});