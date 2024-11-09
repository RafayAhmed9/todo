const express =require("express");
const todo=require("../model/Todo");
const router=express.Router();
const {body, validationResult}=require("express-validator");

// Middleware for error handling
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// create todo post
router.post("/createtodo",[
    body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),
body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
body("iscomplete")
    .optional()
    .isBoolean()
    .withMessage("isComplete must be a boolean")
],validateRequest, async (req, res)=>{
    try{
        const {title,description,iscomplete}=req.body;
        const newTodo = new todo({
            title,
            description,
            iscomplete,           
          });
    
          const savedTodo = await newTodo.save();
          res.status(201).json(savedTodo);
    }

    catch(error){
        res.status(500).json({error:error.message});
    }
});

// get all todo

router.get("/getall",async (req, res)=>{
    try{
        const todo_id=await todo.find();
        if(!todo_id){
            return res.status(404).json({error:"Todos not found!..."});
        }

        res.status(200).json(todo_id);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

// get single id search

router.get("/:id",async (req,res)=>{
    try{
        const{id}=req.params;
        const id_find= await todo.findOne({_id: id});

        if(!id_find){
            return res.status(500).json({error:"Todo not found!..."});
        }
        res.status(200).json(id_find);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

// update todo

router.put("/:id",[  
    body("title")
        .notEmpty()
        .withMessage("Title is required"),
    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),
    body("iscomplete")
        .isBoolean()
        .withMessage("isComplete must be a boolean")
],validateRequest,async (req,res)=>{
       
        try{
            const {id}=req.params;
            const{title,description,iscomplete}=req.body;
            const updatetodo=await todo.findByIdAndUpdate(
                {_id:id},
                {title,description,iscomplete},
                {new:true}
            );

            if(!updatetodo){
                return res.status(404).json({error:"Todo not found!...."});
            }
            return res.status(200).json(updatetodo);

        }
        catch(error){
            res.status(500).json({error:error.message});
        }
});

//delete 

router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedtodo = await todo.findByIdAndDelete({ _id: id });
  
      if (!deletedtodo) {
        return res.status(404).json({ error: "Todo not found...." });
      }
      return res.status(200).json({ success: "Todo deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;


