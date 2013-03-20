
#define TEMP A5
#define LED  13

int value; // アナログ入力値(0～203)
int tempC   = 0; // 摂氏値( ℃ )

void setup() {
  pinMode(TEMP, INPUT);
  pinMode(LED, OUTPUT);
  // シリアル通信速度
  Serial.begin(115200);
}

void loop() {
  value = analogRead(TEMP);
  tempC = ((5 * value) / 1024.0) * 100;

  Serial.print(tempC);
  
  if (Serial.available()) {
    digitalWrite(LED, HIGH);
  }
  delay(5000);
}
