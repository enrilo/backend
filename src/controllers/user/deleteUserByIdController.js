
import User from "../../models/User.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";

// DELETE USER BY ID
export const deleteUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        // 🧩 Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return errorResponse(res, "Invalid user ID format", 400);
        }

        // 🔍 Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return errorResponse(res, "User not found", 404);
        }

        // 🗑️ Delete user
        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            deletedUserId: id,
        });
        return successResponse(res, "User deleted successfully 🚀", {
            success: true,
            deletedUserId: id
        });
    } catch (err) {
        console.error("Error deleting user:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
