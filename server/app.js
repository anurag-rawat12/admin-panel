import express from 'express';
import { PORT } from './config/env.js';
import connectDB from './database/database.js';
import adminRouter from './route/admin.route.js';
import authRouter from './route/user.route.js';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/auth", authRouter)

app.use("/", (req, res) => {
    res.send("Welcome to the API")
})

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectDB();
});