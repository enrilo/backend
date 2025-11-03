import SuperAdmin from "../../models/SuperAdmin.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";

// 🧩 GET SUPER ADMINS with search and filters
export const getSuperAdminsController = async (req, res) => {
    try {
        const { search, country, state, city, page = 1, limit = 10 } = req.query;

        // 🧠 Build dynamic filter
        const filter = { role: "super_admin" };

        if (country) filter.country = country;
        if (state) filter.state = state;
        if (city) filter.city = city;

        if (search) {
            filter.$or = [
                { full_name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { company_email: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
                { position: { $regex: search, $options: "i" } },
            ];
        }

        const skip = (page - 1) * limit;

        // 🧩 Fetch data
        const superAdmins = await SuperAdmin.find(filter)
            .select("-password") // hide password if exists
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const totalSuperAdmins = await SuperAdmin.countDocuments(filter);

        return successResponse(res, "Super admins fetched successfully 🚀", {
            message: "Super admins fetched successfully",
            success: true,
            total: totalSuperAdmins,
            currentPage: Number(page),
            totalPages: Math.ceil(totalSuperAdmins / limit),
            superAdmins,
        });
    } catch (err) {
        console.error("❌ Error fetching super admins:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
