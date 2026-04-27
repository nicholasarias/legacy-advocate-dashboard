const productOutcomeChoices = {
  "easy-life": {
    label: "EMC Easy Life",
    description: "Use this when the client qualifies for the strongest EMC route."
  },
  "emc-graded": {
    label: "EMC Graded",
    description: "Use this when EMC works, but the graded route is the correct fit."
  },
  "eternal-legacy": {
    label: "Monitor Eternal Legacy",
    description: "Use this when EMC is out but Monitor Eternal Legacy is still available."
  },
  "american-general": {
    label: "American General - Guaranteed Issue Whole Life",
    description: "Use this when stronger approvals are not available but guaranteed issue is still on the table."
  },
  "no-option": {
    label: "No Option",
    description: "Use this when there is no same-day product route to present."
  }
} as const;

type ProductOutcomeKey = keyof typeof productOutcomeChoices;
type ScriptLine = string;

export interface ScriptLevelDefinition {
  label: string;
  lines: ScriptLine[];
  collapsed?: boolean;
}

export interface ScriptBlockDefinition {
  variant?: "primary" | "quick-insert";
  heading?: string;
  lines?: ScriptLine[];
  levels?: ScriptLevelDefinition[];
  status?: string;
  exclude_states?: string[];
}

interface ScriptContentDefinition {
  script?: ScriptLine[];
  levels?: ScriptLevelDefinition[];
  reinforcementLines?: ScriptLine[];
  scriptBlocks?: ScriptBlockDefinition[];
}

interface FocusDefinition {
  reminder: string;
  visualCue: string;
  highlightLabel?: string;
}

interface PromptDefinition {
  goal: string;
  notes?: string[];
}

interface WorkspaceNotesDefinition {
  key: string;
  label: string;
  placeholder: string;
}

interface WorkspaceDefinition {
  title: string;
  text: string;
  groups?: string[];
  notes?: WorkspaceNotesDefinition;
  highlight?: string;
}

interface PriceComparisonOption {
  value: string;
  label: string;
  title: string;
  subtitle: string;
  bucketText: string;
  recommendation: boolean;
  badge?: string;
}

export interface BranchOption extends ScriptContentDefinition {
  value: string;
  label: string;
  description: string;
  helperLines?: string[];
  promptNotes?: string[];
  status?: string;
  comparisonOptions?: PriceComparisonOption[];
}

interface BranchControlDefinition {
  stateKey: string;
  label?: string;
  helpText?: string;
  display?: boolean;
  replaceBaseOnSelect?: boolean;
  options: BranchOption[];
}

export interface ScriptSection extends ScriptContentDefinition {
  id: number;
  title: string;
  phase?: string;
  qaRequired: boolean;
  focus?: FocusDefinition;
  prompt?: PromptDefinition;
  workspace?: WorkspaceDefinition;
  branchControl?: BranchControlDefinition;
  helperLines?: string[];
  highlightStyle?: string;
  promptNotes?: string[];
}

function normalizeLevelDefinition(level: ScriptLevelDefinition): ScriptLevelDefinition {
  return {
    label: level.label,
    lines: Array.isArray(level.lines) ? level.lines : [],
    collapsed: Boolean(level.collapsed)
  };
}

function buildDefaultScriptBlocks(item: ScriptContentDefinition): ScriptBlockDefinition[] {
  const blocks: ScriptBlockDefinition[] = [];
  const primaryLines = Array.isArray(item.script) ? item.script : [];
  const primaryLevels = Array.isArray(item.levels) ? item.levels.map(normalizeLevelDefinition) : [];
  const reinforcementLines = Array.isArray(item.reinforcementLines) ? item.reinforcementLines : [];

  if (primaryLines.length || primaryLevels.length) {
    blocks.push({
      variant: "primary",
      lines: primaryLines,
      levels: primaryLevels
    });
  }

  if (reinforcementLines.length) {
    blocks.push({
      variant: "quick-insert",
      heading: "Quick Insert",
      lines: reinforcementLines
    });
  }

  return blocks;
}

function normalizeScriptBlockDefinition(block: ScriptBlockDefinition): ScriptBlockDefinition {
  return {
    variant: block.variant || "primary",
    heading: block.heading,
    lines: Array.isArray(block.lines) ? block.lines : [],
    levels: Array.isArray(block.levels) ? block.levels.map(normalizeLevelDefinition) : [],
    status: block.status,
    exclude_states: Array.isArray(block.exclude_states) ? block.exclude_states.map((state) => String(state)) : []
  };
}

function withNormalizedScriptBlocks<T extends ScriptContentDefinition>(item: T): T & {
  scriptBlocks: ScriptBlockDefinition[];
} {
  const scriptBlocks =
    Array.isArray(item.scriptBlocks) && item.scriptBlocks.length
      ? item.scriptBlocks.map(normalizeScriptBlockDefinition)
      : buildDefaultScriptBlocks(item);

  return {
    ...item,
    scriptBlocks
  };
}

function normalizeBranchOption(option: BranchOption): BranchOption {
  return withNormalizedScriptBlocks(option);
}

function normalizeSection(section: ScriptSection): ScriptSection {
  const nextSection = withNormalizedScriptBlocks(section);

  return {
    ...nextSection,
    branchControl: nextSection.branchControl
      ? {
          ...nextSection.branchControl,
          options: nextSection.branchControl.options.map(normalizeBranchOption)
        }
      : undefined
  };
}

function createProductOutcomeOption(
  value: ProductOutcomeKey,
  extra: Partial<BranchOption> = {}
): BranchOption {
  return {
    value,
    label: productOutcomeChoices[value].label,
    description: productOutcomeChoices[value].description,
    ...extra
  };
}

function createQuickInsertBlock(heading: string, lines: ScriptLine[] = []): ScriptBlockDefinition {
  return {
    variant: "quick-insert",
    heading,
    lines
  };
}

function createVerbatimBlock(heading: string, lines: ScriptLine[]): ScriptBlockDefinition {
  return {
    variant: "quick-insert",
    heading,
    lines,
    status: "verbatim"
  };
}

function createLockedVerbatimBlock(
  heading: string,
  lines: ScriptLine[],
  extra: Partial<ScriptBlockDefinition> = {}
): ScriptBlockDefinition {
  return {
    variant: "primary",
    heading,
    lines,
    status: "verbatim - non-editable",
    ...extra
  };
}

function createPriceComparisonOptions(): PriceComparisonOption[] {
  return [
    {
      value: "1",
      label: "Option 1",
      title: "Full Protection",
      subtitle: "Handles the whole burden, not just the first bill",
      bucketText:
        "The strongest option for families who want the funeral, the immediate bills, and the wider pressure around [their reason] handled cleanly.",
      recommendation: false
    },
    {
      value: "2",
      label: "Option 2",
      title: "Balanced Protection",
      subtitle: "The natural fit for most families",
      bucketText:
        "The balanced fit that solves [their reason] without stretching the monthly side farther than it needs to go.",
      recommendation: true,
      badge: "Recommended"
    },
    {
      value: "3",
      label: "Option 3",
      title: "Safety Net",
      subtitle: "A practical minimum so the family is not starting from zero",
      bucketText:
        "The lightest entry point so [Beneficiary Name] is not left scrambling for the first money when the time comes.",
      recommendation: false
    }
  ];
}

