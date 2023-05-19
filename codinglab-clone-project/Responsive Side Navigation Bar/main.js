let sidebar = document.querySelector(".side-bar");
let sideBtn = document.querySelector("#btn");

sideBtn.addEventListener("click",()=>{
    sidebar.classList.toggle("open");
    menuBtnChange();
});

function menuBtnChange() {
    if(sidebar.classList.contains("open")){
      sideBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
    }else {
      sideBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
    }
}