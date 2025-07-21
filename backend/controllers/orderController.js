import Razorpay from "razorpay";
import crypto from "crypto";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { log } from "console";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

const frontend_url = "https://foodifast-frontend.onrender.com";

// Place Order - Razorpay version
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // 1. Save Order in DB first
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            payment: false,
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // 2. Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: amount * 100, // INR in paise
            currency: "INR",
            receipt: `receipt_${newOrder._id}`,
        });

        // 3. Send orderId and key_id to frontend
        res.json({
            success: true,
            orderId: razorpayOrder.id,
            razorpayKeyId: process.env.RAZORPAY_KEY_ID,
            amount: razorpayOrder.amount,
            orderDbId: newOrder._id,
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Order creation failed" });
    }
};

// Verify Order after payment
const verifyOrder = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    try {
        // Generate HMAC to verify signature
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generatedSignature === razorpay_signature) {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment verified" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in verifying payment" });
    }
};




// Get user orders
const userOrders = async (req, res) => {
    try {
      const orders = await orderModel.find({ userId: req.userId }); // 🔧 use req.userId instead of req.query.userId
      res.json({ success: true, data: orders });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error fetching orders" });
    }
  };
  






///listting orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success: true, data: orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: "Error"})
    }
}









//update the status of order
const updateStatus = async (req, res) =>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status})
        res.json({success: true, message: "Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
        
    }
}




export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus};
