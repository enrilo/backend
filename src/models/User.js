import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Basic Identity
    full_name: { type: String, required: true },
    company_email: { type: String, required: true, unique: true },    // user's company alloted email id (personal if no company email id exists)
    password: { type: String, required: true },
    country_code: { type: String },
    phone_number: { type: Number, required: true },
    photo: { type: String, default: "" },
    position: { type: String },           // ceo/hr/etc

    // Personal Info
    home_address: { type: String },
    date_of_birth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], },

    // Emergency Contact
    emergency_contact: {
      name: { type: String, required: true },
      relation: { type: String, required: true },
      country_code: { type: String, required: true },
      phone_number: { type: Number, required: true },
    },

    // Auth & Access
    role: { type: String, required: true, default: "user" }, // user/admin
    is_active: { type: Boolean, default: true },
    last_login: { type: Date },

    // Company Info
    company_name: { type: String },
    company_address: { type: String },
    branch: { type: [String], default: [] }, // e.g., "Bangalore HQ", "Pune Branch"

    // Documents (file paths or URLs)
    documents: {
      aadhar_card_photo_url: { type: String, required: true },
      aadhar_card: { type: Number, unique: true, required: true },
      pan_card_photo_url: { type: String, required: true },
      pan_card: { type: String, unique: true, required: true },
    },

    // CRM Specific
    admin_of_branch: { type: [String], default:[] }, // If this user is managing a branch
    // Metadata
    notes: { type: String },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who created this user
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
