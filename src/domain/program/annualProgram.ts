import type {
  AnnualProgram,
  RestTarget,
  RoundTarget,
  ScheduleDay,
  WorkoutBlock,
  WorkoutDayNumber,
  WorkoutSession,
  WorkoutTemplate,
} from "../entities/workout";

const schedule: Array<{ dayNumber: WorkoutDayNumber; scheduleDay: ScheduleDay }> = [
  { dayNumber: 1, scheduleDay: "Mon" },
  { dayNumber: 2, scheduleDay: "Tue" },
  { dayNumber: 3, scheduleDay: "Thu" },
  { dayNumber: 4, scheduleDay: "Sat" },
];

const exactRounds = (rounds: number): RoundTarget => ({
  min: rounds,
  max: rounds,
  label: `${rounds} rounds`,
});

const rangeRounds = (min: number, max: number, label = `${min}-${max} rounds`): RoundTarget => ({
  min,
  max,
  label,
});

const rest = (minSeconds: number, maxSeconds: number): RestTarget => ({
  minSeconds,
  maxSeconds,
  label:
    minSeconds === maxSeconds
      ? `${minSeconds} sec rest`
      : `${minSeconds}-${maxSeconds} sec rest`,
});

const muscleTemplates: Record<WorkoutDayNumber, WorkoutTemplate> = {
  1: {
    dayNumber: 1,
    title: "Press + Squat + Row",
    focus: "Muscle gain tension",
    exercises: [
      { name: "Clean", prescription: "x5 per side" },
      { name: "Strict press", prescription: "x6 per side" },
      { name: "Front squat", prescription: "x6 per side" },
      { name: "Bent-over row", prescription: "x8 per side" },
      { name: "2-hand swing", prescription: "x10" },
    ],
    baseRounds: rangeRounds(4, 6),
    baseRest: rest(90, 150),
    finishers: [{ name: "Suitcase carry", prescription: "3 x 30-45 sec each side" }],
  },
  2: {
    dayNumber: 2,
    title: "Hinge + Push",
    focus: "Power and rack strength",
    exercises: [
      { name: "2-hand swing", prescription: "x15" },
      { name: "Clean", prescription: "x5 per side" },
      { name: "Push press", prescription: "x5 per side" },
      { name: "Reverse lunge in rack", prescription: "x6 each leg" },
    ],
    baseRounds: rangeRounds(4, 5),
    baseRest: rest(90, 120),
  },
  3: {
    dayNumber: 3,
    title: "Upper-Body Emphasis",
    focus: "Pressing volume",
    exercises: [
      { name: "Clean", prescription: "x4 per side" },
      { name: "Strict press", prescription: "x5 per side" },
      { name: "Front squat", prescription: "x5 per side" },
      { name: "Bent-over row", prescription: "x8 per side" },
      { name: "2-hand swing", prescription: "x12" },
    ],
    baseRounds: rangeRounds(4, 6),
    baseRest: rest(90, 150),
  },
  4: {
    dayNumber: 4,
    title: "Full-Body Tension Day",
    focus: "Crisp power",
    exercises: [
      { name: "High pull or snatch", prescription: "x5 per side" },
      { name: "Clean", prescription: "x4 per side" },
      { name: "Push press", prescription: "x5 per side" },
      { name: "Front squat", prescription: "x6 per side" },
      { name: "2-hand swing", prescription: "x10" },
    ],
    baseRounds: rangeRounds(4, 5),
    baseRest: rest(90, 120),
    finishers: [{ name: "Suitcase carry", prescription: "3 x 30-45 sec each side" }],
  },
};

const fatLossTemplates: Record<WorkoutDayNumber, WorkoutTemplate> = {
  1: {
    dayNumber: 1,
    title: "Full-Body Density Complex",
    focus: "Density and conditioning",
    exercises: [
      { name: "Clean", prescription: "x5 per side" },
      { name: "Front squat", prescription: "x5 per side" },
      { name: "Push press", prescription: "x5 per side" },
      { name: "Reverse lunge", prescription: "x5 each leg" },
      { name: "2-hand swing", prescription: "x15" },
    ],
    baseRounds: rangeRounds(4, 6),
    baseRest: rest(60, 90),
  },
  2: {
    dayNumber: 2,
    title: "Pull + Core + Conditioning",
    focus: "Carries and repeatable output",
    exercises: [
      { name: "Clean", prescription: "x5 per side" },
      { name: "Bent-over row", prescription: "x6 per side" },
      { name: "Strict press", prescription: "x4 per side" },
      { name: "Front-rack march", prescription: "x20 steps" },
      { name: "2-hand swing", prescription: "x15" },
    ],
    baseRounds: rangeRounds(4, 5),
    baseRest: rest(60, 75),
    finishers: [
      { name: "Suitcase carry", prescription: "3 x 40-60 sec each side" },
      { name: "Goblet march", prescription: "3 x 30-45 sec" },
    ],
  },
  3: {
    dayNumber: 3,
    title: "Power Conditioning",
    focus: "Explosive density",
    exercises: [
      { name: "High pull or snatch", prescription: "x5 per side" },
      { name: "Front squat", prescription: "x6 per side" },
      { name: "Push press", prescription: "x4 per side" },
      { name: "Bent-over row", prescription: "x6 per side" },
      { name: "2-hand swing", prescription: "x12" },
    ],
    baseRounds: rangeRounds(4, 6),
    baseRest: rest(60, 90),
  },
  4: {
    dayNumber: 4,
    title: "Hard Day",
    focus: "High swing finish",
    exercises: [
      { name: "Clean", prescription: "x4 per side" },
      { name: "Push press", prescription: "x4 per side" },
      { name: "Front squat", prescription: "x4 per side" },
      { name: "Reverse lunge", prescription: "x4 each leg" },
      { name: "Row", prescription: "x6 per side" },
      { name: "2-hand swing", prescription: "x20" },
    ],
    baseRounds: rangeRounds(3, 5),
    baseRest: rest(75, 90),
    finishers: [
      { name: "Suitcase carry", prescription: "3 x 40-60 sec each side" },
      { name: "Goblet march", prescription: "3 x 30-45 sec" },
    ],
  },
};

