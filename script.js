function submitForm() {
    // Get the input values
    let binInput1 = document.getElementById("binInput1").value;
    let binInput2 = document.getElementById("binInput2").value;

    // Validate if inputs are binary
    if (!/^[01]+$/.test(binInput1) || !/^[01]+$/.test(binInput2)) {
        alert("Please enter valid binary numbers.");
        return;
    }

    // Convert binary inputs to integers
    let bin1 = parseInt(binInput1, 2);
    let bin2 = parseInt(binInput2, 2);

    // Clear previous output
    document.getElementById('consoleOutput').innerHTML = '';

    // Show the step-by-step output heading after inputs are entered
    document.querySelector('h3').style.display = 'block';

    // Log the initial binary inputs
    logStep(`Initial Inputs: ${binInput1.padStart(8, '0')} | ${binInput2.padStart(8, '0')}`);

    // Perform the tetration operation
    let result = tetrate(bin1, bin2);

    // Log the final results
    logStep(`Final Tetration Result (Decimal): ${result}`);
    logStep(`Final Tetration Result (Binary): ${result.toString(2)}`);
}

// Function to log steps to the console output
function logStep(message) {
    let outputDiv = document.getElementById('consoleOutput');
    outputDiv.innerHTML += message + '\n';
}

// Function to perform binary tetration
function tetrate(base, height) {
    let result = base;
    for (let i = 1; i < height; i++) {
        result = exponentiate(base, result);
    }
    return result;
}

// Function to perform binary exponentiation (bitwise exponentiation)
function exponentiate(base, exponent) {
    let result = 1;
    let currentExponent = exponent;
    let currentBase = base;

    logStep(`Starting Bitwise Exponentiation: ${currentBase.toString(2)} ^ ${currentExponent.toString(2)}`);

    while (currentExponent > 0) {
        if (currentExponent % 2 === 1) {
            result = multiply(result, currentBase);
        }
        currentBase = multiply(currentBase, currentBase);
        currentExponent = Math.floor(currentExponent / 2);
    }

    logStep(`Final Exponentiation Result (Binary): ${result.toString(2)}`);
    return result;
}

// Function to perform bitwise multiplication
function multiply(a, b) {
    let result = 0;
    let currentB = b;
    let shiftCount = 0;

    logStep(`Starting Bitwise Multiplication: ${a.toString(2)} * ${currentB.toString(2)}`);

    // Bitwise multiplication using shifts and addition
    while (currentB > 0) {
        if (currentB % 2 === 1) {
            result = add(result, a << shiftCount);
        }
        currentB = Math.floor(currentB / 2);
        shiftCount++;
    }

    logStep(`Final Product (Binary): ${result.toString(2)}`);
    return result;
}

// Function to perform bitwise addition
function add(a, b) {
    let carry;
    let sum = a ^ b;

    while (b !== 0) {
        carry = (a & b) << 1;
        a = sum;
        b = carry;
        sum = a ^ b;
    }

    logStep(`Final Sum (Binary): ${sum.toString(2)}`);
    return sum;
}
