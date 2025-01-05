// backend/routes/user.js
const express = require("express");
const zod = require("zod");
const router = express.Router();
const { User, Account } = require("../model/db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");
const { authMiddleware } = require("../middleware/middleware");

const signupSchema = zod.object({
    username: zod.string(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string(),
});

const siginSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
});

const updateSchema = zod.object({
    username: zod.string(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    password: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
    const z = signupSchema.safeParse(req.body);

    if (!z.success) {
        return res.status(411).json({
            message: "incorrect inputs",
        });
    }

    const user = await User.findOne({
        username: req.body.username,
    });

    if (!user) {
        const dbUser = await User.create(req.body);
        // give random balance to user between 1 to 10000
        const account = await Account.create({
            userId: dbUser._id,
            balance: Math.floor(Math.random()*1000 +1)
        })
        
        const token = jwt.sign(
            {
                userId: dbUser._id,
            },
            JWT_SECRET
        );

        return res.status(200).json({
            message: "user created successfully",
            token: token,
        });
    }

    return res.status(411).json({
        message: "this username already exist",
    });
});

router.post("/signin", async (req, res) => {
    const { success } = siginSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "incorrect inputs",
        });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    });
    if (user) {
        const result = jwt.sign(
            {
                userId: user._id,
            },
            JWT_SECRET
        );

        return res.status(200).json({
            token: result,
        });
    }
    return res.status(411).json({
        message: "Error while logging",
    });
});

router.patch("/update", authMiddleware, async (req, res) => {
    const { success } = updateSchema.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Error while updating information",
        });
    }

    const user = await User.updateOne(
        {
            _id: req.userId,
        },
        req.body
    );

    return res.status(200).json({
        message: "Updated successfully",
    });
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [
            {
                firstname: {
                    $regex: filter,
                    $options: "i",
                },
            },
            {
                lastname: {
                    $regex: filter,
                    $options: "i",
                },
            },
        ],
    });

    return res.status(200).json({
        users: users.map((user) => ({
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            userId: user._id,
        })),
    });
});

module.exports = router;
