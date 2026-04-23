import { Eye, EyeOff, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RoleSelector from "./RoleSelector";

export default function SignUpForm({
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
  signupError,
  handleCreateAccount,
  onBackToSignIn,
}) {
  return (
    <>
      <RoleSelector value={signupRole} onChange={setSignupRole} />

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 text-left">
          Full Name
        </label>
        <Input
          value={signupName}
          onChange={(e) => setSignupName(e.target.value)}
          placeholder="Enter full name"
          className="h-14 rounded-2xl border-slate-200 bg-white shadow-sm"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 text-left">
          Email
        </label>
        <div className="relative">
          <Input
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            placeholder="Enter email"
            className="h-14 rounded-2xl border-slate-200 bg-white pl-10 shadow-sm"
          />
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 text-left">
          Username
        </label>
        <Input
          value={signupUsername}
          onChange={(e) => setSignupUsername(e.target.value)}
          placeholder="Create username"
          className="h-14 rounded-2xl border-slate-200 bg-white shadow-sm"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 text-left">
          Password
        </label>
        <div className="relative">
          <Input
            type={showSignupPassword ? "text" : "password"}
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            placeholder="Create password"
            className="h-14 rounded-2xl border-slate-200 bg-white pr-12 shadow-sm"
          />
          <button
            type="button"
            onClick={() => setShowSignupPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          >
            {showSignupPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 text-left">
          Confirm Password
        </label>
        <div className="relative">
          <Input
            type={showSignupConfirmPassword ? "text" : "password"}
            value={signupConfirmPassword}
            onChange={(e) => setSignupConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            className="h-14 rounded-2xl border-slate-200 bg-white pr-12 shadow-sm"
          />
          <button
            type="button"
            onClick={() => setShowSignupConfirmPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          >
            {showSignupConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {signupError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {signupError}
        </div>
      ) : null}

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button
          onClick={handleCreateAccount}
          className="h-14 rounded-2xl bg-slate-950 text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-lg"
        >
          Create Account
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onBackToSignIn}
          className="h-14 rounded-2xl border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          Back to Sign In
        </Button>
      </div>
    </>
  );
}