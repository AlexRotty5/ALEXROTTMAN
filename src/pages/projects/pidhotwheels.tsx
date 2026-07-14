// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Copy, Maximize2, Mic, MicOff, X } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { ProjectDetailBackNav } from '@/components/ProjectDetailBackNav';
import { FULL_ARDUINO_SCRIPT } from '@/content/pdBalanceBeamSketch';

const VIDEO_SRC = '/images/pid-hot-wheels-page.MOV';

const HARDWARE_TESTING_SLIDES = [
  {
    src: '/images/pid/step01-arduino.png',
    alt: 'Testing Arduino Uno on a workbench',
    label: 'Testing Arduino Uno',
    caption:
      'Checking that the Arduino was working properly and could run basic test code before connecting the full system.',
  },
  {
    src: '/images/pid/step01-ultrasonic.png',
    alt: 'Testing ultrasonic sensors at a desk',
    label: 'Testing Ultrasonic Sensors',
    caption:
      'Reading distance values from the ultrasonic sensors to make sure they could track the car and target positions.',
  },
  {
    src: '/images/pid/step01-servo.png',
    alt: 'Testing servo motor with external 5V power',
    label: 'Testing Servo + 5V Power',
    caption:
      'Testing the servo motor with the external 5V power supply to make sure it could move reliably without overloading the Arduino. Glad I did this before fixturing - one of my servos was dead.',
  },
];

const STRUCTURE_BUILD_SLIDES = [
  {
    src: '/images/pid/step02-01-building-pillars-beam.png',
    alt: 'Basswood pillars and beam parts being built by hand',
    label: 'Building the Pillars + Beam',
    caption: 'Cutting and assembling the first basswood pieces that formed the main support structure and beam.',
  },
  {
    src: '/images/pid/step02-02-aligning-pillars.png',
    alt: 'Checking the spacing between two basswood pillars',
    label: 'Aligning / Spacing the Pillars',
    caption: 'Setting the pillar spacing by hand so the beam could pivot cleanly without rubbing or drifting.',
  },
  {
    src: '/images/pid/step02-03-assembling-beam-pillars.png',
    alt: 'Beam assembled to basswood pillars with a screw pivot',
    label: 'Assembling the Beam to the Pillars',
    caption: 'Using screws and nuts to create a simple pivot while keeping the beam centered between the supports.',
  },
  {
    src: '/images/pid/step02-04-fixturing-base.png',
    alt: 'Basswood beam and pillars being fixed to a base plate',
    label: 'Fixturing to the Base',
    caption: 'Securing the beam and pillars to the base so the structure stayed consistent during testing.',
  },
  {
    src: '/images/pid/step02-05-top-ultrasonic.png',
    alt: 'Top ultrasonic sensor mounted at the end of the beam',
    label: 'Fixturing the Top Ultrasonic Sensor',
    caption: 'Mounting the upper sensor so it could read the target object along the length of the beam.',
  },
  {
    src: '/images/pid/step02-06-servo-mount.png',
    alt: 'Hand-built basswood servo mount for the balance beam',
    label: 'Building a Servo Mount',
    caption: 'Building a custom mount from basswood so the servo sat high enough for useful motion range.',
  },
  {
    src: '/images/pid/step02-07-fixturing-servo.png',
    alt: 'Servo mounted under the balance beam with linkage geometry',
    label: 'Fixturing the Servo',
    caption: 'Positioning the servo and lever arm so it could create aggressive enough beam angles in both directions.',
  },
  {
    src: '/images/pid/step02-08-lower-ultrasonic.png',
    alt: 'Lower ultrasonic sensor aligned with the beam and target object',
    label: 'Fixturing the Lower Ultrasonic Sensor',
    caption: 'Aligning the second sensor to match the upper sensor readings for the cube, car, or ping pong ball.',
  },
];


const PHYSICAL_TUNING_SLIDES = [
  {
    src: '/images/pid/step03-01-servo-range.png',
    type: 'image',
    alt: 'Servo linkage mounted under the beam for a range of motion test',
    label: 'Servo range test',
    caption: 'Taped the servo in place to check beam tilt range before gluing.',
    callouts: [
      { tone: 'blue', label: 'Test', text: 'Temporarily taped the servo before gluing the fixture permanently.' },
      { tone: 'gray', label: 'Goal', text: 'Check that the servo could tilt the beam aggressively in both directions.' },
      { tone: 'green', label: 'Result', text: 'The beam had enough motion to roll the object forward and backward. I fixed it with wood glue.' },
    ],
  },
  {
    src: '/images/pid/step03-02-equilibrium.MOV',
    type: 'video',
    alt: 'Testing servo angles to find the balance beam equilibrium angle',
    label: 'Equilibrium angle',
    caption: 'Finding the neutral servo angle — but the guardrails kept making the ball hard to read.',
    callouts: [
      { tone: 'red', label: 'Problem', text: 'The guard rails made it very hard for the ball to behave consistently — it rolled forward more easily than backward and would get stuck.' },
      { tone: 'blue', label: 'Test', text: 'Tried servo angles where the ball stopped, rolled forward, or rolled backward.' },
      { tone: 'gray', label: 'Takeaway', text: 'I needed to find a way to move the ball more consistently without guard rails. I ordered bamboo sticks.' },
    ],
  },
  {
    src: '/images/pid/step03-03-rails.png',
    type: 'image',
    alt: 'Bamboo sticks added to the balance beam as narrow rails for the ping pong ball',
    label: 'Bamboo sticks',
    caption: 'Replaced the guard rails with narrow bamboo sticks for a cleaner rolling path.',
    callouts: [
      { tone: 'blue', label: 'Fix', text: 'Glued thin bamboo sticks along the beam to guide the ball without the wide guard rails.' },
      { tone: 'green', label: 'Result', text: 'The ball stayed on one path and rolled more consistently forward and backward.' },
      { tone: 'gray', label: 'Takeaway', text: 'A narrower track made it easier to compare motion during later tests.' },
    ],
  },
  {
    src: '/images/pid/step03-04-first-sensor-control.MOV',
    type: 'video',
    alt: 'First ultrasonic sensor control test with the ping pong ball',
    label: 'First sensor control',
    caption: 'First closed-loop test — the ball reacted but never settled.',
    callouts: [
      { tone: 'blue', label: 'Test', text: 'Balanced near the center of the beam, about 15 cm from the sensor.' },
      { tone: 'red', label: 'Problem', text: 'The ping pong ball reacted, but never fully settled.' },
      { tone: 'gray', label: 'Takeaway', text: 'The physical setup was still too unstable for reliable PD control.' },
    ],
  },
  {
    src: '/images/pid/step03-06-reference-cube-friction.png',
    type: 'image',
    alt: 'Reference cube and tape added to the balance beam setup',
    label: 'Reference cube + friction',
    caption: 'Added a reference cube and tape on the rails to slow the ball.',
    callouts: [
      { tone: 'blue', label: 'Test', text: 'Added the reference cube to test different target positions.' },
      { tone: 'green', label: 'Fix', text: 'Added tape to the guard rails to slow the ping pong ball down.' },
      { tone: 'gray', label: 'Takeaway', text: 'The full-system logic improved, but the ball was still too sensitive.' },
    ],
  },
  {
    src: '/images/pid/step03-07-golf-ball.png',
    type: 'image',
    alt: 'Golf ball test on widened balance beam rails',
    label: 'Golf ball test',
    caption: 'Widened rails and tried a golf ball for more mass — still too fast.',
    callouts: [
      { tone: 'red', label: 'Problem', text: 'The ping pong ball was still too light and reactive.' },
      { tone: 'blue', label: 'Test', text: 'Widened the rails and tried a golf ball for more mass and friction.' },
      { tone: 'green', label: 'Result', text: 'The golf ball changed the behavior, but built up too much speed.' },
    ],
  },
  {
    src: '/images/pid/step03-08-tennis-ball.MOV',
    type: 'video',
    alt: 'Tennis ball and tape test with the reference cube connected',
    label: 'Tennis ball + tape',
    caption: 'Tennis ball with added friction — still would not balance reliably.',
    callouts: [
      { tone: 'red', label: 'Problem', text: 'The system still needed a slower, more stable object.' },
      { tone: 'blue', label: 'Test', text: 'Tried a tennis ball with electrical tape on the rails and path.' },
      { tone: 'green', label: 'Result', text: 'Even with added friction, the system still would not balance reliably.' },
      { tone: 'gray', label: 'Takeaway', text: 'I needed an object that was easier for the sensor to track.' },
    ],
  },
  {
    src: '/images/pid/step03-09-linkage-spacer.png',
    type: 'image',
    alt: 'White spacer added to improve servo horn and linkage alignment',
    label: 'Linkage alignment',
    caption: 'Spacer aligned the servo horn and beam linkage.',
    callouts: [
      { tone: 'red', label: 'Problem', text: 'The servo horn and beam linkage were slightly angled.' },
      { tone: 'green', label: 'Fix', text: 'Added a white washer spacer to improve alignment.' },
      { tone: 'gray', label: 'Takeaway', text: 'The motion seemed more controlled after the spacer, but it still was not consistent enough for what I was going for.' },
    ],
  },
  {
    src: '/images/pid/step04-10-hot-wheels-car.png',
    type: 'image',
    alt: 'Hot Wheels car modified for ultrasonic sensing on the balance beam',
    label: 'Hot Wheels car',
    caption: 'Swapped the ball for a car — cleaner sensor reads and steadier motion.',
    callouts: [
      { tone: 'green', label: 'Fix', text: 'Replaced the ball with a Hot Wheels car.' },
      { tone: 'gray', label: 'Why', text: 'The car moved more consistently and gave the ultrasonic sensor a cleaner surface.' },
      { tone: 'green', label: 'Result', text: 'The system became more repeatable for PD control.' },
    ],
  },
];

