function submitForm() {
    let binInput1 = document.getElementById("binInput1").value;
    let binInput2 = document.getElementById("binInput2").value;

    if (!/^[01]+$/.test(binInput1) || !/^[01]+$/.test(binInput2)) {
        alert("Please enter valid binary numbers.");
        return;
    }

    let bin1 = BigInt(`0b${binInput1}`);
    let bin2 = BigInt(`0b${binInput2}`);

    document.getElementById("consoleOutput").innerHTML = "";
    document.querySelector("h3").style.display = "block";

    logStep(`Initial Inputs (Binary): ${binInput1.padStart(8, "0")} | ${binInput2.padStart(8, "0")}`);
    logStep(`Initial Inputs (Decimal): ${bin1} | ${bin2}`);

    let sum = add(bin1, bin2);
    logStep(`Binary Sum: ${formatBinary(sum.toString(2))}`);
    logStep(`Decimal Sum: ${sum}`);

    let product = multiply(bin1, bin2);
    logStep(`Binary Product: ${formatBinary(product.toString(2))}`);
    logStep(`Decimal Product: ${product} (Number of additions: ${bin2})`);

    let exponentiation = exponentiate(bin1, bin2);
    logStep(`Binary Exponentiation: ${formatBinary(exponentiation.toString(2))}`);
    logStep(`Decimal Exponentiation: ${exponentiation} (Number of multiplications: ${bin2})`);

    let tetrationResult = tetrate(bin1, bin2, 4n); // Limit max depth to 4
    if (tetrationResult === -1n) {
        logStep("Tetration Result: Exceeded computational limits.");
    } else {
        logStep(`Tetration Result (Binary): ${formatBinary(tetrationResult.toString(2))}`);
        logStep(`Tetration Result (Decimal): ${tetrationResult}`);
    }
}

function logStep(message) {
    document.getElementById("consoleOutput").innerHTML += message + "\n";
}

function formatBinary(binary) {
    // Split binary into groups of 8 for readability
    return binary.match(/.{1,8}/g).join(" ");
}

function add(a, b) {
    let carry;
    while (b !== 0n) {
        carry = (a & b) << 1n;
        a = a ^ b;
        b = carry;
    }
    return a;
}

function multiply(a, b) {
    let result = 0n;
    while (b > 0n) {
        if (b % 2n === 1n) {
            result = add(result, a);
        }
        a <<= 1n;
        b >>= 1n;
    }
    return result;
}

function exponentiate(base, exp) {
    if (exp === 0n) return 1n;
    let result = 1n;
    while (exp > 0n) {
        if (exp % 2n === 1n) {
            result = multiply(result, base);
        }
        base = multiply(base, base);
        exp >>= 1n;
    }
    return result;
}

function tetrate(base, height, maxDepth = 4n) {
    if (height === 0n) return 1n; // Handle edge case for height 0
    if (height === 1n) return base; // Base case
    if (height > maxDepth) {
        logStep("Tetration depth exceeded. Limiting calculations.");
        return -1n; // Indicate overflow
    }
    let result = base;
    for (let i = 1n; i < height; i++) {
        result = exponentiate(base, result);
        if (result.toString(2).length > 1024) {
            logStep("Result exceeds manageable size. Stopping.");
            return -1n; // Indicate overflow
        }
    }
    return result;
}

