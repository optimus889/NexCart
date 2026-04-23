import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RoleSelector from "./RoleSelector";

export default function SignInForm({
  selectedRole,
  setSelectedRole,
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  error,
  signupSuccess,
  handleLogin,
  onSwitchToSignUp,
}) {
  return (
    <>
      <RoleSelector value={selectedRole} onChange={setSelectedRole} />

      {signupSuccess ? (
        <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {signupSuccess}
        </div>
      ) : null}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 text-left">
          Username
        </label>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="h-14 rounded-2xl border-slate-200 bg-white shadow-sm"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 text-left">
          Password
        </label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="h-14 rounded-2xl border-slate-200 bg-white pr-12 shadow-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button
          onClick={handleLogin}
          className="h-14 rounded-2xl bg-slate-950 text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-lg"
        >
          Login
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onSwitchToSignUp}
          className="h-14 rounded-2xl border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          Sign Up
        </Button>
      </div>
    </>
  );
}