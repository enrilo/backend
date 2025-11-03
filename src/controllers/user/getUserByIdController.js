import mongoose from "mongoose";
import User from "../../models/User.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";

// GET USER BY ID
export const getUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        // 🧩 Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return errorResponse(res, "Invalid user ID format", 400);
        }

        // 🔍 Find user and exclude password
        const user = await User.findById(id).select("-password");

        if (!user) {
            return errorResponse(res, "User not found", 404);
        }

        return successResponse(res, "User found 🚀", {
            success: true, user
        });
    } catch (err) {
        console.error("Error fetching user:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
