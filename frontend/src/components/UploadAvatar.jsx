import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/UploadAvatar.css";

const UploadAvatar = ({ onUploadSuccess }) => {
  const { user, updateUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        setMessage({
          type: "error",
          text: "Only image files are allowed (JPEG, PNG, GIF, WEBP)",
        });
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({
          type: "error",
          text: "File size must be less than 5MB",
        });
        return;
      }

      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setMessage({ type: "", text: "" });
    }
  };

  // Upload avatar
  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage({ type: "error", text: "Please select an image first" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const formData = new FormData();
      formData.append("avatar", selectedFile);

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/upload-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage({
        type: "success",
        text: "Avatar uploaded successfully!",
      });

      // Update user in context
      updateUser(response.data.user);

      // Reset
      setSelectedFile(null);
      setPreview(null);

      // Callback to parent
      if (onUploadSuccess) {
        onUploadSuccess(response.data.avatar);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to upload avatar",
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete avatar
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your avatar?")) {
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        "http://localhost:5000/api/delete-avatar",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage({
        type: "success",
        text: "Avatar deleted successfully!",
      });

      // Update user in context
      updateUser(response.data.user);

      setPreview(null);
      setSelectedFile(null);
    } catch (error) {
      console.error("Delete error:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to delete avatar",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-avatar-container">
      <h3>Upload Avatar</h3>

      {/* Current Avatar */}
      <div className="current-avatar">
        <img
          src={preview || user?.avatar || "https://via.placeholder.com/150"}
          alt="Avatar"
          className="avatar-preview"
        />
      </div>

      {/* File Input */}
      <div className="file-input-container">
        <label htmlFor="avatar-input" className="file-label">
          Choose Image
        </label>
        <input
          type="file"
          id="avatar-input"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />
        {selectedFile && (
          <span className="file-name">{selectedFile.name}</span>
        )}
      </div>

      {/* Message */}
      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      {/* Buttons */}
      <div className="button-group">
        <button
          onClick={handleUpload}
          disabled={!selectedFile || loading}
          className="btn-upload"
        >
          {loading ? "Uploading..." : "Upload Avatar"}
        </button>

        {user?.avatar && (
          <button
            onClick={handleDelete}
            disabled={loading}
            className="btn-delete"
          >
            {loading ? "Deleting..." : "Delete Avatar"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadAvatar;
