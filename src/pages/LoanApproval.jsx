// src/pages/LoanApproval.jsx
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, CheckCircle, XCircle, FileText, Download, Info, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import ScoreBreakdownDialog from "../components/ScoreBreakdownDialog";
import ReviewApplicationDialog from "../components/ReviewApplicationDialog";

// Updated Mock Data with new AI attributes
const mockApplications = [
  {
    id: "LA001",
    scheme: "Micro Enterprise Loan",
    beneficiary: "Rajesh Kumar",
    amount: 50000,
    tenure: 24,
    creditScore: 720,
    riskScore: 0.12,
    fraudProbability: 0.02,
    needScore: 0.85,
    estimatedIncome: 35000,
    estimatedSafeLoan: 80000,
    bandClassification: "Low Risk - High Need",
    finalEligibilityScore: 0.89,
    applicationDate: "2025-09-28",
    status: "Pending",
  },
  {
    id: "LA002",
    scheme: "Self Employment Loan",
    beneficiary: "Priya Sharma",
    amount: 75000,
    tenure: 36,
    creditScore: 680,
    riskScore: 0.28,
    fraudProbability: 0.05,
    needScore: 0.65,
    estimatedIncome: 42000,
    estimatedSafeLoan: 70000,
    bandClassification: "Medium Risk - Medium Need",
    finalEligibilityScore: 0.71,
    applicationDate: "2025-09-29",
    status: "Pending",
  },
  {
    id: "LA003",
    scheme: "Small Business Loan",
    beneficiary: "Amit Patel",
    amount: 100000,
    tenure: 48,
    creditScore: 750,
    riskScore: 0.08,
    fraudProbability: 0.01,
    needScore: 0.92,
    estimatedIncome: 55000,
    estimatedSafeLoan: 120000,
    bandClassification: "Low Risk - High Need",
    finalEligibilityScore: 0.94,
    applicationDate: "2025-09-30",
    status: "Pending",
  },
  {
    id: "LA004",
    scheme: "Women Entrepreneurship Loan",
    beneficiary: "Sunita Reddy",
    amount: 60000,
    tenure: 24,
    creditScore: 650,
    riskScore: 0.32,
    fraudProbability: 0.03,
    needScore: 0.74,
    estimatedIncome: 38000,
    estimatedSafeLoan: 65000,
    bandClassification: "Medium Risk - High Need",
    finalEligibilityScore: 0.64,
    applicationDate: "2025-10-01",
    status: "Pending",
  },
  {
    id: "LA005",
    scheme: "Artisan Support Loan",
    beneficiary: "Vikram Singh",
    amount: 45000,
    tenure: 12,
    creditScore: 580,
    riskScore: 0.52,
    fraudProbability: 0.09,
    needScore: 0.55,
    estimatedIncome: 28000,
    estimatedSafeLoan: 40000,
    bandClassification: "High Risk - Medium Need",
    finalEligibilityScore: 0.42,
    applicationDate: "2025-10-01",
    status: "Pending",
  },
];

const LoanApproval = () => {
  const { toast } = useToast();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [scoreBreakdown, setScoreBreakdown] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScheme, setSelectedScheme] = useState("all");
  const [selectedRiskBand, setSelectedRiskBand] = useState("all");

  const handleApprove = (app) => {
    toast({
      title: "Loan Approved",
      description: `Application ${app.id} for ${app.beneficiary} has been approved.`,
    });
  };

  const handleReject = (app) => {
    toast({
      title: "Loan Rejected",
      description: `Application ${app.id} for ${app.beneficiary} has been rejected.`,
      variant: "destructive",
    });
  };

  const getScoreBadge = (score) => {
    if (score >= 0.8) return "success";
    if (score >= 0.6) return "secondary";
    if (score >= 0.4) return "warning";
    return "destructive";
  };

  // Get unique schemes for filter dropdown
  const uniqueSchemes = [...new Set(mockApplications.map(app => app.scheme))];

  // Filter applications
  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch = 
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.beneficiary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.scheme.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesScheme = 
      selectedScheme === "all" || app.scheme === selectedScheme;
    
    const matchesRiskBand = 
      selectedRiskBand === "all" || 
      (selectedRiskBand === "low" && app.bandClassification.includes("Low Risk")) ||
      (selectedRiskBand === "medium" && app.bandClassification.includes("Medium Risk")) ||
      (selectedRiskBand === "high" && app.bandClassification.includes("High Risk"));
    
    return matchesSearch && matchesScheme && matchesRiskBand;
  });

  return (
    <AdminLayout>
      <div className="p-8">
        <Card className="shadow border h-[80vh]">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-foreground">Pending Applications</CardTitle>
            
            {/* Filter Controls */}
            <div className="flex gap-4 mt-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by ID, beneficiary, or scheme..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Scheme Filter */}
              <Select value={selectedScheme} onValueChange={setSelectedScheme}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Filter by Scheme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Schemes</SelectItem>
                  {uniqueSchemes.map((scheme) => (
                    <SelectItem key={scheme} value={scheme}>
                      {scheme}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Risk Band Filter */}
              <Select value={selectedRiskBand} onValueChange={setSelectedRiskBand}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by Risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Bands</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Counter */}
            <div className="text-sm text-muted-foreground mt-2">
              Showing {filteredApplications.length} of {mockApplications.length} applications
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden">
            <div className="relative border rounded-md flex flex-col h-[50vh]">
              <Table className="w-full border-collapse">
                <TableHeader className="sticky top-0 bg-white z-50 shadow-md">
                  <TableRow className="hover:bg-gray-50 transition">
                    <TableHead>Application ID</TableHead>
                    <TableHead>Scheme</TableHead>
                    <TableHead>Loan Amount</TableHead>
                    <TableHead>Tenure</TableHead>
                    <TableHead>Approval %</TableHead>
                    <TableHead>Band Classification</TableHead>
                    <TableHead className="text-center">Preview</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredApplications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No applications found matching your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredApplications.map((app) => (
                      <TableRow key={app.id} className="hover:bg-gray-50">
                        <TableCell>
                          <span className="px-2 py-1 text-xs bg-gray-100 rounded-md">{app.id}</span>
                        </TableCell>

                        <TableCell>{app.scheme}</TableCell>
                        <TableCell>₹{app.amount.toLocaleString()}</TableCell>
                        <TableCell>{app.tenure} months</TableCell>

                        <TableCell>
                          <div
                            onClick={() => setScoreBreakdown(app)}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm cursor-pointer hover:bg-blue-100 transition"
                          >
                            {(app.finalEligibilityScore * 100).toFixed(1)}%
                          </div>
                        </TableCell>

                        <TableCell>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              app.bandClassification.includes("Low Risk")
                                ? "bg-green-100 text-green-700"
                                : app.bandClassification.includes("Medium Risk")
                                ? "bg-orange-100 text-orange-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {app.bandClassification}
                          </span>
                        </TableCell>

                        <TableCell className="text-center">
                          <button
                            onClick={() => setSelectedApplication(app)}
                            className="p-2 rounded-full hover:bg-gray-100 transition"
                          >
                            <Eye className="h-4 w-4 text-gray-600" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <ScoreBreakdownDialog 
        scoreBreakdown={scoreBreakdown}
        onClose={() => setScoreBreakdown(null)}
      />

      <ReviewApplicationDialog
        selectedApplication={selectedApplication}
        onClose={() => setSelectedApplication(null)}
        handleApprove={handleApprove}
        handleReject={handleReject}
      />
    </AdminLayout>
  );
};

export default LoanApproval;