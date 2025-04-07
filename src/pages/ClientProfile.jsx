import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Avatar,
} from "@mui/material";
import Sidebar from "../components/Sidebar";

const ClientProfile = () => {
  const [client, setClient] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    setClient(currentUser);
    setForm({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      password: currentUser?.password || "",
      image: currentUser?.image || "",
    });
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };
  const handleSave = () => {
    const updatedUser = { ...client, ...form };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === client.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setClient(updatedUser);
    setEditOpen(false);
  };

  if (!client) return null;

  return (
    <div className="dashBoard">
      <Sidebar role="Client" />
      <div className="content">
        <Typography variant="h5" sx={{ mb: 2 }}>
          My Profile
        </Typography>

        <Card sx={{ maxWidth: 350 }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src={client.image || ""}
              alt={client.name}
              sx={{ width: 80, height: 80, mb: 2 }}
            >
              {!client.image && client.name?.charAt(0)}
            </Avatar>
            <Typography variant="subtitle1">
              <strong>Name:</strong> {client.name}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Email:</strong> {client.email}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Role:</strong> {client.role}
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => setEditOpen(true)}
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogContent>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
            >
              <Avatar
                src={client.image || ""}
                alt={client.name}
                sx={{ width: 80, height: 80 }}
              >
                {!client.image && client.name?.charAt(0)}
              </Avatar>
              <TextField
                sx={{ padding: 1 }}
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                sx={{ padding: 1 }}
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                sx={{ padding: 1 }}
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
              />
              <Button variant="outlined" component="label">
                Upload Profile Picture
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ClientProfile;
