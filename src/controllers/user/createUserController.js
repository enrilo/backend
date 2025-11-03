import bcrypt from "bcrypt";
import User from "../../models/User.js";
import { successResponse, errorResponse } from "../../utils/ApiResponse.js";
import Joi from "joi";

// ✅ Joi Validation Schema
const userSchema = Joi.object({
    full_name: Joi.string().min(3).required(),
    company_email: Joi.string().email().required(),    // user's company alloted email id (personal if no company email id exists)
    password: Joi.string().min(6).required(),
    country_code: Joi.string().required(),
    phone_number: Joi.number().min(7).max(15).required(),
    photo: Joi.string().allow(""),
    position: Joi.string().allow(""),           // ceo/hr/etc
    home_address: Joi.string().allow(""),
    date_of_birth: Joi.date().required(),
    gender: Joi.string().valid("Male", "Female", "Other").required(),
     emergency_contact: Joi.object({
        name: Joi.string().required(),
        relation: Joi.string().required(),
        country_code: Joi.string().required(),
        phone_number: Joi.string().required(),
    }).required(),
    role: Joi.string().required(),  // user/admin
    company_name: Joi.string().allow(""),
    company_address: Joi.string().allow(""),
    branch: Joi.string().allow(""),
   
    documents: Joi.object({
        aadhar_card_photo_url: Joi.string().required(),
        aadhar_card: Joi.number().required(),
        pan_card_photo_url: Joi.string().required(),
        pan_card: Joi.string().required(),
    }).required(),
    admin_of_branch: Joi.array().allow('', null),
    notes: Joi.string().allow(""),
});

export const createUserController = async (req, res) => {
    try {
        // 1️⃣ Validate input
        const { error, value } = userSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                details: error.details.map((d) => d.message),
            });
        }

        // 2️⃣ Check for existing user
        const existingUser = await User.findOne({ email: value.email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Email already exists" });
        }

        // 3️⃣ Hash password
        const hashedPassword = await bcrypt.hash(value.password, 10);

        // 4️⃣ Create user
        const newUser = new User({
            ...value,
            password: hashedPassword,
        });

        await newUser.save();

        // 5️⃣ Respond success (omit password)
        const { password, ...userData } = newUser.toObject();

        return successResponse(res, "User created successfully 🚀", {
            success: true,
            message: "User created successfully",
            user: userData,
        });
    } catch (err) {
        console.error("Error creating user:", err);
        return errorResponse(res, "Internal server error", 500);
    }
};
