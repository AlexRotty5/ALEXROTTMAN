export const FULL_ARDUINO_SCRIPT = `#include <Servo.h>

Servo beamServo;

const int servoPin = 9;

// Hot Wheels / object sensor
const int trigPinObject = 7;
const int echoPinObject = 6;

// Cube / target sensor
const int trigPinCube = 3;
const int echoPinCube = 4;

// Equilibrium from your test
const int neutralAngle = 110;

// Servo behavior:
// 95  = rolls forward fast
// 100 = rolls forward slow
// 110 = equilibrium
// 125 = rolls backward slow
// 130 = rolls backward fast
const int forwardAngleLimit = 90;
const int backwardAngleLimit = 135;

// Direction correction
const int controlDirection = -1;

// -------------------- CONTROL GAINS --------------------

float Kp = 3.4;
float Kd = 0.7;


const float minPushDegrees = 7.0;

const float deadbandCM = 0.8;

// -------------------- SENSOR SETTINGS --------------------
const float minValidCM = 2.0;
const float maxValidCM = 35.0;

// Clamp cube target so it does not command impossible extremes
const float minTargetCM = 5.0;
const float maxTargetCM = 30.0;

// If cube and car are physically lined up but readings differ,
// set this to: object reading - cube reading
float cubeOffsetCM = 0.0;

// -------------------- STATE --------------------
float lastGoodObject = 15.0;
float lastGoodCube = 15.0;
float lastObjectDistance = 15.0;

unsigned long lastTime = 0;

// -------------------- GRAPH SETTINGS --------------------
// true = Arduino Serial Plotter mode
// false = normal text debugging mode
const bool plotMode = true;

// -------------------- ULTRASONIC FUNCTION --------------------
float measureCM(int trigPin, int echoPin) {
  long duration;

  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);

  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH, 25000);

  if (duration == 0) {
    return -1;
  }

  return duration / 58.2;
}

void setup() {
  Serial.begin(9600);

  pinMode(trigPinObject, OUTPUT);
  pinMode(echoPinObject, INPUT);

  pinMode(trigPinCube, OUTPUT);
  pinMode(echoPinCube, INPUT);

  beamServo.attach(servoPin);
  beamServo.write(neutralAngle);

  delay(1500);

  float objectStart = measureCM(trigPinObject, echoPinObject);
  delay(50);

  float cubeStart = measureCM(trigPinCube, echoPinCube);

  if (objectStart >= minValidCM && objectStart <= maxValidCM) {
    lastGoodObject = objectStart;
  } else {
    lastGoodObject = 15.0;
  }

  if (cubeStart >= minValidCM && cubeStart <= maxValidCM) {
    lastGoodCube = cubeStart;
  } else {
    lastGoodCube = lastGoodObject;
  }

  lastObjectDistance = lastGoodObject;
  lastTime = millis();

  if (!plotMode) {
    Serial.println("Hot Wheels cube-following control started");
    Serial.println("Final stable version");
    Serial.println("Kp = 3.4");
    Serial.println("Kd = 0.7");
    Serial.println("deadbandCM = 0.8");
    Serial.println("neutralAngle = 110");
    Serial.println("Angle range = 90 to 135");
  }
}

void loop() {
  // -------------------- READ RAW OBJECT --------------------
  float objectRaw = measureCM(trigPinObject, echoPinObject);
  delay(25);

  if (objectRaw >= minValidCM && objectRaw <= maxValidCM) {
    lastGoodObject = objectRaw;
  }

  // -------------------- READ RAW CUBE TARGET --------------------
  float cubeRaw = measureCM(trigPinCube, echoPinCube);
  delay(25);

  if (cubeRaw >= minValidCM && cubeRaw <= maxValidCM) {
    lastGoodCube = cubeRaw;
  }

  float objectDistance = lastGoodObject;

  float targetDistance = lastGoodCube + cubeOffsetCM;
  targetDistance = constrain(targetDistance, minTargetCM, maxTargetCM);

  // -------------------- TIME --------------------
  unsigned long now = millis();
  float dt = (now - lastTime) / 1000.0;

  if (dt <= 0.001) {
    dt = 0.05;
  }

  // -------------------- ERROR --------------------
  float error = objectDistance - targetDistance;

  // Positive velocity means object distance is increasing
  float velocity = (objectDistance - lastObjectDistance) / dt;

  // -------------------- PD CONTROL --------------------
  float Pterm = Kp * error;
  float Dterm = Kd * velocity;

  float correction = 0.0;

  if (abs(error) > deadbandCM) {
    correction = Pterm + Dterm;

    // Minimum push so it does not get stuck near equilibrium
    if (correction > 0 && correction < minPushDegrees) {
      correction = minPushDegrees;
    }

    if (correction < 0 && correction > -minPushDegrees) {
      correction = -minPushDegrees;
    }
  } else {
    correction = 0.0;
    Pterm = 0.0;
    Dterm = 0.0;
  }

  /*
    Angle behavior:
    - Lower angles move forward
    - Higher angles move backward
  */
  int servoAngle = neutralAngle - controlDirection * correction;

  servoAngle = constrain(servoAngle, forwardAngleLimit, backwardAngleLimit);

  beamServo.write(servoAngle);

  // -------------------- SERIAL OUTPUT FOR PLOTTER --------------------
  if (plotMode) {
    Serial.print("object:");
    Serial.print(objectDistance);
    Serial.print("\\t");

    Serial.print("target:");
    Serial.print(targetDistance);
    Serial.print("\\t");

    Serial.print("error:");
    Serial.print(error);
    Serial.print("\\t");

    Serial.print("velocity:");
    Serial.print(velocity);
    Serial.print("\\t");

    Serial.print("servo:");
    Serial.print(servoAngle);
    Serial.print("\\t");

    Serial.print("Pterm:");
    Serial.print(Pterm);
    Serial.print("\\t");

    Serial.print("Dterm:");
    Serial.print(Dterm);
    Serial.print("\\t");

    Serial.print("correction:");
    Serial.println(correction);
  } else {
    Serial.print("ObjRaw: ");
    Serial.print(objectRaw);

    Serial.print(" | ObjUsed: ");
    Serial.print(objectDistance);

    Serial.print(" | CubeRaw: ");
    Serial.print(cubeRaw);

    Serial.print(" | Target: ");
    Serial.print(targetDistance);

    Serial.print(" | Error: ");
    Serial.print(error);

    Serial.print(" | Vel: ");
    Serial.print(velocity);

    Serial.print(" | Pterm: ");
    Serial.print(Pterm);

    Serial.print(" | Dterm: ");
    Serial.print(Dterm);

    Serial.print(" | Corr: ");
    Serial.print(correction);

    Serial.print(" | Servo: ");
    Serial.println(servoAngle);
  }

  // -------------------- UPDATE --------------------
  lastObjectDistance = objectDistance;
  lastTime = now;

  delay(35);
}`;
