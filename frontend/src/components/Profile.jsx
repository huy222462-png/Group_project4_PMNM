import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";
import "../styles/Profile.css";

const Profile = () => {
  const { user, updateUser } = useAuth();
  
  // State cho View mode và Edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // State cho form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  
  // State cho password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  // State cho loading và messages
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [profileData, setProfileData] = useState(null);

  // Load profile data khi component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  // Fetch profile từ API
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getProfile();
      
      if (response.success) {
        setProfileData(response.data);
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          avatar: response.data.avatar || "",
        });
      }
    } catch (error) {
      console.error("Fetch profile error:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to load profile",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle input change cho profile form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input change cho password form
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setMessage({ type: "error", text: "Name cannot be empty" });
      return;
    }

    if (!formData.email.trim()) {
      setMessage({ type: "error", text: "Email cannot be empty" });
      return;
    }

    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      const updateData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        avatar: formData.avatar.trim(),
      };

      const response = await authAPI.updateProfile(updateData);

      if (response.success) {
        setProfileData(response.data);
        updateUser(response.data); // Update user in AuthContext
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setIsEditing(false);
        
        // Clear message after 3 seconds
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      }
    } catch (error) {
      console.error("Update profile error:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle change password
  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Validation
    if (!passwordData.currentPassword) {
      setMessage({ type: "error", text: "Current password is required" });
      return;
    }

    if (!passwordData.newPassword) {
      setMessage({ type: "error", text: "New password is required" });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: "error", text: "New password must be at least 6 characters" });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      const response = await authAPI.updateProfile({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (response.success) {
        setMessage({ type: "success", text: "Password changed successfully!" });
        setIsChangingPassword(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        
        // Clear message after 3 seconds
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      }
    } catch (error) {
      console.error("Change password error:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to change password",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      name: profileData?.name || "",
      email: profileData?.email || "",
      avatar: profileData?.avatar || "",
    });
    setMessage({ type: "", text: "" });
  };

  // Handle cancel password change
  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setMessage({ type: "", text: "" });
  };

  if (loading && !profileData) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">
          {isEditing ? "Edit Profile" : isChangingPassword ? "Change Password" : "My Profile"}
        </h2>

        {/* Message display */}
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* VIEW MODE */}
        {!isEditing && !isChangingPassword && profileData && (
          <div className="profile-view">
            <div className="profile-avatar">
              {profileData.avatar ? (
                <img src={profileData.avatar} alt="Avatar" />
              ) : (
                <div className="avatar-placeholder">
                  {profileData.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>

            <div className="profile-info">
              <div className="info-row">
                <label>Name:</label>
                <span>{profileData.name}</span>
              </div>

              <div className="info-row">
                <label>Email:</label>
                <span>{profileData.email}</span>
              </div>

              <div className="info-row">
                <label>Avatar URL:</label>
                <span className="avatar-url">
                  {profileData.avatar || "No avatar set"}
                </span>
              </div>

              <div className="info-row">
                <label>Member Since:</label>
                <span>
                  {new Date(profileData.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="profile-actions">
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsChangingPassword(true)}
              >
                Change Password
              </button>
            </div>
          </div>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <form onSubmit={handleUpdateProfile} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar">Avatar URL</label>
              <input
                type="url"
                id="avatar"
                name="avatar"
                value={formData.avatar}
                onChange={handleInputChange}
                placeholder="Enter avatar URL (optional)"
              />
              {formData.avatar && (
                <div className="avatar-preview">
                  <img src={formData.avatar} alt="Avatar preview" />
                </div>
              )}
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
              <button
                type="button"
                className="btn btn-cancel"
                onClick={handleCancelEdit}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* CHANGE PASSWORD MODE */}
        {isChangingPassword && (
          <form onSubmit={handleChangePassword} className="profile-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password *</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password *</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password (min 6 characters)"
                required
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                required
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Changing..." : "Change Password"}
              </button>
              <button
                type="button"
                className="btn btn-cancel"
                onClick={handleCancelPasswordChange}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
