const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";

// Update display
function updateDisplay() {
    display.textContent = expression || "0";
}

// Calculate result
function calculate() {
    try {
        let result = eval(
            expression
                .replace(/×/g, "*")
                .replace(/÷/g, "/")
        );
        expression = result.toString();
        updateDisplay();
    } catch {
        display.textContent = "Error";
        expression = "";
    }
}

// Button click handling
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (button.classList.contains("Clear")) {
            expression = "";
            updateDisplay();
        }

        else if (button.classList.contains("Delete")) {
            expression = expression.slice(0, -1);
            updateDisplay();
        }

        else if (button.classList.contains("Operator1")) {
            calculate();
        }

        else {
            expression += value;
            updateDisplay();
        }
    });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
    if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
        expression += e.key;
    }
    else if (["+", "-", "*", "/"].includes(e.key)) {
        expression += e.key
            .replace("*", "×")
            .replace("/", "÷");
    }
    else if (e.key === "Enter") {
        calculate();
        return;
    }
    else if (e.key === "Backspace") {
        expression = expression.slice(0, -1);
    }
    else if (e.key === "Escape") {
        expression = "";
    }

    updateDisplay();
});