const PD_CONTROLLER_LOGIC = `error = targetDistance - measuredDistance;
derivative = error - previousError;
correction = Kp * error + Kd * derivative;
servoAngle = neutralAngle + correction;`;

const SOFTWARE_TUNING_SLIDES = [
  {
    type: 'single',
    src: '/images/pid/step03-05-damping.MOV',
    alt: 'Increasing derivative damping while the object oscillates on the beam',
    label: 'Tuning damping',
    caption: 'Once the physical setup was solid, I started cranking the D term to calm oscillation.',
    callouts: [
      { tone: 'red', label: 'Problem', text: 'The car kept oscillating around the target and would not settle.' },
      { tone: 'blue', label: 'Try', text: 'Cranked up the D term to add damping and cut overshoot.' },
      { tone: 'green', label: 'Result', text: 'It helped a little, but too much D started reacting to noisy ultrasonic readings.' },
      { tone: 'gray', label: 'Takeaway', text: 'Derivative only helps when the speed estimate is actually clean.' },
    ],
  },
  {
    type: 'comparison',
    label: 'Too much overshoot',
    graph: {
      src: '/images/pid/step05-01-overshoot-graph.MOV',
      alt: 'Serial Plotter graph showing the car overshooting the target',
      viewLabel: 'Serial Plotter',
      caption: 'The line kept crossing past the target instead of settling.',
    },
    physical: {
      src: '/images/pid/step05-02-overshoot-physical.MOV',
      alt: 'Hot Wheels car overshooting the target on the balance beam',
      viewLabel: 'On the beam',
      caption: 'Same thing in real life — the car had too much speed and rolled past center.',
    },
    codeSnippet: 'Kp = 5.5;\nKd = 0.25;',
    explanation:
      'The controller was correcting in the right direction, but Kp was too strong and Kd was not slowing it down fast enough. I would watch the graph cross the setpoint, look up, and see the car do the same thing. That is when I started pulling Kp back and trying more damping.',
    tuningTakeaway: 'High Kp, low Kd — fast response, but it overshot every time.',
  },
  {
    type: 'comparison',
    label: 'Too sensitive',
    graph: {
      src: '/images/pid/step05-03-too-sensitive-graph.MOV',
      alt: 'Serial Plotter graph showing rapid fluctuations around the target',
      viewLabel: 'Serial Plotter',
      caption: 'Small rapid wiggles around the target on the graph.',
    },
    physical: {
      src: '/images/pid/step05-04-too-sensitive-physical.MOV',
      alt: 'Hot Wheels car jittering near the target on the balance beam',
      viewLabel: 'On the beam',
      caption: 'The servo kept twitching and the car never sat still near the target.',
    },
    codeSnippet: 'Kd = 1.3;\ndeadbandCM = 0.0;',
    explanation:
      'I kept turning Kd up trying to kill the overshoot, but the servo started reacting to every small change in the ultrasonic reading. With no deadband, it would not let the car sit still near the target — it just jittered in place.',
    tuningTakeaway: 'Too much Kd, no deadband — jittery and overcorrecting near the target.',
    finalCodeSnippet: `Kp = 3.4;
Kd = 0.7;
deadbandCM = 0.8;
minPushDegrees = 7.0;
neutralAngle = 110;`,
    finalExplanation:
      'By the time the physical side felt solid, the code still was not giving me the motion I wanted. After enough back and forth — change values, upload, watch the graph, watch the car — I landed somewhere in the middle. These were the numbers where the car could move toward the target without overshooting badly or fighting tiny sensor noise.',
    finalTakeaway:
      'Getting the physical system repeatable was only half of it. The rest was uploading new values and reading the graph next to the car until the code matched what the hardware could actually do. Overshoot meant back off Kp or add damping. Jitter meant I had pushed Kd too far or needed a deadband. The final values were where both finally performed as well as they could.',
  },
];

// Step shells — we'll fill title, description, and media together.
const BUILDING_STEPS = [
  {
    id: 'step-01',
    eyebrow: 'Step One',
    title: 'Test hardware',
    desc: 'Arduino, sensors, servo, and power checked before assembly.',
    note: 'Parts confirmed before building the full system.',
  },
  {
    id: 'step-02',
    eyebrow: 'Step Two',
    title: 'Build structure',
    desc: 'Basswood, acrylic, glue, and hardware formed the beam, pillars, mounts, and sensor fixtures.',
  },
  {
    id: 'step-03',
    eyebrow: 'Step Three',
    title: 'Writing the Code',
    desc: 'The Arduino structure established before tuning Kp and Kd.',
  },
  {
    id: 'step-04',
    eyebrow: 'Physical tuning',
    title: 'Physical',
    desc: 'Friction, how things were secured, rails, linkage, and what object was on the beam.',
  },
  {
    id: 'step-05',
    eyebrow: 'Software tuning',
    title: 'Software',
    desc: 'After the physical system was dialed in, tuning the code to squeeze out the best performance.',
  },
];

