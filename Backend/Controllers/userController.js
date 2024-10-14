import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const allowedEmail = process.env.ALLOWED_EMAIL || "superadmin@dealsdray.com";
const allowedPassword = process.env.ALLOWED_PASSWORD || "dealsdray";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Allow login only for the specific email and password
    if (email !== allowedEmail || password !== allowedPassword) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    // Check if the user already exists in the database
    let user = await userModel.findOne({ email: allowedEmail });

    // If user does not exist, create and save the super admin user in the database
    if (!user) {
      const hashedPassword = await bcryptjs.hash(allowedPassword, 10);

      user = new userModel({
        name: "Super Admin",
        email: allowedEmail,
        password: hashedPassword,
      });

      await user.save();
      console.log("Super Admin user saved to database");
    }

    // Generate a JWT token for the user
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "An error occurred during login" });
  }
};

export { loginUser };
