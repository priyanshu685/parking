const Wallet = require('../models/walletModel');
const User = require('../models/userModel'); // Import the User model

// Get wallet details by email
const getWallet = async (req, res) => {
    const { email } = req.body; // Get email from request body
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User  not found" });
        }

        // Find the wallet using the user's email
        const wallet = await Wallet.findOne({ userEmail: email });
        if (!wallet) {
            return res.status(404).json({ message: "Wallet not found" });
        }
        res.status(200).json(wallet);
    } catch (error) {
        console.error("Error fetching wallet:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Add money to wallet by email
const addMoney = async (req, res) => {
    const { email, amount } = req.body; // Get email and amount from request body

    // Validate input
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: "Invalid email" });
    }
    if (amount === undefined || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User  not found" });
        }

        // Update or create the wallet using the user's email
        const wallet = await Wallet.findOneAndUpdate(
            { userEmail: email },
            { $inc: { balance: amount } },
            { new: true, upsert: true, setDefaultsOnInsert: true } // Create wallet if it doesn't exist
        );

        // If the wallet was created, ensure the balance is initialized
        if (!wallet.balance) {
            wallet.balance = amount; // Set the initial balance if it was just created
        }

        res.status(200).json({ message: "Money added successfully", new_balance: wallet.balance });
    } catch (error) {
        console.error("Error adding money to wallet:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Deduct money from wallet by email
const deductMoney = async (req, res) => {
    const { email, amount } = req.body;

    try {
        // Find the user's wallet
        const wallet = await Wallet.findOne({ userEmail: email });
        if (!wallet) {
            return { status: 404, data: { message: "Wallet not found" } }; // Return an object
        }

        // Check if the wallet has sufficient balance
        if (wallet.balance < amount) {
            return { status: 400, data: { message: "Insufficient balance" } }; // Return an object
        }

        // Deduct the amount
        wallet.balance -= amount;
        await wallet.save();

        return { status: 200, data: { message: "Amount deducted successfully", newBalance: wallet.balance } }; // Return an object
    } catch (error) {
        console.error("Error deducting money:", error);
        return { status: 500, data: { message: "Error deducting money", error: error.message } }; // Return an object
    }
};

module.exports = {
    getWallet,
    addMoney,
    deductMoney,
};