const videoControlButtonClass =
  'flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70';

const inter = { fontFamily: "'Inter', sans-serif" };

const carouselNavButtonClass =
  'flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md ring-1 ring-gray-200/80 transition-colors hover:bg-white hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50';

function HardwareTestingCarousel({ onExpandPhoto }: { onExpandPhoto: (slide: (typeof HARDWARE_TESTING_SLIDES)[number]) => void }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const syncActiveFromScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.clientWidth <= 0) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(Math.min(Math.max(0, index), HARDWARE_TESTING_SLIDES.length - 1));
  }, []);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const clamped = Math.min(Math.max(0, index), HARDWARE_TESTING_SLIDES.length - 1);
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' });
    setActiveIndex(clamped);
  };

  const activeSlide = HARDWARE_TESTING_SLIDES[activeIndex];

  return (
    <div className="mx-auto w-full max-w-[16.5rem] sm:max-w-[18rem] lg:mx-0 lg:max-w-[20rem]">
      <div className="relative overflow-hidden rounded-xl">
        <div
          ref={scrollRef}
          onScroll={syncActiveFromScroll}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {HARDWARE_TESTING_SLIDES.map((slide) => (
            <div key={slide.src} className="w-full shrink-0 snap-center">
              <div className="relative mx-auto aspect-[3/4] max-h-[44vh] w-full overflow-hidden">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 288px, 320px"
                />
                <button
                  type="button"
                  onClick={() => onExpandPhoto(slide)}
                  className={`${videoControlButtonClass} absolute bottom-2 right-2 z-10 h-8 w-8`}
                  aria-label={`Expand ${slide.label} photo`}
                  title="Expand photo"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          className={`absolute left-2 top-1/2 z-10 -translate-y-1/2 ${carouselNavButtonClass} disabled:pointer-events-none disabled:opacity-35`}
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex === HARDWARE_TESTING_SLIDES.length - 1}
          className={`absolute right-2 top-1/2 z-10 -translate-y-1/2 ${carouselNavButtonClass} disabled:pointer-events-none disabled:opacity-35`}
          aria-label="Next photo"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {HARDWARE_TESTING_SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => scrollToIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-5 bg-sky-500' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="mt-3 min-h-[4.25rem]"
        >
          <p className="text-sm font-semibold text-gray-900" style={inter}>
            {activeSlide.label}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-gray-600" style={inter}>
            {activeSlide.caption}
          </p>
        </motion.div>
      </AnimatePresence>

      <p className="mt-2 text-center text-xs text-gray-400 lg:text-left" style={inter}>
        Swipe or use arrows to browse
      </p>
    </div>
  );
}

function Step01HardwareTesting({ step, onExpandPhoto }: { step: (typeof BUILDING_STEPS)[0]; onExpandPhoto: (slide: (typeof HARDWARE_TESTING_SLIDES)[number]) => void }) {
  return (
    <section className="border-t border-gray-100 py-10 first:border-t-0 first:pt-0 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white"
              style={inter}
            >
              I
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600/90"
              style={inter}
            >
              {step.eyebrow}
            </span>
          </div>

          <h3 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl" style={inter}>
            {step.title}
          </h3>

          <p className="mt-4 max-w-lg text-lg leading-relaxed text-gray-600 sm:text-xl" style={inter}>
            {step.desc}
          </p>

          {step.note && (
            <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-500" style={inter}>
              {step.note}
            </p>
          )}
        </div>

        <div className="lg:justify-self-end">
          <HardwareTestingCarousel onExpandPhoto={onExpandPhoto} />
        </div>
      </div>
    </section>
  );
}


function StructureBuildCarousel({ onExpandPhoto }: { onExpandPhoto: (slide: (typeof STRUCTURE_BUILD_SLIDES)[number]) => void }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const syncActiveFromScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.clientWidth <= 0) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(Math.min(Math.max(0, index), STRUCTURE_BUILD_SLIDES.length - 1));
  }, []);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const clamped = Math.min(Math.max(0, index), STRUCTURE_BUILD_SLIDES.length - 1);
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' });
    setActiveIndex(clamped);
  };

  const activeSlide = STRUCTURE_BUILD_SLIDES[activeIndex];

  return (
    <div className="mx-auto w-full max-w-[16.5rem] sm:max-w-[18rem] lg:mx-0 lg:max-w-[20rem]">
      <div className="relative overflow-hidden rounded-xl">
        <div
          ref={scrollRef}
          onScroll={syncActiveFromScroll}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {STRUCTURE_BUILD_SLIDES.map((slide) => (
            <div key={slide.src} className="w-full shrink-0 snap-center">
              <div className="relative mx-auto aspect-[3/4] max-h-[44vh] w-full overflow-hidden">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 288px, 320px"
                />
                <button
                  type="button"
                  onClick={() => onExpandPhoto(slide)}
                  className={`${videoControlButtonClass} absolute bottom-2 right-2 z-10 h-8 w-8`}
                  aria-label={`Expand ${slide.label} photo`}
                  title="Expand photo"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          className={`absolute left-2 top-1/2 z-10 -translate-y-1/2 ${carouselNavButtonClass} disabled:pointer-events-none disabled:opacity-35`}
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex === STRUCTURE_BUILD_SLIDES.length - 1}
          className={`absolute right-2 top-1/2 z-10 -translate-y-1/2 ${carouselNavButtonClass} disabled:pointer-events-none disabled:opacity-35`}
          aria-label="Next photo"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {STRUCTURE_BUILD_SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => scrollToIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-5 bg-sky-500' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="mt-3 min-h-[4.25rem]"
        >
          <p className="text-sm font-semibold text-gray-900" style={inter}>
            {activeSlide.label}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-gray-600" style={inter}>
            {activeSlide.caption}
          </p>
        </motion.div>
      </AnimatePresence>

      <p className="mt-2 text-center text-xs text-gray-400 lg:text-left" style={inter}>
        Swipe or use arrows to browse
      </p>
    </div>
  );
}

function Step02BuildingStructure({ step, onExpandPhoto }: { step: (typeof BUILDING_STEPS)[1]; onExpandPhoto: (slide: (typeof STRUCTURE_BUILD_SLIDES)[number]) => void }) {
  return (
    <section className="border-t border-gray-100 py-10 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white"
              style={inter}
            >
              II
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600/90"
              style={inter}
            >
              {step.eyebrow}
            </span>
          </div>

          <h3 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl" style={inter}>
            {step.title}
          </h3>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-600 sm:text-lg" style={inter}>
            {step.desc}
          </p>

          <div className="mt-6 max-w-lg rounded-2xl bg-gray-50 p-5 ring-1 ring-gray-100">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600/90" style={inter}>
              Key build considerations
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-600" style={inter}>
              <li>Keep both ultrasonic sensors aligned so they read the same target distance.</li>
              <li>Mount the servo high enough, with a long enough lever arm, to tilt the beam both ways.</li>
              <li>Secure every hand-built fixture so the physical system stayed predictable for tuning.</li>
            </ul>
          </div>
        </div>

        <div className="lg:justify-self-end">
          <StructureBuildCarousel onExpandPhoto={onExpandPhoto} />
        </div>
      </div>
    </section>
  );
}


const tuningCalloutClassByTone = {
  red: 'border-red-100 bg-red-50 text-red-800 hover:border-red-200 hover:bg-red-100/80',
  blue: 'border-sky-100 bg-sky-50 text-sky-800 hover:border-sky-200 hover:bg-sky-100/80',
  green: 'border-emerald-100 bg-emerald-50 text-emerald-800 hover:border-emerald-200 hover:bg-emerald-100/80',
  gray: 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300 hover:bg-gray-100/80',
};

function TuningCalloutList({ callouts }: { callouts: Array<{ tone: keyof typeof tuningCalloutClassByTone; label: string; text: string }> }) {
  return (
    <div className="mt-5 flex flex-col gap-2.5">
      {callouts.map((callout) => (
        <div
          key={callout.label}
          className={`group rounded-xl border px-4 py-3 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:px-5 hover:py-4 hover:shadow-md ${tuningCalloutClassByTone[callout.tone]}`}
          style={inter}
        >
          <p className="text-xs font-bold uppercase tracking-[0.14em]">{callout.label}</p>
          <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-200 group-hover:grid-rows-[1fr] group-hover:opacity-100">
            <div className="overflow-hidden">
              <p className="pt-2 text-sm leading-relaxed">{callout.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TuningSlideDetails({
  label,
  caption,
  callouts,
}: {
  label: string;
  caption: string;
  callouts: Array<{ tone: keyof typeof tuningCalloutClassByTone; label: string; text: string }>;
}) {
  return (
    <div className="min-h-[8rem] lg:pt-1">
      <p className="text-lg font-semibold leading-snug text-gray-900 sm:text-xl" style={inter}>
        {label}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base" style={inter}>
        {caption}
      </p>
      <TuningCalloutList callouts={callouts} />
    </div>
  );
}

function PhysicalTuningCarousel({ onExpandPhoto }: { onExpandPhoto: (slide: { src: string; alt: string; label: string; caption?: string; type?: string }) => void }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const syncActiveFromScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.clientWidth <= 0) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(Math.min(Math.max(0, index), PHYSICAL_TUNING_SLIDES.length - 1));
  }, []);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const clamped = Math.min(Math.max(0, index), PHYSICAL_TUNING_SLIDES.length - 1);
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' });
    setActiveIndex(clamped);
  };

  const activeSlide = PHYSICAL_TUNING_SLIDES[activeIndex];

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      video.muted = isMuted;

      if (index === activeIndex && PHYSICAL_TUNING_SLIDES[index]?.type === 'video') {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex, isMuted]);

  return (
    <div className="w-full">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="min-w-0">
          <div className="relative mr-auto h-[44vh] w-[33vh] max-w-full overflow-hidden rounded-2xl bg-gray-950 lg:h-[48vh] lg:w-[36vh]">
            <div
              ref={scrollRef}
              onScroll={syncActiveFromScroll}
              className="flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {PHYSICAL_TUNING_SLIDES.map((slide, index) => (
                <div key={slide.src} className="h-full w-full shrink-0 snap-center">
                  <div className="relative h-full w-full overflow-hidden">
                    {slide.type === 'video' ? (
                      <>
                        <video
                          ref={(node) => {
                            videoRefs.current[index] = node;
                          }}
                          src={slide.src}
                          muted={isMuted}
                          loop
                          playsInline
                          preload="metadata"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute bottom-3 right-3 z-10 flex gap-2">
                          <button
                            type="button"
                            onClick={() => setIsMuted((current) => !current)}
                            className={`${videoControlButtonClass} h-8 w-8`}
                            aria-label={isMuted ? `Unmute ${slide.label} video` : `Mute ${slide.label} video`}
                            title={isMuted ? 'Unmute video' : 'Mute video'}
                          >
                            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              videoRefs.current[index]?.pause();
                              onExpandPhoto(slide);
                            }}
                            className={`${videoControlButtonClass} h-8 w-8`}
                            aria-label={`Expand ${slide.label} video`}
                            title="Expand video"
                          >
                            <Maximize2 className="h-4 w-4" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 1024px) 100vw, 560px"
                        />
                        <button
                          type="button"
                          onClick={() => onExpandPhoto(slide)}
                          className={`${videoControlButtonClass} absolute bottom-3 right-3 z-10 h-8 w-8`}
                          aria-label={`Expand ${slide.label} photo`}
                          title="Expand photo"
                        >
                          <Maximize2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              className={`absolute left-3 top-1/2 z-10 -translate-y-1/2 ${carouselNavButtonClass} disabled:pointer-events-none disabled:opacity-35`}
              aria-label="Previous media"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex === PHYSICAL_TUNING_SLIDES.length - 1}
              className={`absolute right-3 top-1/2 z-10 -translate-y-1/2 ${carouselNavButtonClass} disabled:pointer-events-none disabled:opacity-35`}
              aria-label="Next media"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 lg:max-w-[36vh]">
            <p className="text-xs font-semibold text-gray-400" style={inter}>
              {String(activeIndex + 1).padStart(2, '0')} / {String(PHYSICAL_TUNING_SLIDES.length).padStart(2, '0')}
            </p>
            <div className="flex flex-wrap justify-end gap-1.5">
              {PHYSICAL_TUNING_SLIDES.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => scrollToIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-5 bg-sky-500' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to media ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="min-h-[8rem] lg:pt-1"
          >
            <TuningSlideDetails
              label={activeSlide.label}
              caption={activeSlide.caption}
              callouts={activeSlide.callouts}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Step04PhysicalTuning({ step, onExpandPhoto }: { step: (typeof BUILDING_STEPS)[2]; onExpandPhoto: (slide: { src: string; alt: string; label: string; caption?: string; type?: string }) => void }) {
  return (
    <section className="border-t border-gray-100 py-10 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white"
              style={inter}
            >
              A
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600/90"
              style={inter}
            >
              {step.eyebrow}
            </span>
          </div>

          <h3 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl" style={inter}>
            {step.title}
          </h3>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-600 sm:text-lg" style={inter}>
            {step.desc}
          </p>

          <div className="mt-6 max-w-lg rounded-2xl bg-gray-50 p-5 ring-1 ring-gray-100">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600/90" style={inter}>
              Engineering takeaway
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600" style={inter}>
              Before tuning the controller, I had to tune the physical system. The object, rails, servo linkage, beam angle, friction, and sensor readings all affected the control behavior.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600" style={inter}>
              The biggest physical fix was switching from balls to the Hot Wheels car, because it made the system less sensitive, easier to track, and more repeatable.
            </p>
          </div>
        </div>

        <div className="lg:justify-self-end">
          <PhysicalTuningCarousel onExpandPhoto={onExpandPhoto} />
        </div>
      </div>
    </section>
  );
}

function Step05SoftwareTuning({ step, onExpandPhoto }: { step: (typeof BUILDING_STEPS)[3]; onExpandPhoto: (slide: { src: string; alt: string; label: string; caption?: string; type?: string }) => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const slide = SOFTWARE_TUNING_SLIDES[0];
  const dampingSrc = slide.type === 'single' ? slide.src : '';

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = isMuted;
    void videoRef.current.play().catch(() => {});
  }, [isMuted]);

  return (
    <section className="border-t border-gray-100 py-10 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white"
              style={inter}
            >
              B
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600/90"
              style={inter}
            >
              {step.eyebrow}
            </span>
          </div>

          <h3 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl" style={inter}>
            {step.title}
          </h3>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-600 sm:text-lg" style={inter}>
            {step.desc}
          </p>

          <div className="mt-6 max-w-lg rounded-2xl bg-gray-50 p-5 ring-1 ring-gray-100">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600/90" style={inter}>
              Reading the motion
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-600" style={inter}>
              <li>Overshooting the target meant the response was too aggressive.</li>
              <li>Slow oscillation meant the controller needed better damping.</li>
              <li>Fast servo jitter meant the D term was reacting to noisy ultrasonic readings.</li>
              <li>Weak correction meant Kp was probably too low.</li>
              <li>Constant tiny corrections meant the target needed a deadband or acceptable range.</li>
            </ul>
          </div>

          <div className="mt-6 max-w-lg rounded-2xl bg-gray-50 p-5 ring-1 ring-gray-100">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600/90" style={inter}>
              Engineering takeaway
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600" style={inter}>
              I tuned the controller by reading the system's behavior as I was also changing the physical setup. Overshoot, slow oscillation, fast jitter, and weak correction each pointed to a different issue.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600" style={inter}>
              By comparing the videos with Serial Plotter graphs, I could decide whether the next fix should be mechanical or software-based.
            </p>
          </div>
        </div>

        <div className="lg:justify-self-end">
          <div className="mx-auto w-full max-w-[18rem] sm:max-w-[20rem] lg:mx-0 lg:max-w-[22rem]">
            <div className="relative overflow-hidden rounded-xl bg-gray-950">
              <div className="relative mx-auto h-[36vh] w-[27vh] max-w-full overflow-hidden">
                <video
                  ref={videoRef}
                  src={dampingSrc}
                  muted={isMuted}
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-2 right-2 z-10 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMuted((current) => !current)}
                    className={`${videoControlButtonClass} h-8 w-8`}
                    aria-label={isMuted ? `Unmute ${slide.label} video` : `Mute ${slide.label} video`}
                    title={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      videoRef.current?.pause();
                      onExpandPhoto(slide);
                    }}
                    className={`${videoControlButtonClass} h-8 w-8`}
                    aria-label={`Expand ${slide.label} video`}
                    title="Expand video"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-base font-semibold text-gray-900" style={inter}>
                {slide.label}
              </p>
              <div className="mt-3 space-y-2">
                {slide.callouts.map((callout) => (
                  <div
                    key={`${slide.label}-${callout.label}`}
                    className={`rounded-xl border px-3 py-2 ${tuningCalloutClassByTone[callout.tone]}`}
                  >
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em]" style={inter}>
                      {callout.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed" style={inter}>
                      {callout.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const CONTROL_LOOP_FLOW = ['Read sensors', 'Compute error', 'Apply PD', 'Command servo', 'Log + repeat'];

const mono = { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' };

function ExplainedCodeBlock({ code }: { code: string }) {
  return (
    <pre
      className="overflow-x-auto rounded-xl bg-gray-950 px-4 py-3 text-xs leading-relaxed text-sky-100 sm:text-sm"
      style={mono}
    >
      <code>{code}</code>
    </pre>
  );
}

function highlightArduinoLine(line: string) {
  if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
    return <span className="text-gray-500">{line}</span>;
  }

  const parts = [];
  let lastIndex = 0;
  const matches = [...line.matchAll(/(\/\/.*$)|\b(include|const|float|int|void|if|else|return|unsigned long|bool|Servo)\b|("([^"\\]|\\.)*")|\b(\d+\.?\d*)\b/g)];

  if (matches.length === 0) {
    return <span className="text-gray-100">{line}</span>;
  }

  matches.forEach((match, index) => {
    const start = match.index ?? 0;
    if (start > lastIndex) {
      parts.push(
        <span key={`text-${index}`} className="text-gray-100">
          {line.slice(lastIndex, start)}
        </span>
      );
    }

    const token = match[0];
    if (token.startsWith('//')) {
      parts.push(
        <span key={`comment-${index}`} className="text-gray-500">
          {token}
        </span>
      );
    } else if (match[2]) {
      parts.push(
        <span key={`keyword-${index}`} className="text-sky-300">
          {token}
        </span>
      );
    } else if (match[3]) {
      parts.push(
        <span key={`string-${index}`} className="text-emerald-300">
          {token}
        </span>
      );
    } else if (match[5]) {
      parts.push(
        <span key={`number-${index}`} className="text-amber-300">
          {token}
        </span>
      );
    }

    lastIndex = start + token.length;
  });

  if (lastIndex < line.length) {
    parts.push(
      <span key="tail" className="text-gray-100">
        {line.slice(lastIndex)}
      </span>
    );
  }

  return parts;
}

function ArduinoFullScriptModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setCopied(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(FULL_ARDUINO_SCRIPT);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-6" onClick={onClose}>
      <div
        className="flex h-[min(92vh,900px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-gray-950 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
          <p className="text-sm font-semibold text-white" style={inter}>
            Full Arduino Script
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/15"
              style={inter}
            >
              <Copy className="h-3.5 w-3.5" />
              {copied ? 'Copied' : 'Copy code'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/15"
              aria-label="Close full script"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-auto px-4 py-4 sm:px-5">
          <pre className="text-xs leading-relaxed sm:text-sm" style={mono}>
            <code>
              {FULL_ARDUINO_SCRIPT.split('\n').map((line, index) => (
                <div key={`line-${index}`} className="whitespace-pre">
                  {highlightArduinoLine(line)}
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

function ControlLoopFlow() {
  return (
    <p className="text-sm leading-relaxed text-gray-500" style={inter}>
      {CONTROL_LOOP_FLOW.join(' → ')}
    </p>
  );
}

function CodeExplanationSection({
  title,
  children,
  code,
  note,
}: {
  title: string;
  children: React.ReactNode;
  code?: string;
  note?: string;
}) {
  return (
    <section className="space-y-3">
      <h4 className="text-base font-semibold text-gray-900" style={inter}>
        {title}
      </h4>
      <div className="space-y-2 text-sm leading-relaxed text-gray-600" style={inter}>
        {children}
      </div>
      {code && <ExplainedCodeBlock code={code} />}
      {note && (
        <p className="text-sm leading-relaxed text-gray-500" style={inter}>
          {note}
        </p>
      )}
    </section>
  );
}

function ControlLoopBreakdown() {
  return (
    <div className="space-y-8">
      <CodeExplanationSection
        title="Setup"
        code={`const int servoPin = 9;
const int trigPinObject = 7;
const int echoPinObject = 6;
const int trigPinCube = 3;
const int echoPinCube = 4;

const int neutralAngle = 110;
const int forwardAngleLimit = 90;
const int backwardAngleLimit = 135;

float Kp = 3.4;
float Kd = 0.7;`}
      >
        <p>
          Pin assignments, a calibrated neutral angle, and safe tilt limits. Kp and Kd are the final tuned gains — the
          structure was in place before I found those values.
        </p>
      </CodeExplanationSection>

      <CodeExplanationSection
        title="Sensing"
        code={`float measureCM(int trigPin, int echoPin) {
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH, 25000);
  return duration / 58.2;
}

if (objectRaw >= minValidCM && objectRaw <= maxValidCM) {
  lastGoodObject = objectRaw;
}`}
      >
        <p>
          One sensor tracks the car, the other tracks the movable reference cube as the live target. Bad readings are
          ignored so a single glitch does not jerk the beam.
        </p>
      </CodeExplanationSection>

      <CodeExplanationSection
        title="PD control"
        code={`float error = objectDistance - targetDistance;
float velocity = (objectDistance - lastObjectDistance) / dt;

float correction = Kp * error + Kd * velocity;

if (abs(error) > deadbandCM) {
  if (correction > 0 && correction < minPushDegrees) {
    correction = minPushDegrees;
  }
} else {
  correction = 0.0;
}`}
      >
        <p>
          Error and velocity feed into the PD equation. A deadband keeps the beam level near the target, and a minimum
          push overcomes friction.
        </p>
      </CodeExplanationSection>

      <CodeExplanationSection
        title="Output"
        code={`servoAngle = constrain(servoAngle, forwardAngleLimit, backwardAngleLimit);
beamServo.write(servoAngle);

Serial.print("error:");
Serial.print(error);`}
      >
        <p>
          The correction becomes a constrained servo angle. Serial output lets me compare the graph with the physical
          car during tuning — it does not affect the controller.
        </p>
      </CodeExplanationSection>
    </div>
  );
}

function Step03Code({ step }: { step: (typeof BUILDING_STEPS)[2] }) {
  const [expanded, setExpanded] = useState(false);
  const [scriptOpen, setScriptOpen] = useState(false);

  return (
    <section className="border-t border-gray-100 py-10 first:border-t-0 first:pt-0 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white"
              style={inter}
            >
              III
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600/90" style={inter}>
              {step.eyebrow}
            </span>
          </div>

          <h3 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl" style={inter}>
            {step.title}
          </h3>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-600 sm:text-lg" style={inter}>
            I wrote the control loop first — measure, compute, command — then tuned Kp and Kd. Snippets below use my
            final values.
          </p>

          <div className="mt-4">
            <ControlLoopFlow />
          </div>
        </div>

        <div className="min-w-0 lg:justify-self-end lg:max-w-xs lg:w-full">
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setExpanded((current) => !current)}
              className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-left transition-colors hover:bg-gray-50"
              style={inter}
              aria-expanded={expanded}
            >
              <span className="text-sm font-semibold text-gray-900">
                {expanded ? 'Hide my code' : 'My code'}
              </span>
              {expanded ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
            </button>

            <button
              type="button"
              onClick={() => setScriptOpen(true)}
              className="inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
              style={inter}
            >
              View Full Arduino Script
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-10 border-t border-gray-100 pt-10">
              <ControlLoopBreakdown />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ArduinoFullScriptModal isOpen={scriptOpen} onClose={() => setScriptOpen(false)} />
    </section>
  );
}

function ProcessSectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div className="border-t border-gray-100 pt-12 first:border-t-0 first:pt-0">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600/90" style={inter}>
        {eyebrow}
      </p>
      <h2 className="mt-3 text-5xl font-black leading-none tracking-tight text-gray-900 sm:text-6xl" style={inter}>
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-600" style={inter}>
        {desc}
      </p>
    </div>
  );
}

function BuildingStepPlaceholder({
  step,
  index,
}: {
  step: (typeof BUILDING_STEPS)[0];
  index: number;
}) {
  const isFinal = step.id === 'ready-to-test';

  return (
    <section className="border-t border-gray-100 py-10 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-10">
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-3">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                isFinal ? 'bg-gray-900 text-white' : 'bg-sky-500 text-white'
              }`}
              style={inter}
            >
              {isFinal ? '✓' : String(index + 1).padStart(2, '0')}
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600/90"
              style={inter}
            >
              {step.eyebrow}
            </span>
          </div>

          {step.title ? (
            <h3 className="mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl" style={inter}>
              {step.title}
            </h3>
          ) : (
            <div className="mb-3 h-9 max-w-sm rounded-md bg-gray-100/80" aria-hidden />
          )}

          {step.desc ? (
            <p className="max-w-lg text-base leading-relaxed text-gray-600" style={inter}>
              {step.desc}
            </p>
          ) : (
            <div className="space-y-2" aria-hidden>
              <div className="h-4 max-w-lg rounded bg-gray-100/80" />
              <div className="h-4 max-w-md rounded bg-gray-100/70" />
            </div>
          )}
        </div>

        <div
          className="flex min-h-[180px] items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/80 sm:min-h-[220px]"
          aria-label={`${step.eyebrow} media placeholder`}
        />
      </div>
    </section>
  );
}

function PidHero({
  videoRef,
  setVideoRef,
  soundOn,
  toggleSound,
  onExpand,
}: {
  videoRef: HTMLVideoElement | null;
  setVideoRef: (node: HTMLVideoElement | null) => void;
  soundOn: boolean;
  toggleSound: () => void;
  onExpand: () => void;
}) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
      <div className="min-w-0">
        <h1
          className="mb-6 text-5xl font-black uppercase leading-none tracking-tight text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl"
          style={inter}
        >
          PD Balance Beam
        </h1>
        <div className="space-y-3" style={inter}>
          <p className="max-w-4xl text-base leading-relaxed text-gray-700 sm:text-lg">
            I designed and built a closed-loop PD-controlled balance beam that uses an Arduino, two ultrasonic sensors, and a servo to stabilize my old Hot Wheels toy car. The system tracks both the car position and a movable reference cube, allowing the user to set the target location in real time.
          </p>
          <p className="max-w-4xl text-base leading-relaxed text-gray-700 sm:text-lg">
            I built the mechanical structure, wrote the control code, estimated initial PD gains from the system dynamics, and tuned the controller through lots of testing.
          </p>
        </div>
      </div>

      <div className="relative w-full max-w-[34rem] justify-self-center md:justify-self-end">
        <video
          ref={setVideoRef}
          autoPlay
          muted={!soundOn}
          loop
          preload="metadata"
          playsInline
          src={VIDEO_SRC}
          className="h-auto max-h-[min(32rem,calc(100vh-13rem))] w-full rounded-2xl object-contain"
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSound}
            className={videoControlButtonClass}
            aria-label={soundOn ? 'Mute video' : 'Unmute video'}
            title={soundOn ? 'Mute video' : 'Unmute video'}
          >
            {soundOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={onExpand}
            className={videoControlButtonClass}
            aria-label="Expand video to full screen"
            title="Expand video to full screen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function renderProcessStep(
  step: (typeof BUILDING_STEPS)[number],
  index: number,
  onExpandPhoto: (slide: { src: string; alt: string; label: string; caption?: string; type?: string }) => void
) {
  if (step.id === 'step-01') {
    return <Step01HardwareTesting key={step.id} step={step} onExpandPhoto={onExpandPhoto} />;
  }

  if (step.id === 'step-02') {
    return <Step02BuildingStructure key={step.id} step={step} onExpandPhoto={onExpandPhoto} />;
  }

  if (step.id === 'step-03') {
    return <Step03Code key={step.id} step={step} />;
  }

  if (step.id === 'step-04') {
    return <Step04PhysicalTuning key={step.id} step={step} onExpandPhoto={onExpandPhoto} />;
  }

  if (step.id === 'step-05') {
    return <Step05SoftwareTuning key={step.id} step={step} onExpandPhoto={onExpandPhoto} />;
  }

  return <BuildingStepPlaceholder key={step.id} step={step} index={index} />;
}


function TuningCodeBlock({ code }: { code: string }) {
  return (
    <pre
      className="overflow-x-auto rounded-xl bg-gray-950 px-4 py-3 text-xs leading-relaxed text-sky-100 sm:text-sm"
      style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
    >
      <code>{code}</code>
    </pre>
  );
}

function SoftwareComparisonVideo({
  video,
  isMuted,
  onToggleMute,
  onExpandPhoto,
}: {
  video: { src: string; alt: string; viewLabel: string; caption: string };
  isMuted: boolean;
  onToggleMute: () => void;
  onExpandPhoto: (slide: { src: string; alt: string; label: string; caption?: string; type?: string }) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = isMuted;
    void el.play().catch(() => {});
  }, [isMuted]);

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500" style={inter}>
        {video.viewLabel}
      </p>
      <div className="relative h-[44vh] min-h-[260px] w-full overflow-hidden rounded-2xl bg-gray-950 sm:h-[50vh] lg:h-[52vh]">
        <video
          ref={videoRef}
          src={video.src}
          muted={isMuted}
          autoPlay
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-2 right-2 z-10 flex gap-1.5">
          <button
            type="button"
            onClick={onToggleMute}
            className={`${videoControlButtonClass} h-7 w-7`}
            aria-label={isMuted ? `Unmute ${video.viewLabel} video` : `Mute ${video.viewLabel} video`}
            title={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
          </button>
          <button
            type="button"
            onClick={() =>
              onExpandPhoto({
                src: video.src,
                alt: video.alt,
                label: video.viewLabel,
                caption: video.caption,
                type: 'video',
              })
            }
            className={`${videoControlButtonClass} h-7 w-7`}
            aria-label={`Expand ${video.viewLabel} video`}
            title="Expand video"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-gray-600" style={inter}>
        {video.caption}
      </p>
    </div>
  );
}

function SoftwareSlideDetails({ slide, showControllerIntro }: { slide: (typeof SOFTWARE_TUNING_SLIDES)[number]; showControllerIntro?: boolean }) {
  if (slide.type === 'single') {
    return (
      <div className="min-h-[8rem] lg:pt-1">
        {showControllerIntro && (
          <div className="mb-5 space-y-3">
            <p className="text-sm leading-relaxed text-gray-600" style={inter}>
              Once the physical setup was repeatable enough, the car still would not behave the way I wanted until I kept changing the code. Most of this was uploading new Kp, Kd, and deadband values, watching the Serial Plotter, and looking at the car on the beam at the same time.
            </p>
            <TuningCodeBlock code={PD_CONTROLLER_LOGIC} />
            <ul className="space-y-1.5 text-sm leading-relaxed text-gray-600" style={inter}>
              <li>
                <span className="font-semibold text-gray-800">Kp</span> controls how aggressively the servo responds to position error.
              </li>
              <li>
                <span className="font-semibold text-gray-800">Kd</span> adds damping by reacting to how quickly the error is changing.
              </li>
              <li>
                <span className="font-semibold text-gray-800">deadbandCM</span> creates an acceptable target zone so the servo does not constantly chase tiny sensor changes.
              </li>
            </ul>
          </div>
        )}
        <TuningSlideDetails label={slide.label} caption={slide.caption} callouts={slide.callouts} />
      </div>
    );
  }

  return (
    <div className="min-h-[8rem] lg:pt-1">
      <p className="text-lg font-semibold leading-snug text-gray-900 sm:text-xl" style={inter}>
        {slide.label}
      </p>

      <div className="mt-4 space-y-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500" style={inter}>
            Values I tried
          </p>
          <TuningCodeBlock code={slide.codeSnippet} />
        </div>

        <p className="text-sm leading-relaxed text-gray-600 sm:text-base" style={inter}>
          {slide.explanation}
        </p>

        <p className="text-sm font-semibold leading-relaxed text-gray-800" style={inter}>
          {slide.tuningTakeaway}
        </p>

        {slide.finalCodeSnippet && (
          <div className="space-y-3 border-t border-gray-100 pt-4">
            <p className="text-sm font-semibold text-gray-900" style={inter}>
              Where I landed
            </p>
            <TuningCodeBlock code={slide.finalCodeSnippet} />
            <p className="text-sm leading-relaxed text-gray-600" style={inter}>
              {slide.finalExplanation}
            </p>
            <p className="text-sm leading-relaxed text-gray-600" style={inter}>
              {slide.finalTakeaway}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function SoftwareTuningCarousel({ onExpandPhoto }: { onExpandPhoto: (slide: { src: string; alt: string; label: string; caption?: string; type?: string }) => void }) {
  const singleVideoRef = useRef<HTMLVideoElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const scrollToIndex = (index: number) => {
    setActiveIndex(Math.min(Math.max(0, index), SOFTWARE_TUNING_SLIDES.length - 1));
  };

  const activeSlide = SOFTWARE_TUNING_SLIDES[activeIndex];

  useEffect(() => {
    const el = singleVideoRef.current;
    if (!el || activeSlide.type !== 'single') return;
    el.muted = isMuted;
    void el.play().catch(() => {});
  }, [activeIndex, isMuted, activeSlide.type]);

  const pagination = (
    <div className="mt-4 flex items-center justify-between gap-3">
      <p className="text-xs font-semibold text-gray-400" style={inter}>
        {String(activeIndex + 1).padStart(2, '0')} / {String(SOFTWARE_TUNING_SLIDES.length).padStart(2, '0')}
      </p>
      <div className="flex flex-wrap justify-end gap-1.5">
        {SOFTWARE_TUNING_SLIDES.map((slide, index) => (
          <button
            key={slide.label}
            type="button"
            onClick={() => scrollToIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-5 bg-sky-500' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to tuning pass ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );

  if (activeSlide.type === 'comparison') {
    return (
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            <div className="relative">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-5">
                <SoftwareComparisonVideo
                  video={activeSlide.graph}
                  isMuted={isMuted}
                  onToggleMute={() => setIsMuted((current) => !current)}
                  onExpandPhoto={onExpandPhoto}
                />
                <SoftwareComparisonVideo
                  video={activeSlide.physical}
                  isMuted={isMuted}
                  onToggleMute={() => setIsMuted((current) => !current)}
                  onExpandPhoto={onExpandPhoto}
                />
              </div>

              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex - 1)}
                disabled={activeIndex === 0}
                className={`absolute -left-3 top-[22vh] z-10 hidden -translate-y-1/2 sm:block lg:-left-4 ${carouselNavButtonClass} disabled:pointer-events-none disabled:opacity-35`}
                aria-label="Previous pass"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex + 1)}
                disabled={activeIndex === SOFTWARE_TUNING_SLIDES.length - 1}
                className={`absolute -right-3 top-[22vh] z-10 hidden -translate-y-1/2 sm:block lg:-right-4 ${carouselNavButtonClass} disabled:pointer-events-none disabled:opacity-35`}
                aria-label="Next pass"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {pagination}

            <SoftwareSlideDetails slide={activeSlide} />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div className="relative min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="relative mr-auto h-[44vh] w-[33vh] max-w-full overflow-hidden rounded-2xl bg-gray-950 lg:h-[48vh] lg:w-[36vh]">
                <video
                  ref={singleVideoRef}
                  src={activeSlide.src}
                  muted={isMuted}
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-3 right-3 z-10 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMuted((current) => !current)}
                    className={`${videoControlButtonClass} h-8 w-8`}
                    aria-label={isMuted ? `Unmute ${activeSlide.label} video` : `Mute ${activeSlide.label} video`}
                    title={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      singleVideoRef.current?.pause();
                      onExpandPhoto({ ...activeSlide, type: 'video' });
                    }}
                    className={`${videoControlButtonClass} h-8 w-8`}
                    aria-label={`Expand ${activeSlide.label} video`}
                    title="Expand video"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToIndex(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  className={`absolute left-3 top-1/2 z-10 -translate-y-1/2 ${carouselNavButtonClass} disabled:pointer-events-none disabled:opacity-35`}
                  aria-label="Previous pass"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToIndex(activeIndex + 1)}
                  disabled={activeIndex === SOFTWARE_TUNING_SLIDES.length - 1}
                  className={`absolute right-3 top-1/2 z-10 -translate-y-1/2 ${carouselNavButtonClass} disabled:pointer-events-none disabled:opacity-35`}
                  aria-label="Next pass"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {pagination}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <SoftwareSlideDetails slide={activeSlide} showControllerIntro={activeIndex === 0} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function TuningTracks({ onExpandPhoto }: { onExpandPhoto: (slide: { src: string; alt: string; label: string; caption?: string; type?: string }) => void }) {
  const [activeTrack, setActiveTrack] = useState<'physical' | 'software'>('physical');

  const tracks = [
    {
      id: 'physical',
      marker: 'A',
      label: 'Physical tuning',
      title: 'Physical',
      desc: 'Friction, how things were secured, rails, linkage, and what object was on the beam.',
    },
    {
      id: 'software',
      marker: 'B',
      label: 'Software tuning',
      title: 'Software',
      desc: 'Even with the hardware dialed in, I still had to tune the code for the best performance.',
    },
  ] as const;

  const active = tracks.find((track) => track.id === activeTrack) ?? tracks[0];

  return (
    <div className="mt-8">
      <div className="grid gap-3 sm:grid-cols-2">
        {tracks.map((track) => {
          const isActive = activeTrack === track.id;

          return (
            <button
              key={track.id}
              type="button"
              onClick={() => setActiveTrack(track.id)}
              className={`group rounded-2xl p-4 text-left transition-all duration-300 ${
                isActive
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
              style={inter}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    isActive ? 'bg-sky-500 text-white' : 'bg-sky-50 text-sky-600 group-hover:bg-sky-100'
                  }`}
                >
                  {track.marker}
                </span>
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isActive ? 'text-sky-200' : 'text-sky-600/90'}`}>
                    {track.label}
                  </p>
                  <p className={`mt-2 text-xl font-bold leading-tight ${isActive ? 'text-white' : 'text-gray-900'}`}>
                    {track.title}
                  </p>
                  <p className={`mt-1 text-sm leading-relaxed ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                    {track.desc}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTrack}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <div className="mb-4 text-center" style={inter}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600/90">
              {active.label}
            </p>
            <h3 className="mt-2 text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
              {active.title}
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
              {active.desc}
            </p>
          </div>

          {activeTrack === 'physical' ? (
            <PhysicalTuningCarousel onExpandPhoto={onExpandPhoto} />
          ) : (
            <SoftwareTuningCarousel onExpandPhoto={onExpandPhoto} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function BuildingTab({ onExpandPhoto }: { onExpandPhoto: (slide: { src: string; alt: string; label: string; caption?: string; type?: string }) => void }) {
  const setupSteps = BUILDING_STEPS.filter((step) => ['step-01', 'step-02', 'step-03'].includes(step.id));

  return (
    <div className="space-y-16">
      <div>
        <ProcessSectionHeader
          eyebrow="Stage 1"
          title="Setup"
          desc="Hardware, structure, and code."
        />
        <div className="mt-8 space-y-0">
          {setupSteps.map((step, index) => renderProcessStep(step, index, onExpandPhoto))}
        </div>
      </div>

      <div>
        <ProcessSectionHeader
          eyebrow="Stage 2"
          title="Tuning"
          desc="First I tuned the physical setup until the car moved repeatably. Then I spent most of my time in the code — changing Kp, Kd, and deadband, chasing oscillations on the graph — until the whole system performed as well as it possibly could."
        />
        <TuningTracks onExpandPhoto={onExpandPhoto} />
      </div>
    </div>
  );
}

const PidHotWheelsPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [expandedPhoto, setExpandedPhoto] = useState<null | { src: string; alt: string; label: string; caption?: string; type?: string }>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!videoRef) return;
    videoRef.playbackRate = 1;
    videoRef.muted = !soundOn;
  }, [videoRef, soundOn]);

  useEffect(() => {
    if (!isFullscreen && !expandedPhoto) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsFullscreen(false);
        setExpandedPhoto(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullscreen, expandedPhoto]);

  const toggleSound = () => {
    if (!videoRef) return;
    const next = !soundOn;
    setSoundOn(next);
    videoRef.muted = !next;
    if (!next) videoRef.setAttribute('muted', '');
    else videoRef.removeAttribute('muted');
    void videoRef.play();
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <ProjectDetailBackNav />
      <Navigation currentPage="projects" isHeaderVisible={true} />

      <motion.div
        className="mx-auto w-full min-w-0 max-w-6xl px-8 pb-24 pt-32"
        initial={{ opacity: 0, y: 16 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Persistent hero — same on both tabs */}
        <PidHero
          videoRef={videoRef}
          setVideoRef={setVideoRef}
          soundOn={soundOn}
          toggleSound={toggleSound}
          onExpand={() => setIsFullscreen(true)}
        />

        <div className="mt-16 border-t border-gray-100 pt-10">
          <BuildingTab onExpandPhoto={setExpandedPhoto} />
        </div>
      </motion.div>

      {expandedPhoto && (
        <div
          className="fixed inset-0 z-[140] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setExpandedPhoto(null)}
        >
          <div
            className="relative flex max-h-[86vh] w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setExpandedPhoto(null)}
              className="absolute -top-12 right-0 text-sm uppercase tracking-wide text-white transition-colors hover:text-gray-200"
              style={inter}
            >
              Close
            </button>

            <div className="relative h-[78vh] w-full overflow-hidden rounded-xl bg-black">
              {expandedPhoto.type === 'video' ? (
                <video
                  src={expandedPhoto.src}
                  autoPlay
                  controls
                  loop
                  playsInline
                  className="h-full w-full object-contain"
                />
              ) : (
                <Image
                  src={expandedPhoto.src}
                  alt={expandedPhoto.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              )}
            </div>
            <p className="mt-3 text-center text-sm font-semibold text-white" style={inter}>
              {expandedPhoto.label}
            </p>
          </div>
        </div>
      )}

      {isFullscreen && (
        <div
          className="fixed inset-0 z-[140] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setIsFullscreen(false)}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="absolute -top-12 right-0 text-sm uppercase tracking-wide text-white transition-colors hover:text-gray-200"
              style={inter}
            >
              Close
            </button>

            <div className="overflow-hidden rounded-xl bg-black">
              <video
                src={VIDEO_SRC}
                autoPlay
                muted={!soundOn}
                loop
                playsInline
                className="max-h-[80vh] w-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PidHotWheelsPage;
