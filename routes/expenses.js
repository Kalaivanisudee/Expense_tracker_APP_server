const express = require("express");
const Expense = require("../models/Expense.js");

const router = express.Router();

// Get all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new expense
router.post("/", async (req, res) => {
  const { amount, category, date, description } = req.body;
  try {
    const newExpense = new Expense({ amount, category, date, description });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update expense
router.put("/:id", async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete expense
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
