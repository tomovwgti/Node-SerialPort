
#define TEMP A5
#define LED  13

int value; // アナログ入力値(0～203)
int tempC   = 0; // 摂氏値( ℃ )
char trans[20]; // 数字（文字列）の送信用配列
char recv[10]; // 数字（文字列）の受信用配列

void setup() {
  pinMode(TEMP, INPUT);
  pinMode(LED, OUTPUT);
  // シリアル通信速度
  Serial.begin(115200);
}

void loop() {

  // シリアルからのデータ受信
  memset(recv, 0, 10);
  char *p = &recv[0];
  recvStr(p);

  if (strcmp("ON", p) == 0) {
    digitalWrite(LED, HIGH);
  } else if (strcmp("OFF", p) == 0) {
    digitalWrite(LED, LOW);
  }

  // 気温を送信
  value = analogRead(TEMP);
  tempC = ((5 * value) / 1024.0) * 100;
  // シリアルからのデータ送信
  memset(trans, 0, 20);
  char *json = &trans[0];

  // 送信用のJSONデータの作成
  sprintf(json, "{\"temp\":%d, \"led\":%d}", tempC, digitalRead(LED));
  Serial.println(json);

  delay(5000);
}

// データ受信
void recvStr(char *buf)
{
  int i = 0;
  char c;
  while (Serial.available()) {
      c = Serial.read();
      buf[i] = c;
      i++;
  }
}
