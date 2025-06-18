import { response } from "express";
import foodModel from "../models/foodModel.js";
import fs from 'fs'


//add food item

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`

    const food = new foodModel({

        name: req.body.name,
        description:req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename



    })


    try {
        await food.save()
        res.json({success:true, message: "Food Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error"})
        
    }

}



//all food list
const listFood = async (req, res)=> {
    try {
        const foods = await foodModel.find({})
        res.json({success:true, data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }   
}





//remove food item
const removeFood = async (req, res)=>{
    try {
        const food = await foodModel.findById(req.body._id)
        fs.unlink(`uploads/${food.image}`, ()=>{})
        await foodModel.findByIdAndDelete(req.body._id)
        res.json({success:true, message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }
}





export {addFood, listFood, removeFood}















// import foodModel from "../models/foodModel.js";
// import fs from 'fs';

// const addFood = async (req, res) => {
//     try {
//         // Check if image file was uploaded
//         if (!req.file) {
//             return res.status(400).json({ success: false, message: "Image file is required" });
//         }

//         const image_filename = req.file.filename;

//         const { name, description, price, category } = req.body;

//         // Basic input validation
//         if (!name || !description || !price || !category) {
//             return res.status(400).json({ success: false, message: "All fields are required" });
//         }

//         const food = new foodModel({
//             name,
//             description,
//             price,
//             category,
//             image: image_filename
//         });

//         await food.save();

//         return res.status(201).json({ success: true, message: "Food Added", data: food });
//     } catch (error) {
//         console.error("AddFood Error:", error.message);
//         return res.status(500).json({ success: false, message: "Server Error" });
//     }
// };

// export { addFood };
