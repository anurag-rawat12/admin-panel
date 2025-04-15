import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'player', "organizer"],
        default: 'user',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, { 
    timestamps: true 
});

userSchema.pre('save', function (next) {
    if (this.role === 'admin') {
        this.deletedAt = undefined;
        this.isDeleted = false;
    }
    next();
});
const User = mongoose.model('User', userSchema);
export default User;