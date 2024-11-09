const express=require("express");
const mongoose=require("mongoose");
const todo=require("./routes/todoroutes");


const app= express();

app.use(express.json());

localURL="mongodb://localhost:27017/todoappbackend";

mongoose.connect(localURL).then(()=>{
    console.log("Database is connected!");
}).catch((err)=>{
    console.log("Some error occured",err);
});

app.get("/ap", (req, res)=>{
    res.send("working");
})

app.use("/post",todo);


app.listen(300,()=>{
    console.log("Server is running on 300!");
})

