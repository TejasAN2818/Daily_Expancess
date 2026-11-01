# Daily Expense Tracker

A small React + Vite form that saves the **automatic date, reason and amount** to a Google Sheet using Google Apps Script. No login, dashboard, categories or extra features.

## 1. Run the website locally

Install Node.js (LTS), then open this project folder in VS Code and run:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## 2. Create the Google Sheet

1. Create a new Google Sheet.
2. Give it a name such as `My Daily Expenses`.
3. From the sheet, choose **Extensions → Apps Script**.
4. Replace the editor contents with the code in `google-apps-script/Code.gs`.
5. Click **Save**.

The script automatically creates a tab named `Expenses` and its headings when the first expense is submitted. The date is generated automatically by Google Apps Script when the expense is submitted, so the form only asks for reason and amount.

## 3. Deploy the Apps Script

1. In Apps Script, click **Deploy → New deployment**.
2. Select the gear icon and choose **Web app**.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone** (or the broadest access permitted by your Google account).
5. Click **Deploy** and complete Google's authorization.
6. Copy the Web app URL. It normally ends in `/exec`.

## 4. Connect the website to your Sheet

Open `src/App.jsx` and replace:

```js
const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
```

with your deployed `/exec` URL. Save the file and restart `npm run dev` if needed.

## 5. Build for hosting

```bash
npm run build
```

Upload the generated `dist` folder to your static hosting provider, or connect the project repository to Vercel. Keep the Apps Script URL in `src/App.jsx` before deploying the website.

## Important note

The browser uses `no-cors` for the Apps Script POST. Browsers do not expose the script's response in this mode, so the form displays a submission message after the request is sent; check the Google Sheet to verify the new row. Do not put private or sensitive information in a publicly accessible form. Anyone who can access the deployed web app may be able to submit rows.
