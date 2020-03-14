const router = require("express").Router();
const Workout = require("../models/workout.js")

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then(dbWOrkout =>{
      res.json(dbWOrkout)
    })
    .catch( err => {
      res.status(400).json(err)
    })
})


module.exports = router;