// src/components/AdminLayout.jsx
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileCheck, 
  Users, 
  TrendingUp, 
  BarChart3,
  LogOut,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/loan-approval", label: "Loan Approval", icon: FileCheck },
    { path: "/beneficiaries", label: "Beneficiaries", icon: Users },
    { path: "/loan-tracking", label: "Loan Tracking", icon: TrendingUp },
    { path: "/reports", label: "Reports", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-muted">
      {/* Government Header */}
      <header className="bg-primary text-primary-foreground border-b-4 border-accent">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Shield className="h-12 w-12" />
          <div>
            <h1 className="text-xl font-bold">National Backward Classes Finance & Development Corporation</h1>
            <p className="text-sm opacity-90">Ministry of Social Justice & Empowerment, Government of India</p>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-sidebar border-r border-sidebar-border min-h-[calc(100vh-88px)] relative">
          <div className="p-6">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-sidebar-primary" />
              <div>
                <h2 className="font-bold text-sidebar-foreground">Admin Panel</h2>
                <p className="text-xs text-sidebar-foreground/60">Loan Management</p>
              </div>
            </div>
          </div>

          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary font-semibold"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-6 left-3 right-3">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50">
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Button>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
