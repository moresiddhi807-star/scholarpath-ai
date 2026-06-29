import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { FloatingBlobs } from "../components/ui/FloatingBlobs";
import { useAuth } from "../context/AuthContext";
import { isAxiosError } from "axios";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const user = await login(email, password);
      navigate(user.onboarding_complete ? "/dashboard" : "/onboarding");
    } catch (err) {
      const message = isAxiosError(err) ? err.response?.data?.detail : null;
      setError(message || "Couldn't log in. Check your email and password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 py-16 bg-paper-50">
      <FloatingBlobs />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center justify-center gap-2 font-display font-semibold text-xl text-ink-900 mb-8">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-900 text-teal-300">
            <Compass size={18} />
          </span>
          ScholarPath <span className="text-teal-500">AI</span>
        </Link>

        <div className="glass rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(11,17,32,0.1)]">
          <h1 className="font-display font-semibold text-2xl text-ink-950 mb-1">Welcome back</h1>
          <p className="text-sm text-ink-500 mb-7">Log in to continue your scholarship journey.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-stamp-red">
                {error}
              </motion.p>
            )}

            <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
              Log In <ArrowRight size={16} />
            </Button>
          </form>

          <p className="text-center text-sm text-ink-500 mt-7">
            Don't have an account?{" "}
            <Link to="/register" className="text-teal-600 font-semibold hover:text-teal-700">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
