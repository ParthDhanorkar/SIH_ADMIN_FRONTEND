const express = require("express");
const supabase = require("../supabaseClient.js");

const router = express.Router();

/* ============================================================
   Helper — Convert string/text → number safely
=============================================================== */
function toNumber(value) {
  if (!value) return 0;
  if (typeof value === "number") return value;

  const num = parseFloat(String(value).replace(/[^\d.-]/g, ""));
  return isNaN(num) ? 0 : num;
}

/* ============================================================
   Helper — AI Scoring Model (Frontend compatible)
=============================================================== */
function computeAIScoring(app) {
  const amount = toNumber(app.loan_amount_applied);
  const tenure = app.tenure_applied || 0;

  const normalizedAmount = Math.min(amount / 200000, 1);
  const normalizedTenure = Math.min(tenure / 60, 1);

  const needScore = 0.6 + 0.3 * (1 - normalizedAmount);
  const riskScore = 0.25 + 0.5 * normalizedAmount;
  const fraudProbability = 0.02 + 0.05 * normalizedAmount;
  const creditScore = Math.round(750 - normalizedAmount * 150);

  const finalScore =
    0.7 * (1 - riskScore) +
    0.3 * needScore -
    fraudProbability;

  const finalEligibilityScore = Math.max(0.30, Math.min(0.95, finalScore));

  let bandClassification = "Medium Risk - Medium Need";
  if (finalEligibilityScore >= 0.80)
    bandClassification = "Low Risk - High Need";
  else if (finalEligibilityScore >= 0.60)
    bandClassification = "Medium Risk - High Need";
  else if (finalEligibilityScore >= 0.45)
    bandClassification = "High Risk - Medium Need";
  else bandClassification = "High Risk - Low Need";

  return {
    creditScore,
    riskScore: Number(riskScore.toFixed(2)),
    fraudProbability: Number(fraudProbability.toFixed(2)),
    needScore: Number(needScore.toFixed(2)),
    estimatedIncome: 30000 + tenure * 500,
    estimatedSafeLoan: amount + 20000,
    bandClassification,
    finalEligibilityScore: Number(finalEligibilityScore.toFixed(2)),
  };
}

/* ============================================================
   GET Strict Pending Applications Only
   (status = 'PENDING')
=============================================================== */
router.get("/loan-approval/pending", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("track_application")
      .select(
        `loan_application_id,
         applied_on,
         loan_amount_applied,
         scheme,
         tenure_applied,
         status,
         aadhar_no,
         interest_rate,
         emi_amount`
      )
      .eq("status", "PENDING")               // ← STRICT FILTER
      .order("applied_on", { ascending: false });

    if (error) {
      console.error("❌ Supabase Fetch Error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch pending applications",
      });
    }

    // No need to show null rows now
    const formatted = (data || []).map((row) => {
      const ai = computeAIScoring(row);

      return {
        id: row.loan_application_id,
        scheme: row.scheme || "Not Provided",
        beneficiary: `Beneficiary (${String(row.aadhar_no).slice(-4)})`,
        amount: toNumber(row.loan_amount_applied),
        tenure: row.tenure_applied || 0,
        status: row.status,
        applicationDate: row.applied_on,
        aadhar_no: row.aadhar_no,

        ...ai,
      };
    });

    return res.json({
      success: true,
      applications: formatted,
    });
  } catch (err) {
    console.error("🔥 INTERNAL ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


/* ============================================================
   EXPORT ROUTER
=============================================================== */
module.exports = router;
