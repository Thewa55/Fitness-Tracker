init();

//this function looks at the location, if the location does not have anything, it will do an API to retrieve the database.
//once the call is done, the API.getLastWorkout() will send the last workout back to the URL as the ID so if the user clicks on last workout it will pull up last workout.
//if there is no last workout, the button is disabled.
async function init() {
  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    if (workout) {
      location.search = "?id=" + workout._id;
    } else {
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
}

