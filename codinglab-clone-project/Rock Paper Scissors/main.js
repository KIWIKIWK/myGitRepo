const options=document.querySelectorAll(".options div");
const resultText=document.querySelector(".result-text-board");
const imgBoard=document.querySelector(".result-img-board");
const imgCU=imgBoard.querySelectorAll("img");

const optionsText=["R","P","S"];
const resultDict={
    "RR": "Draw",
    "RP":"Com Won!!",
    "RS":"User Won!!",
    "PR":"User Won!!",
    "PP":"Draw",
    "PS":"Com Won!!",
    "SR":"Com Won!!",
    "SP":"User Won!!",
    "SS":"Draw"
};
let userSrc,comSrc;


options.forEach((option,i)=>{
    option.addEventListener("click",(e)=>{
        imgCU.forEach((img)=>{
            img.src="./images/rock.png";
        });
        
        options.forEach((option2,i2)=>{
            option2.style.pointerEvents="none";
            if(option2.classList.contains("active")){
                option2.classList.remove("active");
            }
        });
        option.classList.add("active");
        resultText.textContent="Wait...";
        imgBoard.classList.add("matching");
        // console.log(e.target.src);
        setTimeout(()=>{
            // console.log(e.target.src ,options[Math.floor(Math.random()*3)].querySelector("img").src);
            comValue=Math.floor(Math.random()*3);
            userSrc=e.target.src;
            comSrc=options[comValue].querySelector("img").src;
            imgBoard.querySelectorAll("img")[0].src=userSrc;
            imgBoard.querySelectorAll("img")[1].src=comSrc;

            resultText.textContent=resultDict[optionsText[i]+optionsText[comValue]];
            imgBoard.classList.remove("matching");
            options.forEach((op)=>{
                op.style.pointerEvents="all";
            });
        },2500);
    });
});