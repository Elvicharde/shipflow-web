# ShipFlow Web

ShipFlow Web is the frontend application for the ShipFlow bulk shipping label creation platform.

It provides a guided, multi-step user experience for uploading shipping data, reviewing and correcting validation issues, selecting shipping services, and completing bulk label purchases. The UI is designed to surface data issues clearly and help users resolve them efficiently.

---

## Core Features

- CSV upload with progress feedback
- Review and edit workflow for shipping orders
- Clear validation states (valid, corrected, invalid, unverifiable)
- Inline address validation feedback
- Shipping service selection and pricing overview
- Purchase confirmation and success states

---

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- ShadCN UI
- Zod (client-side validation)

---

## Application Flow
Upload → Review & Edit → Select Shipping → Purchase


Each step is designed to:
- Make system state explicit
- Provide actionable feedback
- Prevent invalid progression where possible

---

## Setup Instructions

1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Start the development server

Example:
npm install
npm run dev



Ensure the API base URL is correctly configured in the environment settings.

---

## UX & Design Notes

- The UI favors clarity over visual complexity.
- Validation feedback is shown inline wherever possible.
- Editable data is clearly distinguished from read-only states.
- The system assumes imperfect input data and guides users toward resolution rather than failure.

---

## Status

This frontend is part of a technical assessment project and is deployed for evaluation alongside the ShipFlow API.


