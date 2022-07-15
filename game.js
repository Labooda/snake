class Snake {
  constructor() {
    this.xVelocity = 1;
    this.yVelocity = 0;
    this.length = 4;
    this.body = [
      [7, 10],
      [8, 10],
      [9, 10],
      [10, 10],
    ];
  }
  up() {
    if (this.yVelocity !== 1) {
      this.xVelocity = 0;
      this.yVelocity = -1;
    }
  }
  down() {
    if (this.yVelocity !== -1) {
      this.xVelocity = 0;
      this.yVelocity = 1;
    }
  }
  left() {
    if (this.xVelocity !== 1) {
      this.xVelocity = -1;
      this.yVelocity = 0;
    }
  }
  right() {
    if (this.xVelocity !== -1) {
      this.xVelocity = 1;
      this.yVelocity = 0;
    }
  }
  move() {
    let [x, y] = this.body[this.body.length - 1];

    if (x === 30 && this.xVelocity === 1) {
      this.body.push([1, y + this.yVelocity]);
    } else if (x === 1 && this.xVelocity === -1) {
      this.body.push([30, y + this.yVelocity]);
    } else if (y === 30 && this.yVelocity === 1) {
      this.body.push([x + this.xVelocity, 1]);
    } else if (y === 1 && this.yVelocity === -1) {
      this.body.push([x + this.xVelocity, 30]);
    } else {
      this.body.push([x + this.xVelocity, y + this.yVelocity]);
    }

    return this.body.shift();
  }
}

const snake = new Snake();

const timerId = setInterval(fillSnake, 1000 / 15);

function fillSnake() {
  const [xTail, yTail] = snake.move();
  const tail = document.getElementById(`${xTail} ${yTail}`);

  if (tail.classList.contains("brown")) {
    tail.classList.remove("brown");
    snake.body.unshift([xTail, yTail]);
    ++snake.length;
  } else {
    tail.classList.remove("black");
  }

  const [xHead, yHead] = snake.body[snake.body.length - 1];
  const head = document.getElementById(`${xHead} ${yHead}`);
  if (!head.classList.contains("black")) {
    head.classList.add("black");
  } else {
    clearInterval(timerId);
    alert(`Your score: ${snake.length}`);
  }

  if (head.classList.contains("red")) {
    head.classList.remove("red");
    head.classList.add("brown");
  }

  if (!document.querySelector(".red")) {
    apple();
  }
  document.addEventListener("keydown", function (event) {
    if (event.code === "ArrowLeft") {
      snake.left();
    } else if (event.code === "ArrowRight") {
      snake.right();
    } else if (event.code === "ArrowUp") {
      snake.up();
    } else if (event.code === "ArrowDown") {
      snake.down();
    }
  });
}

function apple() {
  const xApple = Math.floor(Math.random() * 30) + 1;
  const yApple = Math.floor(Math.random() * 30) + 1;
  const div = document.getElementById(`${xApple} ${yApple}`);
  if (div.classList.contains("black") || div.classList.contains("brown")) {
    apple();
  } else {
    div.classList.add("red");
  }
}
