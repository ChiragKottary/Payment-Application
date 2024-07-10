const express = require('express');
const authMiddleware = require('../middlewares');
const { Account} = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get('/balance',authMiddleware,async(req,res)=>{
    const account = await Account.findOne({
        userID: req.userID
    })

    res.json({
        balance: account.balance
    })
});

router.post('/transfer',authMiddleware, async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount , to} = req.body;

    const account = await Account.findOne({userID:req.userID}).session(session);

    if(!amount || account.balance < amount)
    {
        await session.abortTransaction();
        return res.status(400).json({
            message: 'insufficient balance'
        });
    }
    const toAccount = await Account.findOne({userID:to}).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message:'invalid account'
        });
    }

    await Account.updateOne({userID:req.userID}, { $inc:{balance : -amount}}).session(session);
    await Account.updateOne({userID:to},{$inc:{balance: +amount}}).session(session);
    await session.commitTransaction();
    res.json({
        message:"transfer successfull"
    })
})

module.exports = router;