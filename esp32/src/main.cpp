//#include <WiFi.h>
#include <FirebaseESP32.h>   // debug helper

// 🔹 WiFi credentials
#define WIFI_SSID "redmi 9 power"
#define WIFI_PASSWORD "bangtan2013"

// 🔹 Firebase credentials
#define API_KEY "AIzaSyAGik0xMLBJWiKXQWSIaJz5x-MjFTDlgcY"
#define DATABASE_URL "https://urja-pravaah-live-default-rtdb.firebaseio.com/"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

void setup() {
  Serial.begin(115200);
  Serial2.begin(9600);  // RX2=GPIO16, TX2=GPIO17

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("\n✅ WiFi connected");

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  if (Serial2.available()) {
    String piezoVal = Serial2.readStringUntil('\n');
    piezoVal.trim();

    if (piezoVal.length() > 0) {
      int value = piezoVal.toInt();
      Serial.printf("Received Piezo Value: %d\n", value);

      // ✅ Correct Firebase syntax for new library
      if (Firebase.RTDB.setInt(&fbdo, "/energy/piezo", value)) {
        Serial.println("✅ Uploaded to Firebase");
      } else {
        Serial.print("❌ Upload failed: ");
        Serial.println(fbdo.errorReason());
      }
    }
  }
  delay(1000);
}
