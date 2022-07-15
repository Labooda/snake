const grid = document.querySelector(".grid");

for (let i = 1; i <= 30; i++) {
  for (let j = 1; j <= 30; j++) {
    const cell = document.createElement("div");
    cell.setAttribute("id", `${j} ${i}`);
    cell.classList.add("cell");
    if (i === 10 && j < 11 && j > 6) {
      cell.classList.add("black");
    }
    grid.append(cell);
  }
}
