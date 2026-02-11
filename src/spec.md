# Specification

## Summary
**Goal:** Support multiple bank transfer accounts across backend storage and frontend UX, including default preconfigured bank details and a safe migration from the existing single-record format.

**Planned changes:**
- Update backend bank transfer configuration storage to use a list of bank accounts, with authenticated-user read access and admin-only write access preserved.
- Add a conditional migration that converts an existing single saved bankDetails record into a single-entry list without overwriting an already-populated list.
- Preconfigure the backend with three default bank accounts (OPAY / MONIE POINT / POLARIS BANK) when no admin-configured accounts exist.
- Update frontend React Query hooks/types to fetch and save a list of bank accounts (following existing patterns in `frontend/src/hooks/useQueries.ts`).
- Update the admin bank transfer setup UI to add/edit/remove multiple bank accounts, validate required fields in English, and save the full list with an English success confirmation.
- Update the customer bank transfer details dialog to allow selecting an account when multiple exist and ensure displayed/copied details reflect the selected account (single-account behavior remains unchanged).
- Ensure the WhatsApp bank-transfer confirmation CTA still targets `09033449260` and includes the selected bank name in the prefilled message.

**User-visible outcome:** Admins can manage multiple bank transfer accounts, customers can choose which account to pay into and copy the correct details, and the WhatsApp confirmation message includes the selected bank name without changing the WhatsApp number.
