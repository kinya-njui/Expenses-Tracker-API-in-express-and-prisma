// import{} from '@prisma/client';
// const client = new PrismaClient();
// constasync(req, res) => {
//     try {
//       const { itemTitle, itemQuantity, itemPrice } = req.body;

//       const newExpense = await client.expenses.create({
//         data: {
//           itemTitle,
//           itemQuantity,
//           itemPrice
//         },
//       });
//       res.status(201).send({
//         message: "Expense created successfully",
//         data: newExpense,
//       });
//     } catch (error) {
//       res.status(500).json("Server error!Please try again later."
//       );
//     }
//   });
