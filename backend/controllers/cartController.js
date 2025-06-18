import userModel from '../models/userModel.js';

// ✅ Add items to user cart
const addToCart = async (req, res) => {
    console.log("Incoming AddToCart Request:", req.body);
    try {
        const userData = await userModel.findById(req.userId); // ✅ use req.userId
        const cartData = userData.cartData || {};

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData }); // ✅ use req.userId
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log("AddToCart Error:", error);
        res.json({ success: false, message: "Error" });
    }
};

// ✅ Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId); // ✅
        const cartData = userData.cartData || {};

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData }); // ✅
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.log("RemoveFromCart Error:", error);
        res.json({ success: false, message: "Error" });
    }
};

// ✅ Fetch user cart data
const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId); // ✅
        const cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.log("GetCart Error:", error);
        res.json({ success: false, message: "Error" });
    }
};

export { addToCart, removeFromCart, getCart };
