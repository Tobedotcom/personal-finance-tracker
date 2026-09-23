import { useEffect, useState } from "react";
import { getLoggedInUser } from "../utils/auth";
import "../css/pages/profile.css";

function Profile() {
  const loggedInUser = getLoggedInUser();

  const [name, setName] = useState(loggedInUser?.name || "");
  const [email, setEmail] = useState(loggedInUser?.email || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      setName(loggedInUser.name || "");
      setEmail(loggedInUser.email || "");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }

    if (!loggedInUser?.id) {
      setError("You are not logged in.");
      return;
    }

    try {
      setIsSaving(true);

      // Get the complete user from JSON Server
      const userResponse = await fetch(
        `http://localhost:3000/users/${loggedInUser.id}`
      );

      if (!userResponse.ok) {
        throw new Error("Unable to find your account.");
      }

      const currentUser = await userResponse.json();

      // If the user wants to change their password,
      // check their current password first.
      if (newPassword.trim()) {
        if (!currentPassword.trim()) {
          setError("Enter your current password first.");
          return;
        }

        if (currentUser.password !== currentPassword) {
          setError("Your current password is incorrect.");
          return;
        }
      }

      const updatedUser = {
        ...currentUser,
        name: name.trim(),
        email: email.trim(),
      };

      if (newPassword.trim()) {
        updatedUser.password = newPassword;
      }

      // Update JSON Server
      const updateResponse = await fetch(
        `http://localhost:3000/users/${loggedInUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Unable to save your changes.");
      }

      // Don't store the password in the browser session
      const sessionUser = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      };

      const wasRemembered =
        localStorage.getItem("loggedInUser") !== null;

      if (wasRemembered) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(sessionUser)
        );
      } else {
        sessionStorage.setItem(
          "loggedInUser",
          JSON.stringify(sessionUser)
        );
      }

      setCurrentPassword("");
      setNewPassword("");

      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Profile update error:", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="profile-page">
      <div className="profile-page-header">
        <h1>Profile</h1>
        <p>Manage your personal information.</p>
      </div>

      <form className="profile-content" onSubmit={handleSubmit}>
        <div className="profile-avatar">
          {name?.charAt(0).toUpperCase() || "?"}
        </div>

        <div className="profile-details">
          <div className="profile-field">
            <label htmlFor="profile-name">Name</label>

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="profile-field">
            <label htmlFor="profile-email">
              Email Address
            </label>

            <input
              id="profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />
          </div>

          <div className="profile-password-section">
            <h2>Change Password</h2>

            <div className="profile-field">
              <label htmlFor="current-password">
                Current Password
              </label>

              <input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                placeholder="Enter current password"
              />
            </div>

            <div className="profile-field">
              <label htmlFor="new-password">
                New Password
              </label>

              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Enter new password"
              />
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          {message && (
            <p className="form-success">{message}</p>
          )}

          <button
            type="submit"
            className="profile-save-button"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default Profile;