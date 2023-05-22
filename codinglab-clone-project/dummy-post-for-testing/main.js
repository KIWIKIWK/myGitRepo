const cards=document.querySelectorAll(".card");
const filterBtns=document.querySelectorAll(".filter-btn button");

filterBtns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        filterBtns.forEach((button)=>{
            button.classList.remove("active");
        });
        btn.classList.add("active");
        cards.forEach((card)=>{
            if(e.target.dataset.name==="all" || e.target.dataset.name === card.dataset.name){
                card.style.display="block";
            }else{
                card.style.display="none";
            }
        });
    });
});