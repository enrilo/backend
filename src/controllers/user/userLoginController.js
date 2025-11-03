import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";

// Login controller with validation
export const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 0️⃣ Basic input validation
        if (!email || !password) {
            return errorResponse(res, "Email and password are required", 400);
        }

        // 1️⃣ Validate email format
        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return errorResponse(res, "Invalid email format", 400);
        }

        // 2️⃣ Validate password length
        if (password.length < 6) {
            return errorResponse(res, "Password must be at least 6 characters", 400);
        }

        // 3️⃣ Check if user exists
        const user = await User.findOne({ email }).select("+password"); // password is select:false in schema
        if (!user) {
            return errorResponse(res, "Invalid email or password", 401);
        }

        // 4️⃣ Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return errorResponse(res, "Invalid email or password", 401);
        }

        // 5️⃣ Generate JWT access token
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        };

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h", // adjust as needed
        });

        // 6️⃣ Return success response
        return successResponse(res, "Login successful 🚀", {
            accessToken,
            user: {
                id: user._id,
                full_name: user.full_name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("❌ Login Error:", error.message);
        return errorResponse(res, "Server Error", 500);
    }
};
