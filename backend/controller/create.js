import Admin from "../models/admin.js";
import createProject from "../models/createProject.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
  try {
    const { name, description, path } = req.body;
    const projectData = {
      name,
      description,
      path,
    };

    const imageToBeUploaded = req.files?.image?.tempFilePath || req.body.image;
    if (!imageToBeUploaded) {
      return res
        .status(400)
        .json({ success: false, errMsg: "Image has to be uploaded" });
    }

    let imageUpload;
    try {
      const result = await cloudinary.uploader.upload(imageToBeUploaded, {
        use_filename: true,
        folder: "project",
      });
      imageUpload = result.secure_url;
    } catch (uploadError) {
      console.error("Error uploading image to Cloudinary", uploadError);
      return res
        .status(500)
        .json({ success: false, errMsg: "Image upload failed" });
    }

    // Create the new event with the uploaded image URL
    const newProject = await createProject.create({
      ...projectData,
      image: imageUpload,
    });

    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error("Error creating Project:", error);
    res
      .status(500)
      .json({ message: "Error creating Project", error: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await createProject.find();
    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching projects",
      error: error.message,
    });
  }
};

export const createAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    // Generate a JWT token
    const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "Admin registered successfully", token });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({success: true, message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};
