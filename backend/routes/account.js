const express = require("express");
const router = express.Router();
const { Account, User } = require("../model/db");
const { authMiddleware } = require("../middleware/middleware");
const zod = require("zod");
const { default: mongoose } = require("mongoose");

const transferBalanceSchema = zod.object({
    to: zod.string(),
    balance: zod.string(),
});

router.get("/balance", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const account = await Account.findOne({
        userId: userId,
    });
    return res.status(200).json({
        balance: account.balance,
    });
});

router.patch("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    try {
        const {success} = transferBalanceSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({
                message:
                    "Validation error to must be a string & amount must be greater than 0",
            });
        }

        const user = await User.findById(req.body.to);
        if (req.userId === req.body.to) {
            return res.status(400).json({
                message: "You can't send amount to yourself.",
            });
        }

        if (!user) {
            return res.status(400).json({
                message: "Receiver account not found",
            });
        }

        if (user) {
            const senderAccount = await Account.findOneAndUpdate(
                { userId: req.userId },
                {
                    $inc: {
                        balance: -req.body.balance,
                    },
                },
                { new: true }
            ).session(session);

            if (senderAccount.balance < 0) {
                await session.abortTransaction();
                return res.status(400).json({
                    message: "Insufficient balance",
                });
            }

            const receiverAccount = await Account.findOneAndUpdate(
                { userId: req.body.to },
                {
                    $inc: {
                        balance: req.body.balance,
                    },
                },
                { new: true }
            ).session(session);

            await session.commitTransaction();
            console.log("Transaction commited successfully!");

            return res.status(200).json({
                message: "Transfer successful",
            });
        }
    } catch (error) {
        await session.abortTransaction();
        console.log("Transaction aborted due to an error:", error.message);
    } finally {
        session.endSession();
    }
});

module.exports = router;
