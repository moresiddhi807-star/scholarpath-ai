import { NavLink, Outlet, Link } from "react-router-dom";
import { Compass, GraduationCap, Users, ArrowLeft } from "lucide-react";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-paper-50">
      <header className="border-b border-ink-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="flex items-center gap-2 font-display font-semibold text-ink-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 text-teal-300">
                <Compass size={16} />
              </span>
              ScholarPath
            </Link>
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">Admin</span>
          </div>
          <Link to="/dashboard" className="flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 transition-colors">
            <ArrowLeft size={15} /> Back to app
          </Link>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex gap-1 -mb-px">
          <NavLink
            to="/admin/scholarships"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                isActive ? "border-ink-900 text-ink-900" : "border-transparent text-ink-400 hover:text-ink-700"
              }`
            }
          >
            <GraduationCap size={16} /> Scholarships
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                isActive ? "border-ink-900 text-ink-900" : "border-transparent text-ink-400 hover:text-ink-700"
              }`
            }
          >
            <Users size={16} /> Users
          </NavLink>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
