const temperatureInput = document.getElementById("temperature");
const inputUnit = document.getElementById("inputUnit");
const convertBtn = document.getElementById("convertBtn");

const errorMessage = document.getElementById("errorMessage");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");

// Convert temperature
function convertTemperature() {
    const value = temperatureInput.value.trim();
    const unit = inputUnit.value;

    // Check empty input
    if (value === "") {
        showError("Please enter a temperature value.");
        clearResults();
        return;
    }

    // Check numeric input
    if (!isFinite(value)) {
        showError("Please enter a valid numeric temperature.");
        clearResults();
        return;
    }

    const temperature = Number(value);

    // Convert input to Celsius first
    let celsius;

    if (unit === "celsius") {
        celsius = temperature;
    } 
    else if (unit === "fahrenheit") {
        celsius = (temperature - 32) * 5 / 9;
    } 
    else if (unit === "kelvin") {
        celsius = temperature - 273.15;
    }

    // Absolute zero validation
    if (celsius < -273.15) {
        showError(
            "Temperature cannot be below absolute zero (-273.15°C / 0 K)."
        );
        clearResults();
        return;
    }

    // Clear error
    clearError();

    // Convert Celsius to other units
    const fahrenheit = (celsius * 9 / 5) + 32;
    const kelvin = celsius + 273.15;

    // Display results
    celsiusResult.textContent = `${formatNumber(celsius)} °C`;
    fahrenheitResult.textContent = `${formatNumber(fahrenheit)} °F`;
    kelvinResult.textContent = `${formatNumber(kelvin)} K`;
}

// Format numbers
function formatNumber(number) {
    return Number(number.toFixed(2));
}

// Show error
function showError(message) {
    errorMessage.textContent = message;
    temperatureInput.classList.add("invalid");
}

// Clear error
function clearError() {
    errorMessage.textContent = "";
    temperatureInput.classList.remove("invalid");
}

// Clear results
function clearResults() {
    celsiusResult.textContent = "-- °C";
    fahrenheitResult.textContent = "-- °F";
    kelvinResult.textContent = "-- K";
}

// Convert when button is clicked
convertBtn.addEventListener("click", convertTemperature);

// Real-time validation
temperatureInput.addEventListener("input", function () {
    const value = temperatureInput.value.trim();

    if (value === "") {
        clearError();
        return;
    }

    if (!isFinite(value)) {
        showError("Please enter numbers only.");
        return;
    }

    const temperature = Number(value);
    const unit = inputUnit.value;

    let celsius;

    if (unit === "celsius") {
        celsius = temperature;
    } else if (unit === "fahrenheit") {
        celsius = (temperature - 32) * 5 / 9;
    } else {
        celsius = temperature - 273.15;
    }

    if (celsius < -273.15) {
        showError(
            "Temperature cannot be below absolute zero (-273.15°C / 0 K)."
        );
    } else {
        clearError();
    }
});

// Revalidate when unit changes
inputUnit.addEventListener("change", function () {
    if (temperatureInput.value.trim() !== "") {
        convertTemperature();
    }
});