function createPresentationScript(): ScriptLine[] {
  return [
    "Here are the three ways this can look.",
    "Full Protection gives you [coverage] for [price] monthly.",
    "Balanced Protection - this is usually the natural fit because it handles [their reason] without overdoing it - gives you [coverage] for [price] monthly.",
    "Safety Net gives you [coverage] for [price] monthly.",
    "Which one makes the most sense for you?"
  ];
}

function createPostSaleRehashBlocks(): ScriptBlockDefinition[] {
  return [
    {
      variant: "primary",
      lines: [
        "Before we hang up, let me tighten this up so everything is clean.",
        "Your monthly payment is [X].",
        "The policy number is [X].",
        "The beneficiary on file is [Beneficiary Name].",
        "Keep this confirmation where the family can find it, and if anything changes on your contact side, update the carrier right away."
      ]
    },
    createQuickInsertBlock("Next-Step Reminder", [
      "This should feel organized and complete.",
      "Do not reopen the sale here. Reconfirm the protection and leave them clear."
    ])
  ];
}

function createNoOptionWrapUpScript(): ScriptLine[] {
  return [
    "I want to be straight with you.",
    "I do not have a same-day option I can responsibly put in front of you today.",
    "I am not going to force something that does not fit.",
    "What I can do is leave you clear on where you stand and what the next follow-up step would be."
  ];
}

function createGovernmentFreeBlocks(): ScriptBlockDefinition[] {
  return [
    {
      variant: "primary",
      lines: [
        "I understand why you'd think that... a lot of people I talk to say the same thing at first.",
        "What this actually is, is a program that helps you see what you qualify for based on your situation.",
        "So let's take a look at what you have in place right now.",
        "What life insurance company is currently protecting your family?"
      ]
    },
    createQuickInsertBlock("If They Push", [
      "I wish it was that simple.",
      "If it were free, everyone would already have it taken care of.",
      "What we're doing is finding the most affordable way to make sure your family is protected."
    ])
  ];
}

function createAmericanGeneralDisclosureBlocks(): ScriptBlockDefinition[] {
  return [
    createLockedVerbatimBlock(
      "American General Life Insurance Company - Guaranteed Issue Whole Life Insurance (Read Verbatim)",
      [
        "Okay {{client_name}}, I think I still have 1 option remaining...",
        "The plan I recommend is Guaranteed Issue Whole Life Insurance by American General Life Insurance Company.",
        "This is a guaranteed acceptance life insurance plan with no additional medical exams or tests required.",
        "Your rates will never go up and the coverage will never expire, no matter what happens to your health or how long you have the policy. And better yet, premiums only need to be paid until Age 90, and then the policy is fully paid up and you won't ever need to pay any more premiums.",
        "This plan has a deferred coverage period, which means if you pass away from natural causes during the first 2 years, all premiums will be refunded to your family with an additional 10% paid back as well. But from 2 years and a day, you’re fully insured. And even from day 1, if you pass away from an accident, the coverage pays out at the full coverage amount.",
        "So you're still better protected from day 1 than you are currently.",
        "But the best part about this plan {{client_name}}, is that the money goes directly to your family tax-free when a claim is made. Isn’t that awesome?"
      ]
    ),
    createLockedVerbatimBlock(
      "American General Life Insurance Company - Additional Benefit (Read Verbatim)",
      [
        "ADDITIONAL BENEFIT:",
        "DO NOT READ FOR CUSTOMERS IN CALIFORNIA OR DC",
        "In addition to the coverage discussed, this plan also includes no-cost benefits including a Terminal Illness Accelerated Death Benefit and a Chronic Illness Accelerated Benefit, which means you may be able to receive money before you pass away if diagnosed with a terminal illness or cognitive impairment such as Alzheimer’s or dementia."
      ],
      {
        exclude_states: ["CA", "DC"]
      }
    ),
    createLockedVerbatimBlock(
      "American General Life Insurance Company - Guaranteed Issue Whole Life Insurance Wrap-Up (Read Verbatim)",
      [
        "All of these details will be outlined in the policy document for your review once approved.",
        "Do you have any questions about the coverage?"
      ]
    )
  ];
}

function createEmcEasyLifeDisclosureBlocks(): ScriptBlockDefinition[] {
  return [
    createLockedVerbatimBlock("EMC National Life Company - Easy Life Plan (Read Verbatim)", [
      "Now, after we're able to verify the approval factors, I hope you will qualify for either the Easy Life Plan that pays the entire face amount right away from day one, or the Graded Plan, which also pays the full face amount after two years.",
      "I'm really hoping I can get you day one coverage over a two year wait.",
      "I'm sure that's what you'd like, right?",
      "The reason I'm hoping for that route is it's simple. There are no medical appointments, no blood work, and no doctor visits. We just verify with your doctor and the pharmacy.",
      "It also builds cash value over time, the coverage never expires as long as premiums are paid, and when a claim is made that money goes directly to your family tax-free.",
      "On top of that, most claims are paid very quickly, usually within 48 hours of a completed submission.",
      "So if this comes back the way I'm hoping, it gives your family real protection without putting them through more hoops."
    ])
  ];
}

function createEmcGradedDisclosureBlocks(): ScriptBlockDefinition[] {
  return [
    createLockedVerbatimBlock("EMC National Life Company - Graded Plan (Read Verbatim)", [
      "Now, after we're able to verify the approval factors, I hope you will qualify for the Graded Plan, which pays the full face amount from day one due to accidental death, and after two years and a day for natural causes.",
      "If you passed away during the first year it would pay 110 percent of your paid premiums.",
      "During the second year it would pay 120 percent of your paid premiums.",
      "So either way you will be better protected from day one with this plan, which is great right?",
      "The good part is there still aren't any medical appointments, blood work, or doctor visits. We just verify with your doctor and the pharmacy.",
      "It also builds cash value over time, the coverage never expires as long as premiums are paid, and when a claim is made that money goes directly to your family tax-free.",
      "On top of that, most claims are paid very quickly, usually within 48 hours of a completed submission.",
      "So if this is the route we land on, it's still a simple way to put protection in place for your family."
    ])
  ];
}

