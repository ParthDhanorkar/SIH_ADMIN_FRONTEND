import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Beneficiary {
  id: string;
  name: string;
  creditScore: number;
  riskBand: "Low" | "Medium" | "High";
  totalLoans: number;
  activeLoans: number;
  repaymentStatus: "Good" | "Warning" | "Default";
}

const mockBeneficiaries: Beneficiary[] = [
  { id: "BEN001", name: "Rajesh Kumar", creditScore: 720, riskBand: "Low", totalLoans: 3, activeLoans: 1, repaymentStatus: "Good" },
  { id: "BEN002", name: "Priya Sharma", creditScore: 680, riskBand: "Medium", totalLoans: 2, activeLoans: 1, repaymentStatus: "Good" },
  { id: "BEN003", name: "Amit Patel", creditScore: 750, riskBand: "Low", totalLoans: 4, activeLoans: 2, repaymentStatus: "Good" },
  { id: "BEN004", name: "Sunita Reddy", creditScore: 650, riskBand: "Medium", totalLoans: 2, activeLoans: 1, repaymentStatus: "Warning" },
  { id: "BEN005", name: "Vikram Singh", creditScore: 580, riskBand: "High", totalLoans: 1, activeLoans: 1, repaymentStatus: "Warning" },
];

const Beneficiaries = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBeneficiaries = mockBeneficiaries.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "Low": return "default";
      case "Medium": return "secondary";
      case "High": return "destructive";
      default: return "default";
    }
  };

  const getRepaymentBadgeVariant = (status: string) => {
    switch (status) {
      case "Good": return "default";
      case "Warning": return "secondary";
      case "Default": return "destructive";
      default: return "default";
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Beneficiary Management</h1>
          <p className="text-muted-foreground mt-2">View and manage beneficiary profiles</p>
        </div>

        <Card className="shadow-card mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>All Beneficiaries ({filteredBeneficiaries.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Beneficiary ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Credit Score</TableHead>
                  <TableHead>Risk Band</TableHead>
                  <TableHead>Total Loans</TableHead>
                  <TableHead>Active Loans</TableHead>
                  <TableHead>Repayment Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBeneficiaries.map((beneficiary) => (
                  <TableRow key={beneficiary.id}>
                    <TableCell className="font-medium">{beneficiary.id}</TableCell>
                    <TableCell>{beneficiary.name}</TableCell>
                    <TableCell>{beneficiary.creditScore}</TableCell>
                    <TableCell>
                      <Badge variant={getRiskBadgeVariant(beneficiary.riskBand)}>
                        {beneficiary.riskBand}
                      </Badge>
                    </TableCell>
                    <TableCell>{beneficiary.totalLoans}</TableCell>
                    <TableCell>{beneficiary.activeLoans}</TableCell>
                    <TableCell>
                      <Badge variant={getRepaymentBadgeVariant(beneficiary.repaymentStatus)}>
                        {beneficiary.repaymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4 mr-1" />
                        View Profile
                      </Button>
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

export default Beneficiaries;
