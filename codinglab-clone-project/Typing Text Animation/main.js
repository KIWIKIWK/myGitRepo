const text = document.querySelector(".tiping");

// Freelancer,YouTuber,Blogger
const animate=()=>{
    setTimeout(()=>{
        text.textContent="Freelancer";
    },0);
    setTimeout(()=>{
        text.textContent="YouTuber";
    },4000);
    setTimeout(()=>{
        text.textContent="Blogger";
    },8000);
};
animate();
setInterval(animate,12000);