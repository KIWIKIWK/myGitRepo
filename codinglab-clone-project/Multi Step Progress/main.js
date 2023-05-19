const buttons = document.querySelectorAll("button");
const circles = document.querySelectorAll(".circle");
const indicator = document.querySelector(".indicator");

let currentStep=1;

const updateSteps = (e) =>{

    currentStep= e.target.id === "Next" ? ++currentStep : --currentStep;

    indicator.style.width=`${(currentStep-1)/(circles.length - 1)*100}%`;

    circles.forEach((circle,index)=>{
        circle.classList[`${currentStep > index ? "add":"remove"}`]("active");
    });

    if(currentStep===1){
        buttons[0].disabled=true;
    } else if(currentStep===4){
        buttons[1].disabled=true;
    } else{
        buttons.forEach((button)=>{
            button.disabled=false;
        })
    }
};

buttons.forEach((button)=>{
    button.addEventListener("click",updateSteps);
});