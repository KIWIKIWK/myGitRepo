const container = document.querySelector(".container");
const boxes = document.querySelectorAll(".box");

boxes.forEach((box)=>{
    box.addEventListener("dragstart",()=>{
        setTimeout(()=>{
            box.classList.add("dragging");
        },0);
    })
    box.addEventListener("dragend",()=>{
        box.classList.remove("dragging");
    })
});

const initSortableList = (e) => {
    e.preventDefault();
    const draggingItem=document.querySelector(".dragging");

    let notDraggings=[...document.querySelectorAll(".box:not(.dragging)")];

    let nextItem=notDraggings.find((item)=>{
        return e.clientY <= item.offsetTop + item.offsetHeight / 2;
    });
    container.insertBefore(draggingItem,nextItem);
}

container.addEventListener("dragover",initSortableList);
container.addEventListener("dragenter",()=>{
    e.preventDefault();
});