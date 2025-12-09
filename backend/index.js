// index.js (CommonJS Version)
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");
const loanApprovalRoute = require("./routes/loanApprovalRoute.js");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Helper to remove duplicate columns
const clean = (obj = null) => {
  if (!obj) return null;

  const remove = [
    "aadhaar_no",
    "aadhar_no",
    "loan_application_id",
    "created_at",
    "updated_at",
  ];

  for (const key of remove) delete obj[key];
  return obj;
};

app.get("/loan/:loanId", async (req, res) => {
  const { loanId } = req.params;

  try {
    // -----------------------------------
    // 1️⃣ First fetch Aadhar from Track Application
    // -----------------------------------
    const { data: trackAppAadhar } = await supabase
      .from("track_application")
      .select("aadhar_no")
      .eq("loan_application_id", loanId)
      .single();

    if (!trackAppAadhar)
      return res.status(404).json({ error: "Aadhar not found for this loan" });

    const aadhar = trackAppAadhar.aadhar_no;

    // -----------------------------------
    // 2️⃣ Loan Application
    // -----------------------------------
    const { data: loanApp } = await supabase
      .from("loan_applications")
      .select("*")
      .eq("loan_application_id", loanId)
      .eq("aadhaar_no", aadhar)
      .single();

    if (!loanApp)
      return res.status(404).json({ error: "Loan application not found" });

    // -----------------------------------
    // 3️⃣ Beneficiary
    // -----------------------------------
    const { data: beneficiary } = await supabase
      .from("beneficiary")
      .select("*")
      .eq("aadhar_no", aadhar)
      .single();

    // -----------------------------------
    // 4️⃣ Apply For Loan
    // -----------------------------------
    const { data: applyForLoan } = await supabase
      .from("apply_for_loan")
      .select("*")
      .eq("loan_application_id", loanId)
      .eq("aadhaar_no", aadhar);

    // -----------------------------------
    // 5️⃣ Track Application (full data)
    // -----------------------------------
    const { data: trackApplication } = await supabase
      .from("track_application")
      .select("*")
      .eq("loan_application_id", loanId)
      .eq("aadhar_no", aadhar);

    // -----------------------------------
    // 6️⃣ Bank Details
    // -----------------------------------
    const { data: bankDetails } = await supabase
      .from("bank_details")
      .select("*")
      .eq("loan_application_id", loanId)
      .eq("aadhaar_no", aadhar);

    // -----------------------------------
    // 7️⃣ Expenses & Commodities
    // -----------------------------------
    const { data: expenses } = await supabase
      .from("expenses_and_comodities")
      .select("*")
      .eq("loan_application_id", loanId)
      .eq("aadhar_no", aadhar);

    // -----------------------------------
    // 8️⃣ Income & Asset
    // -----------------------------------
    const { data: incomeAsset } = await supabase
      .from("income_asset")
      .select("*")
      .eq("loan_application_id", loanId)
      .eq("aadhar_no", aadhar);

    // -----------------------------------
    // 9️⃣ Beneficiary Status
    // -----------------------------------
    const { data: beneficiaryStatus } = await supabase
      .from("beneficiary_status")
      .select("*")
      .eq("loan_application_id", loanId)
      .eq("aadhaar_no", aadhar);

    // -----------------------------------
    // 🔟 Electricity Bill
    // -----------------------------------
    const { data: electricityBill } = await supabase
      .from("electricity_bill")
      .select("*")
      .eq("aadhar_no", aadhar);

    // -----------------------------------
    // 11️⃣ Water Bill
    // -----------------------------------
    const { data: waterBill } = await supabase
      .from("water_bill")
      .select("*")
      .eq("aadhar_no", aadhar);

    // -----------------------------------
    // 12️⃣ Ration Card (masked)
    // -----------------------------------
    const { data: rationCard } = await supabase
      .from("ration_card")
      .select("*")
      .like("aadhar_no_masked", `%${aadhar.slice(-4)}`);

    // -----------------------------------
    // Merge all results
    // -----------------------------------
    const finalOut = {
      loan_application: clean(loanApp),
      beneficiary: clean(beneficiary),
      apply_for_loan: clean(applyForLoan?.[0]),
      track_application: clean(trackApplication?.[0]),
      bank_details: clean(bankDetails?.[0]),
      expenses_and_comodities: clean(expenses?.[0]),
      income_asset: clean(incomeAsset?.[0]),
      beneficiary_status: clean(beneficiaryStatus?.[0]),
      electricity_bill: clean(electricityBill?.[0]),
      water_bill: clean(waterBill?.[0]),
      ration_card: clean(rationCard?.[0]),
    };

    return res.json(finalOut);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// =======================================================
// REGISTER Loan Approval Routes
// =======================================================
app.use("/api", loanApprovalRoute);

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
