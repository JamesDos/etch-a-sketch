let gridWidth = 16;

let gameGrid = document.querySelector('.game-grid');

let generateGrid = () => {
  for(let i = 0; i < gridWidth; i++) {
    let gridRow = document.createElement('div');
    for(let j = 0; i < gridWidth; j++) {
      let gridBox = document.createElement('div');
      gridBox.setAttribute('style', 'border: 5px red solid');
      gridRow.appendChild(gridBox);
    }
    gameGrid.appendChild(gridRow);
  }
}

generateGrid();