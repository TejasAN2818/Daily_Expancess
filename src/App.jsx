import React, { useState } from "react";
import { CheckCircle2, IndianRupee, LoaderCircle, ReceiptText, Wallet } from "lucide-react";

// Paste your deployed Google Apps Script Web App URL here.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwMn9nELk3DIha9uo2U145T97eKtpsRrBh4KJ-p4VaajaGZ8jkSziYaZNOcT7mB-d16/exec";


export default function App() {
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!reason.trim() || !amount || Number(amount) <= 0) {
      setStatus("error");
      setMessage("Please enter a date, reason and valid amount.");
      return;
    }
    if (GOOGLE_SCRIPT_URL.startsWith("PASTE_")) {
      setStatus("error");
      setMessage("Add your Google Apps Script Web App URL in src/App.jsx first.");
      return;
    }

    setStatus("saving");
    try {
      // Apps Script accepts a simple POST form payload.
      const body = new URLSearchParams({
        reason: reason.trim(),
        amount: String(Number(amount))
      });
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body,
        mode: "no-cors"
      });

      // Google Apps Script no-cors responses are opaque. A completed request
      // means the browser sent it; verify the row in your Sheet if needed.
      setStatus("success");
      setMessage("Expense submitted. Check your Google Sheet to confirm it was added.");
      setReason("");
      setAmount("");
    } catch {
      setStatus("error");
      setMessage("Could not submit. Check your internet connection and Apps Script URL.");
    }
  }

  return (
    <main className="page">
      <section className="shell">
        <header className="topbar">
          <div className="brand-icon"><Wallet size={23} strokeWidth={2.2} /></div>
          <div>
            <p className="eyebrow">PERSONAL FINANCE</p>
            <h1>Daily Expense</h1>
          </div>
        </header>

        <section className="intro">
          <div className="intro-icon"><ReceiptText size={25} /></div>
          <div>
            <h2>Record an expense</h2>
            <p>Enter what you spent and how much.</p>
          </div>
        </section>

        <form className="expense-form" onSubmit={handleSubmit}>
          <label htmlFor="reason">Reason for spending</label>
          <div className="field">
            <ReceiptText size={19} />
            <input
              id="reason"
              type="text"
              placeholder="e.g. Breakfast, travel, groceries"
              value={reason}
              onChange={e => setReason(e.target.value)}
              maxLength={150}
              required
            />
          </div>

          <label htmlFor="amount">Amount spent</label>
          <div className="field amount-field">
            <IndianRupee size={19} />
            <input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              inputMode="decimal"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
            />
            <span className="currency">INR</span>
          </div>

          <button type="submit" disabled={status === "saving"}>
            {status === "saving" ? <><LoaderCircle className="spin" size={19} /> Saving...</> : "Save Expense"}
          </button>

          {message && (
            <div className={`notice ${status}`} role="status">
              {status === "success" && <CheckCircle2 size={18} />}
              <span>{message}</span>
            </div>
          )}
        </form>

        <footer>Simple expense entry · Stored in your Google Sheet</footer>
      </section>
    </main>
  );
}