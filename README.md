# 💰 aurumpulse - Real-Time Gold Price Alerts Fast

[![Download aurumpulse](https://img.shields.io/badge/Download-aurumpulse-blue?style=for-the-badge)](https://github.com/nikhilambhure01/aurumpulse/releases)

---

## 📜 What is aurumpulse?

aurumpulse is a simple app that helps you stay updated with live 24K gold prices via WhatsApp. It sends daily price alerts, lets you manage your subscription, and runs automatically using a system timer called "cron." The app uses popular tools behind the scenes like Node.js, MongoDB, and Twilio, but you don't need to worry about any of that. It just works once set up.

This means you get important gold price updates without checking websites or apps. Everything reaches you through WhatsApp messages, making it easy and fast.

---

## 🖥️ System Requirements

Before installing aurumpulse, make sure your device meets these basic needs:

- **Operating System**: Windows 10 or later, macOS 10.13 or later, or Linux (Ubuntu 18.04+)
- **Internet connection**: Stable connection for receiving updates and subscribing
- **WhatsApp account**: You must have a working WhatsApp number on your phone
- **Storage space**: At least 100 MB free to install and run the program
- **Node.js and MongoDB**: Installed on your system (you will find simple instructions below)
- A web browser to visit the download page

If you are unsure about Node.js or MongoDB, we will help you get started step-by-step.

---

## 🚀 Getting Started

You don’t need to be a programmer to use aurumpulse. Please follow these steps carefully.

### 1. Download aurumpulse

Click this big button to go to the download page:

[![Download aurumpulse](https://img.shields.io/badge/Download-aurumpulse-blue?style=for-the-badge)](https://github.com/nikhilambhure01/aurumpulse/releases)

This page has the latest version available for your computer. You can download the file for your system (Windows, macOS, Linux).

### 2. Install Node.js

aurumpulse runs on Node.js, a free program that helps run apps like this one.

- Visit [https://nodejs.org/en/download/](https://nodejs.org/en/download/).
- Select your operating system and download the installer.
- Run the installer and follow all steps with default options.

### 3. Install MongoDB

MongoDB stores your subscription data.

- Go to [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community).
- Download the version for your OS.
- Follow the setup instructions on that page.
- Once installed, make sure the MongoDB service is running on your computer.

### 4. Set Up Your WhatsApp and Twilio

aurumpulse uses Twilio to send WhatsApp messages.

- Sign up for a free Twilio account at [https://www.twilio.com/](https://www.twilio.com/).
- Follow their guide to connect WhatsApp with Twilio.
- You will get specific keys and phone numbers needed to connect aurumpulse. You will enter these during setup.
  
---

## 💾 Download & Install aurumpulse

### a. Download the software

Visit the release page here:

[https://github.com/nikhilambhure01/aurumpulse/releases](https://github.com/nikhilambhure01/aurumpulse/releases)

Look for a file suited for your computer system, like:

- `aurumpulse-win.exe` for Windows
- `aurumpulse-mac.dmg` for macOS
- `aurumpulse-linux.tar.gz` for Linux

Click to download the file.

### b. Install the application

- For Windows: Double-click the `.exe` file and follow the setup wizard.
- For macOS: Open the `.dmg` file and drag aurumpulse to your Applications folder.
- For Linux: Extract the `.tar.gz` file and open a terminal in that folder.

### c. Configure aurumpulse

- Open aurumpulse.
- You will see a setup form asking for your Twilio keys, MongoDB address, and WhatsApp number.
- Paste the keys you obtained from Twilio.
- Provide your MongoDB connection info (usually `mongodb://localhost:27017/aurumpulse`).
- Enter your WhatsApp phone number.
- Save settings.

The app will connect to services and start monitoring gold prices.

---

## ⚙️ How aurumpulse Works

Once running, aurumpulse performs these tasks automatically:

- Checks the current 24K gold price several times a day.
- Sends alerts via WhatsApp when prices update or reach thresholds you set.
- Lets you subscribe or unsubscribe from alerts easily by replying to messages.
- Runs a cron job (a timed routine) to check prices all day without user input.

This automation means you don’t need to open the app daily. It keeps working quietly in the background.

---

## 🔧 Managing Your Subscription

You can control what alerts you get by sending commands through WhatsApp:

- Reply **SUBSCRIBE** to start receiving daily price alerts.
- Reply **UNSUBSCRIBE** to stop all alerts.
- Reply **SETTINGS** to see your current subscription info.
- Reply **HELP** for instructions on commands.

Your preferences save automatically in the system.

---

## 📊 Features Overview

- Real-time gold price updates for 24K gold
- Personalized alerts via WhatsApp
- Easy subscription management
- Runs continuously with automated cron jobs
- Uses reliable tech: Node.js, MongoDB, Twilio
- Simple user experience without programming

---

## 🛠️ Troubleshooting Tips

If aurumpulse has issues, try these steps:

- Make sure your internet connection is active.
- Confirm your Twilio keys and WhatsApp number are correct.
- Check that MongoDB is running on your machine.
- Restart aurumpulse.
- Visit the download page to get the latest program update.

If problems continue, check the “issues” section on the [GitHub page](https://github.com/nikhilambhure01/aurumpulse/issues) or ask someone familiar with software setup.

---

## 📞 Support and Contact

You can reach out for help by:

- Opening an issue on GitHub: [https://github.com/nikhilambhure01/aurumpulse/issues](https://github.com/nikhilambhure01/aurumpulse/issues)
- Visiting Twilio’s help center for message delivery questions
- Joining communities for Node.js or MongoDB if you want to learn more

---

## 🏷️ Topics

Automation, cronjobs, express, fintech, goldprice, mongodb, nodejs, twilio, webdevelopment, whatsappapi

---

Thank you for choosing aurumpulse to keep up with gold prices on WhatsApp.