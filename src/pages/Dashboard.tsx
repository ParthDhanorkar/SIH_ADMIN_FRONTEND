import AdminLayout from "@/components/AdminLayout";
import StatCard from "@/components/StatCard";
import { Users, DollarSign, Clock, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here's your loan management summary.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Beneficiaries"
            value="1,248"
            icon={Users}
            trend="+12% from last month"
          />
          <StatCard
            title="Loans Approved"
            value="₹45.2L"
            icon={CheckCircle}
            trend="₹12.5L this month"
            variant="success"
          />
          <StatCard
            title="Pending Applications"
            value="38"
            icon={Clock}
            trend="Requires review"
            variant="warning"
          />
          <StatCard
            title="Default Rate"
            value="2.3%"
            icon={TrendingUp}
            trend="-0.5% improvement"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                Pending Loan Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                You have 38 loan applications waiting for review and approval.
              </p>
              <Button onClick={() => navigate("/loan-approval")} className="w-full">
                Review Applications
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Beneficiary Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                View and manage beneficiary profiles, credit scores, and loan history.
              </p>
              <Button onClick={() => navigate("/beneficiaries")} variant="outline" className="w-full">
                Manage Beneficiaries
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Risk Band Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Risk Band Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-muted-foreground">Low Risk</div>
                <div className="flex-1 h-8 bg-success/20 rounded-full overflow-hidden">
                  <div className="h-full bg-success" style={{ width: "65%" }}></div>
                </div>
                <div className="w-16 text-right text-sm font-medium">65%</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-muted-foreground">Medium Risk</div>
                <div className="flex-1 h-8 bg-warning/20 rounded-full overflow-hidden">
                  <div className="h-full bg-warning" style={{ width: "28%" }}></div>
                </div>
                <div className="w-16 text-right text-sm font-medium">28%</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-muted-foreground">High Risk</div>
                <div className="flex-1 h-8 bg-destructive/20 rounded-full overflow-hidden">
                  <div className="h-full bg-destructive" style={{ width: "7%" }}></div>
                </div>
                <div className="w-16 text-right text-sm font-medium">7%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
