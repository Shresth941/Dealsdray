import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Paper,
  Box,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CircleIcon from "@mui/icons-material/Circle";
import Sidebar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

export default function Center() {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  const [toggleStates, setToggleStates] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/form/list");
        if (response.data.success) {
          const updatedData = response.data.data.map((item) => ({
            ...item,
            randomNumber: Math.floor(Math.random() * 100) + 1,
          }));
          setData(updatedData);
        } else {
          console.error("Error: Data fetch was not successful");
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle checkbox toggle
  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  // Function to handle toggle button
  const handleToggle = (id) => {
    setToggleStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Function to handle deletion of selected rows
  async function handleDelete() {
    if (
      !window.confirm("Are you sure you want to delete the selected records?")
    )
      return;

    try {
      for (const id of selectedRows) {
        await axios.delete(`http://localhost:4000/api/form/delete/${id}`);
      }
      setData(data.filter((item) => !selectedRows.includes(item._id)));
      setSelectedRows([]);
      alert("Selected records deleted successfully!");
    } catch (error) {
      console.error("Error deleting the records:", error);
      alert("An error occurred while deleting the records.");
    }
  }

  return (
    <Grid container>
      <Grid item sx={{ width: "240px" }}>
        <Sidebar />
      </Grid>
      <Grid item xs>
        <Box sx={{ padding: { xs: 2, md: 3 }, marginTop: "20px" }}>
          <Grid
            container
            justifyContent="flex-end"
            spacing={2}
            sx={{ marginBottom: "20px" }}
          >
            {selectedRows.length > 0 && (
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                >
                  Delete Selected
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button
                variant="contained"
                onClick={() => navigate("/form")}
                color="warning"
              >
                Create New
              </Button>
            </Grid>
          </Grid>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#eeeeee" }}>
                  <TableCell>Select</TableCell>
                  <TableCell>Record No</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Reporting Head</TableCell>
                  <TableCell>User Type</TableCell>
                  <TableCell>Referral ID</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(row._id)}
                        onChange={() => handleCheckboxChange(row._id)}
                      />
                    </TableCell>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {row.image ? (
                        <img
                          src={`http://localhost:4000/images/${row.image}`}
                          alt={row.teamMemberName || "No Image"}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </TableCell>
                    <TableCell>{row.teamMemberName || "No Name"}</TableCell>
                    <TableCell>{row.email || "No Email"}</TableCell>
                    <TableCell>{row.mobile || "No Mobile"}</TableCell>
                    <TableCell>{row.designation || "No Designation"}</TableCell>
                    <TableCell>{row.department || "No Department"}</TableCell>
                    <TableCell>
                      {row.reportingHead || "No Reporting Head"}
                    </TableCell>
                    <TableCell>{row.userHierarchy || "No User Type"}</TableCell>
                    <TableCell>{row.randomNumber || "0"}</TableCell>
                    <TableCell>
                    <IconButton
  onClick={() => navigate(`/editform/${row._id}`)} // Pass the row ID
>
  <EditIcon />
</IconButton>

                      {selectedRows.includes(row._id) && (
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(row._id)}
                        >
                          <DeleteRoundedIcon />
                        </IconButton>
                      )}
                      <IconButton onClick={() => handleToggle(row._id)}>
                        <CircleIcon
                          style={{
                            color: toggleStates[row._id] ? "grey" : "limegreen",
                            fontSize: toggleStates[row._id] ? "10px" : "10px",
                          }}
                        />
                      </IconButton>
                      {row.department === "FOS" && (
                        <IconButton>
                          <PersonIcon  />
                        </IconButton>
                      )}
                      {/* Toggle Button */}
                    </TableCell>
                  </TableRow>
                ))}
                {data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={12} align="center">
                      No records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </Grid>
  );
}
