# CompanySupportPage Specification

- Target: `src/components/sites/codexa-framer-website-9c43da05/company-support-c9e8a2d7/CompanySupportPage.tsx`
- Screenshots: `source-desktop-1440.png`, `source-mobile-390.png`
- Interaction: native form controls; demo submission prevents navigation and shows no fake backend success.
- Desktop 1768px; mobile 2185px. Main contact section 1007.016px desktop and about 1164px mobile.
- Desktop contact content begins 160px from the page top, accounting for the fixed navigation. Mobile content begins 120px from the page top.
- Two-column bordered form shell: left 600px copy panel, right 600px raised `#0f0f11` form panel. Mobile uses 12px outer rails and stacks the columns.
- H1 `Contact support` 52px; support copy and local Contact sales pill.
- Fields: full name, email, phone, reason, message, privacy checkbox; exact labels/placeholders from source.
- Full name, email, phone, reason, and message are required. Privacy consent remains optional, matching the source.
- Inputs 43px, textarea 118-120px, 1px `#292b2c` border, 8px radius; full-width gray submit.
- Desktop intro/form padding is 24px and the form gap is 24px. Mobile intro uses `16px 16px 32px`; form uses 16px padding/gap; H1 is 40px.
- The source helper says `Our team will contact you shortly.` Because this frontend-only clone has no delivery backend, retain an equally placed truthful demo-status message instead of claiming delivery.
