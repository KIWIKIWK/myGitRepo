const modal=document.querySelector(".modal");
const modalBack=document.querySelector(".modal-back");
const sheetBtn=document.querySelector(".sheet-btn");
const dragBtn=document.querySelector(".drag-btn");
const sheet=document.querySelector(".modal-content");

let isDrag=false;
let startY,startHeight;

modal.classList.remove("no-trans");

const hideBottomSheet = ()=>{
    modal.classList.remove("show");
}

const updateSheetHeight = (height)=>{
    if(height<55){
        height = 50;
    }else if(height>948){
        height = 949;
    }
    sheet.style.height=`${height}px`;
}

dragBtn.addEventListener("mousedown",(e)=>{
    isDrag=true;
    sheet.classList.add("dragging");
});
document.addEventListener("mousemove",(e)=>{
    // console.log(e.target);
    if(!isDrag){
        return;
    }
    newHeight=window.innerHeight - e.pageY;
    updateSheetHeight(newHeight);
});
document.addEventListener("mouseup",()=>{
    if(!isDrag){
        return;
    }
    isDrag=false;
    sheet.classList.remove("dragging");
    const sheetHeight = parseInt(sheet.style.height);
    sheetHeight < 250 ? hideBottomSheet() : sheetHeight > 800 ? updateSheetHeight(949) : updateSheetHeight(475);
});




sheetBtn.addEventListener("click",()=>{
    modal.classList.add("show");
    updateSheetHeight(475);
});
modalBack.addEventListener("click",()=>{
    modal.classList.remove("show");
});