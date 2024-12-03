function logStep(message) {
    console.log(message); // Log to the console

    // Append message to the HTML container
    let logDiv = document.getElementById('consoleOutput');
    let logMessage = document.createElement('p');
    logMessage.textContent = message;  // Set the log message as text
    logDiv.appendChild(logMessage);    // Add the message to the console output div
}

function bitwiseAdd(x, y) {
    logStep(`Starting Bitwise Addition: ${x.toString(2)} + ${y.toString(2)}`);

    let steps = '';
    while (y !== 0) {
        let carry = x & y;
        steps += `Carry (in binary): ${carry.toString(2).padStart(8, '0')}\n`;
        x = x ^ y;
        steps += `Partial Sum (XOR in binary): ${x.toString(2).padStart(8, '0')}\n`;
        y = carry << 1;
        steps += `Carry shifted left (in binary): ${y.toString(2).padStart(8, '0')}\n`;
    }

    steps += `Final Sum (in binary): ${x.toString(2).padStart(8, '0')}`;
    logStep(steps);
    return x;
}

function bitwiseMultiply(a, b) {
    logStep(`Starting Bitwise Multiplication: ${a.toString(2)} * ${b.toString(2)}`);
    let result = 0;
    let step = 1;
    let steps = '';
    
    while (b > 0) {
        if (b & 1) {
            steps += `Step ${step}: Adding ${a.toString(2)} to result\n`;
            result = bitwiseAdd(result, a); // Add a to result
        }
        a = a << 1; // Shift a left by 1
        steps += `Step ${step}: a shifted left (in binary): ${a.toString(2).padStart(8, '0')}\n`;
        b = b >> 1; // Shift b right by 1
        steps += `Step ${step}: b shifted right (in binary): ${b.toString(2).padStart(8, '0')}\n`;
        step++;
    }

    steps += `Final Product (in binary): ${result.toString(2).padStart(8, '0')}`;
    logStep(steps);
    return result;
}

function bitwiseExponentiate(a, b) {
    logStep(`Starting Bitwise Exponentiation: ${a.toString(2)} ^ ${b.toString(2)}`);
    let result = 1;
    let step = 1;
    let steps = '';

    while (b > 0) {
        if (b & 1) {
            steps += `Step ${step}: Multiplying result by ${a.toString(2)}\n`;
            result = bitwiseMultiply(result, a); // Multiply result by a
        }
        a = bitwiseMultiply(a, a); // Square a
        steps += `Step ${step}: a squared (in binary): ${a.toString(2).padStart(8, '0')}\n`;
        b = b >> 1; // Shift b right by 1
        steps += `Step ${step}: b shifted right (in binary): ${b.toString(2).padStart(8, '0')}\n`;
        step++;
    }

    steps += `Final Exponentiation Result (in binary): ${result.toString(2).padStart(8, '0')}`;
    logStep(steps);
    return result;
}

function tetrate(a, b) {
    logStep(`Starting Tetration: a = ${a}, b = ${b}`);
    if (b === 1) {
        return a;
    }
    let intermediateResult = tetrate(a, b - 1);
    logStep(`Intermediate Result for Tetration: a = ${a}, b = ${b-1}, intermediateResult = ${intermediateResult}`);
    return bitwiseExponentiate(a, intermediateResult);
}

function submitForm() {
    let binInput1 = document.getElementById("binInput1").value;
    let binInput2 = document.getElementById("binInput2").value;

    // Ensure inputs are binary
    let bin1 = parseInt(binInput1, 2);
    let bin2 = parseInt(binInput2, 2);

    // Clear previous output
    document.getElementById('consoleOutput').innerHTML = '';

    logStep(`Initial Inputs: ${binInput1.padStart(8, '0')} | ${binInput2.padStart(8, '0')}`);

    // Perform tetration operation
    let result = tetrate(bin1, bin2);

    // Display the result on the webpage
    logStep(`Final Tetration Result (Decimal): ${result}`);
    logStep(`Final Tetration Result (Binary): ${result.toString(2)}`);
}
