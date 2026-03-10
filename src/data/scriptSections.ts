export const scriptSections = [
  {
    id: 1,
    title: "Introduction",
    qaRequired: false,
    script: [
      "Hello [ClientName], thank you for speaking with me today.",
      "Before we get started, I’m required to let you know this call may be recorded for quality and training purposes. That makes sense, right?",
      "My name is [AdvisorName], and I’m a Senior Licensed Advisor here with Insurance Supermarket.",
      "We’re a one-stop shop for life insurance, which is great for you because I’m licensed in [ClientState] to shop multiple companies at once.",
      "Instead of you calling several companies yourself, I compare them all and find the best option for your situation.",
      "Saves you a lot of time, doesn’t it?",
      "All the plans we work with are state-approved and designed specifically for people over age 50.",
      "As we go through this I’ll explain everything step-by-step, and if anything doesn’t make sense just stop me and I’ll clarify it.",
      "Fair enough?"
    ],
    prompt: {
      goal: "Set authority, trust, and compliance early",
      notes: [
        "Slow down on the recording disclosure.",
        "Sound calm and confident.",
        "Use the client's name naturally."
      ]
    }
  },
  {
    id: 2,
    title: "Rapport",
    qaRequired: false,
    script: [
      "I noticed you're in [ClientState].",
      "Have you been there your whole life?",
      "Is most of your family nearby with you or are they spread out?"
    ],
    prompt: {
      goal: "Create a natural, relaxed opening",
      notes: [
        "Keep it brief.",
        "Listen for family location and support system."
      ]
    }
  },
  {
    id: 3,
    title: "Transition",
    qaRequired: false,
    script: [
      "Well [ClientName], I want to respect your time as I know it's important to you as it is for me and since we're on the main subject of life insurance, I wanted to ask:",
      "What life insurance company are you currently with?"
    ],
    prompt: {
      goal: "Move from rapport into discovery",
      notes: [
        "Do not sound robotic.",
        "This should feel like a natural pivot."
      ]
    }
  },
  {
    id: 4,
    title: "Coverage Discovery",
    qaRequired: false,
    script: [
      "If you already have coverage, what company is that with?",
      "How much coverage does it provide?",
      "How long ago did you start that policy?",
      "About how much is the monthly premium?",
      "Thank you for sharing that.",
      "My goal today isn’t necessarily to replace what you have.",
      "It’s simply to make sure your family would have everything they need when that time comes."
    ],
    prompt: {
      goal: "Understand current coverage and position yourself correctly",
      notes: [
        "If they have nothing, acknowledge that gently and move into responsibility.",
        "Find out whether current coverage is really enough."
      ]
    }
  },
  {
    id: 5,
    title: "Legacy Discovery",
    qaRequired: false,
    script: [
      "Now here’s the big question.",
      "One day we are all going to pass away.",
      "Emotionally we’re never ready for that.",
      "But the financial side is something we can prepare for today.",
      "When someone passes away the bills don’t come to us.",
      "They go to the people we love.",
      "So if something happened tomorrow…",
      "who would be responsible for handling those final arrangements?",
      "What is their name?",
      "So everything we’re doing today is really about protecting [BeneficiaryName], correct?"
    ],
    prompt: {
      goal: "Anchor the conversation around the beneficiary",
      notes: [
        "Once they give the name, use it often.",
        "Select the beneficiary path below so the next section is tailored to the relationship."
      ]
    }
  },
  {
    id: 6,
    title: "Family Responsibility",
    qaRequired: false,
    script: [
      "Let me ask you something real quick.",
      "If something happened tomorrow, do you think [BeneficiaryName] would feel comfortable handling the financial responsibility and final arrangements on their own?",
      "Or would that probably be something they would have to figure out unexpectedly while they were grieving?",
      "Pause.",
      "Most people tell me their family would probably have to figure things out as they go, and that can be really stressful for families, especially when they are already grieving.",
      "One thing I’ve learned doing this for a long time is that most people do not worry about themselves. They worry about the people they leave behind.",
      "That is why so many families decide to put something in place ahead of time so the people they love do not have to deal with everything on their own."
    ],
    prompt: {
      goal: "Make the client think about responsibility and emotional ownership in a financial way",
      notes: [
        "This section should feel personal, not scripted.",
        "Use the beneficiary path helper to tailor this section."
      ],
      relationPrompts: {
        generic: [
          "How long have you and [BeneficiaryName] been close?",
          "You can tell when someone really cares about the people in their life."
        ],
        spouse: [
          "How long have you two been together?",
          "What do you appreciate most about them?",
          "That’s exactly why people decide to put something in place so their spouse does not have to deal with everything alone."
        ],
        child: [
          "How many kids do you have?",
          "Do they live nearby or are they spread out?",
          "Parents never stop looking out for their kids. That’s usually why people want to make sure everything is already taken care of."
        ],
        sibling: [
          "Are you two pretty close?",
          "Did you grow up in the same area together?",
          "It sounds like you’ve always looked out for each other."
        ],
        friend: [
          "How long have you known them?",
          "It’s always good to have someone you trust like that in your life."
        ],
        noone: [
          "A lot of people tell me that at first.",
          "Usually someone still ends up handling those arrangements.",
          "Sometimes it’s a niece, nephew, church member, close friend, or whoever the hospital contacts first.",
          "If something happened tomorrow, who do you think would end up being the person responsible for handling everything?",
          "That’s why many people decide to set something aside ahead of time so no one has to figure it out."
        ]
      }
    }
  },
  {
    id: 7,
    title: "Funeral Experience",
    qaRequired: false,
    script: [
      "Let me ask you something real quick [ClientName].",
      "Have you ever had to help arrange a funeral for someone close to you before?",
      "Pause.",
      "Who was that for?",
      "Pause and let them talk.",
      "That must have been a difficult time.",
      "When families go through something like that, they are usually dealing with two things at the same time. The emotional loss of the person, and all the practical things that suddenly have to be handled.",
      "When you went through that experience, do you remember about how quickly the funeral home expected payment?",
      "Pause.",
      "Most people are surprised by that part. A lot of families think the bills come later, but funeral homes usually require payment right away before services can even happen.",
      "When you were going through that situation, do you remember roughly how much everything ended up costing?",
      "Pause.",
      "That sounds about right. Today most funerals end up costing somewhere between fifteen thousand and twenty five thousand dollars depending on the arrangements.",
      "And when families are already grieving, that financial pressure can make the situation even harder.",
      "Let me ask you something.",
      "When that happened, was the money already set aside, or did the family have to come up with it?",
      "Pause.",
      "That’s actually very common.",
      "Most families do not have money specifically set aside for that moment, so the responsibility usually falls on the closest person in the family.",
      "Which is exactly why many people decide to put a small plan in place ahead of time so their family does not have to scramble to figure things out.",
      "Let me ask you this.",
      "If something happened tomorrow, who would most likely be responsible for handling those arrangements for you?",
      "What is their name?",
      "Pause and capture beneficiary.",
      "So everything we are doing here today is really about making sure [BeneficiaryName] is protected when that moment comes."
    ],
    prompt: {
      goal: "Connect a past funeral experience to the present need",
      notes: [
        "Let them talk here.",
        "This section should feel human, not rushed."
      ]
    }
  },
  {
    id: 8,
    title: "Protection Gap",
    qaRequired: false,
    script: [
      "Let me ask you something.",
      "Do you happen to know about how much a funeral costs where you live today?",
      "Pause.",
      "Most families do not.",
      "Once you add up the funeral home, service, transportation, death certificates, cemetery or cremation costs, it can easily reach fifteen thousand dollars or more.",
      "Would you rather have [BeneficiaryName] responsible for coming up with that money when the time comes, or would you prefer having something already set aside so everything is handled?"
    ],
    prompt: {
      goal: "Create the financial problem clearly",
      notes: [
        "This is where you can finally bring money into the conversation."
      ]
    }
  },
  {
    id: 9,
    title: "Personal Story",
    qaRequired: false,
    script: [
      "This actually became very personal for me.",
      "I lost my father, and I have also experienced something no parent ever expects.",
      "I lost my daughter.",
      "Going through those moments showed me how overwhelming things can be for families.",
      "When someone passes away the emotional loss is already extremely difficult. But families also suddenly face paperwork, phone calls, and thousands of dollars in expenses.",
      "Funeral homes expect payment immediately. Hospitals expect payment immediately.",
      "Imagine [BeneficiaryName] in that moment. They are already grieving but instead of focusing on remembering you they are trying to figure out how to pay for everything.",
      "But imagine a different situation.",
      "Imagine [BeneficiaryName] sitting at the same table with peace of mind because everything is already taken care of.",
      "That is what this plan is really about. Protecting the people you love."
    ],
    prompt: {
      goal: "Build emotional weight and credibility",
      notes: [
        "Slow down here.",
        "Let this land. Do not rush to the next line."
      ]
    }
  },
  {
    id: 10,
    title: "Burial Discovery",
    qaRequired: false,
    script: [
      "When the time eventually comes, have you thought about whether you would prefer burial or cremation?",
      "Pause.",
      "What made you lean toward that option?",
      "Pause.",
      "That makes sense.",
      "Most traditional burials today cost between fifteen thousand and twenty five thousand dollars.",
      "Cremation is usually less expensive but still ranges between five thousand and ten thousand dollars depending on services.",
      "Would you want [BeneficiaryName] responsible for paying those expenses out of pocket, or would you rather have something already set aside for them?"
    ],
    prompt: {
      goal: "Make costs feel real and personal",
      notes: [
        "Use their answer to personalize the value."
      ]
    }
  },
  {
    id: 11,
    title: "Credentials",
    qaRequired: true,
    script: [
      "Before we move forward I want to make sure you have my information.",
      "My name again is [AdvisorName].",
      "You can reach me directly at [AdvisorPhone].",
      "My National Producer Number is [AdvisorNPN].",
      "If you ever want to verify my credentials you can look up my NPN online."
    ],
    prompt: {
      goal: "Build trust before moving into company information",
      notes: [
        "Keep this clean and professional."
      ]
    }
  },
  {
    id: 12,
    title: "EMC Introduction",
    qaRequired: false,
    script: [
      "The company I am really hoping we can get you qualified for today is EMC National Life Company.",
      "They are located in Des Moines, Iowa and have been around for over one hundred years.",
      "One thing people really like about this plan is there are no medical exams, no needles, and no doctor visits required."
    ],
    prompt: {
      goal: "Create confidence in the carrier",
      notes: [
        "This should feel reassuring."
      ]
    }
  },
  {
    id: 13,
    title: "GIACT Disclosure",
    qaRequired: true,
    script: [
      "Now I just need to play a quick disclosure.",
      "PLAY GIACT DISCLOSURE",
      "Do I have your permission to continue?"
    ],
    prompt: {
      goal: "Handle required disclosure cleanly",
      notes: [
        "Do not paraphrase if QA requires exact wording."
      ]
    }
  },
  {
    id: 14,
    title: "EasyLife QA",
    qaRequired: true,
    script: [
      "Now, after we're able to verify the approval factors, I hope you will qualify for either the Easy Life Plan that pays the entire face amount right away from day one, or the Graded Plan, which also pays the full face amount after two years.",
      "I am really hoping I can get you day one coverage over a two year wait.",
      "I am sure that is what you would like, right?"
    ],
    prompt: {
      goal: "Frame the preferred approval outcome",
      notes: [
        "Read verbatim."
      ]
    }
  },
  {
    id: 15,
    title: "Graded QA",
    qaRequired: true,
    script: [
      "Now, after we're able to verify the approval factors, I hope you will qualify for the Graded Plan, which pays the full face amount from day one due to accidental death, and after two years and a day for natural causes.",
      "If you passed away during the first year it would pay 110 percent of your paid premiums.",
      "During the second year it would pay 120 percent of your paid premiums.",
      "So either way you will be better protected from day one with this plan, which is great right?"
    ],
    prompt: {
      goal: "Explain the graded structure clearly",
      notes: [
        "Read verbatim."
      ]
    }
  },
  {
    id: 16,
    title: "EMC Decline",
    qaRequired: true,
    script: [
      "PLAY THE EMC DECLINE DISCLOSURE",
      "Unfortunately it appears we will not be able to get you approved with EMC.",
      "But I might still have some other options. Let me see what we can do."
    ],
    prompt: {
      goal: "Handle the decline cleanly and preserve momentum",
      notes: [
        "Do not sound defeated here."
      ]
    }
  },
  {
    id: 17,
    title: "Eternal Legacy Script",
    qaRequired: true,
    script: [
      "This is great [ClientName], based on the answers to the questions we just went over, the plan you can qualify for is Eternal Legacy, underwritten by Monitor Life Insurance Company of New York.",
      "This is a guaranteed acceptance group term life insurance plan.",
      "Since you have already answered the health questions, there are no additional medical exams or tests required, and this coverage will stay in force until age 95 as long as your premiums are paid and your group policy stays in force.",
      "This coverage pays the full amount from day one due to accidental death, and after two years and a day for natural causes.",
      "If you pass away during the first two years all paid premiums will be returned to the beneficiary.",
      "So either way you will be better protected from day one with this plan, which is great right?"
    ],
    prompt: {
      goal: "Present the fallback product with confidence",
      notes: [
        "Read verbatim."
      ]
    }
  },
  {
    id: 18,
    title: "AFEUSA Disclosure",
    qaRequired: true,
    script: [
      "This is a membership package offer that includes Guaranteed Acceptance Group Term Life Insurance along with other benefits and services associated with AFEUSA membership.",
      "As a member of AFEUSA you will be entitled to valuable non insurance benefits such as health and wellness programs, savings on medications, identity theft investigation services, and many other services.",
      "Benefits vary by state, and the membership brochure you receive will provide complete details."
    ],
    prompt: {
      goal: "Handle the membership disclosure",
      notes: [
        "Read verbatim."
      ]
    }
  },
  {
    id: 19,
    title: "Accelerated Death Benefit",
    qaRequired: false,
    script: [
      "One additional feature included after the second year is the Accelerated Death Benefit.",
      "If you are diagnosed with a terminal illness with 24 months or less to live, the company can send you up to seventy five percent of the coverage amount while you are still living.",
      "The remaining twenty five percent would then be paid to your beneficiary when you pass away."
    ],
    prompt: {
      goal: "Add value right before the trial close",
      notes: [
        "This is a feature section, not a pressure section."
      ]
    }
  },
  {
    id: 20,
    title: "Trial Close",
    qaRequired: false,
    script: [
      "Before we look at the numbers let me ask you something.",
      "If I can find a plan that fits comfortably into your budget today, is there any reason you would not want to get [BeneficiaryName] protected right now?"
    ],
    prompt: {
      goal: "Surface hidden objections before price",
      notes: [
        "Listen carefully to the answer."
      ]
    }
  },
  {
    id: 21,
    title: "Price Presentation",
    qaRequired: false,
    script: [
      "Please grab a pen and paper.",
      "I am going to show you three options so you can choose what makes the most sense for you.",
      "Option one.",
      "Option two.",
      "Option three."
    ],
    prompt: {
      goal: "Frame the close as a choice, not a yes or no",
      notes: [
        "Present with confidence.",
        "Use your actual price options live."
      ]
    }
  },
  {
    id: 22,
    title: "Decision Close",
    qaRequired: false,
    script: [
      "So tell me [ClientName].",
      "When that day comes, which check would you want [BeneficiaryName] to receive?",
      "Pause."
    ],
    prompt: {
      goal: "Bring them back to the emotional reason for acting now",
      notes: [
        "Then move into the sale."
      ]
    }
  },
  {
    id: 23,
    title: "Rehash",
    qaRequired: false,
    script: [
      "Congratulations.",
      "Everything is set.",
      "Your monthly premium will be $[Premium].",
      "Your payment will draft on the [DraftDate].",
      "If you ever need assistance you can reach me directly at [AdvisorPhone]."
    ],
    prompt: {
      goal: "Confirm the details confidently",
      notes: [
        "Use the policy detail fields in the top bar."
      ]
    }
  },
  {
    id: 24,
    title: "Master Rebuttals",
    qaRequired: false,
    script: [
      "Use the objection search and favorites panel on the right to pull the best rebuttal for the objection you hear.",
      "Keep your delivery calm, lower resistance, and move back into the sale."
    ],
    prompt: {
      goal: "Use rebuttals without sounding argumentative",
      notes: [
        "Acknowledge. Isolate. Reframe. Redirect. Assume the move."
      ]
    }
  }
];