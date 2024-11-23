const express = require("express");
const User = require("../models/user.model.js");
const {jwtAuthToken, generateToken} = require('../middleware/jwtAuth.middleware.js');
const router = express.Router();

router.get("/getuserdetails",jwtAuthToken, async (req, res) => {
  try {
    const user = await User.find();
    console.log(user);
    return res.status(200).json({ message: "data showned successfully", user });
  } catch (error) {
    return res.status(400).json(error);
  }
});


router.get("/userprofile", jwtAuthToken, async (req,res) =>{
  try {
    const userData = req.user;

  console.log("user Data: ", userData);
  const userId = userData.id;
  const user = await User.findById(userId);

  res.status(200).json({user});
  } catch (error) {
    res.status(500).json({error:"internal server error"});
  } 

})

router.post("/signup", async (req, res) => {
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
    
    const payload = {
       username:user.username,
       id : user.id,
       password:user.password,
    }
     const token = generateToken(payload);
   
  

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "an error  occured", error: error.message });
  }
});


router.post('/login', async (req , res) =>{
  const {username , password}  = req.body;

try {
  const user = await User.findOne({username:username});

  if(!user || !(await user.ComparePassword(password))){
    return res.status(401).json({message:"Invalid username or password"});
  }

  const payload ={
     id :user.id,
     username:user.username,
      }
const token = generateToken(payload);
 
 return res.status(200).json({message:"user logged in successfully", token:token});  
} catch (error) {
  throw error;
}

})

router.get("/:work", async (req, res) => {
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



router.put("/:id",async (req, res) => {
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

router.delete("/deleteuser/:id" ,async (req,res) =>{
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

router.delete("/delete/:email", async (req , res) => {
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
