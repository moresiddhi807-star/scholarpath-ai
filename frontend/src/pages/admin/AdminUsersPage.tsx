import { useEffect, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { adminApi } from "../../lib/api";
import type { User } from "../../types";

export function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const load = async () => {
    setIsLoading(true);
    const data = await adminApi.listUsers();
    setUsers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleActive = async (user: User) => {
    setUpdatingId(user.id);
    const updated = user.is_active === false ? await adminApi.activateUser(user.id) : await adminApi.deactivateUser(user.id);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    setUpdatingId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-semibold text-2xl text-ink-950">Manage Users</h1>
        <p className="text-ink-500 mt-1 text-sm">{users.length} registered accounts.</p>
      </div>

      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-12 skeleton rounded-lg" />)}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-left text-xs text-ink-400 uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Onboarded</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-ink-50 hover:bg-ink-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-ink-900">{u.full_name}</td>
                  <td className="px-5 py-3.5 text-ink-500">{u.email}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={u.role === "admin" ? "amber" : "ink"}>{u.role}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    {u.onboarding_complete ? <Badge variant="teal">Yes</Badge> : <Badge variant="outline">No</Badge>}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    {u.role !== "admin" && (
                      <Button size="sm" variant="outline" onClick={() => toggleActive(u)} isLoading={updatingId === u.id}>
                        {u.is_active === false ? "Activate" : "Deactivate"}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
