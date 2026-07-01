const bmiForm = document.getElementById("bmiForm");
const resultCard = document.getElementById("resultCard");

const resultBadge = document.getElementById("resultBadge");
const resultName = document.getElementById("resultName");
const bmiValue = document.getElementById("bmiValue");
const resultCategory = document.getElementById("resultCategory");
const recommendation = document.getElementById("recommendation");

const historyContainer = document.getElementById("historyContainer");

const submissions = [];


/* FORM SUBMISSION */

bmiForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const sex = document.getElementById("sex").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const heightCm = parseFloat(document.getElementById("height").value);



    /* LOOP REQUIREMENT */

    const fields = [
        name,
        sex
    ];

    let hasEmptyField = false;

    fields.forEach(field => {

        if (
            field === "" ||
            field === null ||
            field === undefined
        ) {
            hasEmptyField = true;
        }

    });



    /* IF ELSE REQUIREMENT */

    if (
        hasEmptyField ||
        isNaN(age) ||
        isNaN(weight) ||
        isNaN(heightCm)
    ) {

        alert("Please complete all fields.");

        return;

    }
    else if (age < 1 || age > 120) {

        alert("Please enter a valid age between 1 and 120.");

        return;

    }
    else if (weight <= 0) {

        alert("Weight must be greater than 0.");

        return;

    }
    else if (heightCm <= 0) {

        alert("Height must be greater than 0.");

        return;

    }



    /* BMI CALCULATION */

    const heightM = heightCm / 100;

    const bmi = +(weight / (heightM * heightM)).toFixed(1);



    let category;
    let message;
    let colorClass;



    /* SWITCH CASE REQUIREMENT */

    switch (true) {

        case bmi < 18.5:

            category = "Underweight";

            message =
                "Your BMI is below the recommended range. Consider maintaining a balanced and nutritious diet.";

            colorClass = "underweight";

            break;



        case bmi < 25:

            category = "Normal";

            message =
                "Excellent! Your BMI is within the healthy range. Continue your healthy lifestyle and habits.";

            colorClass = "normal";

            break;



        case bmi < 30:

            category = "Overweight";

            message =
                "Your BMI is above the recommended range. Consider regular exercise and healthier food choices.";

            colorClass = "overweight";

            break;



        default:

            category = "Obese";

            message =
                "Your BMI indicates obesity. We recommend consulting a healthcare professional for guidance.";

            colorClass = "obese";

    }



    displayResult(
        name,
        bmi,
        category,
        message,
        colorClass
    );



    const record = {

        name,
        age,
        sex,
        weight,
        heightCm,
        bmi,
        category

    };



    submissions.unshift(record);

    updateHistory();



    recordSubmission(record);

});



/* DISPLAY RESULT */

function displayResult(
    name,
    bmi,
    category,
    message,
    colorClass
) {

    resultCard.classList.remove("hidden");



    resultBadge.className = "result-badge";

    resultBadge.classList.add(colorClass);



    resultBadge.textContent = category;

    resultName.textContent = name;

    bmiValue.textContent = bmi;

    resultCategory.textContent = category;

    recommendation.textContent = message;



    resultCard.scrollIntoView({
        behavior: "smooth"
    });

}



/* HISTORY SECTION */

function updateHistory() {

    historyContainer.innerHTML = "";



    if (submissions.length === 0) {

        historyContainer.innerHTML =
            '<p class="empty-history">No assessments yet.</p>';

        return;

    }



    submissions.forEach(record => {

        const item = document.createElement("div");

        item.classList.add("history-item");



        item.innerHTML = `
            <div>
                <div class="history-name">${record.name}</div>
                <small>
                    Age: ${record.age} |
                    BMI: ${record.bmi}
                </small>
            </div>

            <div class="history-category">
                ${record.category}
            </div>
        `;



        historyContainer.appendChild(item);

    });

}



/* GOOGLE APPS SCRIPT */

function recordSubmission(record) {

    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw4qrqyACODlAbUOFMjvoLSZpzr40x5UL3Vw1YRzwzIB3SKDrIElL9f8c7ZMbUZ5LwZRw/exec";

    fetch(WEB_APP_URL, {

        method: "POST",

        mode: "no-cors",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(record)

    })
    .then(() => {

        console.log("Submission sent.");

    })
    .catch(error => {

        console.error(
            "Could not record submission:",
            error
        );

    });

}