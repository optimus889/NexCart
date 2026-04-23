import NexCartLogo from "@/components/common/NexCartLogo";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";

export default function AuthPage(props) {
  const {
    authMode,
    setAuthMode,
    selectedRole,
    setSelectedRole,
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
  } = props;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        background: "linear-gradient(135deg,#f8fafc 0%,#ffffff 42%,#eef2ff 100%)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: "1 1 0",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg,#ffffff 0%,#eef2ff 100%)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "-10%",
            width: "120%",
            height: "26%",
            borderRadius: "100px 100px 0 0",
            background: "rgba(165,180,252,.30)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "4%",
            left: "-5%",
            width: "110%",
            height: "20%",
            borderRadius: "100px 100px 0 0",
            background: "rgba(199,210,254,.50)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            left: "-3%",
            width: "106%",
            height: "14%",
            borderRadius: "100px 100px 0 0",
            background: "rgba(255,255,255,.45)",
          }}
        />
        <div
          style={{ position: "relative", zIndex: 10, marginTop: "60px", alignSelf: "center" }}
        >
          <NexCartLogo />
        </div>
      </div>

      <div
        style={{
          flex: "1 1 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          overflowY: "auto",
          background: "rgba(255,255,255,0.94)",
          padding: "2.5rem 4rem",
        }}
      >
        <div style={{ width: "100%", maxWidth: "460px", textAlign: "left" }} className="space-y-6">
          <h1
            style={{
              fontSize: "2.25rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#0f172a",
              marginBottom: "1.75rem",
              textAlign: "left",
            }}
          >
            {authMode === "signin" ? "Sign In" : "Sign Up"}
          </h1>

          {authMode === "signin" ? (
            <SignInForm
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              error={error}
              signupSuccess={signupSuccess}
              handleLogin={handleLogin}
              onSwitchToSignUp={() => setAuthMode("signup")}
            />
          ) : (
            <SignUpForm
              signupRole={signupRole}
              setSignupRole={setSignupRole}
              signupName={signupName}
              setSignupName={setSignupName}
              signupEmail={signupEmail}
              setSignupEmail={setSignupEmail}
              signupUsername={signupUsername}
              setSignupUsername={setSignupUsername}
              signupPassword={signupPassword}
              setSignupPassword={setSignupPassword}
              signupConfirmPassword={signupConfirmPassword}
              setSignupConfirmPassword={setSignupConfirmPassword}
              showSignupPassword={showSignupPassword}
              setShowSignupPassword={setShowSignupPassword}
              showSignupConfirmPassword={showSignupConfirmPassword}
              setShowSignupConfirmPassword={setShowSignupConfirmPassword}
              signupError={signupError}
              handleCreateAccount={handleCreateAccount}
              onBackToSignIn={() => setAuthMode("signin")}
            />
          )}
        </div>
      </div>
    </div>
  );
}