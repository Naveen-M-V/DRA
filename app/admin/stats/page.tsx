"use client";

import { useState, useEffect } from "react";
import { getLeadStats } from "@/lib/leadsStorage";

export default function StatsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    // Check if already authenticated in session storage
    const auth = sessionStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchStats();
    }
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats");
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem("adminAuth", "true");
        setIsAuthenticated(true);
        fetchStats();
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#073a2f] text-white flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-[#0a4a3b] p-8 rounded-lg border border-[#FFB800]/30">
          <h1 className="text-3xl font-bold mb-6 font-serif-display text-center">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[#073a2f] border border-[#FFB800]/30 rounded-lg focus:outline-none focus:border-[#FFB800] text-white"
                placeholder="Enter admin password"
                required
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFB800] text-black font-bold py-2 px-4 rounded-lg hover:bg-[#FFD700] transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-[#073a2f] text-white flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#073a2f] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold font-serif-display">Lead Statistics</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {/* Total Leads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#0a4a3b] p-6 rounded-lg border border-[#FFB800]/30">
            <p className="text-[#FFB800] text-sm font-semibold mb-2">Total Leads</p>
            <p className="text-4xl font-bold">{stats.totalLeads}</p>
          </div>

          <div className="bg-[#0a4a3b] p-6 rounded-lg border border-[#FFB800]/30">
            <p className="text-[#FFB800] text-sm font-semibold mb-2">Projects</p>
            <p className="text-lg">
              {Object.keys(stats.byProject).length > 0
                ? Object.keys(stats.byProject).join(", ")
                : "None"}
            </p>
          </div>

          <div className="bg-[#0a4a3b] p-6 rounded-lg border border-[#FFB800]/30">
            <p className="text-[#FFB800] text-sm font-semibold mb-2">Campaigns</p>
            <p className="text-lg">
              {Object.keys(stats.byCampaign).length}
            </p>
          </div>
        </div>

        {/* By Project */}
        {Object.keys(stats.byProject).length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 font-serif-display">Leads by Project</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(stats.byProject).map(([project, count]) => (
                <div
                  key={project}
                  className="bg-[#0a4a3b] p-4 rounded-lg border border-[#FFB800]/20"
                >
                  <p className="text-gray-300 text-sm">{project}</p>
                  <p className="text-3xl font-bold text-[#FFB800] mt-2">{count}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* By Campaign */}
        {Object.keys(stats.byCampaign).length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 font-serif-display">Leads by Campaign</h2>
            <div className="bg-[#0a4a3b] rounded-lg border border-[#FFB800]/20 overflow-hidden">
              {Object.entries(stats.byCampaign).map(([campaign, count], idx) => (
                <div
                  key={campaign}
                  className={`p-4 flex justify-between ${
                    idx !== Object.entries(stats.byCampaign).length - 1
                      ? "border-b border-[#FFB800]/10"
                      : ""
                  }`}
                >
                  <p className="text-gray-300">{campaign}</p>
                  <p className="text-[#FFB800] font-bold">{count}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* By Date */}
        {Object.keys(stats.byDate).length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 font-serif-display">Leads by Date</h2>
            <div className="bg-[#0a4a3b] rounded-lg border border-[#FFB800]/20 overflow-hidden">
              {Object.entries(stats.byDate)
                .reverse()
                .map(([date, count], idx) => (
                  <div
                    key={date}
                    className={`p-4 flex justify-between ${
                      idx !== Object.entries(stats.byDate).length - 1
                        ? "border-b border-[#FFB800]/10"
                        : ""
                    }`}
                  >
                    <p className="text-gray-300">{date}</p>
                    <p className="text-[#FFB800] font-bold">{count}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Recent Leads */}
        {stats.recentLeads.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 font-serif-display">Recent Leads</h2>
            <div className="bg-[#0a4a3b] rounded-lg border border-[#FFB800]/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#FFB800]/20 bg-[#062f27]">
                      <th className="px-4 py-3 text-left text-[#FFB800]">Name</th>
                      <th className="px-4 py-3 text-left text-[#FFB800]">Email</th>
                      <th className="px-4 py-3 text-left text-[#FFB800]">Phone</th>
                      <th className="px-4 py-3 text-left text-[#FFB800]">Project</th>
                      <th className="px-4 py-3 text-left text-[#FFB800]">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentLeads.map((lead, idx) => (
                      <tr
                        key={lead.id}
                        className={`${
                          idx !== stats.recentLeads.length - 1
                            ? "border-b border-[#FFB800]/10"
                            : ""
                        }`}
                      >
                        <td className="px-4 py-3 text-gray-200">{lead.name}</td>
                        <td className="px-4 py-3 text-gray-300 text-xs">{lead.email}</td>
                        <td className="px-4 py-3 text-gray-300">{lead.phone}</td>
                        <td className="px-4 py-3 text-gray-300">{lead.project}</td>
                        <td className="px-4 py-3 text-gray-400 text-xs">
                          {new Date(lead.submittedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {stats.totalLeads === 0 && (
          <div className="bg-[#0a4a3b] p-8 rounded-lg border border-[#FFB800]/20 text-center">
            <p className="text-gray-400">No leads submitted yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
