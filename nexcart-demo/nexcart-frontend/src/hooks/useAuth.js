import { useEffect, useState } from "react";
import { getMe, login, logout, register } from "@/api/authApi";
import { getToken, removeToken, setToken } from "@/utils/token";
import { roleConfig } from "@/constants/roleConfig";

export function useAuth() {
  const [authMode, setAuthMode] = useState("signin");
  const [selectedRole, setSelectedRole] = useState("customer");
  const [loggedInRole, setLoggedInRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [signupRole, setSignupRole] = useState("customer");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");

  useEffect(() => {
    const bootstrap = async () => {
      if (!getToken()) return;
      try {
        const data = await getMe();
        setCurrentUser(data.user);
        setLoggedInRole(data.user.role);
      } catch {
        removeToken();
      }
    };
    bootstrap();
  }, []);

  const handleLogin = async () => {
    setError("");
    try {
      const data = await login({
        username,
        password,
        role: selectedRole,
      });

      setToken(data.token);
      setLoggedInRole(data.user.role);
      setCurrentUser(data.user);
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err.message || "Login failed.");
    }
  };

  const handleCreateAccount = async () => {
    setSignupError("");
    setSignupSuccess("");

    if (!signupName.trim() || !signupEmail.trim() || !signupUsername.trim() || !signupPassword.trim()) {
      setSignupError("Please complete all required fields.");
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setSignupError("Passwords do not match.");
      return;
    }

    try {
      const data = await register({
        fullName: signupName,
        email: signupEmail,
        username: signupUsername,
        password: signupPassword,
        role: signupRole,
      });

      setSignupSuccess(data.message || "Registration successful.");
      setAuthMode("signin");
      setSelectedRole(signupRole);
      setUsername(signupUsername);
      setPassword("");

      setSignupName("");
      setSignupEmail("");
      setSignupUsername("");
      setSignupPassword("");
      setSignupConfirmPassword("");
    } catch (err) {
      setSignupError(err.message || "Registration failed.");
    }
  };

  const handleLogout = async () => {
    try {
      if (getToken()) {
        await logout();
      }
    } catch {
      // ignore
    }
    removeToken();
    setLoggedInRole(null);
    setCurrentUser(null);
  };

  const activeProfile = currentUser
    ? {
        id: currentUser.id,
        name: currentUser.fullName || "N/A",
        email: currentUser.email || "N/A",
        username: currentUser.username || "N/A",
        role: currentUser.roleLabel || roleConfig[currentUser.role]?.label || "N/A",
        isActive: currentUser.isActive ? "Active" : "Disabled",
        createdAt: currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleString() : "N/A",
      }
    : null;

  return {
    authMode,
    setAuthMode,
    selectedRole,
    setSelectedRole,
    loggedInRole,
    currentUser,
    activeProfile,
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    signupRole,
    setSignupRole,
    signupName,
    setSignupName,
    signupEmail,
    setSignupEmail,
    signupUsername,
    setSignupUsername,
    signupPassword,
    setSignupPassword,
    signupConfirmPassword,
    setSignupConfirmPassword,
    showSignupPassword,
    setShowSignupPassword,
    showSignupConfirmPassword,
    setShowSignupConfirmPassword,
    error,
    signupError,
    signupSuccess,
    handleLogin,
    handleCreateAccount,
    handleLogout,
  };
}