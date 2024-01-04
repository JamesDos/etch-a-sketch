
let gridWidth = 16;
let gameGrid = document.querySelector('.game-grid');
let defaultButton = document.querySelector('#default');
let rainbowButton = document.querySelector('#rainbow');
let eraseButton = document.querySelector('#eraser');
let clearButton = document.querySelector('#clear');
let slider= document.querySelector('#slider');
let sliderLabel = document.querySelector('.slider-label');

sliderLabel.textContent = gridWidth;

defaultButton.className = ('selected');

let modes = ['default', 'rainbow', 'erase'];
let currMode = modes[0];
let currButton = defaultButton;

let isMousePressed = false;

document.addEventListener('mousedown', () => {
  isMousePressed = true;
});

document.addEventListener('mouseup', () => {
  isMousePressed = false;
});

let generateRandomColor = () => {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  }
}

let changeColorBlack = box => {
  box.className = 'colored grid-box';
}

let changColorRainbow = box => {
  box.className = 'grid-box';
  box.classList.add('colored');
  let rgb = generateRandomColor();
  box.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

let changeColorWhite = box => {
  box.removeAttribute('style');
  box.className = 'uncolored grid-box'
}

let setUpGridBox = box => {
  box.classList.add('grid-box');
  box.classList.add('uncolored');
  box.addEventListener('mousemove', () => {
    if (isMousePressed) {
      if (currMode === modes[0]) {
        changeColorBlack(box);
      } else if (currMode === modes[1]) {
        changColorRainbow(box);
      } else {
        changeColorWhite(box);
      }
    }
  });
}

let generateGrid = n => {
  for (let i = 0; i < n; i++) {
    let gridRow = document.createElement('div');
    gridRow.classList.add('grid-row');
    for (let j = 0; j < n; j++) {
      let gridBox = document.createElement('div');
      setUpGridBox(gridBox);
      gridRow.appendChild(gridBox);
    }
    gameGrid.appendChild(gridRow);
  }
}

let clearGrid = () => {
  for(const row of Array.from(gameGrid.children)) {
    for(const box of Array.from(row.children)) {
      box.removeAttribute('style');
      box.className = 'uncolored grid-box'
    }
  }
}

defaultButton.addEventListener('click', () => {
  currButton.className = 'unselected';
  defaultButton.className = 'selected';
  currMode = modes[0];
  currButton = defaultButton;
});
rainbowButton.addEventListener('click', () => {
  currButton.className = 'unselected';
  rainbowButton.className = 'selected';
  currMode = modes[1];
  currButton = rainbowButton;
});
eraseButton.addEventListener('click', () => {
  currButton.className = 'unselected';
  eraseButton.className = 'selected';
  currMode = modes[2];
  currButton = eraseButton;
});
clearButton.addEventListener('click', () => clearGrid());

generateGrid();

let resizeGrid = n => {
  gameGrid.innerHTML = '';
  generateGrid(n);
};

slider.addEventListener('input', () => {
  sliderLabel.textContent = `${slider.value} x ${slider.value}`;
  gridWidth = parseInt(slider.value);
  resizeGrid(gridWidth);
})


