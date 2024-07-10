
class Calculator { //Blueprint for a calculator//
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement //Store the screens//
        this.currentOperandTextElement = currentOperandTextElement //Store the screens//
        this.clear() //When we create a calculator we want to call this function//
    }
    //Constructor is a special part of the blueprint that runs when you create a new calculator//
    //It's like saying, 'when you build a calculator, give it 2 screens, one for previous and one for current number//

    clear() { //We're storing things here//
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return //Return stops function from running further; we don't want more than 1 '.'//
        this.currentOperand = this.currentOperand.toString() + number.toString() //toString because we want to append and not add//
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return //Return stops function from running further so it doesn't keep clearing stuff//
        if(this.previousOperand !== '') { //Computes automatically when another operation is added, and puts it on the right side//
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return //Return stops function from running if there are no numbers//
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        if(this.operation !== null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]') //Text element, not a button//
const currentOperandTextElement = document.querySelector('[data-current-operand]') //Text element, not a button//

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement) 
//Now we're creating the calculator variable// //We pass everything from our constructor into it//

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
}) 

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay() 
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})