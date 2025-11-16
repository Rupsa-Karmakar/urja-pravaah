// ---- script.js ----
// This file NO LONGER contains Firebase imports
// Firebase is already initialized in index.html

document.addEventListener("DOMContentLoaded", () => {
  
  // --- PAGE NAVIGATION ---
  const navButtons = document.querySelectorAll(".nav-btn[data-section]");
  const pages = document.querySelectorAll(".page");

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      pages.forEach(p => p.classList.remove("active"));
      const target = document.getElementById(btn.dataset.section);
      if (target) target.classList.add("active");
    });
  });

  // ---- DETAILS ----
  window.showDetails = function(id) {
    document.querySelectorAll(".details-box").forEach(box => box.style.display = "none");
    const el = document.getElementById(id);
    if (el) el.style.display = "block";
  };

  // ---- ALERT BUTTONS ----
  const alertSolar = document.getElementById("alertSolar");
  const alertWind  = document.getElementById("alertWind");
  const alertPiezo = document.getElementById("alertPiezo");

  const popup = document.getElementById("popup");
  const popupMsg = document.getElementById("popupMsg");
  const popupClose = document.getElementById("popupClose");
  const alertLogs = document.getElementById("alertLogs");

  alertSolar.addEventListener("click", () => triggerAlert("Surface Dust Detected on Solar Panel"));
  alertWind.addEventListener("click", () => triggerAlert("Low Wind Speed near Wind Turbine"));
  alertPiezo.addEventListener("click", () => triggerAlert("Tile Health Alert on Piezo Tile"));

  popupClose.addEventListener("click", () => popup.style.display = "none");

  function triggerAlert(msg){
    popupMsg.textContent = msg;
    popup.style.display = "block";

    const entry = document.createElement("p");
    entry.textContent = `${msg} — ${new Date().toLocaleString()}`;
    alertLogs.prepend(entry);
  }

  // ---- COMPLAINT SUBMIT ----
  const complaintForm = document.getElementById("complaintForm");
  const complaintMsg  = document.getElementById("complaintMsg");
  const nameInput = document.getElementById("name");
  const messageInput = document.getElementById("message");
  const submitBtn = document.getElementById("submitBtn");

  complaintForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const who = nameInput.value.trim() || "User";
    complaintMsg.textContent = `Thank you, ${who}. Your complaint has been recorded.`;
    complaintForm.reset();
  });

  // ---- TRANSLATION ----
  const langBtn = document.getElementById("langBtn");
  const dashTitle = document.getElementById("dashTitle");
  const solarText = document.getElementById("solarText");
  const windText  = document.getElementById("windText");
  const footText  = document.getElementById("footText");
  const alertsTitle = document.getElementById("alertsTitle");
  const logsTitle   = document.getElementById("logsTitle");
  const complaintTitle = document.getElementById("complaintTitle");

  let hindi = false;

  langBtn.addEventListener("click", () => {
    hindi = !hindi;

    if (hindi){
      langBtn.textContent = "Translate 🇬🇧";

      document.querySelector(".title").textContent = "⚡ ऊर्जा प्रवाह";
      document.querySelector(".subtitle").textContent = "ग्रामग्रिड डैशबोर्ड";

      dashTitle.textContent = "ऊर्जा डैशबोर्ड";
      solarText.textContent = "सौर ऊर्जा (W)";
      windText.textContent  = "पवन ऊर्जा (W)";
      footText.textContent  = "पायजो ऊर्जा (W)";

      alertsTitle.textContent = "सिस्टम अलर्ट";
      logsTitle.textContent = "अलर्ट लॉग्स";

      alertSolar.textContent = "सौर पैनल पर धूल";
      alertWind.textContent  = "कम पवन गति";
      alertPiezo.textContent = "पायजो टाइल चेतावनी";

      complaintTitle.textContent = "शिकायत दर्ज करें";
      submitBtn.textContent = "सबमिट करें";
      nameInput.placeholder = "आपका नाम";
      messageInput.placeholder = "अपनी समस्या लिखें...";
    } 
    else {
      langBtn.textContent = "Translate 🇮🇳";

      document.querySelector(".title").textContent = "⚡ URJA PRAVAAH";
      document.querySelector(".subtitle").textContent = "GramGrid Dashboard";

      dashTitle.textContent = "Live Energy Dashboard";
      solarText.textContent = "Solar Power (W)";
      windText.textContent  = "Wind Power (W)";
      footText.textContent  = "Piezo Energy (W)";

      alertsTitle.textContent = "System Alerts";
      logsTitle.textContent = "Alert Logs";

      alertSolar.textContent = "Surface Dust Detected";
      alertWind.textContent  = "Low Wind Speed";
      alertPiezo.textContent = "Tile Health Alert";

      complaintTitle.textContent = "Register a Complaint";
      submitBtn.textContent = "Submit";
      nameInput.placeholder = "Your Name";
      messageInput.placeholder = "Describe your issue...";
    }
  });
});
