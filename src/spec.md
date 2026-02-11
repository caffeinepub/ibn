# Specification

## Summary
**Goal:** Add a configurable “Pay via Bank Transfer” payment option, with admin-managed bank details stored in the backend and displayed to customers.

**Planned changes:**
- Backend: Add a persisted `BankDetails` record (bank name, account name, account number, optional note) and expose (1) an admin-only update method and (2) a public read method that returns the current details or none.
- Frontend: Add React Query hooks to fetch and (admin-only) update bank transfer details, following existing Stripe configuration hook patterns, including error handling.
- Frontend: Add an admin-only header entry point that opens a dialog to create/update bank transfer details with required-field validation and clear English messages.
- Frontend: Add a “Pay via Bank Transfer” action on each data plan card that opens a modal showing the configured bank details and brief instructions; hide/disable the action with an English explanation when details are not configured.

**User-visible outcome:** Admins can set/update bank transfer details in the app, and customers can choose a bank transfer option on plan cards to view the payment details (when available) without affecting existing Stripe or WhatsApp flows.
