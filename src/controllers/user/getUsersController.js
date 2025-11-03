import User from "../../models/User.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";

// GET USERS with search and filters
export const getUsersController = async (req, res) => {
    try {
        const { search, role, branch, page = 1, limit = 10 } = req.query;

        // 🧩 Build filter object dynamically
        const filter = {};

        if (role) filter.role = role;
        if (branch) filter.branch = branch;

        if (search) {
            filter.$or = [
                { full_name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phone_number: { $regex: search, $options: "i" } },
                { company_name: { $regex: search, $options: "i" } },
            ];
        }

        const skip = (page - 1) * limit;

        // 🧠 Fetch data
        const users = await User.find(filter)
            .select("-password") // hide password
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const totalUsers = await User.countDocuments(filter);
        return successResponse(res, "User fetched successfully 🚀", {
            message: "User fetched successfully",
            success: true,
            total: totalUsers,
            currentPage: Number(page),
            totalPages: Math.ceil(totalUsers / limit),
            users,
        });
    } catch (err) {
        console.error("Error fetching users:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
