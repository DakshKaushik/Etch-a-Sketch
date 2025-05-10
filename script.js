const gridContainer=document.querySelector(".gridContainer")
size=16
for(let i=0;i<size*size;i++){
    const item=document.createElement("div")
    item.classList.add("grid-item")
    item.textContent=i+1
    gridContainer.appendChild(item)
}