const resetTemplates: Record<WorkoutDayNumber, WorkoutTemplate> = {
  1: {
    ...muscleTemplates[1],
    title: "Technique Press + Squat",
    focus: "Easy technique",
    baseRounds: rangeRounds(2, 3),
  },
  2: {
    ...muscleTemplates[2],
    title: "Technique Hinge + Push",
    focus: "Easy power",
    baseRounds: rangeRounds(2, 3),
  },
  3: {
    ...muscleTemplates[3],
    title: "Technique Upper Body",
    focus: "Smooth reps",
    baseRounds: rangeRounds(2, 3),
  },
  4: {
    ...muscleTemplates[4],
    title: "Technique Full Body",
    focus: "Reset and restore",
    baseRounds: rangeRounds(2, 3),
  },
};

interface PhaseInfo {
  block: WorkoutBlock;
  blockTitle: string;
  phaseWeek: number;
  cycle: 1 | 2;
}

const getPhaseInfo = (weekNumber: number): PhaseInfo => {
  if (weekNumber <= 12) {
    return {
      block: "muscle-gain",
      blockTitle: "Muscle Gain Block",
      phaseWeek: weekNumber,
      cycle: 1,
    };
  }

  if (weekNumber <= 24) {
    return {
      block: "fat-loss",
      blockTitle: "Fat Loss Block",
      phaseWeek: weekNumber - 12,
      cycle: 1,
    };
  }

  if (weekNumber <= 36) {
    return {
      block: "muscle-gain",
      blockTitle: "Muscle Gain Block",
      phaseWeek: weekNumber - 24,
      cycle: 2,
    };
  }

  if (weekNumber <= 48) {
    return {
      block: "fat-loss",
      blockTitle: "Fat Loss Block",
      phaseWeek: weekNumber - 36,
      cycle: 2,
    };
  }

  return {
    block: "reset",
    blockTitle: "Reset Block",
    phaseWeek: weekNumber - 48,
    cycle: 2,
  };
};

const getMusclePrescription = (
  phaseWeek: number,
  dayNumber: WorkoutDayNumber,
  cycle: 1 | 2,
): { roundTarget: RoundTarget; restTarget: RestTarget; progressionNote: string } => {
  const template = muscleTemplates[dayNumber];
  let roundTarget = exactRounds(4);
  let progressionNote = "Base volume: use 1-3 reps in reserve on the hardest movement.";

  if (phaseWeek === 4 || phaseWeek === 8) {
    roundTarget = exactRounds(3);
    progressionNote = "Deload week: reduce volume and leave plenty in the tank.";
  } else if (phaseWeek >= 5 && phaseWeek <= 7) {
    roundTarget = exactRounds(5);
    progressionNote = "Build week: add a round while keeping output crisp.";
  } else if (phaseWeek >= 9 && phaseWeek <= 11) {
    roundTarget =
      dayNumber === 1 || dayNumber === 3
        ? rangeRounds(5, 6, "5 rounds, or 6 if form stays sharp")
        : exactRounds(5);
    progressionNote = "Peak build: consider the top end only if technique stays sharp.";
  } else if (phaseWeek === 12) {
    roundTarget = rangeRounds(2, 3);
    progressionNote = "Easy week: stop every set with plenty left in the tank.";
  }

  if (cycle === 2 && (dayNumber === 1 || dayNumber === 3)) {
    progressionNote += " Second pass: try a slightly heavier bell if reps stay clean.";
  }

  return {
    roundTarget,
    restTarget: template.baseRest,
    progressionNote,
  };
};

