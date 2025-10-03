import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Eye, CheckCircle, XCircle, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface LoanApplication {
  id: string;
  beneficiary: string;
  amount: number;
  creditScore: number;
  riskBand: "Low" | "Medium" | "High";
  applicationDate: string;
  status: "Pending" | "Approved" | "Rejected";
  email: string;
  phone: string;
  address: string;
  occupation: string;
  monthlyIncome: number;
  documents: { name: string; url: string }[];
}

const mockApplications: LoanApplication[] = [
  { 
    id: "LA001", 
    beneficiary: "Rajesh Kumar", 
    amount: 50000, 
    creditScore: 720, 
    riskBand: "Low", 
    applicationDate: "2025-09-28", 
    status: "Pending",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    address: "123, MG Road, Bangalore, Karnataka - 560001",
    occupation: "Small Business Owner",
    monthlyIncome: 35000,
    documents: [
      { name: "Aadhaar Card", url: "#" },
      { name: "PAN Card", url: "#" },
      { name: "Income Certificate", url: "#" },
      { name: "Bank Statement", url: "#" },
    ]
  },
  { 
    id: "LA002", 
    beneficiary: "Priya Sharma", 
    amount: 75000, 
    creditScore: 680, 
    riskBand: "Medium", 
    applicationDate: "2025-09-29", 
    status: "Pending",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43211",
    address: "456, Park Street, Kolkata, West Bengal - 700016",
    occupation: "Retail Shop Owner",
    monthlyIncome: 42000,
    documents: [
      { name: "Aadhaar Card", url: "#" },
      { name: "PAN Card", url: "#" },
      { name: "Business License", url: "#" },
      { name: "Income Tax Returns", url: "#" },
    ]
  },
  { 
    id: "LA003", 
    beneficiary: "Amit Patel", 
    amount: 100000, 
    creditScore: 750, 
    riskBand: "Low", 
    applicationDate: "2025-09-30", 
    status: "Pending",
    email: "amit.patel@email.com",
    phone: "+91 98765 43212",
    address: "789, Civil Lines, Ahmedabad, Gujarat - 380001",
    occupation: "Manufacturing Unit Owner",
    monthlyIncome: 55000,
    documents: [
      { name: "Aadhaar Card", url: "#" },
      { name: "PAN Card", url: "#" },
      { name: "Property Documents", url: "#" },
      { name: "GST Certificate", url: "#" },
    ]
  },
  { 
    id: "LA004", 
    beneficiary: "Sunita Reddy", 
    amount: 60000, 
    creditScore: 650, 
    riskBand: "Medium", 
    applicationDate: "2025-10-01", 
    status: "Pending",
    email: "sunita.reddy@email.com",
    phone: "+91 98765 43213",
    address: "321, Banjara Hills, Hyderabad, Telangana - 500034",
    occupation: "Food Processing Business",
    monthlyIncome: 38000,
    documents: [
      { name: "Aadhaar Card", url: "#" },
      { name: "PAN Card", url: "#" },
      { name: "Caste Certificate", url: "#" },
      { name: "Bank Statement", url: "#" },
    ]
  },
  { 
    id: "LA005", 
    beneficiary: "Vikram Singh", 
    amount: 45000, 
    creditScore: 580, 
    riskBand: "High", 
    applicationDate: "2025-10-01", 
    status: "Pending",
    email: "vikram.singh@email.com",
    phone: "+91 98765 43214",
    address: "654, Lajpat Nagar, New Delhi - 110024",
    occupation: "Handicraft Business",
    monthlyIncome: 28000,
    documents: [
      { name: "Aadhaar Card", url: "#" },
      { name: "PAN Card", url: "#" },
      { name: "Income Certificate", url: "#" },
    ]
  },
];

const LoanApproval = () => {
  const { toast } = useToast();
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);

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

        <Card className="shadow-sm border-2">
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
                    <TableCell>
                      <button 
                        onClick={() => setSelectedApplication(app)}
                        className="text-primary hover:underline font-medium"
                      >
                        {app.beneficiary}
                      </button>
                    </TableCell>
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
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => setSelectedApplication(app)}
                        >
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

      {/* Beneficiary Details Dialog */}
      <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Beneficiary Details</DialogTitle>
            <DialogDescription>
              Complete information for application {selectedApplication?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedApplication && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-4 text-foreground">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{selectedApplication.beneficiary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Occupation</p>
                    <p className="font-medium">{selectedApplication.occupation}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{selectedApplication.address}</p>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-4 text-foreground">Financial Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Loan Amount Requested</p>
                    <p className="font-medium text-xl">₹{selectedApplication.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Income</p>
                    <p className="font-medium text-xl">₹{selectedApplication.monthlyIncome.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Credit Score</p>
                    <p className="font-medium text-xl">{selectedApplication.creditScore}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Risk Band</p>
                    <Badge variant={getRiskBadgeVariant(selectedApplication.riskBand)} className="text-base px-3 py-1">
                      {selectedApplication.riskBand}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Uploaded Documents */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-4 text-foreground">Uploaded Documents</h3>
                <div className="space-y-2">
                  {selectedApplication.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="font-medium">{doc.name}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  className="flex-1"
                  onClick={() => {
                    handleApprove(selectedApplication.id, selectedApplication.beneficiary);
                    setSelectedApplication(null);
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Application
                </Button>
                <Button 
                  variant="destructive"
                  className="flex-1"
                  onClick={() => {
                    handleReject(selectedApplication.id, selectedApplication.beneficiary);
                    setSelectedApplication(null);
                  }}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Application
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default LoanApproval;
