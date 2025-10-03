import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileCheck, 
  Users, 
  TrendingUp, 
  BarChart3,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/loan-approval", label: "Loan Approval", icon: FileCheck },
    { path: "/beneficiaries", label: "Beneficiaries", icon: Users },
    { path: "/loan-tracking", label: "Loan Tracking", icon: TrendingUp },
    { path: "/reports", label: "Reports", icon: BarChart3 },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          <h1 className="text-xl font-bold text-sidebar-foreground">NBCFDC Admin</h1>
          <p className="text-sm text-sidebar-foreground/60 mt-1">Loan Management</p>
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
                      ? "bg-sidebar-accent text-sidebar-primary" 
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
  );
};

export default AdminLayout;
