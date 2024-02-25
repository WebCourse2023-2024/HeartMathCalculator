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
        if(number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if (this.currentOperand === "") return;
        if (this.previousOperand !== ""){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute(){
        let computationResult;
        const previousCompute = this.previousOperand.includes(".") ? parseFloat(this.previousOperand)
            : parseInt(this.previousOperand)
        const currentCompute = this.currentOperand.includes(".") ? parseFloat(this.currentOperand)
            : parseInt(this.currentOperand);
        if (isNaN(previousCompute) || isNaN(currentCompute)) return;
        switch (this.operation){
            case "+":
                computationResult = previousCompute + currentCompute
                break;
            case "-":
                computationResult = previousCompute - currentCompute
                break;
            case "*":
                computationResult = previousCompute * currentCompute
                break;
            case "÷":
                computationResult = previousCompute / currentCompute
                break;
            default: return;
        }
        this.currentOperand = computationResult;
        this.operation = undefined;
        this.previousOperand = "";
    }

    updateDisplay(){
        this.current.innerText = this.currentOperand;
        this.previous.innerText = this.previousOperand;
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

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener("click", () => {
   calculator.compute();
   calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
   calculator.delete();
   calculator.updateDisplay();
});

