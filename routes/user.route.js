const express = require("express");
const User = require("../models/user.model.js");
const router = express.Router();
const passport = require('../middleware/Auth.middleware.js');
const localAuthMiddleware = passport.authenticate('local', {session:false});


router.get("/getuserdetails",localAuthMiddleware, async (req, res) => {
  try {
    const user = await User.find();
    console.log(user);
    return res.status(200).json({ message: "data showned successfully", user });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/postuserdetails", async (req, res) => {
  const { name, age, email, mobile, work, address, salary ,password, username } = req.body;

  try {
    const user = await User.create({
      name,
      age,
      password,
      username,
      email,
      mobile,
      work,
      address,
      salary,
    });
    console.log(user);

    res.status(200).json({ message: "user created successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "an error  occured", error: error.message });
  }
});

router.get("/:work", localAuthMiddleware , async (req, res) => {
  const workType = req.params.work;

  try {
    if (
      workType == "waiter" ||
      workType == "manager" ||
      workType == "owner" ||
      workType == "chef"
    ) {
      const response = await User.find({ work: workType });

      return res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid worktype" });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
});

router.put("/:id", localAuthMiddleware,async (req, res) => {
  const person_id = req.params.id;
  const updatedData = req.body;

  try {
    const response = await User.findByIdAndUpdate(person_id, updatedData);
 
     if(!response)   return res.status(404).json({message:"user not found"});
    console.log(response);

    return res
      .status(200)
      .json({ message: "data updated successfully", response });
  } catch (error) {
    console.log(error)
    return res.status(500).send("internal server error");
  }
});

router.delete("/deleteuser/:id" ,localAuthMiddleware,async (req,res) =>{
  const userID  = req.params.id;

  try {
    const response = await  User.findByIdAndDelete(userID);
  if(!response)  res.status(404).json({
    message:"user not found"});
    console.log(response);

    return res.status(200).json({message:"user deleted successfully"});

  } catch (error) {
    return res.status(500).json({error:"internal server error"});
  }

});

router.delete("/delete/:email",localAuthMiddleware, async (req , res) => {
  const deletedUser=  req.params.email;

  try {
    const response = await User.findOneAndDelete(deletedUser);
    
    if(!response)  res.status(404).json({message:"user not found"});
    console.log(response);
   
    return res.status(200).json({message:"user deleted successfully"});

  } catch (error) {
    return res.status(500).json({error:"internal server error"});
  }
})

module.exports = router;
