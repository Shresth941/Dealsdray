import FormModel from '../models/formModel.js';
import { unlink } from 'fs/promises';
import { validationResult } from 'express-validator';

// Add a form entry
export const addForm = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) await unlink(req.file.path); // Clean up uploaded file
      return res.status(400).json({ success: false, message: "Invalid input", errors: errors.array() });
    }

    const formData = {
      department: req.body.department,
      email: req.body.email,
      mobile: req.body.mobile,
      reportingHead: req.body.reportingHead,
      pinCode: req.body.pinCode,
      state: req.body.state,
      townArea: req.body.townArea,
      name: req.body.name,
      otherReportingHead: req.body.otherReportingHead,
      deactivationTime: req.body.deactivationTime,
      assignmentRule: req.body.assignmentRule,
      teamMemberName: req.body.teamMemberName,
      password: req.body.password,
      designation: req.body.designation,
      userHierarchy: req.body.userHierarchy,
      city: req.body.city,
      location: req.body.location,
      address: req.body.address,
      referralType: req.body.referralType,
      image: req.file ? req.file.filename : null, 
    };

    const form = new FormModel(formData);
    await form.save();

    res.status(201).json({ success: true, message: 'Form Added', data: form });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Form Not Added', error: error.message });
  }
};

// List all form data
export const listFormData = async (req, res) => {
  try {
    const forms = await FormModel.find({});
    res.json({ success: true, message: 'Form List', data: forms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Form Not Found', error: error.message });
  }
};

// Delete a form
export const deleteForm = async (req, res) => {
  try {
    const formId = req.params.id;
    const form = await FormModel.findByIdAndDelete(formId);

    if (!form) {
      return res.status(404).json({ success: false, message: 'Form Not Found' });
    }

    if (form.image) {
      await unlink(`uploads/${form.image}`);
    }

    res.status(200).json({ success: true, message: 'Form Deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error Deleting Form', error: error.message });
  }
};

// Update a form
export const updateFormData = async (req, res) => {
  try {
    const formId = req.params.id;
    if (!formId) {
      return res.status(400).json({ success: false, message: "Form ID is required" });
    }

    const updateData = {
      department: req.body.department,
      email: req.body.email,
      mobile: req.body.mobile,
      reportingHead: req.body.reportingHead,
      pinCode: req.body.pinCode,
      state: req.body.state,
      townArea: req.body.townArea,
      name: req.body.name,
      otherReportingHead: req.body.otherReportingHead,
      deactivationTime: req.body.deactivationTime,
      assignmentRule: req.body.assignmentRule,
      teamMemberName: req.body.teamMemberName,
      password: req.body.password,
      designation: req.body.designation,
      userHierarchy: req.body.userHierarchy,
      city: req.body.city,
      location: req.body.location,
      address: req.body.address,
      referralType: req.body.referralType,
    };

    if (req.file) {
      updateData.image = req.file.filename; 
    }

    const updatedForm = await FormModel.findByIdAndUpdate(formId, updateData, { new: true });
    if (!updatedForm) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    res.json({ success: true, message: "Form updated successfully", data: updatedForm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Form Not Updated" });
  }
};

// Fetch form by ID
export const getFormById = async (req, res) => {
    try {
      const formId = req.params.id;
      const form = await FormModel.findById(formId);
  
      if (!form) {
        return res.status(404).json({ success: false, message: 'Form Not Found' });
      }
  
      // Add the image URL to the response if it exists
      const imageUrl = `${req.protocol}://${req.get('host')}/images/${form.image}`;
      
      res.json({ 
        success: true, 
        data: { ...form.toObject(), imageUrl } // Attach image URL
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error retrieving form', error: error.message });
    }
  };
