// src/pages/ApproveRejectLoan.jsx
import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ScoreBreakdownDialog from "../components/ScoreBreakdownDialog";
import ReviewApplicationDialog from "../components/ReviewApplicationDialog";

// Mock data
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
    status: "Approved",
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
    status: "Approved",
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
    status: "Rejected",
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
    status: "Rejected",
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
    status: "Approved",
  },
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
    status: "Approved",
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
    status: "Approved",
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
    status: "Rejected",
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
    status: "Rejected",
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
    status: "Approved",
  },
];

const ApproveRejectLoan = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [scoreBreakdown, setScoreBreakdown] = useState(null);

  // Filter states for Approved
  const [approvedSearch, setApprovedSearch] = useState("");
  const [approvedScheme, setApprovedScheme] = useState("all");
  const [approvedRiskBand, setApprovedRiskBand] = useState("all");

  // Filter states for Rejected
  const [rejectedSearch, setRejectedSearch] = useState("");
  const [rejectedScheme, setRejectedScheme] = useState("all");
  const [rejectedRiskBand, setRejectedRiskBand] = useState("all");

  const handleApprove = (application) => {
    updateStatus(application.id, "Approved");
  };

  const handleReject = (application) => {
    updateStatus(application.id, "Rejected");
  };

  const updateStatus = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    toast({
      title: `Application ${newStatus}`,
      description: `Application ${id} has been marked as ${newStatus}.`,
      variant: newStatus === "Rejected" ? "destructive" : "default",
    });
  };

  // Get unique schemes for filter dropdown
  const uniqueSchemes = [...new Set(applications.map(app => app.scheme))];

  // Filter function
  const filterApplications = (data, searchTerm, selectedScheme, selectedRiskBand) => {
    return data.filter((app) => {
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
  };

  const input = {
    "loan_application": {
      "ration_card_number": null
    },
    "beneficiary": {
      "full_name": "Lila Krishna",
      "age": 38,
      "gender": "male",
      "phone_no": "9112351066",
      "address": "03/425, Seshadri Zila, Amravati 589136",
      "income_yearly": 325747,
      "state": "Maharashtra",
      "district": "Pune",
      "occupation": "Salaried_Govt",
      "registration_date": "2025-07-20",
      "password": "jX%p0C1bE&",
      "caste": null
    },
    "apply_for_loan": {
      "desired_loan_amount": 55555,
      "desired_tenure": 99,
      "purpose_of_loan": "personal amount hbc"
    },
    "track_application": {
      "applied_on": "2025-12-08T23:43:39.154587+00:00",
      "loan_amount_applied": "55555",
      "scheme": "Micro-Finance – Small Loan for Individuals",
      "tenure_applied": 99,
      "loan_amount_approved": null,
      "tenure_approved": null,
      "final_accept_by_user": null,
      "status": null
    },
    "bank_details": {
      "account_holder_name": "NA",
      "bank_name": "NA",
      "account_no": "0",
      "ifsc_code": "NA000000000",
      "branch_name": "NA",
      "upi_id": "NA"
    },
    "expenses_and_comodities": {
      "elec_account_no": null,
      "user_provider_avg_recharge_amount": null,
      "user_provider_avg_recharge_frequency": null,
      "user_provider_name": null,
      "api_provider_avg_recharge_amount": null,
      "api_provider_avg_recharge_frequency": null,
      "api_provider_name": null,
      "user_lpg_consumer_no": null,
      "user_refills_in_last_3m": null,
      "user_average_refill_cost": null,
      "user_average_refill_interval_days": null,
      "provider_lpg_consumer_no": null,
      "provider_refills_in_last_3m": null,
      "provider_average_refill_cost": null,
      "provider_average_refill_interval_days": null,
      "remarks": null
    },
    "income_asset": {
      "primary_income_source": "coding coding",
      "monthly_income": 6969,
      "annual_income": 59595,
      "asset_count": 5,
      "estimated_asset_value": 10000
    },
    "beneficiary_status": {
      "mgnrega": false,
      "pm_ujjwala_yojana": false,
      "pm_jay": false,
      "enrolled_in_pension_scheme": false
    },
    "electricity_bill": {
      "elec_account_no": "EACC-990012549935-4173",
      "elec_total_bills": 3,
      "elec_total_bill_amt_3m": 3603,
      "elec_avg_bill_amt_3m": 1201,
      "elec_on_time_bills_3m": 2,
      "elec_late_bills_3m": 1,
      "elec_total_delay_days_3m": 4,
      "elec_max_delay_days_3m": 4,
      "elec_outstanding_amount_current": 150,
      "sudden_drop_index": -2.07,
      "flag": 1
    },
    "water_bill": {
      "water_total_bills_3m": 3,
      "water_on_time_bills_3m": 1,
      "water_late_bills_3m": 3,
      "water_total_delay_days_3m": 2,
      "water_max_delay_days_3m": 5,
      "water_any_disconnection_flag": 1,
      "water_outstanding_amt_current": 885.51
    },
    "ration_card": {
      "ration_card_no": "766501136157",
      "family_head_name": "Lila Krishna",
      "aadhar_no_masked": "XXXX-XXXX-9935",
      "household_size": 4,
      "earners_cnt": 3,
      "dependents_cnt": 1,
      "dependency_ratio": 0.33,
      "ration_card_category": "BPL"
    }
  }

  function mapToModel(input, previousLoans = []) {
    const appliedDate = new Date(input.track_application.applied_on);
    const today = new Date();
    // Calculate repayments
    const diffMonths =
      (today.getFullYear() - appliedDate.getFullYear()) * 12 +
      (today.getMonth() - appliedDate.getMonth());
    const repayments_made = diffMonths > 0 ? diffMonths : 0;

    const loanAmountSanctioned = Number(input.track_application.loan_amount_applied) || 0;
    const loanAmountDisbursed = Number(input.track_application.loan_amount_approved) || 0;

    const emi = input.apply_for_loan?.emi_amount || 0;
    const totalAmountRepaid = emi * repayments_made;

    const previousLoansCount = previousLoans.length;
    const repeatBorrowerFlag = previousLoansCount > 0 ? 1 : 0;

    // Electricity and Water derived
    const totalBills =
      (input.electricity_bill?.elec_total_bills || 0) +
      (input.water_bill?.water_total_bills_3m || 0);

    const onTimeBills =
      (input.electricity_bill?.elec_on_time_bills_3m || 0) +
      (input.water_bill?.water_on_time_bills_3m || 0);

    const utilOnTimeRatio = totalBills > 0 ? (onTimeBills / totalBills) : 0;

    const avgDelay =
      ((input.electricity_bill?.elec_total_delay_days_3m || 0) +
        (input.water_bill?.water_total_delay_days_3m || 0)) / 2;

    const maxDelay = Math.max(
      input.electricity_bill?.elec_max_delay_days_3m || 0,
      input.water_bill?.water_max_delay_days_3m || 0
    );

    const outstanding =
      (input.electricity_bill?.elec_outstanding_amount_current || 0) +
      (input.water_bill?.water_outstanding_amt_current || 0);

    return {
      // CRITICAL
      loan_amount_sanctioned: loanAmountSanctioned,
      loan_amount_disbursed: loanAmountDisbursed,
      loan_tenure_months: input.track_application.tenure_approved || 0,
      interest_rate: input.apply_for_loan?.interest_rate || 12,
      emi_amount: emi,
      repayments_made: repayments_made,
      total_amount_repaid: totalAmountRepaid,

      // RANDOM 0–5 (as requested)
      dpd_days: Math.floor(Math.random() * 6), // 0,1,2,3,4,5

      default_flag: 0,
      npa_status: 0,

      repeat_borrower_flag: repeatBorrowerFlag,
      previous_loans_count: previousLoansCount,
      previous_defaults_count: 0,

      // SMART DEFAULTS (NO RANDOM)
      loan_utilization_match_flag: input.apply_for_loan?.purpose_of_loan ? 1 : 0,
      cashflow_seasonality_score:
        input.beneficiary.occupation === "Salaried_Govt" ? 0 : 2,
      inventory_purchase_ratio:
        input.beneficiary.occupation === "business" ? 0.6 : 0.2,
      business_monthly_revenue: input.income_asset.monthly_income || 0,
      business_operational_years:
        input.beneficiary.registration_date
          ? calculateYears(input.beneficiary.registration_date)
          : 1
      ,

      // UTILITIES (COMPUTED)
      util_on_time_ratio: utilOnTimeRatio,
      util_avg_delay_days: avgDelay,
      util_max_delay_days: maxDelay,
      util_total_outstanding_12m: outstanding,
      util_any_outstanding_flag: outstanding > 0 ? 1 : 0
    };
  }

  const ans = mapToModel();


  const renderTable = (label, data, searchTerm, setSearchTerm, selectedScheme, setSelectedScheme, selectedRiskBand, setSelectedRiskBand) => {
    const filteredData = filterApplications(data, searchTerm, selectedScheme, selectedRiskBand);

    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{label}</CardTitle>

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
            Showing {filteredData.length} of {data.length} applications
          </div>
        </CardHeader>

        <CardContent>
          <div className="border rounded-md">
            {/* FIXED HEADER */}
            <Table className="w-full border-collapse">
              <TableHeader className="sticky top-0 bg-white z-20 shadow-md">
                <TableRow>
                  <TableHead className="w-[100px]">Application ID</TableHead>
                  <TableHead className="w-[200px]">Scheme</TableHead>
                  <TableHead className="w-[200px]">Loan Amount</TableHead>
                  <TableHead className="w-[150px]">Tenure</TableHead>
                  <TableHead className="w-[200px]">Approval %</TableHead>
                  <TableHead>Band Classification</TableHead>
                </TableRow>
              </TableHeader>
            </Table>

            {/* SCROLLABLE BODY */}
            <div className="max-h-72 overflow-y-auto">
              <Table className="w-full border-collapse">
                <TableBody>
                  {filteredData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                        No applications found matching your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredData.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell>
                          <span className="px-2 py-1 text-xs bg-gray-100 rounded-md w-[50px]">{app.id}</span>
                        </TableCell>
                        <TableCell className="w-[200px]">{app.scheme}</TableCell>
                        <TableCell className="w-[180px]">₹{app.amount.toLocaleString()}</TableCell>
                        <TableCell className="w-[150px]">{app.tenure} months</TableCell>

                        <TableCell className="w-[160px]">
                          <div
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm cursor-pointer hover:bg-blue-100"
                            onClick={() => setScoreBreakdown(app)}
                          >
                            {(app.finalEligibilityScore * 100).toFixed(1)}%
                          </div>
                        </TableCell>

                        <TableCell>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${app.bandClassification.includes("Low Risk")
                              ? "bg-green-100 text-green-700"
                              : app.bandClassification.includes("Medium Risk")
                                ? "bg-orange-100 text-orange-700"
                                : "bg-red-100 text-red-700"
                              }`}
                          >
                            {app.bandClassification}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {renderTable(
          "Approved Applications",
          applications.filter((a) => a.status === "Approved"),
          approvedSearch,
          setApprovedSearch,
          approvedScheme,
          setApprovedScheme,
          approvedRiskBand,
          setApprovedRiskBand
        )}

        {renderTable(
          "Rejected Applications",
          applications.filter((a) => a.status === "Rejected"),
          rejectedSearch,
          setRejectedSearch,
          rejectedScheme,
          setRejectedScheme,
          rejectedRiskBand,
          setRejectedRiskBand
        )}
      </div>

      {/* Dialogs */}
      <ScoreBreakdownDialog scoreBreakdown={scoreBreakdown} onClose={() => setScoreBreakdown(null)} />

      <ReviewApplicationDialog
        selectedApplication={selectedApplication}
        onClose={() => setSelectedApplication(null)}
        handleApprove={handleApprove}
        handleReject={handleReject}
      />
    </AdminLayout>
  );
};

export default ApproveRejectLoan;