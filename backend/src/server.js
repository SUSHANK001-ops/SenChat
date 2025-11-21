import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import messageRoute from './routes/message.routes.js'
dotenv.config()
const PORT = process.env.PORT || 4000
const app = express();

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoute)

app.listen(PORT ,()=>{
    console.log(`Server is running at port ${PORT}...`)
})