function createEternalLegacyDisclosureBlocks(): ScriptBlockDefinition[] {
  return [
    createLockedVerbatimBlock(
      "Monitor Life Insurance Company of New York - Eternal Legacy Membership Package (Read Verbatim)",
      [
        "The plan I can walk you through today is Eternal Legacy, underwritten by Monitor Life Insurance Company of New York.",
        "This is a guaranteed acceptance group term life insurance plan.",
        "Since you've already answered the health questions, there are no additional medical exams or tests required, and this coverage will stay in force until age 95 as long as your premiums are paid and your group policy stays in force.",
        "This coverage pays the full amount from day one due to accidental death, and after two years and a day for natural causes.",
        "If you pass away during the first two years all paid premiums will be returned to the beneficiary.",
        "This is a membership package offer that includes Guaranteed Acceptance Group Term Life Insurance along with other benefits and services associated with AFEUSA membership.",
        "As a member of AFEUSA you will be entitled to valuable non insurance benefits such as health and wellness programs, savings on medications, identity theft investigation services, and many other services.",
        "Benefits vary by state, and the membership brochure you receive will provide complete details.",
        "So either way you will be better protected from day one with this plan, which is great right?"
      ]
    )
  ];
}

const routeDisclosureTransitionLine =
  "Now I’m going to read through the required coverage details exactly, so everything is clear before we move forward.";

function createEmcEasyLifeRouteScript(): ScriptLine[] {
  return [
    "Okay {{client_name}}, based on how this came back, this is the route I was hoping to see for you.",
    "The plan we're looking at is EMC Easy Life.",
    "This fits because you cleared the stronger approval path, so we're not dealing with a wait on the natural death benefit.",
    "That matters because it gives your family real day-one protection instead of leaving them in a spot where they still have to figure everything out on their own.",
    "You still get the simple side of it too. No medical exams, no needles, and no extra running around. We just keep the file clean and move it the right way.",
    "So this is a solid approval, and it gives us a clean way to protect the people you told me you care about most.",
    routeDisclosureTransitionLine
  ];
}

function createEmcGradedRouteScript(): ScriptLine[] {
  return [
    "Okay {{client_name}}, based on how this came back, I do have an approval path for you.",
    "The plan we're looking at is EMC Graded.",
    "This fits because the stronger day-one route is not the one the system gave us, but we still have a real way to put coverage in place today.",
    "The important thing to understand is that accidental death is covered at the full amount from day 1, and the natural cause benefit steps into the full amount after the graded period.",
    "So even though it is not the strongest approval on the board, it is still a real step forward from leaving your family with nothing set aside.",
    "That is why I still want to walk it through carefully, because it gives us a path to protect them instead of leaving this unresolved.",
    routeDisclosureTransitionLine
  ];
}

function createMonitorEternalLegacyRouteScript(): ScriptLine[] {
  return [
    "Okay {{client_name}}, based on how this came back, EMC is not the route the system is giving us.",
    "But I do still have another option, and I do not want you walking away thinking that means we are out of road.",
    "The plan we're looking at is Monitor Eternal Legacy, underwritten by Monitor Life Insurance Company of New York.",
    "This fits because it gives you a guaranteed acceptance path when the stronger EMC approvals are not the ones available.",
    "What you need to understand is that this is a membership-backed group term route, so I want to walk you through it carefully and make sure you hear the coverage details exactly the way they have to be read.",
    "The reason I still like having this path is simple: it gives your family something real to work with instead of leaving them to handle everything from zero.",
    routeDisclosureTransitionLine
  ];
}

function createAmericanGeneralRouteScript(): ScriptLine[] {
  return [
    "Okay {{client_name}}, based on how this came back, I think I still have one option remaining.",
    "This is not the plan I would lead with if we had other approvals available, but it does keep you from walking away with nothing in place.",
    "The plan I recommend is Guaranteed Issue Whole Life Insurance by American General Life Insurance Company.",
    "This is guaranteed acceptance, so there are no additional medical exams or tests required.",
    "The big thing here is that your rates will never go up, and the coverage will never expire, no matter what happens to your health or how long you have the policy.",
    "And even better, premiums only need to be paid until age 90. After that, the policy is fully paid up, and you would not need to pay any more premiums.",
    "Now, I want to be clear about the part that matters most.",
    "This plan has a deferred coverage period. That means if you pass away from natural causes during the first 2 years, all premiums are refunded to your family with an additional 10% paid back as well.",
    "But from 2 years and a day, you are fully insured.",
    "And from day 1, if you pass away from an accident, the coverage pays out at the full coverage amount.",
    "So even though it is not perfect, you are still better protected from day 1 than you are right now.",
    "And the best part, {{client_name}}, is that when a claim is made, the money goes directly to your family tax-free.",
    "So the question now is simple: do we want to leave things the way they are, or do we want to at least get something in place so your family is not starting from zero?",
    routeDisclosureTransitionLine
  ];
}

