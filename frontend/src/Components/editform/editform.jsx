import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import axios from "axios";

const EditFormUI = () => {
  const url = "http://localhost:4000"; //  backend API URL 
  const { id } = useParams(); 

  // State for form data and image preview
  const [previewImage, setPreviewImage] = useState("");
  const [formData, setFormData] = useState({
    department: "",
    email: "",
    mobile: "",
    reportingHead: "",
    pinCode: "",
    state: "",
    townArea: "",
    name: "",
    otherReportingHead: "",
    deactivationTime: "",
    assignmentRule: "",
    teamMemberName: "",
    password: "",
    designation: "",
    userHierarchy: "",
    city: "",
    location: "",
    address: "",
    referralType: "",
    image: null,
  });

  const navigate = useNavigate();

  // Fetch form data based on ID
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${url}/api/form/${id}`);
        if (response.data.success) {
          setFormData(response.data.data); 
          if (response.data.data.image) {
            setPreviewImage(`${url}/images/${response.data.data.image}`);
          }
        } else {
          console.error("Failed to fetch form data");
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };
  
    if (id) {
      fetchFormData();
    }
  }, [id, url]);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Function to render TextFields
  const renderTextField = (
    label,
    name,
    type = "text",
    multiline = false,
    rows = 1
  ) => (
    <TextField
      label={label}
      name={name}
      type={type}
      value={formData[name]}
      fullWidth
      multiline={multiline}
      rows={rows}
      variant="outlined"
      size="small"
      onChange={handleInputChange}
    />
  );

  // Function to render Select fields
  const renderSelectField = (
    label,
    name,
    options = ["Option 1", "Option 2", "Option 3"]
  ) => (
    <FormControl fullWidth size="small">
      <Select
        name={name}
        value={formData[name]}
        displayEmpty
        onChange={handleInputChange}
      >
        <MenuItem value="">
          <em>Select Option</em>
        </MenuItem>
        {options.map((option, idx) => (
          <MenuItem key={idx} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.put(`${url}/api/form/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert("Form updated successfully!");
        navigate("/center");
      } else {
        console.error("Failed to update form:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "1200px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="bold" color="primary">
              Edit Team Member Master
            </Typography>
            <Box>
              <Button variant="contained" color="warning" sx={{ mr: 2 }} onClick={() => navigate("/center")}>
                Back to List
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
            </Box>
          </Grid>

          {/* Left Column */}
          <Grid item xs={12} md={6}>
            {[
              {
                label: "Department:*",
                name: "department",
                component: renderSelectField,
                options: [
                  "CMT",
                  "BOT",
                  "OFT",
                  "RM",
                  "ACT",
                  "WAREHOUSE",
                  "PACKING",
                  "OFT MANAGER",
                  "DEALSDRAY DELIVERY TEAM",
                  "RUNNER",
                  "FOS",
                  "SERVICE AFFILIATE RELATIONSHIP",
                  "TERRITORY SERVICE",
                ],
              },
              { label: "Email Address:*", name: "email", component: renderTextField },
              { label: "Mobile Number:*", name: "mobile", component: renderTextField },
              {
                label: "Reporting Head:*",
                name: "reportingHead",
                component: renderSelectField,
                options: ["CEO", "Super Admin", "Highest Admin", "Sr Executive", "Sr Manager-BD-SA-RM", "Jr Executive"],
              },
              { label: "Pin Code:*", name: "pinCode", component: renderTextField },
              {
                label: "State:*",
                name: "state",
                component: renderSelectField,
                options: ["State 1", "State 2", "State 3"],
              },
              {
                label: "Town Area:*",
                name: "townArea",
                component: renderSelectField,
                options: ["Area 1", "Area 2"],
              },
              { label: "Display Name:*", name: "name", component: renderTextField },
              {
                label: "Other Reporting Head:*",
                name: "otherReportingHead",
                component: renderSelectField,
                options: ["Sub Manager 1", "Sub Manager 2"],
              },
              { label: "Deactivation Time:*", name: "deactivationTime", component: renderTextField },
              {
                label: "Assignment Rule:*",
                name: "assignmentRule",
                component: renderSelectField,
                options: ["Round Robin", "All Round"],
              },
            ].map(({ label, name, component, options }, index) => (
              <Grid container spacing={2} alignItems="center" key={index} sx={{ my: 1 }}>
                <Grid item xs={12} sm={4}>
                  <Typography>{label}</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  {component === renderSelectField ? component(label, name, options) : component(label, name)}
                </Grid>
              </Grid>
            ))}
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6}>
            {[
              { label: "Team Member Name:*", name: "teamMemberName", component: renderTextField },
              { label: "Password:*", name: "password", component: renderTextField, type: "password" },
              {
                label: "Designation:*",
                name: "designation",
                component: renderSelectField,
                options: ["Junior", "Senior", "Lead"],
              },
              {
                label: "User Hierarchy:*",
                name: "userHierarchy",
                component: renderSelectField,
                options: ["CHECKER", "APPROVAL"],
              },
              { label: "City:*", name: "city", component: renderTextField },
              { label: "Location:*", name: "location", component: renderTextField },
              { label: "Address:*", name: "address", component: renderTextField, multiline: true, rows: 3 },
            ].map(({ label, name, component, options, type, multiline, rows }, index) => (
              <Grid container spacing={2} alignItems="center" key={index} sx={{ my: 1 }}>
                <Grid item xs={12} sm={4}>
                  <Typography>{label}</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  {component === renderSelectField
                    ? component(label, name, options)
                    : component(label, name, type, multiline, rows)}
                </Grid>
              </Grid>
            ))}

            {/* Referral Type Radio Buttons */}
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Typography>Referral Type:</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <FormControl>
                <RadioGroup row name="referralType" value={formData.referralType} onChange={handleInputChange}>
                  <FormControlLabel value="B2R" control={<Radio />} label="B2R" />
                  <FormControlLabel value="B2B" control={<Radio />} label="B2B" />
                  <FormControlLabel value="B2A" control={<Radio />} label="B2A" />
                </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            {/* Image Preview */}
            <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
              <Grid item xs={12} sm={4}>
                <Typography>Upload Image:</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  type="file"
                  name="image"
                  fullWidth
                  onChange={handleInputChange}
                />
                {previewImage && (
                  <Box mt={2}>
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{ width: "100%", maxWidth: "200px", borderRadius: "8px" }}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditFormUI;
