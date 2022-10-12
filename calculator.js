//Operators
const brackets = document.getElementById("brac");
const percent = document.getElementById("percent");
const divide = document.getElementById("divide");
const multiply = document.getElementById("times");
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const equalTo = document.getElementById("equals");
const decimalPoint = document.getElementById("point");

//Numbers
const one = document.getElementById("1-btn");
const two = document.getElementById("2-btn");
const three = document.getElementById("3-btn");
const four = document.getElementById("4-btn");
const five = document.getElementById("5-btn");
const six = document.getElementById("6-btn");
const seven = document.getElementById("7-btn");
const eight = document.getElementById("8-btn");
const nine = document.getElementById("9-btn");
const zero = document.getElementById("zero");

//Input for calculations
const calculationInput = document.getElementById("input-1");

//for deleting numbers
const deleteNumberInput = document.getElementById("delete");

//Input for results
const resultInput = document.getElementById("input-2");

const btns = document.getElementsByClassName("btns");

const btnsArray = [...btns];

// //Array of Inputs to store clicked elements (numbers or operators).
let arrayOfInputs = ["1", "", "1"];

btnsArray.forEach((btn) => {
  let idAttribute = btn.getAttribute("id");
  btn.addEventListener("click", () => {
    let displayedValue = calculationInput.textContent;
    //check if the clicked button is a number
    if (btn.classList.contains("number")) {
      //If it's a number, and a single value is clicked, update the calculationInput to show the clicked number
      if (displayedValue === "0") {
        calculationInput.textContent = btn.textContent;
        arrayOfInputs[0] = calculationInput.textContent;
        //And set the first value of the arrayOfInputs to the updated value
        console.log(arrayOfInputs[0]);
      } else {
        //If multiple number values are clicked, concatenate them, and return them as a single value
        
          calculationInput.textContent = displayedValue + btn.textContent;
          arrayOfInputs[0] = calculationInput.textContent;
          console.log(arrayOfInputs[0]);
        
      }
    }
    // If the clicked button is the cancel btn, delete the displayedValue singly
    if (idAttribute === "delete") {
      let displayedValueArray = displayedValue.split("");
      displayedValueArray.pop();
      //If the displayValueArray is more than zero, return the remaining value after deletion
      if (displayedValueArray.length > 0) {
        calculationInput.textContent = displayedValueArray.join("");
        arrayOfInputs[0] = calculationInput.textContent;
        // else return zero value
      } else {
        calculationInput.textContent = "0";
        arrayOfInputs[0] = calculationInput.textContent;
      }
    }
    // If the clear btn is clicked, clear clear the result input and set the displayValue to zero
    if (idAttribute === "clear") {
      calculationInput.textContent = "0";
      resultInput.textContent = "";
      arrayOfInputs = ["1", "", "1"];
    }

    if (btn.classList.contains("operator")) {
      if (
        !calculationInput.textContent.split("").includes("+") &&
        !calculationInput.textContent.split("").includes("-") &&
        !calculationInput.textContent.split("").includes("/") &&
        !calculationInput.textContent.split("").includes("%") &&
        !calculationInput.textContent.split("").includes("x")
      ) {
        calculationInput.textContent = displayedValue + btn.textContent;
        let newArrayOfInputs = calculationInput.textContent.split("");
        let secondValue = newArrayOfInputs.pop();
        arrayOfInputs[1] = secondValue;
        console.log(arrayOfInputs[1]);
        console.log(arrayOfInputs);
      } else {
        return calculationInput.textContent;
      }
    }

    if (
      arrayOfInputs[1] === "-" ||
      arrayOfInputs[1] === "+" ||
      arrayOfInputs[1] === "/" ||
      arrayOfInputs[1] === "%" ||
      arrayOfInputs[1] === "x"
    ) {
      let newArrayOfInputs = calculationInput.textContent.split("");
      let indexOfOperator = newArrayOfInputs.findIndex(
        (arr) =>
          arr === "-" ||
          arr === "+" ||
          arr === "/" ||
          arr === "%" ||
          arr === "x"
      );

      let neededIndex = indexOfOperator + 1;
      let slicedArray = newArrayOfInputs.slice(neededIndex);
      let joinedSlicedArray = slicedArray.join("");
      arrayOfInputs[2] = joinedSlicedArray;
      let arrBeforeOperator = newArrayOfInputs.slice(0, indexOfOperator);
      let beforeJoinedArray = arrBeforeOperator.join("");
      arrayOfInputs[0] = beforeJoinedArray;
    } else {
      return calculationInput.textContent;
    }

    //Checks if the first value of the arrayOfInputs has been mutated and the user presses "equals to". If true, returns the mutated value of arrayOfInputs.
    if (idAttribute === "equals") {
      calculate(arrayOfInputs[0], arrayOfInputs[2], arrayOfInputs[1]);
      calculationInput.textContent = "0";
    }
  });
});

function calculate(input1, input2, operator) {
  let calculation;
  switch (operator) {
    case "+":
      if (input2) {
        calculation = parseFloat(input1) + parseFloat(input2);
      } else {
        calculation = parseFloat(input1) + 0;
      }
      break;
    case "-":
      if (input2) {
        calculation = parseFloat(input1) - parseFloat(input2);
      } else {
        calculation = parseFloat(input1) - 0;
      }
      break;
    case "/":
      if (input2) {
        calculation = parseFloat(input1) / parseFloat(input2);
        return calculation;
      }
      if (input2 === "0") {
        calculation = "Maths Error";
      } else {
        calculation = parseFloat(input1) / 1;
      }
      break;
    case "x":
      if (input2) {
        calculation = parseFloat(input1) * parseFloat(input2);
      } else {
        calculation = parseFloat(input1) * 1;
      }
      break;
    case "%":
      if (input2) {
        calculation = (parseFloat(input1) / 100) * parseFloat(input2);
      } else {
        calculation = parseFloat(input1) / 100;
      }
      break;
  }
  console.log(calculation);
  resultInput.textContent = calculation.toString();
}
