import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }
        const option = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        await mongoose.connect(process.env.MONGODB_URI, option).then((con) => {
            console.log(`MongoDB Connect and run in thr PORT: ${con.connection.host}`);
        })
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;