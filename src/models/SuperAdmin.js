import mongoose from "mongoose";

const superAdminSchema = new mongoose.Schema(
    {
        // Basic Info
        photo_url: { type: String, default: "" },
        full_name: { type: String, required: true },
        country_code: { type: String, required: true },
        phone: { type: Number, required: true },
        company_email: { type: String, required: true, unique: true },
        email: { type: String, unique: true },
        position: { type: String, required: true }, // e.g., "Super Admin", "CEO", etc.

        // Address Info
        street_1: { type: String },
        street_2: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        zipcode: { type: String },

        // Emergency Contact
        emergency_contact: {
            name: { type: String, required: true },
            relation: { type: String, required: true },
            country_code: { type: String, required: true },
            phone: { type: Number, required: true },
        },

        // Documents (can store file URLs or metadata)
        documents: [
            {
                name: { type: String }, // e.g., "Passport", "ID Card"
                url: { type: String },  // file or document URL
                number: { type: String },  // file or document URL
                uploaded_at: { type: Date, default: Date.now },
            },
        ],

        // Access Control
        is_active: { type: Boolean, default: true },
        last_login: { type: Date },

        // Metadata
        created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        notes: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("SuperAdmin", superAdminSchema);
