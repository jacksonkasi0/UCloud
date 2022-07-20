import connectDB from "../../../config";
import User from "../../../model/userModule";

connectDB();

export default async (req, res) => {
    try {
        if (req.method === "POST") {
            const { email } = req.body;
            const user = await User.findOne({ email });
            return res.status(200).send(user)
        }
    } catch (error) {
        console.log(error);
    }
};