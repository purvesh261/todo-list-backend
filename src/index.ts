import dotenv from 'dotenv';
import app from './app.js';
import { connectToDatabase } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

connectToDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});
