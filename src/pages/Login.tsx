import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { supabase } from "../lib/supabase";
import { Plus } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else navigate("/");
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans items-center">
      <div className="w-full sm:max-w-[420px] px-4 sm:px-0">
        <div className="bg-[#0f0f13] sm:rounded-2xl border border-white/[0.08] p-10 shadow-2xl">
          
          <div className="flex items-center gap-2 mb-10">
            <div className="bg-indigo-500 rounded text-white p-1 flex items-center justify-center">
              <Plus size={18} strokeWidth={3} />
            </div>
            <span className="text-white font-bold text-[18px] tracking-tight">RAG Chat</span>
          </div>

          <h2 className="text-[26px] font-bold text-white mb-2 tracking-tight">Welcome back</h2>
          <p className="text-sm text-slate-500 mb-8 font-medium">Sign in to access your knowledge base.</p>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            type="button"
            className="w-full flex justify-center items-center py-2.5 px-4 border border-white/[0.12] rounded-[8px] text-sm font-medium text-slate-200 bg-transparent hover:bg-white/[0.02] transition-colors focus:outline-none focus:ring-1 focus:ring-white/20 h-11"
          >
            <svg className="w-[18px] h-[18px] mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.06]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-[#0f0f13] text-slate-600 uppercase font-medium tracking-widest text-[11px]">OR</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleEmailLogin}>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            
            <div>
              <label className="block text-[13px] font-medium text-slate-400 mb-2">Email</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/[0.04] border-white/[0.08] text-white rounded-[8px] focus-visible:ring-1 focus-visible:ring-white/20 h-11 shadow-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-slate-400 mb-2">Password</label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/[0.04] border-white/[0.08] text-white rounded-[8px] focus-visible:ring-1 focus-visible:ring-white/20 h-11 shadow-none tracking-widest placeholder:tracking-normal"
                placeholder="••••••••"
              />
              <div className="mt-3 flex justify-end">
                <a href="#" className="text-[13px] text-slate-500 hover:text-slate-300 transition-colors font-medium">Forgot password?</a>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={loading} className="w-full bg-transparent hover:bg-white/[0.04] border border-white/[0.12] text-white rounded-[8px] h-11 font-medium transition-all shadow-none">
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center text-[13px] text-slate-500 flex justify-center items-center gap-1.5 font-medium">
            <span>No account?</span>
            <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 transition-colors">Create one free</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
