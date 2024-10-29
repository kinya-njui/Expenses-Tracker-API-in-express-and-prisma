import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();

app.use(express.json());

const client = new PrismaClient();

//Create an expense - /expense
app.post("/expenses", async (req, res) => {
  try {
    const { itemTitle, itemQuantity, itemPrice } = req.body;

    const newExpense = await client.expenses.create({
      data: {
        itemTitle,
        itemQuantity,
        itemPrice,
      },
    });
    res.status(201).send({
      message: "Expense created successfully",
      data: newExpense,
    });
  } catch (error) {
    res.status(500).json("Server error!Please try again later.");
  }
});

//Get all expenses - /expenses
app.get("/expenses", async (req, res) => {
  try {
    const allExpenses = await client.expenses.findMany();
    if (allExpenses.length <= 0) {
      res.status(200).json("you don't have any ecpenses yet");
    } else {
      res.status(200).json({
        data: allExpenses,
      });
    }
  } catch (error) {
    res.status(500).json("Server error! Please try again later.");
  }
});

//Get a single expense - /expense/:itemTitle
app.get("/expenses/:itemTitle", async (req, res) => {
  const itemTitle = req.params.itemTitle;
  try {
    const expense = await client.expenses.findFirst({
      where: {
        itemTitle,
      },
    });
    if (!expense) {
      res
        .status(404)
        .json({ message: `Expense with title ${itemTitle} not found` });
    } else {
      res.status(200).json({
        data: expense,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error! Please try again later." });
  }
});

//update an expense - /expense/:itemTitle
app.patch("/expenses/:itemTitle", async (req, res) => {
  const wantedItemTitle = req.params.itemTitle;
  const { itemTitle, itemQuantity, itemPrice } = req.body;
  try {
    const data = {};
    if (itemTitle) data.itemTitle = itemTitle;
    if (itemQuantity) data.itemQuantity = itemQuantity;
    if (itemPrice) data.itemPrice = itemPrice;

    const updatedExpense = await client.expenses.update({
      where: { itemTitle: wantedItemTitle },
      data,
    });

    res
      .status(200)
      .json({ message: "Expense updated successfully", data: updatedExpense });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

//delete an expense - /expense/:itemTitle
app.delete("/expenses/:itemTitle", async (req, res) => {
  const itemTitle = req.params.itemTitle;

  try {
    const deletedExpense = await client.expenses.delete({
      where: {
        itemTitle,
      },
    });
    res.status(200).json({
      message: "Expense deleted successfully",
      data: deletedExpense,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// itemTitle, itemQuantity, itemPrice
