import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  LayoutDashboard,
  GraduationCap,
  Target,
  FileCheck2,
  Map,
  UserCircle,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/dashboard/scholarships", label: "Scholarships", icon: GraduationCap },
  { to: "/dashboard/readiness", label: "Readiness Score", icon: Target },
  { to: "/dashboard/documents", label: "Documents", icon: FileCheck2 },
  { to: "/dashboard/roadmap", label: "Roadmap", icon: Map },
  { to: "/dashboard/profile", label: "Profile", icon: UserCircle },
];

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-paper-50 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-ink-100 bg-white shrink-0 h-screen sticky top-0">
        <SidebarContent user={user} onLogout={handleLogout} />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-ink-950/40 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 w-64 bg-white z-50 lg:hidden flex flex-col"
            >
              <SidebarContent user={user} onLogout={handleLogout} onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-4 h-16 border-b border-ink-100 bg-white sticky top-0 z-30">
          <Link to="/" className="flex items-center gap-2 font-display font-semibold text-ink-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 text-teal-300">
              <Compass size={16} />
            </span>
            ScholarPath
          </Link>
          <button onClick={() => setMobileOpen(true)} className="p-2 text-ink-700" aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>

        <main className="p-5 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarContent({
  user,
  onLogout,
  onNavigate,
}: {
  user: ReturnType<typeof useAuth>["user"];
  onLogout: () => void;
  onNavigate?: () => void;
}) {
  const initials = user?.full_name
    ?.split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 h-16 border-b border-ink-100">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold text-ink-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 text-teal-300">
            <Compass size={16} />
          </span>
          ScholarPath
        </Link>
        {onNavigate && (
          <button onClick={onNavigate} className="p-1 text-ink-500 lg:hidden" aria-label="Close menu">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive ? "bg-ink-900 text-paper-50" : "text-ink-600 hover:bg-ink-100 hover:text-ink-900"
              }`
            }
          >
            <item.icon size={18} strokeWidth={2} />
            {item.label}
          </NavLink>
        ))}

        {user?.role === "admin" && (
          <NavLink
            to="/admin"
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors mt-4 border-t border-ink-100 pt-4 ${
                isActive ? "bg-amber-100 text-amber-700" : "text-ink-600 hover:bg-ink-100 hover:text-ink-900"
              }`
            }
          >
            <ShieldCheck size={18} strokeWidth={2} />
            Admin Panel
          </NavLink>
        )}
      </nav>

      <div className="px-3 py-4 border-t border-ink-100">
        <div className="flex items-center gap-3 px-2 py-2 mb-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-teal-700 font-semibold text-sm shrink-0">
            {initials || "?"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink-900 truncate">{user?.full_name}</p>
            <p className="text-xs text-ink-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-500 hover:bg-red-50 hover:text-stamp-red transition-colors"
        >
          <LogOut size={18} strokeWidth={2} />
          Log out
        </button>
      </div>
    </div>
  );
}
