import React, { useState, ChangeEvent } from "react";
import { Box, TextField, Button, Typography, Paper, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useJsonData } from "../context/JsonDataContext";
import { useNavigate } from "react-router-dom";

const JsonUrlInput: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { setJsonData } = useJsonData();

  const navigate = useNavigate();
  // Function to validate if the input is a valid JSON URL
  const validateJsonUrl = (input: string): boolean => {
    const urlPattern = /^(https?:\/\/.*\.json)$/; // Matches URLs ending with .json
    return urlPattern.test(input);
  };

  // Handle input change and validation
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const input = e.target.value;
    setUrl(input);

    if (validateJsonUrl(input)) {
      setError(false);
    } else {
      setError(true);
    }
  };
  // Fetch JSON data from the URL
  const fetchJsonData = async (): Promise<void> => {
    try {
      setLoading(true);
      setJsonData([]); // Reset previous data
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("data...", data);
      setJsonData([...data?.Pages]);
      navigate(data?.Pages[0]?.title);
    } catch (err) {
      toast.error("Failed to fetch JSON data. Please check the URL and try again.")
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  // Handle form submission
  const handleSubmit = (): void => {
    if (!error && url) {
      fetchJsonData();
    } else {
      toast.error("Please provide a valid JSON URL.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 500,
          borderRadius: 4,
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
        >
          JSON URL
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 3, color: "#555", textAlign: "center" }}
        >
          Please enter a valid JSON URL (e.g., <i>https://example.com/data.json</i>)
        </Typography>
        <TextField
          label="JSON URL"
          value={url}
          onChange={handleInputChange}
          error={error}
          helperText={
            error
              ? "Invalid JSON URL. Ensure it starts with http/https and ends with .json"
              : ""
          }
          fullWidth
          variant="outlined"
          sx={{ mb: 3 }}
          disabled={loading}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={error || !url}
          sx={{
            paddingY: 1.5,
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Fetch JSON"}
        </Button>
      </Paper>
    </Box>
  );
};

export default JsonUrlInput;
