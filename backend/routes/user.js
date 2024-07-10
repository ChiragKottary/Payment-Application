const express = require('express');
const router = express.Router();
const {User, Account} = require('../db');
const { z } = require('zod');
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../config');
const authMiddleware = require('../middlewares');


    const verify = z.object({
        username : z.string().email(),
        firstname: z.string(),
        lastname : z.string(),
        password : z.string().min(8)
    })
router.post("/signup",async (req,res)=>{
    const {success} = verify.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const ExistUser =await User.findOne({
        username:req.body.username
    })

    if (ExistUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
        
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    });

    const userID = user._id;

    await Account.create({
        userID,
        balance : 1+ Math.random()* 10000
    })

    const token = jwt.sign({
        userID
    },JWT_SECRET);

    res.json({
        message: "userId of newly added user",
        token: token
    })

})

const signinVerify = z.object({
    username : z.string().email(),
    password : z.string()
})

router.post("/signin", async (req,res)=>{
 const {success} = signinVerify.safeParse(req.body);

if (!success) {
    res.status(411).json({
        message: "Error while logging in"
    })
}
const user = await User.findOne({
    username: req.body.username,
    password: req.body.password
})
 if (user) {
    const token = jwt.sign({
        userID: user._id
    },JWT_SECRET);

     res.json({
        token:token
    })
    return;
 }

 res.status(411).json({
    message: "Error while logging in"
 })
})
const UpdateVerify = z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    password: z.string().optional(),
})
router.put('/',authMiddleware,async (req,res)=>{
const {success} = UpdateVerify.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            message: "Error while Updation "
        })
    }

    await User.updateOne({ _id: req.userID }, req.body);

    res.json({
        id : req.userID,
        message: "updated successfully"
    })
})

router.get('/bulk',authMiddleware,async (req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
            $or:[{
                firstname:{"$regex" : filter}
            },{
                lastname:{"$regex" : filter}
            }]
    })

    res.json({
        user : users.map(user =>({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})



module.exports = router;






