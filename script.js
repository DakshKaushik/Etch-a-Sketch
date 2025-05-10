const gridContainer = document.querySelector(".gridContainer");
const gridSizeSlider = document.querySelector("#gridSizeSlider");
const sizeDisplay = document.querySelector("output");
const colorPicker = document.querySelector("#colorPicker");
const colorModeBtn = document.querySelector("#colorMode");
const rainbowModeBtn = document.querySelector("#rainbowMode");
const eraseBtn = document.querySelector("#eraser");
const clearBtn = document.querySelector("#clear");
const gridLinesBtn = document.querySelector("#gridLines");
let currentMode = "color";
function generateGrid() {
  gridContainer.replaceChildren();
  const size = parseInt(gridSizeSlider.value);
  sizeDisplay.textContent = `${size} X ${size}`;
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.className = "gridCell";
    cell.style.width = `${100 / size}%`;
    const cellHeight = 480 / size;
    cell.style.height = `${cellHeight}px`;
    cell.addEventListener("mouseover", cellHover);
    cell.addEventListener("mousedown", cellHover);
    gridContainer.appendChild(cell);
  }
}
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
function cellHover(e) {
  if (!isDrawing) return;
  if (currentMode === "color") {
    e.target.style.backgroundColor = colorPicker.value;
  }
  if (currentMode === "rainbow") {
    e.target.style.backgroundColor = randomColor();
  }
  if (currentMode === "erase") {
    e.target.style.backgroundColor = "rgb(240, 248, 255)";
  }
}
let isDrawing = true;
document.body.addEventListener("mousedown", () => (isDrawing = true));
document.body.addEventListener("mouseup", () => (isDrawing = false));
document.body.addEventListener("mouseleave", () => (isDrawing = false));
document.body.addEventListener("keydown", function (e) {
  if (e.key === "Escape") isDrawing = false;
  document
    .querySelectorAll("button")
    .forEach((btn) => btn.classList.remove("highlighted"));
});
generateGrid();
gridSizeSlider.addEventListener("input", function () {
  generateGrid();
});
colorModeBtn.addEventListener("click", function () {
  document
    .querySelectorAll("button")
    .forEach((btn) => btn.classList.remove("highlighted"));
  colorModeBtn.classList.add("highlighted");
  currentMode = "color";
  isDrawing = true;
});

clearBtn.addEventListener("click", () => {
  generateGrid();
});
rainbowModeBtn.addEventListener("click", function () {
  document
    .querySelectorAll("button")
    .forEach((btn) => btn.classList.remove("highlighted"));
  rainbowModeBtn.classList.add("highlighted");
  currentMode = "rainbow";
  isDrawing = true;
});
eraseBtn.addEventListener("click", function () {
  document
    .querySelectorAll("button")
    .forEach((btn) => btn.classList.remove("highlighted"));
  eraseBtn.classList.add("highlighted");
  currentMode = "erase";
  isDrawing = true;
});
let gridLinesStatus = true; 
gridLinesBtn.addEventListener("click", function () {
  document.querySelectorAll("button").forEach((btn) => btn.classList.remove("highlighted"));
  const gCell = document.querySelectorAll(".gridCell");
  if (gridLinesStatus) {
    gCell.forEach((cell) => {
      cell.style.border = "none";
    });
    gridLinesBtn.textContent = "Show Grid Lines";
    gridLinesStatus = false;  
  } else {
    gCell.forEach((cell) => {
      cell.style.border = "1px solid gray";
    });
    gridLinesBtn.textContent = "Hide Grid Lines";
    gridLinesStatus = true;  
  }
});

