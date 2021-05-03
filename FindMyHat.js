const prompt = require("prompt-sync")({ sigint: true });
const clear = require("clear-screen");

const hat = "👧";
const hole = "⛔";
const fieldCharacter = "░░";
const pathCharacter = "👨";
const walkPath = "🌾";

//Create a class controller for the game
class Field {
  //Initialise the variables in the class
  constructor(field) {
    this.field = field;

    //this.start is the default for char '*'
    this.start = {
      x: 0,
      y: 0,
    };

    //this.start is the default for hat '^'
    this.hatPos = {
      x: 0,
      y: 0,
    };

    this.locationX = 0;
    this.locationY = 0;
  } //End of constructor

  //Call static method directly from the class object
  static generateField(fieldH, fieldW, percentage = 0.1) {
    const field = new Array(fieldH).fill(0).map((element) => new Array(fieldW));
    console.log(field);

    for (let y = 0; y < fieldH; y++) {
      for (let x = 0; x < fieldW; x++) {
        const prob = Math.random(); //return a value between 0 and 1
        //console.log(prob);
        field[y][x] = prob > percentage ? fieldCharacter : hole;
      }
    }
    return field;
  } //End of generateField method

  //other methods in the class
  runGame() {
    this.setStart(); //start the random position of my char
    this.setHat(); //start the random position of my hat

    let gameStart = true;
    while (gameStart) {
      this.print(); //prints out the rows and columns
      this.getInput(); //get input from user
      if (!this.inBound()) {
        console.log("Out of bounds you Died!");
        gameStart = false;
        break;
      } else if (this.isHole()) {
        console.log("Sorry, you fell down a hole.");
        gameStart = false;
        break;
      } else if (this.isHat()) {
        console.log("Congrats, you found your Girlfriend!!");
        gameStart = false;
        break;
      }
      // Update current location on map
      this.field[this.locationY][this.locationX] = pathCharacter;
    }
  }

  setStart() {
    this.start = this.setPos();
    this.locationX = this.start.x;
    this.locationY = this.start.y;
    this.field[this.start.y][this.start.x] = pathCharacter; //*
  }

  setHat() {
    this.hatPos = this.setPos(this.start);
    this.field[this.hatPos.y][this.hatPos.x] = hat; //^
  }
  print() {
    clear();
    console.log("Welcome to Find Your Girlfriend Game!");
    console.log(
      "Reach the girl (👧) without falling in the holes (⛔) or falling off the board."
    );
    console.log(
      "Enter W(Up), S(Down), A(Left) and D(Right).\n"
    );
    this.field.forEach((element) => console.log(element.join("")));
  }

  getInput() {
    const input = prompt("Which way? ").toUpperCase();
    switch (input) {
      case "W":
        this.locationY -= 1;
        break;
      case "S":
        this.locationY += 1;
        break;
      case "A":
        this.locationX -= 1;
        break;
      case "D":
        this.locationX += 1;
        break;
      default:
        console.log("Enter W, A, S or D");
        this.getInput();
        break;
    }
  }

  inBound() {
    return (
      this.locationY >= 0 &&
      this.locationX >= 0 &&
      this.locationY < this.field.length &&
      this.locationX < this.field[0].length
    );
  }

  isHat() {
    return this.field[this.locationY][this.locationX] === hat;
  }

  isHole() {
    return this.field[this.locationY][this.locationX] === hole;
  }

  setPos() {
    const pos = {
      x: 0,
      y: 0,
    };

    pos.x = Math.floor(Math.random() * this.field[0].length); //x = 10
    pos.y = Math.floor(Math.random() * this.field[1].length); //y = 10

    console.log(pos.x);
    console.log(pos.y);

    return pos;
  }
} // End of field Class

//create an instance of field class and call generatefield directly from class name
const myField = new Field(Field.generateField(10, 10, 0.2));
myField.runGame();