const getFatLossPrescription = (
  phaseWeek: number,
  dayNumber: WorkoutDayNumber,
  cycle: 1 | 2,
): { roundTarget: RoundTarget; restTarget: RestTarget; progressionNote: string } => {
  const template = fatLossTemplates[dayNumber];
  const lowEndRound = exactRounds(template.baseRounds.min);
  let roundTarget = lowEndRound;
  let restTarget = template.baseRest;
  let progressionNote = "Density base: stay repeatable and avoid turning form sloppy.";

  if (phaseWeek === 4 || phaseWeek === 8) {
    const deloadRounds = Math.max(2, Math.round(template.baseRounds.min * 0.7));
    roundTarget = exactRounds(deloadRounds);
    progressionNote = "Deload week: use about 70% of normal volume.";
  } else if (phaseWeek >= 5 && phaseWeek <= 7) {
    roundTarget = exactRounds(Math.min(template.baseRounds.min + 1, template.baseRounds.max));
    progressionNote = "Density build: add one round to the low-end target.";
  } else if (phaseWeek >= 9 && phaseWeek <= 11) {
    roundTarget = exactRounds(Math.min(template.baseRounds.min + 1, template.baseRounds.max));
    restTarget = rest(
      Math.max(45, template.baseRest.minSeconds - 15),
      Math.max(60, template.baseRest.maxSeconds - 10),
    );
    progressionNote = "Density peak: keep rounds steady and trim rest by 10-15 seconds.";
  } else if (phaseWeek === 12) {
    roundTarget = rangeRounds(2, 3);
    progressionNote = "Easy week: move well and recover before the next block.";
  }

  if (cycle === 2) {
    progressionNote += " Second pass: try one more round or slightly shorter rest if recovery is good.";
  }

  return {
    roundTarget,
    restTarget,
    progressionNote,
  };
};

const getResetPrescription = (
  phaseWeek: number,
  dayNumber: WorkoutDayNumber,
): { roundTarget: RoundTarget; restTarget: RestTarget; progressionNote: string; testPrompt?: string } => {
  const testPrompts: Partial<Record<WorkoutDayNumber, string>> =
    phaseWeek === 4
      ? {
          1: "Optional test: max clean reps per side with your working bell.",
          2: "Optional test: max strict presses per side.",
          3: "Optional test: best-quality 10-minute swing total.",
          4: "Optional check-in: waist, bodyweight, and photos if fat loss is a goal.",
        }
      : {};

  return {
    roundTarget: rangeRounds(2, 3),
    restTarget: rest(90, 150),
    progressionNote: "Reset work: no grinders, no near-failure sets, and focus on clean technique.",
    testPrompt: testPrompts[dayNumber],
  };
};

const getCoachingCue = (block: WorkoutBlock): string => {
  if (block === "muscle-gain") {
    return "Keep it muscular, not frantic. Longer rests are part of the plan.";
  }

  if (block === "fat-loss") {
    return "Keep the density high, but only as fast as your technique allows.";
  }

  return "Make every rep feel smooth, quiet, and repeatable.";
};

const buildSession = (
  weekNumber: number,
  dayNumber: WorkoutDayNumber,
  scheduleDay: ScheduleDay,
): WorkoutSession => {
  const phaseInfo = getPhaseInfo(weekNumber);
  const template =
    phaseInfo.block === "muscle-gain"
      ? muscleTemplates[dayNumber]
      : phaseInfo.block === "fat-loss"
        ? fatLossTemplates[dayNumber]
        : resetTemplates[dayNumber];

  const prescription: {
    roundTarget: RoundTarget;
    restTarget: RestTarget;
    progressionNote: string;
    testPrompt?: string;
  } =
    phaseInfo.block === "muscle-gain"
      ? getMusclePrescription(phaseInfo.phaseWeek, dayNumber, phaseInfo.cycle)
      : phaseInfo.block === "fat-loss"
        ? getFatLossPrescription(phaseInfo.phaseWeek, dayNumber, phaseInfo.cycle)
        : getResetPrescription(phaseInfo.phaseWeek, dayNumber);

  return {
    id: `week-${weekNumber.toString().padStart(2, "0")}-day-${dayNumber}`,
    weekNumber,
    phaseWeek: phaseInfo.phaseWeek,
    dayNumber,
    scheduleDay,
    block: phaseInfo.block,
    blockTitle: phaseInfo.blockTitle,
    template,
    roundTarget: prescription.roundTarget,
    restTarget: prescription.restTarget,
    progressionNote: prescription.progressionNote,
    coachingCue: getCoachingCue(phaseInfo.block),
    testPrompt: prescription.testPrompt,
  };
};

export const annualProgram: AnnualProgram = {
  title: "Kettlebell Year",
  totalWeeks: 52,
  sessions: Array.from({ length: 52 }, (_, weekIndex) => {
    const weekNumber = weekIndex + 1;

    return schedule.map(({ dayNumber, scheduleDay }) =>
      buildSession(weekNumber, dayNumber, scheduleDay),
    );
  }).flat(),
};
