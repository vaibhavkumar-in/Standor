# Standor — Technical Interview Platform

**Standor** is a high-performance, real-time collaborative coding interview platform designed for modern engineering teams. It features live multi-user editing, WebRTC video/audio, AI-powered evaluation, and deep hiring analytics.

## 🚀 Core Features

-   **FAANG-Level Collaboration** — Monaco Editor powered by Yjs for conflict-free, real-time code synchronization with presence indicators.
-   **Live Communication** — Integrated WebRTC mesh for zero-latency video and audio calling directly in the interview room.
-   **AI Analysis (Gemini 2.0)** — Automated FAANG-grade evaluation of code complexity, bug detection, and candidate performance.
-   **Code Execution** — Instant execution for 20+ languages powered by the Piston engine.
-   **Structured Analytics** — Heatmaps, difficulty breakdown, and candidate pass-rates tracked across all interview cycles.
-   **Automated Reporting** — Professional PDF-styled interview summaries sent to stakeholders via Nodemailer.

## 🛠️ Tech Stack

### Frontend (`app/frontend`)
-   **Framework**: React 18 + Vite
-   **Styling**: Vanilla CSS + Tailwind tokens
-   **Real-time**: Yjs (CRDT) + Socket.IO-client
-   **Graphics**: FlowParticles (WebGL)
-   **UI**: Framer Motion + Radix UI

### Backend (`app/backend`)
-   **Server**: Node.js + Express + TypeScript
-   **Database**: MongoDB (Mongoose)
-   **Real-time**: Socket.IO + Y-Websocket
-   **Execution**: Piston API integration
-   **AI**: Gemini 2.0 Flash API

## 📂 Project Structure

```bash
Standor/
├── app/
│   ├── frontend/     # React + Vite Application
│   └── backend/      # Express API + Logic
├── .env.example      # Shared environment template
└── README.md
```

## 🏁 Getting Started

### 1. Prerequisites
-   Node.js (v18+)
-   MongoDB (Running locally or on Atlas)

### 2. Backend Setup
```bash
cd app/backend
npm install
# Copy e:\Major Project\Standor\.env.example to .env and fill in:
# MONGO_URI, JWT_SECRET, GEMINI_API_KEY, SMTP_PASS
npm run build
npm run dev
```

### 3. Frontend Setup
```bash
cd app/frontend
npm install
npm run dev # Default port: http://localhost:5173
```

## 🛠️ Infrastructure & Maintenance
-   **Health Check**: `GET /api/health`
-   **Rate Limiting**: Configured for `100/15min` (API) and `5/hr` (Auth).
-   **Maintenance**: Automated CRON job cleans abandonment rooms every hour.

---

**Standor — The Standard for Technical Interviews**
