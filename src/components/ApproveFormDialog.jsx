// src/components/ApproveFormDialog.jsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const ApproveFormDialog = ({ open, onClose, application }) => {
  const [formData, setFormData] = useState({
    sanctionAmount: application?.amount || "",
    modelSuggested: application?.estimatedSafeLoan || "",
    lastApproved: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Loan Approved Successfully 🎉");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Loan Approval Form</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <Label>Loan Sanctioned Amount</Label>
            <Input
              name="sanctionAmount"
              value={formData.sanctionAmount}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Model Suggested Loan Amount</Label>
            <Input
              name="modelSuggested"
              value={formData.modelSuggested}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Previous Approved Loan</Label>
            <Input
              name="lastApproved"
              value={formData.lastApproved}
              onChange={handleChange}
              placeholder="Enter previous loan value"
            />
          </div>

          <Button className="w-full mt-2" onClick={handleSubmit}>
            Confirm Approval
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveFormDialog;
