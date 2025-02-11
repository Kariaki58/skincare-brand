import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
                message: (props) => `${props.value} is not a valid email!`
            },
            index: true
        },
        password: {
            type: String,
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        googleId: {
            type: String,
            unique: true
        },
        avatar: String,
        isTeam: {
            type: Boolean,
            default: false
        },
        title: {
            type: String
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        },
        provider: {
            type: String,
            enum: ['google', 'email'],
        },
        token: {
            type: String,
            index: true
        },
        expires: {
            type: Date,
            index: true
        }
    }, 
    {
    timestamps: true,
});

UserSchema.index({ email: 1, googleId: 1 });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;