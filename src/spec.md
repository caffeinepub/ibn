# Specification

## Summary
**Goal:** Improve the bank transfer checkout dialog to clearly reflect the selected plan, reduce copy/paste friction, and streamline payment confirmation via WhatsApp.

**Planned changes:**
- Pass the clicked plan context (network, plan name/title, data amount, displayed price) into the bank transfer details dialog and show it at the top as an “Order Summary” block.
- Add a “Copy all details” action that copies a well-formatted multi-line block of bank details (bank name, account name, account number, optional IBAN/BIC) to the clipboard, while keeping (or improving without loss of capability) existing per-field copy actions.
- Add concise, numbered English instructions in the dialog explaining how to complete a bank transfer and how to confirm payment.
- Add a prominent WhatsApp confirmation CTA inside the dialog that opens WhatsApp to **09033449260** with a prefilled message including the selected plan summary and a prompt to attach/describe transfer proof, shown only when bank details exist and a plan was selected via “Pay via Bank Transfer”.

**User-visible outcome:** When paying via bank transfer, customers see a clear order summary, can copy all bank details at once, follow simple transfer instructions, and can quickly message support on WhatsApp with a prefilled confirmation message for their selected plan.
