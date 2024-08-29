const MAX_CHARS = 20
const ROUND_DEC_NUM = 3 //How many decimal digits to leave when rounding?

const buttons = document.querySelectorAll(".btn")
const mainDisplayText = document.querySelector("#main-text")
const prevDisplayText = document.querySelector("#prev-text")

for (const button of buttons) {
    button.addEventListener("click", e=> {processCalculatorInput(e.target.innerText)})
}



let calculator = {
    firstNumStr: "",
    operator: "",
    secondNumStr: "",
}


function processCalculatorInput(input) {
    let len = mainDisplayText.innerText.length

    // Del
    if (input === "del") {
        if (calculator.operator === "") calculator.firstNumStr = calculator.firstNumStr.slice(0, -1)
        else if (calculator.secondNumStr !== "") calculator.secondNumStr = calculator.secondNumStr.slice(0, -1)
        else calculator.operator = ""
    }
    // Clear
    else if (input === "clr") {
        clearCalc()
        prevDisplayText.innerText = ""
    }

    // Equals
    else if (input === "=" && calculator.firstNumStr && calculator.secondNumStr && calculator.operator) {
        let result = getResultFromCalc()
        prevDisplayText.innerText = mainDisplayText.innerText + " = " + result
        mainDisplayText.innerText = result.toString()
        clearCalc()
        calculator.firstNumStr = result.toString()
    }

    // The ones that require space
    else if (len < MAX_CHARS) {

        // Numbers
        if (!isNaN(input)) {
            !calculator.operator ? calculator.firstNumStr += input : calculator.secondNumStr += input
        }

        // Decimal
        else if (input === ".") {
            if (calculator.operator === "") {
                if (!calculator.firstNumStr.includes(".")) calculator.firstNumStr += "."
            } else {
                if (!calculator.secondNumStr.includes(".")) calculator.secondNumStr += "."
            }
        }

        // Operators
        else if ("+-*/✻".includes(input) && calculator.firstNumStr) calculator.operator = input
        else if (input === "*" && calculator.firstNumStr) calculator.operator = input
    }
    redrawMainDisplay()
}


function redrawMainDisplay() {
    mainDisplayText.innerText = calculator.firstNumStr + calculator.operator + calculator.secondNumStr
}

function clearCalc() {
    calculator.firstNumStr = calculator.secondNumStr = calculator.operator = ""
}

function getResultFromCalc() {
    let num1 = Number(calculator.firstNumStr)
    let num2 = Number(calculator.secondNumStr)
    let operator = calculator.operator

    switch (operator){
        case "+": return num1 + num2
        case "-": return num1 - num2
        case "/": return round(num1 / num2)
        case "✻": return num1 * num2
        default: return undefined
    }
}


function round(num) {
    let multiplier = 10 ** ROUND_DEC_NUM
    return Math.round(num * (multiplier)) / multiplier
}


document.addEventListener("keydown", e => {
    console.log(e)
    let key = e.key
    if ("1234567890*/+-=".includes(key)) {
        processCalculatorInput(key)
    }
    else if (key === "Backspace") {
        processCalculatorInput(e.ctrlKey ? "clr" : "del")
    }
})