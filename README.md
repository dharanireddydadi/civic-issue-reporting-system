# Samyak Civic Platform

A futuristic, professional civic issue dashboard designed to impress. This platform provides a clean, modern, and data-driven interface for reporting, tracking, and resolving community issues with strong visual storytelling and AI-powered features.

## Features

- **Futuristic Dashboard:** A central hub with a large hero welcome, a grid of the latest reported issues, and an interactive city map showing issue hotspots.
- **Multi-Page Experience:** Seamless navigation between Overview, Report Issue, AI Assistant, Track Complaints, Rewards, and more.
- **Interactive Map:** Google Maps integration to visualize the geographic distribution of civic issues, color-coded by severity.
- **AI Assistant:** A full-page chat interface to guide users, provide solutions, and offer tutorials.
- **Complaint Tracking:** A detailed timeline view for users to track the status of their reported issues from submission to resolution.
- **Gamified Rewards System:** Users earn credits for reporting issues and contributing to the community, with a wallet UI and a mock withdrawal system.
- **Community Engagement:** A dedicated section for community feedback, comments, and upvotes on reported issues.
- **Responsive Design:** A fully responsive layout that adapts from large desktop screens to mobile devices.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **State Management:** React Context API
- **Maps:** Google Maps API (with iframe fallback)
- **Data:** Mock API simulating a real backend with seeded JSON data.

---

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd samyak-civic-platform
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```
2. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## Environment Variables

To connect the application to real services in a production environment, create a `.env` file in the root of the project and add the following placeholder variables.

**Do not commit your real API keys to version control.**

```
# API Key for Google Services (e.g., Google Maps)
# Required for the interactive map widget.
REACT_APP_API_KEY=YOUR_GOOGLE_API_KEY_HERE

# Base URL for your backend API
REACT_APP_API_BASE=https://api.samyakplatform.com

# Firebase Configuration (for Authentication and Database)
REACT_APP_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
```

### Security & Privacy Notes

- **Payment Data:** Do not store sensitive payment or bank account data on the client-side. The current withdrawal UI is a mock flow. In production, this should be integrated with a secure, PCI-compliant payment provider like Stripe or Razorpay.
- **API Keys:** The placeholder API keys in the `.env` file must be replaced with real keys before deployment. Ensure the `.env` file is included in your `.gitignore` to prevent committing secrets.
- **LLM Integration:** When wiring the AI Assistant to a real Large Language Model (LLM), ensure you implement rate-limiting, handle user data according to privacy regulations (like GDPR), and sanitize inputs to prevent prompt injection attacks.