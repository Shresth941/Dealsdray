import React from "react";
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
  Typography,
  InputBase,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Navbar/Navbar";

const data = [
  {
    id: "A24714",
    name: "N and N Store",
    owner: "N and N Store",
    mobile: "+91 365436537",
    email: "ksanghvi@xypostal.com",
    location: "Bangalore, Karnataka",
    geoLocation:
      "8205, Brigade Metropolis, Mahadevapura, Bangalore, Karnataka 560048, India",
    timeline: {
      botRemark: "30/08/2024, 5:01:19 pm",
      approved: "09/09/2024, 12:02 pm",
    },
    businessType: "Property",
    documentStatus: "No documents uploaded",
    registeredBy: "Direct Registration",
  },
];

export default function BotApproval() {
  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid item sx={{ width: "240px" }}>
        <Sidebar /> {/* Fixed width for sidebar */}
      </Grid>
      <Grid item xs>
        <Box sx={{ padding: { xs: 2, md: 3 }, marginTop: "20px" }}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            Approval Pending
          </Typography>

          {/* Search and Actions */}
          <Grid
            container
            justifyContent="flex-end"
            alignItems="center"
            sx={{ marginBottom: 2 }}
          >
            <InputBase
              sx={{
                backgroundColor: "#eeeeee",
                borderRadius: "5px",
                padding: "6px 12px",
                width: { xs: "60%", md: "25%" },
                textAlign: "center",
                marginRight: "10px",
              }}
              placeholder="Search"
            />
            <Button variant="contained" color="primary">
              Search
            </Button>
          </Grid>

          {/* Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#eeeeee" }}>
                  <TableCell>Record Number</TableCell>
                  <TableCell>Business Details</TableCell>
                  <TableCell>Registration Timeline</TableCell>
                  <TableCell>Business Category</TableCell>
                  <TableCell>Document Status</TableCell>
                  <TableCell>Registered By</TableCell>
                  <TableCell>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        <strong>ID:</strong> {row.id}
                        <br />
                        <strong>Name:</strong> {row.name}
                        <br />
                        <strong>Owner:</strong> {row.owner}
                        <br />
                        <strong>Mobile:</strong> {row.mobile}
                        <br />
                        <strong>Email:</strong> {row.email}
                        <br />
                        <strong>Location:</strong> {row.location}
                        <br />
                        <strong>GEO Location:</strong> {row.geoLocation}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        <strong>BOT Last Remark:</strong>{" "}
                        {row.timeline.botRemark}
                        <br />
                        <strong>Approved:</strong> {row.timeline.approved}
                      </Typography>
                    </TableCell>
                    <TableCell>{row.businessType}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small">
                        {row.documentStatus}
                      </Button>
                    </TableCell>
                    <TableCell>{row.registeredBy}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </Grid>
  );
}
