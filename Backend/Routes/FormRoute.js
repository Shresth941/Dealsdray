import express from 'express';
import { addForm, listFormData, deleteForm, updateFormData, getFormById } from '../Controllers/formController.js';
import multer from 'multer';

// Configure storage for image uploads
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const formRouter = express.Router();

// Route to add a form
formRouter.post('/add', upload.single('image'), addForm);

// Route to list form data
formRouter.get('/list', listFormData);

// Route to delete form data
formRouter.delete('/delete/:id', deleteForm);

// Route to update form data
formRouter.put("/:id", upload.single('image'), updateFormData);

// Route to fetch form data by ID
formRouter.get('/:id', getFormById);

export default formRouter;
