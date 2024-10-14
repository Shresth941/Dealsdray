import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const FormUI = () => {
  const url = "http://localhost:4000";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
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

    // Ensure required fields are filled
    if (!formData.department || !formData.referralType) {
      alert("Please fill all required fields.");
      return;
    }

    const formDataObject = new FormData();

    for (const key in formData) {
      if (key === "image" && formData[key]) {
        formDataObject.append(key, formData[key], formData[key].name);
      } else {
        formDataObject.append(key, formData[key]);
      }
    }

    try {
      await axios.post(`${url}/api/form/add`, formDataObject, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Form submitted successfully!");
      navigate("/center");
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response ? error.response.data : error.message
      );
      alert("Form submission failed!");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "1200px" }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight="bold" color="primary">
              Create Team Member Master
            </Typography>
            <Box>
              <Button
                variant="contained"
                color="warning"
                sx={{ mr: 2 }}
                onClick={() => navigate("/center")}
              >
                Back to List
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Submit
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
                  "SERVICE AFFILIATE REALTIONSHIP",
                  "TERRITORY SERVICE",
                ],
              },
              {
                label: "Email Address:*",
                name: "email",
                component: renderTextField,
              },
              {
                label: "Mobile Number:*",
                name: "mobile",
                component: renderTextField,
              },
              {
                label: "Reporting Head:*",
                name: "reportingHead",
                component: renderSelectField,
                options: [
                  "CEO",
                  "Super Admin",
                  "Highest Admin",
                  "Sr Executive",
                  "Sr Manager-BD-SA-RM",
                  "Sr. Manager-BD-SA-TSM",
                  "Junior Executive",
                  "SA-MEGHA",
                ],
              },
              {
                label: "Pin Code:*",
                name: "pinCode",
                component: renderTextField,
              },
              {
                label: "State:*",
                name: "state",
                component: renderSelectField,
                options: ["Delhi", 
                  "Karnakata","Uttar Pradesh"],
              },
              {
                label: "Town Area:*",
                name: "townArea",
                component: renderSelectField,
                options: ["Bengaluru", "Gorakhpur"],
              },
              {
                label: "Display Name:*",
                name: "name",
                component: renderTextField,
              },
              {
                label: "Other Reporting Head:*",
                name: "otherReportingHead",
                component: renderSelectField,
                options: ["CEO",
                  "Super Admin",
                  "Highest Admin",
                  "Sr Executive",
                  "Sr Manager-BD-SA-RM",
                  "Sr. Manager-BD-SA-TSM",
                  "Junior Executive",
                  "SA-MEGHA"],
              },
              {
                label: "Deactivation Time:*",
                name: "deactivationTime",
                component: renderTextField,
              },
              {
                label: "Assignment Rule:*",
                name: "assignmentRule",
                component: renderSelectField,
                options: ["Round Robin", "All Round"],
              },
            ].map(({ label, name, component, options, type }, index) => (
              <Grid
                container
                spacing={2}
                alignItems="center"
                key={index}
                sx={{ my: 1 }}
              >
                <Grid item xs={12} sm={4}>
                  <Typography>{label}</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  {component === renderSelectField
                    ? component(label, name, options)
                    : component(label, name, type)}
                </Grid>
              </Grid>
            ))}
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6}>
            {[
              {
                label: "Team Member Name:*",
                name: "teamMemberName",
                component: renderTextField,
              },
              {
                label: "Password:*",
                name: "password",
                component: renderTextField,
                type: "password",
              },
              {
                label: "Designation:*",
                name: "designation",
                component: renderSelectField,
                options: ["CEO", "Senior Manager", "Associate","Executive"],
              },
              {
                label: "User Hierarchy:*",
                name: "userHierarchy",
                component: renderSelectField,
                options: ["CHECKER", "APPROVAL"],
              },
              { label: "City:*", name: "city", component: renderTextField },
              {
                label: "Location:*",
                name: "location",
                component: renderTextField,
              },
              {
                label: "Address:*",
                name: "address",
                component: renderTextField,
                multiline: true,
                rows: 3,
              },
            ].map(
              (
                { label, name, component, options, type, multiline, rows },
                index
              ) => (
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  key={index}
                  sx={{ my: 1 }}
                >
                  <Grid item xs={12} sm={4}>
                    <Typography>{label}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    {component === renderSelectField
                      ? component(label, name, options)
                      : component(label, name, type, multiline, rows)}
                  </Grid>
                </Grid>
              )
            )}

            {/* Referral Type Radio Buttons */}
            <Grid container spacing={2} alignItems="center" sx={{ my: 1 }}>
              <Grid item xs={12} sm={4}>
                <Typography>Referral Type:*</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <RadioGroup
                  row
                  name="referralType"
                  value={formData.referralType}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="B2R"
                    control={<Radio />}
                    label="B2R"
                  />
                  <FormControlLabel
                    value="B2B"
                    control={<Radio />}
                    label="B2B"
                  />
                  <FormControlLabel
                    value="B2A"
                    control={<Radio />}
                    label="B2A"
                  />
                </RadioGroup>
              </Grid>
            </Grid>

            {/* Image Upload Section */}
            <Grid container spacing={2} alignItems="center" sx={{ my: 1 }}>
              <Grid item xs={12} sm={4}>
                <Typography>Image</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFormData({ ...formData, image: file });
                      const reader = new FileReader();
                      reader.onloadend = () => setPreviewImage(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default FormUI;
