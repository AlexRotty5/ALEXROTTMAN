export const FULL_ARDUINO_SCRIPT = `#include <Servo.h>

Servo beamServo;

const int servoPin = 9;

const int carTrigPin = 7;
const int carEchoPin = 6;

const int cubeTrigPin = 3;
const int cubeEchoPin = 4;

const int balanceAngle = 110;

const int forwardTiltLimit = 90;
const int backwardTiltLimit = 135;

const int servoFlip = -1;

float Kp = 3.4;
float Kd = 0.7;

const float frictionPush = 7.0;
const float settleZoneCM = 0.8;

const float minGoodCM = 2.0;
const float maxGoodCM = 35.0;

const float minCubeTargetCM = 5.0;
const float maxCubeTargetCM = 30.0;

float cubeSensorOffset = 0.0;

float lastGoodCar = 15.0;
float lastGoodCube = 15.0;
float lastCarSpot = 15.0;

unsigned long lastLoopTime = 0;

const bool plotMode = true;

float getDistanceCM(int trigPin, int echoPin) {
  long pulseTime;

  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);

  digitalWrite(trigPin, LOW);

  pulseTime = pulseIn(echoPin, HIGH, 25000);

  if (pulseTime == 0) {
    return -1;
  }

  return pulseTime / 58.2;
}

void setup() {
  Serial.begin(9600);

  pinMode(carTrigPin, OUTPUT);
  pinMode(carEchoPin, INPUT);

  pinMode(cubeTrigPin, OUTPUT);
  pinMode(cubeEchoPin, INPUT);

  beamServo.attach(servoPin);
  beamServo.write(balanceAngle);

  delay(1500);

  float carStart = getDistanceCM(carTrigPin, carEchoPin);
  delay(50);

  float cubeStart = getDistanceCM(cubeTrigPin, cubeEchoPin);

  if (carStart >= minGoodCM && carStart <= maxGoodCM) {
    lastGoodCar = carStart;
  } else {
    lastGoodCar = 15.0;
  }

  if (cubeStart >= minGoodCM && cubeStart <= maxGoodCM) {
    lastGoodCube = cubeStart;
  } else {
    lastGoodCube = lastGoodCar;
  }

  lastCarSpot = lastGoodCar;
  lastLoopTime = millis();

  if (!plotMode) {
    Serial.println("hot wheels cube follow started");
    Serial.println("final version that worked");
    Serial.println("kp 3.4");
    Serial.println("kd 0.7");
    Serial.println("settle zone .8 cm");
    Serial.println("balance angle 110");
    Serial.println("angle range 90 to 135");
  }
}

void loop() {
  float carRaw = getDistanceCM(carTrigPin, carEchoPin);
  delay(25);

  if (carRaw >= minGoodCM && carRaw <= maxGoodCM) {
    lastGoodCar = carRaw;
  }

  float cubeRaw = getDistanceCM(cubeTrigPin, cubeEchoPin);
  delay(25);

  if (cubeRaw >= minGoodCM && cubeRaw <= maxGoodCM) {
    lastGoodCube = cubeRaw;
  }

  float carSpot = lastGoodCar;

  float targetSpot = lastGoodCube + cubeSensorOffset;
  targetSpot = constrain(targetSpot, minCubeTargetCM, maxCubeTargetCM);

  unsigned long now = millis();
  float dt = (now - lastLoopTime) / 1000.0;

  if (dt <= 0.001) {
    dt = 0.05;
  }

  float error = carSpot - targetSpot;

  float carSpeed = (carSpot - lastCarSpot) / dt;

  float Pterm = Kp * error;
  float Dterm = Kd * carSpeed;

  float correction = 0.0;

  if (abs(error) > settleZoneCM) {
    correction = Pterm + Dterm;

    if (correction > 0 && correction < frictionPush) {
      correction = frictionPush;
    }

    if (correction < 0 && correction > -frictionPush) {
      correction = -frictionPush;
    }
  } else {
    correction = 0.0;
    Pterm = 0.0;
    Dterm = 0.0;
  }

  int servoAngle = balanceAngle - servoFlip * correction;

  servoAngle = constrain(servoAngle, forwardTiltLimit, backwardTiltLimit);

  beamServo.write(servoAngle);

  if (plotMode) {
    Serial.print("car:");
    Serial.print(carSpot);
    Serial.print("\\t");

    Serial.print("cube:");
    Serial.print(targetSpot);
    Serial.print("\\t");

    Serial.print("err:");
    Serial.print(error);
    Serial.print("\\t");

    Serial.print("spd:");
    Serial.print(carSpeed);
    Serial.print("\\t");

    Serial.print("servo:");
    Serial.print(servoAngle);
    Serial.print("\\t");

    Serial.print("p:");
    Serial.print(Pterm);
    Serial.print("\\t");

    Serial.print("d:");
    Serial.print(Dterm);
    Serial.print("\\t");

    Serial.print("corr:");
    Serial.println(correction);
  } else {
    Serial.print("car raw ");
    Serial.print(carRaw);

    Serial.print(" | car used ");
    Serial.print(carSpot);

    Serial.print(" | cube raw ");
    Serial.print(cubeRaw);

    Serial.print(" | target ");
    Serial.print(targetSpot);

    Serial.print(" | err ");
    Serial.print(error);

    Serial.print(" | speed ");
    Serial.print(carSpeed);

    Serial.print(" | p ");
    Serial.print(Pterm);

    Serial.print(" | d ");
    Serial.print(Dterm);

    Serial.print(" | corr ");
    Serial.print(correction);

    Serial.print(" | servo ");
    Serial.println(servoAngle);
  }

  lastCarSpot = carSpot;
  lastLoopTime = now;

  delay(35);
}`;

