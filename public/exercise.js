const workoutTypeSelect = document.querySelector("#type");
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector(".resistance-form");
const cardioNameInput = document.querySelector("#cardio-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const resistanceDurationInput = document.querySelector("#resistance-duration");
const distanceInput = document.querySelector("#distance");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const toast = document.querySelector("#toast");
const newWorkout = document.querySelector(".new-workout")

let workoutType = null;
let shouldNavigateAway = false;


//initExercise is the start up function, if the html of the browser is undefined, create a new workout using API.createWorkout(). Otherwise it will take the created workout.
async function initExercise() {
  let workout;

  if (location.search.split("=")[1] === undefined) {
    workout = await API.createWorkout()
    console.log(workout)
  }
  if (workout) {
    location.search = "?id=" + workout._id;
  }

}

initExercise();

//this handles the type of form that shows up when you select cardio or resistance and calls he function validateInputs()
//this function runs when the if(workoutTypeSelect) is activated by switch of the select.
function handleWorkoutTypeChange(event) {
  workoutType = event.target.value;

  if (workoutType === "cardio") {
    cardioForm.classList.remove("d-none");
    resistanceForm.classList.add("d-none");
  } else if (workoutType === "resistance") {
    resistanceForm.classList.remove("d-none");
    cardioForm.classList.add("d-none");
  } else {
    cardioForm.classList.add("d-none");
    resistanceForm.classList.add("d-none");
  }

  validateInputs();
}

//this function will validate if the inputs of the fields have something in them or not. If there is nothing in the fields the submit button is disabled.
function validateInputs() {
  let isValid = true;

  if (workoutType === "resistance") {
    if (nameInput.value.trim() === "") {
      isValid = false;
    }

    if (weightInput.value.trim() === "") {
      isValid = false;
    }

    if (setsInput.value.trim() === "") {
      isValid = false;
    }

    if (repsInput.value.trim() === "") {
      isValid = false;
    }

    if (resistanceDurationInput.value.trim() === "") {
      isValid = false;
    }
  } else if (workoutType === "cardio") {
    if (cardioNameInput.value.trim() === "") {
      isValid = false;
    }

    if (durationInput.value.trim() === "") {
      isValid = false;
    }

    if (distanceInput.value.trim() === "") {
      isValid = false;
    }
  }

  if (isValid) {
    completeButton.removeAttribute("disabled");
    addButton.removeAttribute("disabled");
  } else {
    completeButton.setAttribute("disabled", true);
    addButton.setAttribute("disabled", true);
  }
}

//this function runs when the add button is clicked. It takes the value of each input and inserts it into workoutData json as a key:value pair 
//it then runs an API.addExercise(workoutData) to update the schema with the user input then it clears the inputs
async function handleFormSubmit(event) {
  event.preventDefault();

  let workoutData = {};

  if (workoutType === "cardio") {
    workoutData.type = "cardio";
    workoutData.name = cardioNameInput.value.trim();
    workoutData.distance = Number(distanceInput.value.trim());
    workoutData.duration = Number(durationInput.value.trim());
  } else if (workoutType === "resistance") {
    workoutData.type = "resistance";
    workoutData.name = nameInput.value.trim();
    workoutData.weight = Number(weightInput.value.trim());
    workoutData.sets = Number(setsInput.value.trim());
    workoutData.reps = Number(repsInput.value.trim());
    workoutData.duration = Number(resistanceDurationInput.value.trim());
  }

  await API.addExercise(workoutData);
  clearInputs();
  toast.classList.add("success");
}


function handleToastAnimationEnd() {
  toast.removeAttribute("class");
  if (shouldNavigateAway) {
    location.href = "/";
  }
}

function clearInputs() {
  cardioNameInput.value = "";
  nameInput.value = "";
  setsInput.value = "";
  distanceInput.value = "";
  durationInput.value = "";
  repsInput.value = "";
  resistanceDurationInput.value = "";
  weightInput.value = "";
}

//this activates when the "User" changes between the options in the select bar
if (workoutTypeSelect) {
  workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
}

//if the completeButton isn't disabled, and on click the form will get submitted to get updated. Afterwards the user will get routed to the main page
if (completeButton) {
  completeButton.addEventListener("click", function (event) {
    shouldNavigateAway = true;
    handleFormSubmit(event);
  });
}
//if the addButton isn't disabled,
if (addButton) {
  addButton.addEventListener("click", handleFormSubmit);
}
toast.addEventListener("animationend", handleToastAnimationEnd);

document
  .querySelectorAll("input")
  .forEach(element => element.addEventListener("input", validateInputs));
