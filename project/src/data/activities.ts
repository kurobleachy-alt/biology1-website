import type { ActivityDefinition } from '@/game/types';

export const ACTIVITIES: ActivityDefinition[] = [
  {
    id: 'w1-cell-explorer',
    week: 1,
    title: 'Cell Explorer',
    summary: 'Tap the right answer about cells, organelles, and the microscope.',
    kind: 'choice',
    levels: {
      easy: [
        {
          prompt: 'Which part of the cell is its control center and holds the DNA?',
          options: ['Nucleus', 'Cell wall', 'Ribosome'],
          answer: 0,
          hint: 'Think about where the cell keeps its instructions.',
          explanation: 'The nucleus stores DNA and directs most of the cell’s activities.',
        },
        {
          prompt: 'What is the basic unit of all living things?',
          options: ['Atom', 'Cell', 'Organ'],
          answer: 1,
          hint: 'It is smaller than a tissue or an organ.',
          explanation: 'Cells are the smallest units that can carry out all the processes of life.',
        },
        {
          prompt: 'Which organelle releases energy from food to power the cell?',
          options: ['Mitochondria', 'Chloroplast', 'Vacuole'],
          answer: 0,
          hint: 'It is often called the powerhouse of the cell.',
          explanation: 'Mitochondria break down sugar to release usable energy (ATP).',
        },
        {
          prompt: 'Which structure do plant cells have that animal cells do not?',
          options: ['Cell membrane', 'Cell wall', 'Nucleus'],
          answer: 1,
          hint: 'It is rigid and helps give plants their shape.',
          explanation: 'Plant cells have a stiff cell wall outside the membrane. Animal cells do not.',
        },
      ],
      medium: [
        {
          prompt: 'Which organelle builds proteins?',
          options: ['Ribosome', 'Golgi body', 'Lysosome'],
          answer: 0,
          hint: 'These tiny particles can float freely or attach to the endoplasmic reticulum.',
          explanation: 'Ribosomes read genetic instructions and assemble amino acids into proteins.',
        },
        {
          prompt: 'Where are chloroplasts found?',
          options: ['Animal cells only', 'Plant and algae cells', 'Bacteria only'],
          answer: 1,
          hint: 'They capture sunlight.',
          explanation: 'Chloroplasts capture light energy for photosynthesis in plants and algae.',
        },
        {
          prompt: 'Which of these is a prokaryote?',
          options: ['Amoeba', 'Yeast', 'Bacteria'],
          answer: 2,
          hint: 'Prokaryotes do not have a nucleus.',
          explanation: 'Bacteria lack a membrane-bound nucleus, so they are prokaryotes.',
        },
        {
          prompt: 'What is the main job of the cell membrane?',
          options: [
            'Controls what enters and leaves the cell',
            'Stores the cell’s DNA',
            'Makes energy for the cell',
          ],
          answer: 0,
          hint: 'Think of it as a gatekeeper at the edge of the cell.',
          explanation: 'The selectively permeable membrane controls the movement of substances in and out.',
        },
        {
          prompt: 'Which microscope part is turned slowly to sharpen the image?',
          options: ['Eyepiece', 'Fine focus knob', 'Stage clip'],
          answer: 1,
          hint: 'You turn it gently for small adjustments.',
          explanation: 'The fine focus knob makes small changes so the image becomes sharp.',
        },
      ],
      hard: [
        {
          prompt: 'Which organelle modifies, sorts, and packages proteins for delivery?',
          options: ['Golgi apparatus', 'Smooth ER', 'Peroxisome'],
          answer: 0,
          hint: 'It works like a shipping center for the cell.',
          explanation: 'The Golgi apparatus processes molecules from the ER and ships them where they are needed.',
        },
        {
          prompt: 'Which statement is part of the cell theory?',
          options: [
            'All cells come from pre-existing cells',
            'Cells only exist in plants',
            'Viruses are the smallest cells',
          ],
          answer: 0,
          hint: 'Think about where new cells come from.',
          explanation: 'Cell theory states that new cells arise from existing cells by division.',
        },
        {
          prompt: 'What best describes a prokaryotic cell?',
          options: [
            'It has no DNA',
            'It lacks a nucleus and most membrane-bound organelles',
            'It has only a cell wall and nothing inside',
          ],
          answer: 1,
          hint: 'Its DNA floats in the cytoplasm rather than sitting in a nucleus.',
          explanation: 'Prokaryotes have a simpler design: DNA sits in the cytoplasm and they lack a nucleus.',
        },
        {
          prompt: 'Lysosomes are best described as:',
          options: [
            'Digestive compartments that break down waste',
            'Structures that make ATP',
            'Stacks that build cell walls',
          ],
          answer: 0,
          hint: 'They contain enzymes that break things apart.',
          explanation: 'Lysosomes hold digestive enzymes that break down food, waste, and worn-out parts.',
        },
        {
          prompt: 'A microscope has a 10x eyepiece and a 40x objective. What is the total magnification?',
          options: ['40x', '400x', '4000x'],
          answer: 1,
          hint: 'Multiply the two numbers together.',
          explanation: 'Total magnification is 10 × 40 = 400x.',
        },
      ],
    },
  },
  {
    id: 'w1-organelle-sorter',
    week: 1,
    title: 'Organelle Sorter',
    summary: 'Drag each part of the cell to the job it does. Tap works too.',
    kind: 'sort',
    levels: {
      easy: [
        {
          prompt: 'Nucleus',
          options: ['Stores DNA', 'Makes energy'],
          answer: 0,
          hint: 'Think about where the cell’s instructions live.',
          explanation: 'The nucleus holds the DNA that carries the cell’s instructions.',
        },
        {
          prompt: 'Mitochondria',
          options: ['Stores DNA', 'Makes energy'],
          answer: 1,
          hint: 'It is the powerhouse of the cell.',
          explanation: 'Mitochondria release energy from food molecules.',
        },
        {
          prompt: 'Chloroplast',
          options: ['Captures sunlight', 'Stores water'],
          answer: 0,
          hint: 'Plants need this to make food.',
          explanation: 'Chloroplasts capture sunlight to power photosynthesis.',
        },
        {
          prompt: 'Cell wall',
          options: ['Gives plant cells support', 'Makes energy'],
          answer: 0,
          hint: 'It is a stiff outer layer.',
          explanation: 'The cell wall gives plant cells their rigid support and shape.',
        },
      ],
      medium: [
        {
          prompt: 'Ribosome',
          options: ['Makes proteins', 'Digests waste', 'Stores water'],
          answer: 0,
          hint: 'It assembles amino acids.',
          explanation: 'Ribosomes build proteins following genetic instructions.',
        },
        {
          prompt: 'Lysosome',
          options: ['Makes proteins', 'Digests waste', 'Captures sunlight'],
          answer: 1,
          hint: 'It holds digestive enzymes.',
          explanation: 'Lysosomes break down waste and worn-out cell parts.',
        },
        {
          prompt: 'Vacuole',
          options: ['Stores water and nutrients', 'Captures sunlight', 'Makes proteins'],
          answer: 0,
          hint: 'It is a large storage sac.',
          explanation: 'Vacuoles store water, nutrients, and waste products.',
        },
        {
          prompt: 'Cell membrane',
          options: ['Controls what enters and leaves', 'Makes energy', 'Stores DNA'],
          answer: 0,
          hint: 'It sits at the edge of the cell.',
          explanation: 'The cell membrane decides which substances pass in and out.',
        },
        {
          prompt: 'Chloroplast',
          options: ['Makes energy', 'Captures sunlight', 'Makes proteins'],
          answer: 1,
          hint: 'It contains green pigment.',
          explanation: 'Chloroplasts use chlorophyll to capture sunlight.',
        },
      ],
      hard: [
        {
          prompt: 'Golgi apparatus',
          options: ['Packages and ships proteins', 'Captures sunlight', 'Digests waste', 'Stores DNA'],
          answer: 0,
          hint: 'It works like a shipping department.',
          explanation: 'The Golgi apparatus sorts, labels, and packages molecules for transport.',
        },
        {
          prompt: 'Smooth ER',
          options: [
            'Builds ribosomes',
            'Makes lipids and detoxifies',
            'Stores DNA',
            'Captures sunlight',
          ],
          answer: 1,
          hint: 'It has no ribosomes on its surface.',
          explanation: 'Smooth endoplasmic reticulum makes lipids and helps break down toxins.',
        },
        {
          prompt: 'Centriole',
          options: ['Helps organize cell division', 'Stores water', 'Captures sunlight', 'Digests waste'],
          answer: 0,
          hint: 'It appears near the nucleus in animal cells.',
          explanation: 'Centrioles help organize the spindle fibers used during cell division.',
        },
        {
          prompt: 'Peroxisome',
          options: [
            'Breaks down fatty acids and toxins',
            'Stores DNA',
            'Makes proteins',
            'Builds cell walls',
          ],
          answer: 0,
          hint: 'It uses enzymes to neutralize harmful substances.',
          explanation: 'Peroxisomes break down fatty acids and detoxify harmful compounds.',
        },
        {
          prompt: 'Nucleolus',
          options: ['Makes ribosome parts', 'Stores water', 'Captures sunlight', 'Digests food'],
          answer: 0,
          hint: 'It sits inside the nucleus.',
          explanation: 'The nucleolus assembles the subunits that later become ribosomes.',
        },
      ],
    },
  },
];

export function activitiesForWeek(week: number): ActivityDefinition[] {
  return ACTIVITIES.filter((a) => a.week === week);
}

export function findActivity(week: number, id: string): ActivityDefinition | null {
  return ACTIVITIES.find((a) => a.week === week && a.id === id) ?? null;
}
