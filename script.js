function submitForm() {
    let binInput1 = document.getElementById("binInput1").value;
    let binInput2 = document.getElementById("binInput2").value;
    if (!/^[01]+$/.test(binInput1) || !/^[01]+$/.test(binInput2)) {
        alert("Please enter valid binary numbers.");
        return;
    }
    let bin1 = parseInt(binInput1, 2);
    let bin2 = parseInt(binInput2, 2);
    document.getElementById("consoleOutput").innerHTML = "";
    document.querySelector("h3").style.display = "block";

    logStep(`Initial Inputs (Binary): ${binInput1.padStart(8, "0")} | ${binInput2.padStart(8, "0")}`);
    logStep(`Initial Inputs (Decimal): ${bin1} | ${bin2}`);

    let sum = add(bin1, bin2);
    logStep(`Binary Sum: ${sum.toString(2).padStart(8, "0")}`);
    logStep(`Decimal Sum: ${sum}`);

    let product = multiply(bin1, bin2);
    logStep(`Binary Product: ${product.toString(2).padStart(8, "0")}`);
    logStep(`Decimal Product: ${product} (Number of additions: ${bin2})`);

    let exponentiation = exponentiate(bin1, bin2);
    logStep(`Binary Exponentiation: ${exponentiation.toString(2)}`);
    logStep(`Decimal Exponentiation: ${exponentiation} (Number of multiplications: ${bin2 - 1})`);

    let tetrationResult = tetrate(bin1, bin2);
    logStep(`Tetration Result (Binary): ${tetrationResult.toString(2)}`);
    logStep(`Tetration Result (Decimal): ${tetrationResult}`);
}
function logStep(message) {
    let outputDiv = document.getElementById("consoleOutput");
    outputDiv.innerHTML += message + "\n";
}

function add(a, b) {
    let carry;
    let shifts = [];
    while (b !== 0) {
        carry = (a & b) << 1;
        shifts.push(`Carry shift (Binary): ${carry.toString(2).padStart(8, "0")}`);
        a = a ^ b;
        b = carry;
    }
    shifts.forEach(shift => logStep(shift));
    return a;
}

function multiply(a, b) {
    let result = 0;
    let shiftCount = 0;
    logStep(`Starting Binary Multiplication: ${a.toString(2)} * ${b.toString(2)}`);
    while (b > 0) {
        if (b % 2 === 1) {
            result = add(result, a << shiftCount);
            logStep(`Shifted Add (Binary): ${result.toString(2).padStart(8, "0")} (Shift: ${shiftCount})`);
        }
        b = Math.floor(b / 2);
        shiftCount++;
    }
    return result;
}

function exponentiate(base, exponent) {
    let result = 1;
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = multiply(result, base);
        }
        base = multiply(base, base);
        exponent = Math.floor(exponent / 2);
    }
    return result;
}

function tetrate(base, height) {
    let result = base;
    for (let i = 1; i < height; i++) {
        result = exponentiate(base, result);
    }
    return result;
}
