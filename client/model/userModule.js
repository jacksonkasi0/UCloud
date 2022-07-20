import mongoose, { Schema } from 'mongoose';
import validator from "validator";

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, ""]
    },
    image: {
        type: String,
    },
    emailVerified: {
        type: Object
    },
})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;