export const CODE_WALKTHROUGH_TAKEAWAY =
  'The code reads the car and cube, checks for bad sensor values, calculates error and velocity, applies PD correction, and moves the servo within a tested range. The deadband, minimum push, and Serial Plotter helped make the system smoother and easier to tune.';

export const CODE_WALKTHROUGH_SECTIONS = [
  {
    title: '1. Hardware Setup',
    code: `#include <Servo.h>

Servo beamServo;

const int servoPin = 9;

const int carTrigPin = 7;
const int carEchoPin = 6;

const int cubeTrigPin = 3;
const int cubeEchoPin = 4;`,
    description:
      'This connects the code to the physical system: one servo controls the beam, one ultrasonic sensor tracks the Hot Wheels car, and the other tracks the reference cube.',
  },
  {
    title: '2. Servo Angles',
    code: `const int balanceAngle = 110;

const int forwardTiltLimit = 90;
const int backwardTiltLimit = 135;

const int servoFlip = -1;`,
    description:
      'I found the neutral angle (110) through testing angle degree by degree. Lower angles rolled the car forward, higher angles rolled it backward, and the limits kept the beam from tilting too aggressively.',
  },
  {
    title: '3. Tuning Values',
    code: `float Kp = 3.4;
float Kd = 0.7;

const float frictionPush = 7.0;
const float settleZoneCM = 0.8;`,
    description:
      'Kp controls how strongly the beam reacts to position error, while Kd adds damping based on the car\u2019s motion. The deadband stops tiny corrections near the target so it can settle, and the minimum push helps when I was dealing with friction.',
  },
  {
    title: '4. Sensor Limits',
    code: `const float minGoodCM = 2.0;
const float maxGoodCM = 35.0;

const float minCubeTargetCM = 5.0;
const float maxCubeTargetCM = 30.0;

float cubeSensorOffset = 0.0;`,
    description:
      'These limits helped me ignore bad ultrasonic readings and kept the cube target within a realistic part of the beam (I would sometimes randomly get a reading farther away than the end of the beam).',
  },
  {
    title: '5. Saved Sensor Values',
    code: `float lastGoodCar = 15.0;
float lastGoodCube = 15.0;
float lastCarSpot = 15.0;

unsigned long lastLoopTime = 0;`,
    description:
      'The code stores the last good sensor readings so one bad ultrasonic value does not suddenly throw off the controller (basically makes it so it doesn\u2019t listen to every value the sensor gives).',
  },
  {
    title: '6. Distance Function',
    code: `float getDistanceCM(int trigPin, int echoPin) {
  long pulseTime;

  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);

  digitalWrite(trigPin, LOW);

  pulseTime = pulseIn(echoPin, HIGH, 25000);

  if (pulseTime == 0) {
    return -1;
  }

  return pulseTime / 58.2;
}`,
    description:
      'This function reads an ultrasonic sensor and converts the echo time into centimeters. If the sensor times out, it returns -1 so the bad reading can be ignored!',
  },
  {
    title: '7. Starting the System',
    code: `void setup() {
  Serial.begin(9600);

  pinMode(carTrigPin, OUTPUT);
  pinMode(carEchoPin, INPUT);

  pinMode(cubeTrigPin, OUTPUT);
  pinMode(cubeEchoPin, INPUT);

  beamServo.attach(servoPin);
  beamServo.write(balanceAngle);
}`,
    description:
      'The setup starts the Serial Monitor, prepares both sensors, attaches the servo, and moves the beam to the neutral position.',
  },
  {
    title: '8. Reading the Car + Cube',
    code: `float carRaw = getDistanceCM(carTrigPin, carEchoPin);

if (carRaw >= minGoodCM && carRaw <= maxGoodCM) {
  lastGoodCar = carRaw;
}

float cubeRaw = getDistanceCM(cubeTrigPin, cubeEchoPin);

if (cubeRaw >= minGoodCM && cubeRaw <= maxGoodCM) {
  lastGoodCube = cubeRaw;
}`,
    description:
      'Each loop reads the Hot Wheels car and the cube. The code only updates the values if the readings are realistic, which makes the controller less jumpy.',
  },
  {
    title: '9. Target Position',
    code: `float carSpot = lastGoodCar;

float targetSpot = lastGoodCube + cubeSensorOffset;
targetSpot = constrain(targetSpot, minCubeTargetCM, maxCubeTargetCM);`,
    description:
      'The cube acts as the moving target. The target is constrained so the controller does not try to send the car to an impossible position on the beam.',
  },
  {
    title: '10. Error + Velocity',
    code: `float error = carSpot - targetSpot;

float carSpeed = (carSpot - lastCarSpot) / dt;`,
    description:
      'The error tells the controller how far the car is from the cube. The velocity estimates how fast the car is moving.',
  },
  {
    title: '11. PD Terms',
    code: `float Pterm = Kp * error;
float Dterm = Kd * carSpeed;`,
    description:
      'The P term pushes the car back toward the target. The D term helps slow the response down so the car does not overshoot as much.',
  },
  {
    title: '12. Deadband + Minimum Push',
    code: `float correction = 0.0;

if (abs(error) > settleZoneCM) {
  correction = Pterm + Dterm;

  if (correction > 0 && correction < frictionPush) {
    correction = frictionPush;
  }

  if (correction < 0 && correction > -frictionPush) {
    correction = -frictionPush;
  }
} else {
  correction = 0.0;
  Pterm = 0.0;
  Dterm = 0.0;
}`,
    description:
      'If the car is close enough, the code stops correcting to reduce jitter. If it is outside the deadband, the minimum push makes sure the servo moves enough to overcome friction.',
  },
  {
    title: '13. Servo Command',
    code: `int servoAngle = balanceAngle - servoFlip * correction;

servoAngle = constrain(servoAngle, forwardTiltLimit, backwardTiltLimit);

beamServo.write(servoAngle);`,
    description:
      'The correction becomes a servo angle. The angle is limited to the safe range I tested, then sent to the servo to tilt the beam.',
  },
  {
    title: '14. Serial Plotter',
    code: `Serial.print("car:");
Serial.print(carSpot);
Serial.print("\\t");

Serial.print("cube:");
Serial.print(targetSpot);
Serial.print("\\t");

Serial.print("err:");
Serial.print(error);
Serial.print("\\t");

Serial.print("spd:");
Serial.print(carSpeed);
Serial.print("\\t");

Serial.print("servo:");
Serial.println(servoAngle);`,
    description:
      'I graphed the object position, target position, error, velocity, and servo angle so I could compare the data to the actual Hot Wheels motion while tuning.',
  },
  {
    title: '15. Update for Next Loop',
    code: `lastCarSpot = carSpot;
lastLoopTime = now;

delay(35);`,
    description:
      'At the end of each loop, the code saves the current position and time so the next loop can calculate velocity correctly.',
  },
] as const;
