import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Link, useNavigate } from "@tanstack/react-router";
import { Diamond, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useInternetIdentity();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords don't match.");
      return;
    }
    toast.info("Use Internet Identity to create your account.");
  };

  const handleIILogin = async () => {
    try {
      await login();
      toast.success("Account created! Welcome to LuxeVillas.");
      navigate({ to: "/" });
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen pt-20 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-card border border-border rounded-2xl p-8 shadow-[0_20px_80px_oklch(0_0_0/0.5)]">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Diamond className="w-5 h-5 text-gold" fill="currentColor" />
            <span className="font-serif text-2xl font-bold text-gold tracking-widest">
              LuxeVillas
            </span>
          </div>

          <h1 className="font-serif text-2xl font-bold text-center mb-2">
            Create Account
          </h1>
          <p className="text-center text-muted-foreground text-sm mb-8">
            Join LuxeVillas to unlock exclusive villas
          </p>

          <button
            type="button"
            data-ocid="register.primary_button"
            onClick={handleIILogin}
            disabled={isLoggingIn}
            className="w-full py-3 bg-gold/10 border border-gold/30 text-gold font-semibold text-sm rounded-xl hover:bg-gold hover:text-primary-foreground transition-all mb-6 disabled:opacity-50"
          >
            {isLoggingIn
              ? "Connecting..."
              : "🔑 Register with Internet Identity"}
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                Full Name
              </Label>
              <Input
                data-ocid="register.input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="bg-background border-border"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                Email
              </Label>
              <Input
                data-ocid="register.input"
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
                  data-ocid="register.input"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
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
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                Confirm Password
              </Label>
              <Input
                data-ocid="register.input"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat password"
                className="bg-background border-border"
              />
            </div>
            <button
              type="submit"
              data-ocid="register.submit_button"
              className="w-full py-3.5 gold-gradient text-primary-foreground font-bold text-sm tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              data-ocid="register.link"
              className="text-gold hover:underline font-semibold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
