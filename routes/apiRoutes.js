// const router = require("express").Router();
// const Workout = require("../models/workout.js")

// router.get("/api/workouts", (req, res) => {
//   Workout.find()
//     .then(dbWorkout =>{
//       res.json(dbWorkout);
//     })
//     .catch( err => {
//       res.status(400).json(err);
//     });
// });

// router.get("/api/workouts/range", (req,res) => {
//   Workout.find({})
//     .limit(7)
//     .then(dbWorkout => {
//       res.json(dbWorkout);  
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

// router.post("/api/workouts/:id", ({body}, res)=>{
//   Workout.insertMany([
//     {id: body.id, exercises: body}
//     ])
//     .then(dbWorkout =>{
//       res.json(dbWorkout);
//     })
//     .catch(err =>{
//       res.status(400).json(err);
//     });
// });

// router.post("/api/workouts", ({body}, res)=>{
//   Workout.create(body)
//     .then(dbWorkout =>{
//       res.json(dbWorkout);
//     })
//     .catch(err =>{
//       res.status(400).json(err);
//     });
// });

// module.exports = router;

const db = require("../models")

module.exports = function(app){
  app.get("/api/workouts", function(req, res) {
    db.Workout.find({}).then(dbWorkout => {
      res.json(dbWorkout);
    });
  });
 
  app.get("/api/workouts/range", function (req,res) {
    db.Workout.find({}).limit(7).then(function(dbWorkout){
      res.json(dbWorkout);
    });
  });

  app.put("/api/workouts/:id", function(req,res){
    db.Workout.updateOne({_id: req.params.id}, {exercises: req.body}).then(function (dbWorkout){
      res.json(dbWorkout);
    });
  });

  app.post("/api/workouts", function (req, res){
    db.Workout.insertOne().then(function(dbWorkout) {
      res.json(dbWorkout)
    })
  })
}