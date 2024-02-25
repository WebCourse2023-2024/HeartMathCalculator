class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString()
            .slice(0, this.currentOperand.length - 1);
    }

    appendNumber(number){
        if(number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "" && this.currentOperand !== ""){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute(){
        let computationResult;
        const previousCompute = this.previousOperand.toString().includes(".")
            ? parseFloat(this.previousOperand.toString()) : parseInt(this.previousOperand.toString())
        const currentCompute = this.currentOperand.toString().includes(".")
            ? parseFloat(this.currentOperand.toString()) : parseInt(this.currentOperand.toString());
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
                computationResult = (previousCompute / currentCompute).toFixed(10)
                break;
            default: return;
        }
        this.currentOperand = computationResult;
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en",
                {maximumFractionDigits: 0});
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null){
            this.previousOperandElement.innerText = this.getDisplayNumber(this.previousOperand) +
                " " + this.operation;
        } else {
            this.previousOperandElement.innerText = "";
        }
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

