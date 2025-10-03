import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoanApplication {
  id: string;
  beneficiary: string;
  amount: number;
  creditScore: number;
  riskBand: "Low" | "Medium" | "High";
  applicationDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

const mockApplications: LoanApplication[] = [
  { id: "LA001", beneficiary: "Rajesh Kumar", amount: 50000, creditScore: 720, riskBand: "Low", applicationDate: "2025-09-28", status: "Pending" },
  { id: "LA002", beneficiary: "Priya Sharma", amount: 75000, creditScore: 680, riskBand: "Medium", applicationDate: "2025-09-29", status: "Pending" },
  { id: "LA003", beneficiary: "Amit Patel", amount: 100000, creditScore: 750, riskBand: "Low", applicationDate: "2025-09-30", status: "Pending" },
  { id: "LA004", beneficiary: "Sunita Reddy", amount: 60000, creditScore: 650, riskBand: "Medium", applicationDate: "2025-10-01", status: "Pending" },
  { id: "LA005", beneficiary: "Vikram Singh", amount: 45000, creditScore: 580, riskBand: "High", applicationDate: "2025-10-01", status: "Pending" },
];

const LoanApproval = () => {
  const { toast } = useToast();

  const handleApprove = (id: string, beneficiary: string) => {
    toast({
      title: "Loan Approved",
      description: `Application ${id} for ${beneficiary} has been approved.`,
    });
  };

  const handleReject = (id: string, beneficiary: string) => {
    toast({
      title: "Loan Rejected",
      description: `Application ${id} for ${beneficiary} has been rejected.`,
      variant: "destructive",
    });
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "Low": return "default";
      case "Medium": return "secondary";
      case "High": return "destructive";
      default: return "default";
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Loan Approval Panel</h1>
          <p className="text-muted-foreground mt-2">Review and process pending loan applications</p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Pending Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Beneficiary</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Credit Score</TableHead>
                  <TableHead>Risk Band</TableHead>
                  <TableHead>Application Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.id}</TableCell>
                    <TableCell>{app.beneficiary}</TableCell>
                    <TableCell>₹{app.amount.toLocaleString()}</TableCell>
                    <TableCell>{app.creditScore}</TableCell>
                    <TableCell>
                      <Badge variant={getRiskBadgeVariant(app.riskBand)}>
                        {app.riskBand}
                      </Badge>
                    </TableCell>
                    <TableCell>{app.applicationDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => handleApprove(app.id, app.beneficiary)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleReject(app.id, app.beneficiary)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default LoanApproval;
