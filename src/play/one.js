import connectDB from "../config/db.js";
import SuperAdmin from "../models/SuperAdmin.js";
import bcrypt from "bcrypt";

(async function seedSuperAdmin() {
  try {
    console.log("🚀 Starting Super Admin seeding...");

    // Connect to MongoDB
    await connectDB();

    // Password setup
    const plainPassword = "SuperSecureAdmin123!";
    const hashedPassword = await hashPassword(plainPassword);

    // Sample Super Admin data
    const superAdminData = {
      photo_url: "https://example.com/uploads/superadmin_photo.jpg",
      full_name: "Ayaan Mehta",
      country_code: "+91",
      phone: "9876543210",
      company_email: "ayaan.mehta@globalhq.com",
      email: "ayaan.personal@gmail.com",
      position: "Global Super Admin",

      street_1: "221B Baker Street",
      street_2: "Near City Center",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      zipcode: "400001",

      emergency_contact: {
        name: "Karan Mehta",
        relation: "Brother",
        country_code: "+91",
        phone: "9988776655",
      },

      documents: [
        {
          name: "Passport",
          url: "https://example.com/uploads/passport_ayaan.pdf",
        },
        {
          name: "ID Card",
          url: "https://example.com/uploads/id_ayaan.pdf",
        },
      ],

      role: "super_admin",
      is_active: true,
      notes: "Primary super admin responsible for global access.",
      password: hashedPassword,
    };

    // Create and save Super Admin
    const superAdmin = new SuperAdmin(superAdminData);
    await superAdmin.save();

    console.log("🎉 Super Admin saved successfully!");
    console.log("✅ Login credentials:");
    console.log(`   Email: ${superAdminData.company_email}`);
    console.log(`   Password: ${plainPassword}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding Super Admin:", error);
    process.exit(1);
  }
})();

// Utility: Hash Password
const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  return hashedPassword;
};
