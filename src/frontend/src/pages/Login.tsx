import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Link, useNavigate } from "@tanstack/react-router";
import { Diamond, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useInternetIdentity();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleIILogin = async () => {
    try {
      await login();
      toast.success("Welcome back!");
      navigate({ to: "/" });
    } catch {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen pt-20 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-card border border-border rounded-2xl p-8 shadow-[0_20px_80px_oklch(0_0_0/0.5)]">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Diamond className="w-5 h-5 text-gold" fill="currentColor" />
            <span className="font-serif text-2xl font-bold text-gold tracking-widest">
              LuxeVillas
            </span>
          </div>

          <h1 className="font-serif text-2xl font-bold text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-muted-foreground text-sm mb-8">
            Sign in to your account
          </p>

          {/* Internet Identity */}
          <button
            type="button"
            data-ocid="login.primary_button"
            onClick={handleIILogin}
            disabled={isLoggingIn}
            className="w-full py-3 bg-gold/10 border border-gold/30 text-gold font-semibold text-sm rounded-xl hover:bg-gold hover:text-primary-foreground transition-all mb-6 disabled:opacity-50"
          >
            {isLoggingIn ? "Connecting..." : "🔑 Login with Internet Identity"}
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              toast.info("Use Internet Identity to sign in.");
            }}
          >
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                Email
              </Label>
              <Input
                data-ocid="login.input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-background border-border"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                Password
              </Label>
              <div className="relative">
                <Input
                  data-ocid="login.input"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-background border-border pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPass ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              data-ocid="login.submit_button"
              className="w-full py-3.5 gold-gradient text-primary-foreground font-bold text-sm tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              data-ocid="login.link"
              className="text-gold hover:underline font-semibold"
            >
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
