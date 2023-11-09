import mongoose from 'mongoose';

export const connectDatabase=() => {
    mongoose.connect(process.env.DB_URL || "mongodb://127.0.0.1:27017/test")
        .then((data) => console.log(`database is running on ${data.connection.host}`))
        .catch((err) => console.log(err.name, "stopped database server"))
}