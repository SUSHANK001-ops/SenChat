import express  from 'express'

const router = express.Router()

router.get('/send' , (req,res)=>{
    res.send("This is the message")
})

export default router;