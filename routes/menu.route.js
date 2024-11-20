const express = require('express');
const Menu = require('../models/menu.model.js');
const router = express.Router();

router.post('/postorderitem',async (req ,res) =>{
    const {name , price ,taste , is_drink , ingredients , sales} = req.body;

   
    try {
        const response = await Menu.create({
            name , price ,taste , is_drink , ingredients , sales
        });
         
        return res.status(200).json({message:"item ordered successfully", response});
    } catch (error) {
        console.log(error.message);
        return  res.status(400).json({message:'something went wrong',error:error.message});
    }
})

router.get('/getorderitem',async (req,res) => {
    const item = await Menu.find();

try {
    console.log(item);

    return res.status(200).json({message:"items fetched successfully",item});

} catch (error) {   
    return res.status(400).json({message:"something went wrong",error});
}
})


router.put('/:menu_id',async (req,res) =>{
    const menu_id = req.params.menu_id;
    const updatedData = req.body;
    
    try {
        const response = await Menu.findByIdAndUpdate(menu_id , updatedData);
     
        if(!response)  res.status(404).json({message: "item not found"});

        console.log(response);

        return res.status(200).json({message:"item updated successfully"});

    } catch (error) {
        return res.status(500).json({error:"internal server error"});
    }
})




module.exports = router;