// src/components/ReviewApplicationDialog.jsx
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ApproveFormDialog from "./ApproveFormDialog";

const ReviewApplicationDialog = ({ selectedApplication, onClose, handleReject }) => {
  const [openApproveForm, setOpenApproveForm] = useState(false);

  return (
    <>
      <Dialog open={!!selectedApplication} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Loan Application Summary</DialogTitle>
            <DialogDescription>Application ID: {selectedApplication?.id}</DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <>
              <div className="space-y-1">
                <p><strong>Beneficiary:</strong> {selectedApplication.beneficiary}</p>
                <p><strong>Scheme:</strong> {selectedApplication.scheme}</p>
                <p><strong>Loan Amount Applied:</strong> ₹{selectedApplication.amount}</p>
                <p><strong>Credit Score:</strong> {selectedApplication.creditScore}</p>
                <p><strong>Band:</strong> {selectedApplication.bandClassification}</p>
              </div>

              <div className="flex gap-3 mt-4">
                <Button onClick={() => setOpenApproveForm(true)}>Approve</Button>
                <Button variant="destructive" onClick={() => handleReject(selectedApplication)}>Reject</Button>
                <Button variant="outline">Manual Review</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* SECOND POPUP */}
      <ApproveFormDialog 
        open={openApproveForm} 
        onClose={() => setOpenApproveForm(false)} 
        application={selectedApplication}
      />
    </>
  );
};

export default ReviewApplicationDialog;