const rawScriptSections: ScriptSection[] = [
  {
    id: 1,
    title: "Authority Intro",
    phase: "discovery",
    qaRequired: false,
    script: [
      "Hi [ClientName], this is Nick, senior licensed life insurance advisor here with Insurance Supermarket.",
      "Before we get started, this call may be recorded for quality and training purposes.",
      "Now, [ClientName], I'm licensed to help families with final expense protection, and my job here is simple.",
      "I'm going to figure out what you already have in place, what you actually need, and if we can qualify you today, I'll walk you through the best option clearly.",
      "You're in good hands, so let's start here.",
      "What life insurance company is currently protecting your family?"
    ],
    focus: {
      reminder: "Sound certain from the first sentence.",
      visualCue: "No permission language. Move directly into current coverage."
    },
    prompt: {
      goal: "Establish authority fast and move straight into coverage discovery.",
      notes: [
        "No 'sound good?' and no 'does that make sense?'",
        "Do not explain the product yet.",
        "Make the intro feel like the start of a professional process, not a pitch."
      ]
    }
  },
  {
    id: 2,
    title: "Discovery Engine",
    phase: "discovery",
    qaRequired: false,
    script: ["Do you have any life insurance in place right now?"],
    focus: {
      reminder: "Use toddler curiosity here.",
      visualCue: "Short questions. Let them talk."
    },
    prompt: {
      goal: "Open discovery with current reality instead of theory.",
      notes: [
        "Discovery is not linear. Park the car when they open a real door.",
        "Do not rescue them with long explanations.",
        "Stay curious until you know what they really mean."
      ]
    },
    helperLines: [
      "Ask one clean question at a time.",
      "If they drift into a story, stay with the useful part of it before returning to the main path."
    ]
  },
  {
    id: 2.5,
    title: "Discovery Engine: Coverage Snapshot",
    phase: "discovery",
    qaRequired: false,
    script: [],
    branchControl: {
      stateKey: "coverageStatus",
      label: "Coverage Snapshot",
      helpText: "Pick the branch that matches what they actually have or believe they have.",
      replaceBaseOnSelect: true,
      options: [
        {
          value: "has-coverage-now",
          label: "Has Coverage Now",
          description: "Use this when they currently have a policy or another active plan.",
          scriptBlocks: [
            {
              lines: ["Good. Who is that with?"],
              levels: [
                {
                  label: "Next Layer: Coverage Size",
                  collapsed: true,
                  lines: ["How much coverage do you have?"]
                },
                {
                  label: "Next Layer: Source",
                  collapsed: true,
                  lines: ["Is that something you set up yourself or through work?"]
                },
                {
                  label: "Next Layer: Last Review",
                  collapsed: true,
                  lines: ["When was the last time you actually reviewed that coverage closely?"]
                },
                {
                  label: "Next Layer: Original Reason",
                  collapsed: true,
                  lines: ["What made you put that in place originally?"]
                },
                {
                  label: "Next Layer: Who It Was For",
                  collapsed: true,
                  lines: ["Who were you thinking about when you set that up?"]
                },
                {
                  label: "Next Layer: Why Look Again",
                  collapsed: true,
                  lines: ["And what made you take a look into this today if you already have that in place?"]
                },
                {
                  label: "Next Layer: If Nothing Changes",
                  collapsed: true,
                  lines: [
                    "If nothing changes from where things are right now, what do you think still ends up happening?"
                  ]
                }
              ]
            }
          ],
          helperLines: [
            "Do not attack the current policy.",
            "Ask one question, let them answer, then move to the next one."
          ]
        },
        {
          value: "had-coverage-before",
          label: "Had Coverage Before",
          description: "Use this when they used to have coverage and no longer do.",
          scriptBlocks: [
            {
              lines: ["Okay. Who was that with?"],
              levels: [
                {
                  label: "Next Layer: Coverage Size",
                  collapsed: true,
                  lines: ["How much coverage did you have?"]
                },
                {
                  label: "Next Layer: Source",
                  collapsed: true,
                  lines: ["Was that something you set up yourself or through work?"]
                },
                {
                  label: "Next Layer: When It Changed",
                  collapsed: true,
                  lines: ["When did that coverage fall off?"]
                },
                {
                  label: "Next Layer: What Happened",
                  collapsed: true,
                  lines: ["What happened when it did?"]
                },
                {
                  label: "Next Layer: Real Friction",
                  collapsed: true,
                  lines: ["Was it the price, timing, or did it just stop feeling like the right fit?"]
                },
                {
                  label: "Next Layer: Who It Was For",
                  collapsed: true,
                  lines: ["Who were you thinking about when you had it in place?"]
                },
                {
                  label: "Next Layer: Why Look Again",
                  collapsed: true,
                  lines: ["What's different now that has you taking another look?"]
                },
                {
                  label: "Next Layer: If Nothing Changes",
                  collapsed: true,
                  lines: [
                    "If nothing changes from where things are right now, what do you think ends up happening?"
                  ]
                }
              ]
            }
          ],
          helperLines: [
            "This usually opens a real pain point. Stay there long enough to understand it.",
            "If it lapsed or got too expensive, that matters later."
          ]
        },
        {
          value: "no-coverage",
          label: "No Coverage",
          description: "Use this when nothing is set up right now.",
          scriptBlocks: [
            {
              lines: ["Okay, so nothing is protecting them right now... help me understand, why is that?"],
              levels: [
                {
                  label: "Next Layer: Last Time",
                  collapsed: true,
                  lines: ["When was the last time you actually looked into putting something in place?"]
                },
                {
                  label: "Next Layer: What Happened",
                  collapsed: true,
                  lines: ["What happened when you did?"]
                },
                {
                  label: "Next Layer: Real Friction",
                  collapsed: true,
                  lines: ["Was it the price, timing, or did it just not feel like the right fit?"]
                },
                {
                  label: "Next Layer: Who They Were Thinking About",
                  collapsed: true,
                  lines: ["Who were you thinking about when you considered getting coverage?"]
                },
                {
                  label: "Next Layer: Why Now",
                  collapsed: true,
                  lines: ["What's different now that has you taking another look?"]
                },
                {
                  label: "Next Layer: If Nothing Changes",
                  collapsed: true,
                  lines: [
                    "If nothing changes from where things are right now, what do you think ends up happening?"
                  ]
                }
              ]
            }
          ],
          helperLines: [
            "Let them explain it in their own words.",
            "Do not rescue them with extra language."
          ]
        },
        {
          value: "thought-free-government",
          label: "Thought It Was Free / Government",
          description: "Use this when they thought there was a free or government program handling this.",
          scriptBlocks: createGovernmentFreeBlocks(),
          helperLines: [
            "Do not embarrass them.",
            "Clarify the misunderstanding, then keep moving."
          ]
        },
        {
          value: "unclear",
          label: "Needs Clarifying",
          description: "Use this when they are not sure what they have or how it works.",
          script: ["No problem. Is there an active policy right now, or not?"],
          helperLines: [
            "Pull enough detail to understand the lane.",
            "Do not get stuck on carrier trivia."
          ]
        }
      ]
    },
    workspace: {
      title: "Coverage Snapshot",
      text: "Capture what is really in place, what it costs, and whether it would actually solve the burden they named.",
      groups: ["currentSupport"],
      notes: {
        key: "currentSupportNotes",
        label: "Coverage Snapshot Notes",
        placeholder: "Carrier, amount, monthly premium, whether it is personal, work, term, or nothing at all"
      }
    },
    prompt: {
      goal: "Clarify current coverage without turning the call into an audit.",
      notes: [
        "If they open a real confusion door, park the car and clear it up.",
        "If they mention a previous bad experience, keep digging.",
        "You are building the case for why this still matters."
      ]
    }
  },
  {
    id: 3,
    title: "Discovery Engine: Why Now",
    phase: "discovery",
    qaRequired: false,
    scriptBlocks: [
      {
        variant: "primary",
        lines: [
          "Usually this conversation starts because of something real.",
          "Did someone pass away, was there a scare in the family, or are you just trying to get ahead of it before it becomes a problem?",
          "Which one is it for you?"
        ]
      },
      createQuickInsertBlock("If They Mention Someone Died", [
        "I'm sorry to hear that.",
        "Who was it?",
        "What did the family have to go through when that happened?",
        "What part of that stuck with you?"
      ]),
      createQuickInsertBlock("If They Mention Children / Grandchildren", [
        "How much of this are you thinking about for the kids or grandkids specifically?",
        "What would you not want them dealing with if the call came tomorrow?"
      ]),
      createQuickInsertBlock("Park The Car", [
        "If they finally give you the real reason, stay there.",
        "Do not rush back to your next question until the story is clear."
      ])
    ],
    workspace: {
      title: "Why Now",
      text: "Find the real event, fear, or family reason that opened the door for this conversation.",
      groups: ["lossExperience", "familyContext"],
      notes: {
        key: "lossExperienceNotes",
        label: "Why-Now Notes",
        placeholder: "Loss story, health scare, kids, grandkids, or the reason this became real today"
      }
    },
    focus: {
      reminder: "This is where the truth usually shows up.",
      visualCue: "Once they open the door, ask why again."
    },
    prompt: {
      goal: "Get the real reason they are even on this call.",
      notes: [
        "Make them say it, not you.",
        "If they keep it surface-level, ask what made this matter now.",
        "Stay curious instead of steering too early."
      ]
    }
  },
  {
    id: 4,
    title: "Funeral Reality + Who Pays",
    phase: "discovery",
    qaRequired: false,
    script: [
      "Have you thought about how you'd want things handled when that time comes?",
      "Would you want burial, cremation, or are you not sure yet?",
      "Who would be the person making those arrangements for you?",
      "And when the funeral home needs payment, where is that money coming from?",
      "Would that be easy for them, or would that put pressure on them?",
      "If nothing changes from where things are right now, what do you think happens?"
    ],
    workspace: {
      title: "Funeral Reality + Who Pays",
      text: "Lock the funeral preference, the person handling arrangements, the source of payment, and whether that creates real pressure.",
      groups: ["burialCremation", "familyResponsibility"],
      notes: {
        key: "funeralConcern",
        label: "Funeral Reality Notes",
        placeholder: "Burial or cremation, who handles arrangements, where the money comes from, and what pressure that creates"
      }
    },
    focus: {
      reminder: "Keep this practical, grounded, and specific.",
      visualCue: "Walk from preference to payer to consequence without jumping around."
    },
    prompt: {
      goal: "Turn funeral planning into a real-world burden conversation instead of a vague fear.",
      notes: [
        "One question at a time.",
        "If they say 'family,' get the specific person.",
        "By the end of this section, you should know who handles it, who pays, and what happens if nothing changes."
      ]
    }
  },
  {
    id: 5,
    title: "Pain Builder",
    phase: "discovery",
    qaRequired: false,
    script: [
      "Based on what you told me about [Beneficiary Name] being the one who would have to handle this, they would be carrying that pressure in the middle of everything else.",
      "That is usually the part families feel the hardest.",
      "What matters most to you about making sure they are not left in that position?"
    ],
    focus: {
      reminder: "This is now a summary and consequence lock, not another discovery lap.",
      visualCue: "Reference what they already told you, then let the answer land.",
      highlightLabel: "Consequence Lock"
    },
    workspace: {
      title: "Pain Builder",
      text: "Summarize the consequence using their own funeral and payer answers instead of reopening the same questions.",
      groups: ["familyResponsibility", "protectionPriority"],
      notes: {
        key: "protectionPriorityNotes",
        label: "Pain Notes",
        placeholder: "What consequence matters most to them once they hear the burden stated back clearly?"
      },
      highlight: "paint-picture"
    },
    highlightStyle: "paint-picture",
    prompt: {
      goal: "State the consequence back to them and make them own why it matters.",
      notes: [
        "Do not repeat funeral, arrangements, or who pays questions here.",
        "Use callback language.",
        "This should feel tighter and more controlled than the discovery section before it."
      ]
    }
  },
  {
    id: 8,
    title: "Pain Builder: Lock The Why",
    phase: "discovery",
    qaRequired: false,
    script: [
      "Say it to me straight.",
      "Why is it important to have this handled instead of leaving [Beneficiary Name] trying to sort it out in the moment?",
      "What is the main thing you do not want them dealing with?",
      "Good. That is the reason we are fixing it."
    ],
    workspace: {
      title: "Client's Why",
      text: "Make the client say why coverage matters in their own words and keep that language in front of you.",
      groups: ["protectionPriority"],
      notes: {
        key: "protectionPriorityNotes",
        label: "Client's Why",
        placeholder: "Write the exact reason they gave for why this needs to be handled"
      }
    },
    focus: {
      reminder: "Do not answer this for them.",
      visualCue: "Ask why until they own it."
    },
    prompt: {
      goal: "Lock the reason before you pivot into approval.",
      notes: [
        "Make the client say why they need coverage.",
        "Use their exact wording later in value and presentation.",
        "This is the hinge for the rest of the call."
      ]
    }
  },
  {
    id: 10,
    title: "Application / Approval Flow",
    phase: "discovery",
    qaRequired: false,
    script: [
      "Based on what you told me about [Beneficiary Name] being the one who would have to handle this, that's why we're checking what you qualify for before we talk about options.",
      "Alright [ClientName], based on everything we just talked through, what I want to do now is see exactly what you qualify for.",
      "This part is quick. I'll get some basic information from you so the system can pull up your approval.",
      "This is the same process every client goes through so we can lock in accurate options for you."
    ],
    workspace: {
      title: "Approval Bridge",
      text: "Carry the client's why into the application so the process feels earned, not random.",
      groups: ["discoveryBridge"],
      notes: {
        key: "protectionPriorityNotes",
        label: "Bridge Anchor",
        placeholder: "What exact reason are you carrying into the approval flow?"
      }
    },
    focus: {
      reminder: "This is where you shift from curious to expert.",
      visualCue: "Warm tone, firm control."
    },
    prompt: {
      goal: "Transition cleanly from discovery into approval without sounding like you changed scripts.",
      notes: [
        "Do not ask permission.",
        "The client should feel guided, not sold.",
        "From here forward, you are the advisor driving the process."
      ]
    }
  },
  {
    id: 11,
    title: "Application / Approval Flow: Basic Info",
    phase: "discovery",
    qaRequired: false,
    script: [
      "Let me confirm the basics exactly the way the application needs them.",
      "We'll tighten up your legal information, state, beneficiary, and anything tied to the approval so the system comes back clean."
    ],
    focus: {
      reminder: "Stay efficient and advisor-like.",
      visualCue: "This should feel procedural, not salesy."
    },
    prompt: {
      goal: "Collect basic information without losing control of the call.",
      notes: [
        "Keep them moving one answer at a time.",
        "Do not reopen discovery here unless they hand you something useful."
      ]
    }
  },
  {
    id: 12,
    title: "Application / Approval Flow: SSN / Verification",
    phase: "discovery",
    qaRequired: false,
    script: [
      "The next item the system uses is your social so it can verify identity and match you to the right approval.",
      "When you're ready, go ahead with that for me."
    ],
    branchControl: {
      stateKey: "ssnBranch",
      label: "SSN Branch",
      helpText: "Use the base ask first, then pick the branch that matches the pushback.",
      replaceBaseOnSelect: true,
      options: [
        {
          value: "uneasy",
          label: "Uneasy",
          description: "Use this when they are generally uncomfortable giving the SSN.",
          script: [
            "Totally fair.",
            "This is how the system verifies identity and makes sure I am matching you with the right approval instead of guessing.",
            "Once that is done, I can show you exactly what you qualify for."
          ]
        },
        {
          value: "security",
          label: "Security",
          description: "Use this when they ask whether it is safe.",
          script: [
            "Totally fair.",
            "It stays inside the identity and approval process only.",
            "The point is to make sure the system is tying the approval to the right person so I can show you real options instead of estimates."
          ]
        },
        {
          value: "why-needed",
          label: "Why Needed",
          description: "Use this when they directly ask why the SSN is required.",
          script: [
            "Totally fair. Let me explain why we need it.",
            "This is how the system verifies identity and makes sure we're matching you with the right plan. It's not optional if we want a real approval.",
            "Once that's done, I'll show you exactly what you qualify for."
          ]
        }
      ]
    },
    prompt: {
      goal: "Handle SSN resistance calmly without turning it into a debate.",
      notes: [
        "Be matter-of-fact, not defensive.",
        "Acknowledge first, explain second, move forward third."
      ]
    }
  },
  {
    id: 13,
    title: "Application / Approval Flow: Medical Questions",
    phase: "discovery",
    qaRequired: true,
    scriptBlocks: [
      {
        variant: "primary",
        lines: [
          "Now I'm going to run the approval questions exactly the way the system asks them.",
          "Answer them plainly, and I'll handle the rest."
        ]
      },
      createVerbatimBlock("Verbatim Disclosure", [
        "[PASTE EXACT GIACT / MEDICAL / CARRIER DISCLOSURE WORDING HERE]"
      ])
    ],
    prompt: {
      goal: "Move through the approval questions cleanly and in compliance.",
      notes: [
        "Read verbatim language exactly when it applies.",
        "Do not paraphrase compliance text.",
        "Keep the tone steady and professional."
      ]
    }
  },
  {
    id: 14,
    title: "Application / Approval Flow: iApp / Approval Path",
    phase: "discovery",
    qaRequired: false,
    script: [
      "Perfect. That gives me what I need to lock in the approval path.",
      "Now I'm going to match that information to the route that actually fits instead of guessing."
    ],
    branchControl: {
      stateKey: "medicalReview",
      label: "Medical Review",
      helpText: "Use the branch that best matches how the health answers landed.",
      replaceBaseOnSelect: true,
      options: [
        {
          value: "no-history",
          label: "No History",
          description: "Use this when the client clears the medical path cleanly.",
          script: [
            "Perfect. That keeps the approval path clean.",
            "Give me a second while I lock in what the system is allowing."
          ]
        },
        {
          value: "medical-history",
          label: "Medical History",
          description: "Use this when the client has history that affects the route.",
          script: [
            "Thank you. That is exactly what I needed.",
            "Now I can match you to the route that actually fits instead of forcing the wrong one."
          ]
        },
        {
          value: "needs-review",
          label: "Needs Review",
          description: "Use this when the answers need a closer route check.",
          script: [
            "Some of that needs a closer look.",
            "Let me tighten it up so I can see the most accurate route the system will allow."
          ]
        }
      ]
    },
    prompt: {
      goal: "Turn the health answers into a clear approval path.",
      notes: [
        "Sound like the expert here.",
        "No product talk yet. Just route control."
      ]
    }
  },
  {
    id: 15,
    title: "Application / Approval Flow: Route Lock",
    phase: "discovery",
    qaRequired: false,
    script: [],
    branchControl: {
      stateKey: "productOutcome",
      replaceBaseOnSelect: true,
      label: "Product Route",
      helpText: "Pick the approval route before you move into QA, value, and presentation.",
      options: [
        createProductOutcomeOption("easy-life", {
          script: createEmcEasyLifeRouteScript()
        }),
        createProductOutcomeOption("emc-graded", {
          script: createEmcGradedRouteScript()
        }),
        createProductOutcomeOption("eternal-legacy", {
          script: createMonitorEternalLegacyRouteScript()
        }),
        createProductOutcomeOption("american-general", {
          script: createAmericanGeneralRouteScript()
        }),
        createProductOutcomeOption("no-option", {
          script: [
            "I finished the approval search.",
            "Let me walk you through exactly what is and is not available today."
          ]
        })
      ]
    },
    prompt: {
      goal: "Lock the route before you start building certainty around it.",
      notes: [
        "No price before route, QA, value, and approval reveal.",
        "This is the handoff into the closing half of the call."
      ]
    }
  },
  {
    id: 16,
    title: "QA / Doubt Build",
    qaRequired: true,
    script: [],
    branchControl: {
      stateKey: "productOutcome",
      display: false,
      replaceBaseOnSelect: true,
      options: [
        createProductOutcomeOption("easy-life", {
          scriptBlocks: [
            {
              variant: "primary",
              lines: [
                "Now [ClientName], I'm going to go over a few important details with you. This is standard for every policy, and I want to make sure everything is clear so there are no surprises later."
              ]
            },
            ...createEmcEasyLifeDisclosureBlocks(),
            createQuickInsertBlock("After QA", [
              "Based on everything we just covered, is there anything there that would stop you from moving forward if everything else makes sense?"
            ])
          ]
        }),
        createProductOutcomeOption("emc-graded", {
          scriptBlocks: [
            {
              variant: "primary",
              lines: [
                "Now [ClientName], I'm going to go over a few important details with you. This is standard for every policy, and I want to make sure everything is clear so there are no surprises later."
              ]
            },
            ...createEmcGradedDisclosureBlocks(),
            createQuickInsertBlock("After QA", [
              "Based on everything we just covered, is there anything there that would stop you from moving forward if everything else makes sense?"
            ])
          ]
        }),
        createProductOutcomeOption("eternal-legacy", {
          scriptBlocks: [
            {
              variant: "primary",
              lines: [
                "Now [ClientName], I'm going to go over a few important details with you. This is standard for every policy, and I want to make sure everything is clear so there are no surprises later."
              ]
            },
            ...createEternalLegacyDisclosureBlocks(),
            createQuickInsertBlock("After QA", [
              "Based on everything we just covered, is there anything there that would stop you from moving forward if everything else makes sense?"
            ])
          ]
        }),
        createProductOutcomeOption("american-general", {
          scriptBlocks: [
            {
              variant: "primary",
              lines: [
                "Now [ClientName], I'm going to go over a few important details with you. This is standard for every policy, and I want to make sure everything is clear so there are no surprises later."
              ]
            },
            ...createAmericanGeneralDisclosureBlocks(),
            createQuickInsertBlock("After QA", [
              "Based on everything we just covered, is there anything there that would stop you from moving forward if everything else makes sense?"
            ])
          ]
        }),
        createProductOutcomeOption("no-option", {
          script: ["There is no route-specific QA build on a no-option path. Move to the outcome."]
        })
      ]
    },
    prompt: {
      goal: "Use the policy details to remove doubt before the approval reveal.",
      notes: [
        "This comes before price.",
        "Slow down just enough to sound deliberate and professional.",
        "The check-in question after QA matters. Use it."
      ]
    }
  },
  {
    id: 17,
    title: "Product Value Build",
    qaRequired: false,
    script: [],
    branchControl: {
      stateKey: "productOutcome",
      display: false,
      replaceBaseOnSelect: true,
      options: [
        createProductOutcomeOption("easy-life", {
          script: [
            "What this does is make sure that when that time comes, your family doesn't have to go through what we talked about earlier.",
            "On this policy, the monthly premium is fixed and the coverage is designed to stay in place for life as long as it is paid.",
            "There is no medical exam.",
            "When a completed claim is filed, the beneficiary can receive the money quickly, so the family is not stuck waiting around while the pressure is building.",
            "This is about reducing the burden, protecting their peace of mind, and making sure the plan actually shows up when it is needed."
          ]
        }),
        createProductOutcomeOption("emc-graded", {
          script: [
            "What this does is make sure that when that time comes, your family doesn't have to go through what we talked about earlier.",
            "On this policy, the monthly premium is fixed and the coverage is designed to stay in place for life as long as it is paid.",
            "There is no medical exam.",
            "When a completed claim is filed, the beneficiary can receive the money quickly, so the family is not stuck waiting around while the pressure is building.",
            "This is about reducing the burden, protecting their peace of mind, and making sure the plan actually shows up when it is needed."
          ]
        }),
        createProductOutcomeOption("eternal-legacy", {
          script: [
            "What this does is make sure that when that time comes, your family doesn't have to go through what we talked about earlier.",
            "On this policy, the monthly premium is fixed and the coverage is designed to stay in place for life as long as it is paid.",
            "There is no medical exam.",
            "When a completed claim is filed, the beneficiary can receive the money quickly, so the family is not stuck waiting around while the pressure is building.",
            "This is about reducing the burden, protecting their peace of mind, and making sure the plan actually shows up when it is needed."
          ]
        }),
        createProductOutcomeOption("american-general", {
          script: [
            "What this does is make sure that when that time comes, your family does not walk into that moment with nothing in place.",
            "Even on a guaranteed issue route, the premium is fixed, the coverage does not expire as long as it is paid, and there is no medical exam standing in the way.",
            "On this plan, accidental death pays at the full amount from day 1, and that alone is still a better position than leaving the whole burden sitting on the family.",
            "More than anything, this gives them something real to work with instead of starting from zero and hoping they can figure it out later."
          ]
        }),
        createProductOutcomeOption("no-option", {
          script: ["There is no product value build on a no-option path because there is no plan to present today."]
        })
      ]
    },
    prompt: {
      goal: "Tie the plan back to the exact burden the client described before you reveal approval.",
      notes: [
        "This is still not price.",
        "Use their reason, not your favorite benefits speech.",
        "Sound helpful and certain, not hyped up."
      ]
    }
  },
  {
    id: 18,
    title: "Approval Reveal",
    qaRequired: false,
    script: [],
    branchControl: {
      stateKey: "productOutcome",
      display: false,
      replaceBaseOnSelect: true,
      options: [
        createProductOutcomeOption("easy-life", {
          script: [
            "Good news, [ClientName]...",
            "You are approved.",
            "Now let me walk you through what that looks like for you."
          ]
        }),
        createProductOutcomeOption("emc-graded", {
          script: [
            "Good news, [ClientName]...",
            "You are approved.",
            "Now let me walk you through what that looks like for you."
          ]
        }),
        createProductOutcomeOption("eternal-legacy", {
          script: [
            "Good news, [ClientName]...",
            "You are approved.",
            "Now let me walk you through what that looks like for you."
          ]
        }),
        createProductOutcomeOption("american-general", {
          script: [
            "Good news, [ClientName]...",
            "You are approved.",
            "Now let me walk you through what that looks like for you."
          ]
        }),
        createProductOutcomeOption("no-option", {
          script: createNoOptionWrapUpScript()
        })
      ]
    },
    prompt: {
      goal: "Deliver the result clearly after the value and doubt-build work is done.",
      notes: [
        "This should feel earned.",
        "Do not rush into price until the approval line lands."
      ]
    }
  },
  {
    id: 19,
    title: "Presentation Setup",
    qaRequired: false,
    script: [],
    branchControl: {
      stateKey: "productOutcome",
      display: false,
      replaceBaseOnSelect: true,
      options: [
        createProductOutcomeOption("easy-life", {
          script: [
            "Good. Now I am going to show you the three ways families usually set this up.",
            "One is Full Protection, one is Balanced Protection, and one is Safety Net.",
            "Then you tell me which one makes the most sense for you."
          ]
        }),
        createProductOutcomeOption("emc-graded", {
          script: [
            "Good. Now I am going to show you the three ways families usually set this up.",
            "One is Full Protection, one is Balanced Protection, and one is Safety Net.",
            "Then you tell me which one makes the most sense for you."
          ]
        }),
        createProductOutcomeOption("eternal-legacy", {
          script: [
            "Good. Now I am going to show you the three ways families usually set this up.",
            "One is Full Protection, one is Balanced Protection, and one is Safety Net.",
            "Then you tell me which one makes the most sense for you."
          ]
        }),
        createProductOutcomeOption("american-general", {
          script: [
            "Good. Now I am going to show you the three ways families usually set this up.",
            "One is Full Protection, one is Balanced Protection, and one is Safety Net.",
            "Then you tell me which one makes the most sense for you."
          ]
        }),
        createProductOutcomeOption("no-option", {
          script: createNoOptionWrapUpScript()
        })
      ]
    },
    prompt: {
      goal: "Frame the three-option presentation before you give numbers.",
      notes: [
        "Keep the middle option positioned as the natural fit.",
        "You are about to present price, but only after approval and value are already clear."
      ]
    }
  },
  {
    id: 20,
    title: "Presentation",
    qaRequired: false,
    script: [],
    branchControl: {
      stateKey: "productOutcome",
      display: false,
      replaceBaseOnSelect: true,
      options: [
        createProductOutcomeOption("easy-life", {
          comparisonOptions: createPriceComparisonOptions(),
          script: createPresentationScript()
        }),
        createProductOutcomeOption("emc-graded", {
          comparisonOptions: createPriceComparisonOptions(),
          script: createPresentationScript()
        }),
        createProductOutcomeOption("eternal-legacy", {
          comparisonOptions: createPriceComparisonOptions(),
          script: createPresentationScript()
        }),
        createProductOutcomeOption("american-general", {
          comparisonOptions: createPriceComparisonOptions(),
          script: createPresentationScript()
        }),
        createProductOutcomeOption("no-option", {
          script: ["There is no price presentation on a no-option path."]
        })
      ]
    },
    prompt: {
      goal: "Present Full Protection, Balanced Protection, and Safety Net in a clean, low-friction order.",
      notes: [
        "Option 2 should feel like the natural balanced fit.",
        "Do not over-explain the math.",
        "Finish by asking which one makes the most sense."
      ]
    }
  },
  {
    id: 21,
    title: "Objections / Rehash",
    qaRequired: false,
    scriptBlocks: [
      {
        variant: "primary",
        lines: [
          "If they pause here, do not defend the price immediately.",
          "Ask what the real hesitation is, then work the actual objection."
        ]
      },
      createQuickInsertBlock("Re-Center", [
        "Usually if someone hesitates here, it is either the monthly side, the timing, or another person in the decision.",
        "Which one is it for you?"
      ])
    ],
    branchControl: {
      stateKey: "closeResponseFlow",
      label: "Close Branch",
      helpText: "Pick the objection that actually showed up after presentation.",
      replaceBaseOnSelect: true,
      options: [
        {
          value: "too-expensive",
          label: "Too Expensive",
          description: "Use this when monthly price is the main pushback.",
          script: [
            "I understand.",
            "Is it truly out of reach, or is it more than you expected?",
            "Because those are two different problems, and I only want to solve the real one."
          ]
        },
        {
          value: "need-to-think",
          label: "Need To Think",
          description: "Use this when they want to step back instead of moving forward.",
          script: [
            "Of course.",
            "Usually when someone says that, it is either the amount, the timing, or they still are not fully convinced.",
            "Which one is actually going on for you?"
          ]
        },
        {
          value: "need-family",
          label: "Need Family",
          description: "Use this when they want to talk to children, spouse, or another family member first.",
          script: [
            "I understand.",
            "When families need to talk it through, it is usually because they want to make sure the payment feels right or the reason feels strong enough.",
            "Which part do you want them helping you decide?"
          ]
        },
        {
          value: "already-have-coverage",
          label: "Already Have Coverage",
          description: "Use this when they fall back to what they already have in place.",
          script: [
            "That is fair.",
            "The real question is whether what you already have would handle the exact burden we talked through today or just part of it.",
            "Do you feel confident it already solves that?"
          ]
        },
        {
          value: "family-handles-it",
          label: "Family Will Handle It",
          description: "Use this when they say the family would step in anyway.",
          script: [
            "I believe they would.",
            "The question is whether they should have to, or whether it is handled ahead of time so they are not carrying that pressure while grieving."
          ]
        },
        {
          value: "government-free",
          label: "Free / Government",
          description: "Use this when they circle back to a free or government-program assumption.",
          scriptBlocks: createGovernmentFreeBlocks()
        }
      ]
    },
    prompt: {
      goal: "Handle hesitation calmly and get to the real objection fast.",
      notes: [
        "Do not get robotic.",
        "Acknowledge, clarify, then reframe.",
        "Stay human and authoritative."
      ]
    }
  },
  {
    id: 22,
    title: "Wrap Up: Enrollment",
    qaRequired: false,
    script: [],
    branchControl: {
      stateKey: "productOutcome",
      display: false,
      replaceBaseOnSelect: true,
      options: [
        createProductOutcomeOption("easy-life", {
          script: [
            "Good. Let's lock it in.",
            "Now I am going to tighten up the beneficiary, draft date, and remaining setup details so everything is complete."
          ]
        }),
        createProductOutcomeOption("emc-graded", {
          script: [
            "Good. Let's lock it in.",
            "Now I am going to tighten up the beneficiary, draft date, and remaining setup details so everything is complete."
          ]
        }),
        createProductOutcomeOption("eternal-legacy", {
          script: [
            "Good. Let's lock it in.",
            "Now I am going to tighten up the beneficiary, draft date, and remaining setup details so everything is complete."
          ]
        }),
        createProductOutcomeOption("american-general", {
          script: [
            "Good. Let's lock it in.",
            "Now I am going to tighten up the beneficiary, draft date, and remaining setup details so everything is complete."
          ]
        }),
        createProductOutcomeOption("no-option", {
          script: ["There is no enrollment setup on a no-option path."]
        })
      ]
    },
    prompt: {
      goal: "Move from agreement into setup without reopening the sale.",
      notes: [
        "Momentum matters here.",
        "Keep it organized and direct."
      ]
    }
  },
  {
    id: 23,
    title: "Wrap Up",
    qaRequired: false,
    script: [],
    branchControl: {
      stateKey: "productOutcome",
      display: false,
      replaceBaseOnSelect: true,
      options: [
        createProductOutcomeOption("easy-life", {
          scriptBlocks: createPostSaleRehashBlocks()
        }),
        createProductOutcomeOption("emc-graded", {
          scriptBlocks: createPostSaleRehashBlocks()
        }),
        createProductOutcomeOption("eternal-legacy", {
          scriptBlocks: createPostSaleRehashBlocks()
        }),
        createProductOutcomeOption("american-general", {
          scriptBlocks: createPostSaleRehashBlocks()
        }),
        createProductOutcomeOption("no-option", {
          script: [
            "We did not finalize coverage today, so the next step is keeping the follow-up clear instead of pretending the sale is done.",
            "If you want me to revisit anything later, I will do that directly and honestly."
          ]
        })
      ]
    },
    prompt: {
      goal: "Leave the client clear, organized, and confident about what happens next.",
      notes: [
        "This is where the wrap-up should feel complete.",
        "Keep the policy details clean and short."
      ]
    }
  },
  {
    id: 24,
    title: "Objections / Rehash Library",
    qaRequired: false,
    script: [
      "Acknowledge first.",
      "Then go back to the real burden they already admitted."
    ],
    branchControl: {
      stateKey: "disagreementBranch",
      label: "Objection Library",
      helpText: "Pick the live objection that needs a calm, direct reframe.",
      replaceBaseOnSelect: true,
      options: [
        {
          value: "i-dont-care",
          label: "I Don't Care What Happens To Me",
          description: "Use this when they act like the outcome does not matter to them personally.",
          script: [
            "I hear you.",
            "This really is not about what happens to you in the moment.",
            "It is about what happens to the people left dealing with it after you are gone."
          ]
        },
        {
          value: "sell-my-stuff",
          label: "Sell My Stuff",
          description: "Use this when they say the family can just sell assets.",
          script: [
            "They probably could.",
            "The question is whether you want them trying to sell things under pressure and on someone else's timeline, or whether you want the money already in place when it is needed."
          ]
        },
        {
          value: "family-handles",
          label: "Family Will Handle It",
          description: "Use this when they go back to the family stepping in.",
          script: [
            "Most families will step up if they have to.",
            "The better question is whether they should have to carry that burden at all if you can handle it ahead of time."
          ]
        },
        {
          value: "has-policy",
          label: "Already Have Coverage",
          description: "Use this when they fall back to another policy as the answer.",
          script: [
            "That is good.",
            "I am not against what you already have.",
            "I just want to know whether it really covers the exact problem you said you do not want the family dealing with."
          ]
        },
        {
          value: "government-free",
          label: "Government / Free Program",
          description: "Use this when they believe another benefit already solves the issue.",
          scriptBlocks: createGovernmentFreeBlocks()
        }
      ]
    },
    prompt: {
      goal: "Give the advisor a calm, human reframe library without sounding argumentative.",
      notes: [
        "Stay authoritative and short.",
        "Do not guilt them.",
        "Tie the objection back to the burden they already named."
      ]
    }
  }
];

export const scriptSections: ScriptSection[] = rawScriptSections.map(normalizeSection);
