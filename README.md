# 💰 AurumPulse

### Real-Time Gold Price Alerts on WhatsApp

AurumPulse is a full-stack web application that provides **automated gold price notifications via WhatsApp**.
Users receive **instant alerts on major price changes** and also **daily gold price updates**, without installing any mobile application.

---

## 🚀 Features

### 🔔 Gold Price Change Alerts

* Monitors **24K gold prices** in real time
* Sends WhatsApp alerts when price changes exceed a defined threshold
* Threshold configurable via environment variables

### 📅 Daily Gold Price Updates

* Sends **at least one daily update** to all active users
* Works **independently** of price-change alerts
* Ensures consistent user engagement

### 📲 WhatsApp Integration (Twilio)

* Alerts delivered directly on WhatsApp
* Uses **Twilio WhatsApp Sandbox** for secure, consent-based messaging
* Message delivery verified via **status checks**

### 👤 User Subscription System

* Login with mobile number (no passwords)
* WhatsApp opt-in required (anti-spam compliance)
* Users can:

  * Activate subscription
  * Check subscription status
  * Unsubscribe anytime
  * Logout securely

### 🗄 MongoDB Persistence

* Stores:

  * Users & subscription status
  * Gold price history
  * Alert logs
* No data loss on server restart

### 🖥 Simple Web Interface

* Homepage
* Login page
* Dashboard with dynamic UI
* Clean, minimal, and demo-ready

---

## 🧱 Tech Stack

| Layer         | Technology                    |
| ------------- | ----------------------------- |
| Backend       | Node.js, Express.js           |
| Database      | MongoDB (Mongoose)            |
| Messaging     | Twilio WhatsApp API           |
| Scheduler     | node-cron                     |
| Frontend      | HTML, CSS, Vanilla JavaScript |
| Hosting-ready | Render / Railway / AWS        |

---

## 🏗 System Architecture

```
Cron Jobs
   ↓
Gold Price API
   ↓
Backend (Node + Express)
   ↓
MongoDB (Prices & Users)
   ↓
Twilio WhatsApp API
   ↓
Users on WhatsApp
```

---

## 🧭 User Flow

1. User opens the website
2. Logs in using mobile number
3. Activates WhatsApp subscription (one-time opt-in)
4. Confirms subscription status
5. Receives:

   * Instant alerts on major price changes
   * Daily gold price updates
6. Can unsubscribe or logout anytime

---

## 📂 Project Structure

```
aurumpulse/
│
├── cron/
│   ├── goldPriceCron.js
│   └── dailyGoldUpdateCron.js
│
├── services/
│   ├── goldPriceService.js
│   └── dailyGoldUpdateService.js
│
├── utils/
│   └── sendWhatsAppAlert.js
│
├── models/
│   ├── User.js
│   └── GoldPrice.js
│
├── public/
│   ├── index.html
│   ├── login.html
│   └── dashboard.html
│
├── index.js
├── .env
└── README.md
```

---

## 🔐 Environment Variables (`.env`)

```env
PORT=3000

GOLD_API=https://www.goldapi.io/api/XAU/INR
GOLD_API_KEY=goldapi-xxxxxxxxxxxxxxxxxxx
GOLD_PRICE_CHANGE_THRESHOLD=500

TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=axxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_TEMPLATE_SID=HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

MONGO_URI=mongodb+srv://xxxxxxxx_db_user:xxxxxxxxxxxxxx@clusterx.xxxxxxx.mongodb.net/?appName=xxxxxxxx
```

---

## 📲 WhatsApp Sandbox Setup (Required)

1. Open WhatsApp
2. Send:

   ```
   join <your-sandbox-code>
   ```
3. Send to:

   ```
   +14155238886
   ```

This is a **one-time opt-in** required by WhatsApp to prevent spam.

---

## 🧪 API Endpoints

### 👤 User APIs

| Method | Endpoint                   | Description               |
| ------ | -------------------------- | ------------------------- |
| POST   | `/api/users`               | Register user             |
| POST   | `/api/login`               | Login user                |
| GET    | `/api/users/status/:phone` | Check subscription status |

---

### 🔔 Subscription APIs

| Method | Endpoint                  | Description                  |
| ------ | ------------------------- | ---------------------------- |
| POST   | `/api/subscription/check` | Verify WhatsApp subscription |

---

### 💰 Gold Price APIs

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| GET    | `/api/gold-price`   | Manual price check |
| GET    | `/api/gold-history` | View price history |

---

## ⏱ Cron Jobs

### Price Change Alerts

* Runs every X minutes
* Compares latest price with last DB record
* Sends alert if threshold exceeded

### Daily Gold Update

* Runs once per day (9:00 AM IST)
* Sends daily gold price update to all active users
* Independent of price change logic

---

## 🧠 Delivery Verification Logic

* Twilio message creation ≠ delivery
* Message **status is fetched after sending**
* Subscription marked active **only if status = sent / delivered**

This prevents false-positive subscriptions.

---

## 🔒 Security & Privacy

* No passwords stored
* WhatsApp opt-in mandatory
* Numbers never shared
* Messages sent only with user consent
* Easy unsubscribe & logout

---

## 🚀 Future Enhancements

* OTP-based login
* User-defined alert thresholds
* Weekly/monthly summaries
* Admin dashboard
* Production WhatsApp Business API
* React / Mobile App frontend

---

## 🏁 Conclusion

**AurumPulse** is a practical, real-world system that demonstrates:

* Backend automation
* API integration
* Database design
* Asynchronous workflows
* User-centric UI design