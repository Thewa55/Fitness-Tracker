const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("dev"))
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json);

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});


app.listen(PORT, ()=>{
  console.log(`App is running on ${PORT}`)
})