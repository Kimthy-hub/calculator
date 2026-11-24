
const display = document.getElementById("display");

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

function calculate() {
    const secondNumber = Number(display.value);

    if (firstNumber === null || operator === null) {
        return;
    }

    if (operator === "/" && secondNumber === 0) {
        display.value = "Cannot divide by zero";
        firstNumber = null;
        operator = null;
        waitingForSecondNumber = true;
        return;
    }

    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            result = firstNumber / secondNumber;
            break;
    }

    display.value = Number(result.toPrecision(10));
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = true;
}

document.querySelectorAll("[data-value]").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;

        if ("+-*/".includes(value)) {
            if (display.value === "" || isNaN(Number(display.value))) {
                return;
            }

            if (firstNumber !== null && !waitingForSecondNumber) {
                calculate();
            }

            firstNumber = Number(display.value);
            operator = value;
            waitingForSecondNumber = true;
            return;
        }

        if (value === ".") {
            if (waitingForSecondNumber || display.value === "") {
                display.value = "0.";
                waitingForSecondNumber = false;
            } else if (!display.value.includes(".")) {
                display.value += ".";
            }
            return;
        }

        if (waitingForSecondNumber ||
            isNaN(Number(display.value))) {
            display.value = value;
            waitingForSecondNumber = false;
        } else {
            display.value += value;
        }
    });
});

document.querySelector('[data-action="clear"]')
    .addEventListener("click", () => {
        display.value = "";
        firstNumber = null;
        operator = null;
        waitingForSecondNumber = false;
    });

document.querySelector('[data-action="delete"]')
    .addEventListener("click", () => {
        if (!isNaN(Number(display.value))) {
            display.value = display.value.slice(0, -1);
        }
    });

document.querySelector('[data-action="calculate"]')
    .addEventListener("click", calculate);
