class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previous = previousOperandElement;
        this.current = currentOperandElement;
        this.clear();
    }

    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete(){

    }

    appendNumber(number){
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){

    }

    compute(){
    }

    updateDisplay(){
        this.current.innerText = this.currentOperand;
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandElement = document.querySelector("[data-previous]");
const currentOperandElement = document.querySelector("[data-current]");

const calculator = new Calculator(previousOperandElement, currentOperandElement);
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});