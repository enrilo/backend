import User from "../../models/User.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";

// UPDATE USER BY ID (Partial Update)
export const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // 🧩 Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return errorResponse(res, "Invalid user ID format", 400);
        }

        // 🧠 Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return errorResponse(res, "User not found", 404);
        }

        // 🔐 Hash password if provided
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        // 🧾 Update user fields
        const updatedUser = await User.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
            select: "-password", // hide password from response
        });

        return successResponse(res, "User updated successfully 🚀", {
            success: true,
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (err) {
        console.error("Error updating user:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
