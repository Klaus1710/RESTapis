const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser")

const app = express();
const port = 4000;

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(express.json());

var url ="mongodb://localhost:27017/tempDB";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}

mongoose.connect(url, options,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("connected to DB successfully");
  })
  .catch(err => {
    console.log("Error:", err.message);
});


const employee = mongoose.Schema({
    Name: String,
    Age : Number,
    Salary :Number,
})

const Employee = mongoose.model("employee", employee);

app.post("/api/v1/employee/new", async(req, res)=>
{
    const e = await Employee.create(req.body)
    res.status(201).json({
        success: true,
        e
    })
})

app.get("/api/v1/employee/read", async(req, res)=>
{
  const salary = await Employee.findbyId(req.params.findbyId) 
  res.status(200).json({
    success:true,
    salary
  })
})



app.listen(port, ()=>{
    console.log(`Server running on ${port}`);
})