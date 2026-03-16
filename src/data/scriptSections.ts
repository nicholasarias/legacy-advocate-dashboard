const productOutcomeChoices = {
  "easy-life": {
    label: "EMC Easy Life",
    description: "Use this when the client clears EMC for the top tier Easy Life route."
  },
  "emc-graded": {
    label: "EMC Graded",
    description: "Use this when the client stays with EMC but lands in the graded route."
  },
  "eternal-legacy": {
    label: "Eternal Legacy",
    description: "Use this when EMC is out but Eternal Legacy is still available."
  },
  "no-option": {
    label: "No Option",
    description: "Use this when EMC is out and Eternal Legacy is not available."
  }
};

type ProductOutcomeKey = keyof typeof productOutcomeChoices;

function createProductOutcomeOption<T extends Record<string, unknown>>(
  value: ProductOutcomeKey,
  extra: T = {} as T
) {
  return {
    value,
    label: productOutcomeChoices[value].label,
    description: productOutcomeChoices[value].description,
    ...extra
  };
}

export const scriptSections = [
  {
    id: 1,
    title: "Introduction",
    qaRequired: false,
    script: [
      "Hello [ClientName], thank you for speaking with me today.",
      "Before we get started, I do need to let you know this call may be recorded for quality and training purposes. That makes sense, right?",
      "Allow me to introduce myself, my name is [AdvisorName], and I'm a Senior Licensed Life Insurance Advisor here with Insurance Supermarket.",
      "To touch on that briefly, we're a one-stop shop for life insurance, which is great for you because I'm licensed in [ClientState] to shop multiple carriers at once.",
      "Instead of you calling several companies yourself, I compare them all and find the best option for your situation.",
      "Saves you a lot of time, doesn't it?",
      "Now, all the plans we work with are final expense policies that have been state-approved and designed specifically for folks over the age of 50.",
      "As we go through this I'll explain everything step-by-step, and if anything doesn't make sense just stop me and I'll clarify it.",
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
    title: "Warm Discovery",
    qaRequired: false,
    script: [
      "I noticed you're in [ClientState]. Born and raised, or did you move there at some point?",
      "[Insert your own here]",
      "Is most of your family nearby, or are they spread out these days?",
      "What do you enjoy most about living there?"
    ],
    prompt: {
      goal: "Get them talking early and create a calm, natural tone",
      notes: [
        "Let them talk for 30 to 60 seconds before steering the call.",
        "Listen for family support, pace of life, and emotional hooks you can revisit later."
      ]
    }
  },
  {
    id: 3,
    title: "Coverage Snapshot",
    qaRequired: false,
    script: [
      "Let me ask you this so I know how to help you best.",
      "Do you already have any life insurance or final expense coverage in place right now?"
    ],
    branchControl: {
      stateKey: "coverageStatus",
      label: "Coverage Direction",
      helpText: "Pick the path that matches the answer and the follow-up lines will adjust.",
      options: [
        {
          value: "has-coverage",
          label: "Has Coverage",
          description: "Use this when they already have some protection in force.",
          script: [
            "Who is that policy with?",
            "About how much coverage is it?",
            "About how much is the monthly premium?",
            "What did you want that policy to take care of for your family?",
            "That helps. My job today isn't to tear apart what you already did. It's to see whether there's still a gap that could land on your family."
          ],
          helperLines: [
            "Get the reason they bought it, not just the numbers.",
            "If they are proud of what they have, validate that first before talking about gaps."
          ],
          promptNotes: [
            "Find the original buying reason so you can tie back to it later."
          ]
        },
        {
          value: "no-coverage",
          label: "No Coverage",
          description: "Use this when they do not have anything in place yet.",
          script: [
            "That is very common.",
            "Was it something you meant to handle, or did life just keep moving?",
            "What is usually the main reason people put it off, in your case?",
            "I appreciate you being honest. That gives me a clear place to start."
          ],
          helperLines: [
            "Let them explain without judgment.",
            "People will usually give you the real objection if you sound curious instead of pushy."
          ],
          promptNotes: [
            "Do not rush to fix it. Let them explain why it never got handled."
          ]
        }
      ]
    },
    prompt: {
      goal: "Learn whether you are filling a gap or starting from zero",
      notes: [
        "Ask this plainly. The less sales language here, the better.",
        "This answer should shape the rest of the call."
      ]
    }
  },
  {
    id: 4,
    title: "Responsibility Anchor",
    qaRequired: false,
    script: [
      "If something happened down the road, who would actually be the person making the calls and handling everything?",
      "What is their name?",
      "What is your relationship to them?",
      "So if that day ever came, [BeneficiaryName] would be the one carrying all of that.",
      "That's who I want us thinking about as we go through this."
    ],
    prompt: {
      goal: "Lock onto the one real person who would have to carry the burden",
      notes: [
        "Slow down after they say the name.",
        "Once you have the name, keep bringing the conversation back to that person."
      ]
    }
  },
  {
    id: 5,
    title: "Beneficiary Lens",
    qaRequired: false,
    script: [
      "Tell me a little about [BeneficiaryName].",
      "I want to understand the person this would really fall on."
    ],
    branchControl: {
      stateKey: "relationType",
      label: "Relationship Direction",
      helpText: "Choose the relationship so the follow-up stays personal instead of generic.",
      options: [
        {
          value: "spouse",
          label: "Spouse",
          description: "Use when the beneficiary is a spouse or partner.",
          script: [
            "How long have you two been together?",
            "What do you appreciate most about them?",
            "If something happened to you, what do you think that day would feel like for them?",
            "That's exactly why people put something in place, so their spouse isn't grieving and trying to figure everything out alone."
          ],
          helperLines: [
            "Spouse conversations land best when they feel steady, warm, and protective."
          ],
          promptNotes: [
            "Get them talking about the relationship first, then bring it back to the burden."
          ]
        },
        {
          value: "child",
          label: "Child",
          description: "Use when the burden would fall on a son or daughter.",
          script: [
            "Do they live nearby or would they have to drop everything and come in?",
            "What kind of person are they when the family needs something handled?",
            "If this landed on them, they'd be trying to hold it together and handle everything at the same time.",
            "Parents never stop trying to make things easier on their kids. That's usually why this matters so much."
          ],
          helperLines: [
            "This path works best when you keep the tone protective, not guilty."
          ],
          promptNotes: [
            "Let them describe the child. That creates stronger ownership than you explaining it for them."
          ]
        },
        {
          value: "sibling",
          label: "Sibling",
          description: "Use when a brother or sister would be the one handling things.",
          script: [
            "Have you two always been pretty close?",
            "If this landed on them tomorrow, do you think they'd handle it calmly, or would it hit them pretty hard?",
            "When it's someone you've been through life with, most people want to leave things easier, not heavier."
          ],
          helperLines: [
            "Keep this path practical and familiar. Sibling conversations usually land better with realism than sentiment."
          ]
        },
        {
          value: "friend",
          label: "Friend / Other",
          description: "Use when the trusted person is a friend, partner, or someone outside the immediate family.",
          script: [
            "How long have you known them?",
            "What makes them the person you'd trust with something this important?",
            "If this fell on them, they'd be stepping in because they care about you.",
            "Most people don't want that kindness to turn into a burden."
          ],
          helperLines: [
            "This path is strongest when you validate the trust before talking about the burden."
          ]
        },
        {
          value: "noone",
          label: "No One",
          description: "Use when they initially say nobody would be responsible.",
          script: [
            "A lot of people say that at first.",
            "Usually someone still ends up being the person the calls fall on.",
            "It might be a niece, nephew, church friend, neighbor, or whoever steps in first.",
            "Who do you think would realistically be the one trying to handle it?",
            "That's the person we need to keep in mind."
          ],
          helperLines: [
            "Do not argue. Just help them think through who would actually get the phone calls."
          ],
          promptNotes: [
            "Keep this calm. If you sound confrontational, they will shut down."
          ]
        }
      ]
    },
    prompt: {
      goal: "Turn the beneficiary into a real person with a real life that would be interrupted",
      notes: [
        "Use the relationship buttons to keep the follow-up specific.",
        "This section should feel personal, not generic."
      ]
    }
  },
  {
    id: 6,
    title: "Experience Path",
    qaRequired: false,
    script: [
      "Let me ask you something important.",
      "Have you ever had to help with a funeral or final arrangements for someone close to you?"
    ],
    branchControl: {
      stateKey: "funeralExperience",
      label: "Experience Direction",
      helpText: "Choose whether they have lived through this before or would be imagining it for the first time.",
      options: [
        {
          value: "handled",
          label: "Handled One",
          description: "Use this when they have helped with a funeral before.",
          script: [
            "Who was that for?",
            "What part of that day stayed with you the most?",
            "Was the family grieving and still trying to make decisions, or had some of it already been figured out?",
            "Was the money side already handled, or did people have to come up with it quickly?",
            "That's the part families remember. It's emotional, and it's a lot of pressure all at once."
          ],
          helperLines: [
            "Let them tell the story. This is where your call length should come from.",
            "Do not interrupt too quickly. The emotion is stronger when it comes from them."
          ],
          promptNotes: [
            "Keep them in the memory long enough to feel the pressure without turning it into a monologue from you."
          ]
        },
        {
          value: "no-experience",
          label: "No Experience",
          description: "Use this when they have never had to handle a funeral directly.",
          script: [
            "Most people haven't until it lands in their lap out of nowhere.",
            "And that's what I'm getting at here.",
            "Can you picture [BeneficiaryName] trying to answer questions from the funeral home, family, and everybody else while they're still grieving?",
            "Do you think they'd know exactly what you want and how you'd want everything handled?",
            "That's a lot to put on one person all at once."
          ],
          helperLines: [
            "Make them picture the confusion, not just the cost.",
            "This path works best when your tone is calm and matter-of-fact."
          ]
        }
      ]
    },
    prompt: {
      goal: "Make them either relive the pressure or picture it clearly for the first time",
      notes: [
        "This section should feel human, not theatrical.",
        "The story should come from them, not from you."
      ]
    }
  },
  {
    id: 7,
    title: "Burden Clarifier",
    qaRequired: false,
    script: [
      "When that day comes, [BeneficiaryName] isn't just getting one bill and making one phone call.",
      "They're getting hit with decisions before they've even had time to breathe.",
      "It's the funeral home, transportation, paperwork, death certificates, family questions, and figuring out what gets paid first.",
      "So the real question isn't whether [BeneficiaryName] would show up.",
      "It's whether they'd have to carry all of that while they're grieving.",
      "If that happened tomorrow, would they already have money set aside for it, or would they be scrambling to pull it together in the middle of all that?"
    ],
    branchControl: {
      stateKey: "fundingStatus",
      label: "Money Direction",
      helpText: "Use this after they tell you whether money is already earmarked for the problem.",
      options: [
        {
          value: "set-aside",
          label: "Money Set Aside",
          description: "Use when they say there is already money available.",
          script: [
            "That's good planning.",
            "But is that money truly set aside for that day, or is it the same money your family might need for travel, bills, or time off work too?",
            "Because when one pot of money has to do everything, [BeneficiaryName] still ends up under pressure trying to decide what gets paid first.",
            "That's where people realize general savings and protected money aren't always the same thing."
          ],
          helperLines: [
            "Do not attack their savings. Just help them see that general money is not always protected money."
          ],
          promptNotes: [
            "Your job here is to create doubt about whether the funds are truly dedicated."
          ]
        },
        {
          value: "would-scramble",
          label: "Would Scramble",
          description: "Use when they admit the family would have to figure it out in the moment.",
          script: [
            "That's what most families face.",
            "It isn't because they don't care. It's because everything hits at once.",
            "And once those calls start coming in, [BeneficiaryName] is the one trying to hold it together and figure out the money at the same time.",
            "That's why even a simple plan can completely change what that day looks like for them."
          ],
          helperLines: [
            "This is a good moment to slow down and let the reality sink in."
          ]
        }
      ]
    },
    prompt: {
      goal: "Shift the picture from emotion alone to the real pressure of that day",
      notes: [
        "Stay conversational. Let them answer before you frame it for them.",
        "Keep the focus on what [BeneficiaryName] would be carrying in that moment.",
        "This is where the scene starts feeling real."
      ]
    }
  },
  {
    id: 8,
    title: "Arrangement Fit",
    qaRequired: false,
    script: [
      "Let me ask you this. If [BeneficiaryName] had to make those arrangements tomorrow, would they know whether you'd want burial, cremation, or something simple?"
    ],
    branchControl: {
      stateKey: "arrangementPreference",
      label: "Arrangement Direction",
      helpText: "Choose the arrangement path that matches their answer.",
      options: [
        {
          value: "burial",
          label: "Burial",
          description: "Use when they prefer a traditional burial.",
          script: [
            "Traditional burial is usually the more expensive route.",
            "So if that's what you want, I don't want [BeneficiaryName] finding that out in the middle of grief and then wondering how they're going to pay for it.",
            "Do they already know that's what you'd want?",
            "And would the money already be there to carry it out the way you'd want?"
          ],
          helperLines: [
            "Use their own preference to make the cost feel real without lecturing."
          ]
        },
        {
          value: "cremation",
          label: "Cremation",
          description: "Use when they prefer cremation or a simpler service.",
          script: [
            "Cremation can be less expensive, but once you add the service, transportation, paperwork, and everything around it, it still becomes real money fast.",
            "If that's your preference, I want [BeneficiaryName] knowing that ahead of time instead of making guesses under pressure.",
            "Do they already know that's what you'd want?",
            "Even the simpler option is a lot easier on family when the money side is already handled."
          ],
          helperLines: [
            "Do not let the lower cost remove urgency. Simpler does not mean free."
          ]
        },
        {
          value: "not-sure",
          label: "Not Sure",
          description: "Use when they have not made up their mind or have never talked about it.",
          script: [
            "That's common.",
            "But when nothing's decided, [BeneficiaryName] is the one left trying to guess what you'd have wanted while everyone's emotional and looking at them for answers.",
            "Then on top of that, they're still trying to figure out what they can afford to do.",
            "That's exactly the kind of situation I'm trying to keep [BeneficiaryName] out of."
          ],
          helperLines: [
            "This path is about confusion and decision fatigue, not just price."
          ]
        }
      ]
    },
    prompt: {
      goal: "Make the burden concrete by tying it to the actual choices family would face",
      notes: [
        "Keep this practical and personal.",
        "Tie the arrangement choice back to what [BeneficiaryName] would be trying to handle.",
        "This is where the scene becomes real, not abstract."
      ]
    }
  },
  {
    id: 9,
    title: "Why It Matters",
    qaRequired: false,
    script: [
      "The reason I'm asking you all of this isn't to make the conversation heavy.",
      "It's because I want you to picture [BeneficiaryName] trying to answer questions, make calls, sign papers, and come up with the money while they're still trying to process losing you.",
      "That isn't just a bill. That's pressure, confusion, and heartbreak all hitting them at once.",
      "What I'm trying to protect [BeneficiaryName] from is having to grieve and carry all of that at the same time."
    ],
    branchControl: {
      stateKey: "coverageStatus",
      label: "Need Summary",
      helpText: "Reuse the earlier coverage answer so the summary matches their situation.",
      options: [
        {
          value: "has-coverage",
          label: "Has Coverage",
          description: "Use when the call is about confirming or filling a gap in existing coverage.",
          script: [
            "You already did something responsible by putting coverage in place.",
            "What I need to figure out now is whether it fully protects [BeneficiaryName] in that moment, or whether there's still a gap that leaves them exposed.",
            "Because if there's a gap, they're still the one standing there grieving, making calls, and trying to figure out how to cover the rest.",
            "I'd rather help you close that now than leave them carrying it later under that kind of pressure."
          ],
          helperLines: [
            "This keeps their dignity intact while giving you room to position additional protection."
          ]
        },
        {
          value: "no-coverage",
          label: "No Coverage",
          description: "Use when they have not put anything in place yet.",
          script: [
            "You haven't ignored this because you don't care. Most people just don't feel the weight of it until they picture exactly who it would fall on.",
            "Now that we've talked it through, you can see what [BeneficiaryName] would really be walking into.",
            "And I don't want them grieving, getting hit with questions, and scrambling to find the money all in the same moment.",
            "If I can help you put something simple in place that takes that burden off of them, that's worth looking at."
          ],
          helperLines: [
            "Keep the tone constructive. Shame will kill momentum."
          ]
        }
      ]
    },
    prompt: {
      goal: "Make the protection pivot explicit before you move into permission",
      notes: [
        "This is the big-picture pivot.",
        "Paint the moment: calls, paperwork, decisions, and money while they're grieving.",
        "Say plainly what you're trying to protect the beneficiary from."
      ]
    }
  },
  {
    id: 10,
    title: "Permission to Solve It",
    qaRequired: false,
    script: [
      "So let me ask you this.",
      "If I can help you put something in place that fits your budget and keeps [BeneficiaryName] from having to carry all of that alone, would you be open to looking at it today?",
      "Because that's really what we're solving for."
    ],
    prompt: {
      goal: "Get agreement on the big-picture reason to move forward",
      notes: [
        "Get a real answer before you move on.",
        "If there is hesitation here, isolate it before entering the next phase."
      ]
    }
  },
  {
    id: 11,
    title: "Trust Bridge",
    qaRequired: false,
    script: [
      "[ClientName], I can see how much you care about your family, and it's clear you don't want them left carrying this burden.",
      "Now that I understand your situation, my goal is to see if we can get you qualified for one of the preferred plans. These plans aren't available to everyone, but if you do qualify, you'll be in great hands.",
      "While I pull that up, go ahead and grab a pen and paper and let me know when you are ready.",
      "I'm going to walk you through everything, step by step, so you know exactly what you're getting.",
      "My name again is [AdvisorName].",
      "My direct line, if you have any questions or if there's anything I can help with, is [AdvisorPhone].",
      "My National Producer Number is [AdvisorNPN]. If you ever need to verify my credentials, that number is the easiest way to do it."
    ],
    prompt: {
      goal: "Build trust and set up the qualification phase",
      notes: [
        "This is not QA. Deliver it like a calm confidence bridge.",
        "Keep the tone warm, not theatrical."
      ]
    }
  },
  {
    id: 12,
    title: "EMC Introduction",
    qaRequired: false,
    script: [
      "The company I'm really hoping we can get you qualified for today is EMC National Life Company.",
      "They are located in Des Moines, Iowa and have been around for over one hundred years, and they carry a strong reputation.",
      "One thing people really like about this plan is there aren't any medical exams, needles, or doctor visits required. Everything is done from the comfort of your own home. Pretty nice, huh?",
      "As your licensed advisor, I just have a few simple questions to help determine which plan best fits your needs.",
      "And as long as you answer each question to the best of your knowledge, we should be in good shape.",
      "But before we can get to the medical questions, I just need to know a few things."
    ],
    prompt: {
      goal: "Create confidence in EMC and set up the medical questions",
      notes: [
        "This should feel reassuring.",
        "Move to the application flow after this section."
      ]
    }
  },
  {
    id: 13,
    title: "GIACT Disclosure / Med Questions",
    qaRequired: true,
    script: [
      "Thank you for verifying those details.",
      "Now I just need to play a quick disclosure in order to proceed to the medical questions for us to determine your qualification factors.",
      "So, I just need to play this and then ask you a question right after, okay?",
      "Now I will just ask some simple yes or no medical questions.",
      "The important part is for you to respond honestly with a clear Yes with an S sound or No with an O sound, so I can take down your answers accurately.",
      "You ready?"
    ],
    prompt: {
      goal: "Handle the disclosure and move into the qualification questions cleanly",
      notes: [
        "Do not paraphrase if QA requires exact wording.",
        "The medical notes workspace will help you summarize conditions and prescriptions for the next step."
      ]
    }
  },
  {
    id: 14,
    title: "Medical Review Response",
    qaRequired: false,
    script: [
      "Use the direction below to match what came up in the medical questions."
    ],
    branchControl: {
      stateKey: "medicalReview",
      replaceBaseOnSelect: true,
      label: "Medical Review",
      helpText: "Choose whether medical history came up so the bridge matches the call.",
      options: [
        {
          value: "medical-history",
          label: "History Exists",
          description: "Use when conditions or prescriptions came up and you want to acknowledge them before routing.",
          script: [
            "So [ClientLastName], first of all, thank you for those answers.",
            "And I appreciate your honesty with those questions. I know this can be a lot to talk through, and I want you to know that I'm here to help you.",
            "Typically, [MedicalSummary] can make some insurance companies more cautious.",
            "But the good news is I still have some strong options that may be able to get you covered today despite that."
          ],
          helperLines: [
            "Keep this steady. You are creating urgency without sounding negative.",
            "Use the medical workspace to note the conditions and prescriptions you want referenced here."
          ],
          promptNotes: [
            "Avoid saying red flag. Cautious lands better."
          ]
        },
        {
          value: "no-history",
          label: "No Issues",
          description: "Use when nothing concerning came up in the medical review.",
          script: [
            "So [ClientLastName], first of all, thank you for those answers.",
            "And I appreciate your honesty with those questions. I know you've been thinking about this, and I want you to know that I'm here to help you.",
            "That's exactly why we're going to get this handled today if everything lines up the way it should."
          ],
          helperLines: [
            "This is where you start leaning into momentum and same-day action."
          ]
        }
      ]
    },
    prompt: {
      goal: "Acknowledge the answers and set up urgency before the qualification route",
      notes: [
        "Keep this warm and helpful.",
        "This is the emotional bridge into the product outcome."
      ]
    }
  },
  {
    id: 15,
    title: "Product Route",
    qaRequired: false,
    script: [
      "Use the route below that matches the qualification decision."
    ],
    branchControl: {
      stateKey: "productOutcome",
      replaceBaseOnSelect: true,
      label: "Product Route",
      helpText: "Pick the product route that applies: Easy Life, EMC Graded, Eternal Legacy, or No Option.",
      options: [
        createProductOutcomeOption("easy-life", {
          script: [
            "EMC Easy Life route selected."
          ],
          helperLines: [
            "Use this when the client clears the EMC day-one route."
          ]
        }),
        createProductOutcomeOption("emc-graded", {
          script: [
            "EMC Graded route selected."
          ],
          helperLines: [
            "Use this when EMC still works but the graded route is the right fit."
          ]
        }),
        createProductOutcomeOption("eternal-legacy", {
          script: [
            "Eternal Legacy route selected."
          ],
          helperLines: [
            "Use this when EMC is out but Eternal Legacy is still available."
          ]
        }),
        createProductOutcomeOption("no-option", {
          script: [
            "No-option route selected."
          ],
          helperLines: [
            "Use this when there is no same-day product route available."
          ]
        })
      ]
    },
    prompt: {
      goal: "Make the product route explicit before you move deeper into the close",
      notes: [
        "This is the key routing decision for the rest of the dashboard.",
        "If the route changes, come back here and switch it."
      ]
    }
  },
  {
    id: 16,
    title: "EMC QA Route",
    qaRequired: true,
    script: [
      "Select the EMC route in the prior section to load the correct QA language."
    ],
    branchControl: {
      stateKey: "productOutcome",
      display: false,
      replaceBaseOnSelect: true,
      options: [
        createProductOutcomeOption("easy-life", {
          script: [
            "Now, after we're able to verify the approval factors, I hope you will qualify for either the Easy Life Plan that pays the entire face amount right away from day one, or the Graded Plan, which also pays the full face amount after two years.",
            "I'm really hoping I can get you day one coverage over a two year wait.",
            "I'm sure that's what you'd like, right?"
          ]
        }),
        createProductOutcomeOption("emc-graded", {
          script: [
            "Now, after we're able to verify the approval factors, I hope you will qualify for the Graded Plan, which pays the full face amount from day one due to accidental death, and after two years and a day for natural causes.",
            "If you passed away during the first year it would pay 110 percent of your paid premiums.",
            "During the second year it would pay 120 percent of your paid premiums.",
            "So either way you will be better protected from day one with this plan, which is great right?"
          ]
        }),
        createProductOutcomeOption("eternal-legacy", {
          script: [
            "This EMC QA section is not used for the Eternal Legacy route. Move to the next applicable section."
          ]
        }),
        createProductOutcomeOption("no-option", {
          script: [
            "There is no EMC QA route on a no-option path. Move ahead to the wrap-up steps."
          ]
        })
      ]
    },
    prompt: {
      goal: "Read the route-specific EMC QA language before you deliver the qualification result",
      notes: [
        "This is the anticipation step.",
        "Read the Easy Life or Graded wording verbatim when it applies."
      ]
    }
  },
  {
    id: 17,
    title: "Qualification Outcome",
    qaRequired: false,
    script: [
      "Select the current route to load the qualification result."
    ],
    branchControl: {
      stateKey: "productOutcome",
      display: false,
      replaceBaseOnSelect: true,
      options: [
        createProductOutcomeOption("easy-life", {
          script: [
            "Okay, [ClientName], I finished checking everything over, and I've got some really good news.",
            "It looks like you may qualify for EMC Easy Life, which is one of the top tier routes we talked about.",
            "That's exactly what I was hoping to see for you."
          ]
        }),
        createProductOutcomeOption("emc-graded", {
          script: [
            "Okay, [ClientName], I finished checking everything over, and I do have some good news.",
            "EMC can still work for you, and the route that's available is the EMC Graded plan.",
            "The important thing is we still have a path to put protection in place today."
          ]
        }),
        createProductOutcomeOption("eternal-legacy", {
          script: [
            "Okay, [ClientName], I finished checking everything over.",
            "EMC isn't going to be the fit, but the good news is I do still have another option I can walk you through today.",
            "So we're not out of options here."
          ]
        }),
        createProductOutcomeOption("no-option", {
          script: [
            "Okay, [ClientName], I finished checking everything over, and I want to be straight with you.",
            "Right now I don't have a same-day option I can put in front of you.",
            "So I don't want to force something that isn't there."
          ]
        })
      ]
    },
    prompt: {
      goal: "Build anticipation and then deliver the result clearly",
      notes: [
        "The QA should make the reveal feel earned.",
        "This is where the client hears the good news."
      ]
    }
  },
  {
    id: 18,
    title: "Eternal Legacy Package",
    qaRequired: true,
    script: [
      "Select Eternal Legacy in the prior section to load the combined script and membership disclosure."
    ],
    branchControl: {
      stateKey: "productOutcome",
      display: false,
      replaceBaseOnSelect: true,
      options: [
        createProductOutcomeOption("easy-life", {
          script: [
            "This section is only used for Eternal Legacy. Stay on the EMC route and move to the next applicable section."
          ]
        }),
        createProductOutcomeOption("emc-graded", {
          script: [
            "This section is only used for Eternal Legacy. Stay on the EMC route and move to the next applicable section."
          ]
        }),
        createProductOutcomeOption("eternal-legacy", {
          script: [
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
        }),
        createProductOutcomeOption("no-option", {
          script: [
            "There is no Eternal Legacy package available on this route. Move ahead to the wrap-up steps."
          ]
        })
      ]
    },
    prompt: {
      goal: "Handle the combined Eternal Legacy and AFEUSA route in one place",
      notes: [
        "Read this combined route verbatim when Eternal Legacy is the selected outcome.",
        "If the route is EMC or no-option, skip this section."
      ]
    }
  },
  {
    id: 19,
    title: "Product Reinforcement",
    qaRequired: false,
    script: [
      "Select the route in the prior section to load the right reinforcement language."
    ],
    branchControl: {
      stateKey: "productOutcome",
      display: false,
      replaceBaseOnSelect: true,
      options: [
        createProductOutcomeOption("easy-life", {
          script: [
            "Now [ClientName], as you know, taking a medical exam is usually mandatory to get the best life insurance plans and lowest rates, but not here.",
            "As long as you're able to qualify for this plan, I promise, you won't have to go to any medical appointments or get poked by a needle for blood work, okay?",
            "We just check with your doctor and the pharmacy, so that makes it pretty simple, doesn't it?",
            "This plan also builds cash value over time that can be used to automatically pay missed premiums if necessary, you can borrow against it, or just take the cash out if you ever need a little extra money since it's like a savings account.",
            "Also, the coverage never expires, so as long as the premiums are paid, you can feel good about having long term protection and knowing this money is going directly to your family tax-free when a claim is made.",
            "On top of it all, we pay most claims immediately, usually within 48 hours of a completed submission.",
            "The reason we do that is because when you leave this world, it'll already be one of the hardest days in your family's life. They shouldn't be left waiting on help.",
            "So [ClientName], we provide that money to your family the same way you would if you were still there for them.",
            "And that's all. It's really that easy.",
            "And [ClientName], it looks like you also qualified for the Terminal Illness Rider we spoke about, which is great.",
            "If you're diagnosed with a terminal illness, the company can send you a check for up to 75 percent of your coverage amount, so you can take care of everything yourself while you're still living, which is great, isn't it?",
            "Do you have any questions about the coverage before we get into the numbers?",
            "If at any time you have any questions about the policy or the benefits, I want you to know that I'll always be here to help you in any way I can. So please, keep my number in a safe place, because that'll be the easiest way for you to reach me, okay?",
            "And in my professional opinion, this plan can cover what you need.",
            "As a new customer, I first and foremost want to make sure we find something that's affordable and comfortable for you right now, because you may not qualify for this plan or these rates again if your health changes.",
            "And the premiums will also never be more affordable than they are now, especially with all those additional benefits included."
          ],
          helperLines: [
            "Easy Life gets the shared EMC benefits plus the terminal illness rider."
          ]
        }),
        createProductOutcomeOption("emc-graded", {
          script: [
            "Now [ClientName], as you know, taking a medical exam is usually mandatory to get the best life insurance plans and lowest rates, but not here.",
            "As long as you're able to qualify for this plan, I promise, you won't have to go to any medical appointments or get poked by a needle for blood work, okay?",
            "We just check with your doctor and the pharmacy, so that makes it pretty simple, doesn't it?",
            "This plan also builds cash value over time that can be used to automatically pay missed premiums if necessary.",
            "And the coverage never expires, so as long as the premiums are paid, you can feel good about having long term protection and knowing this money is going directly to your family tax-free when a claim is made.",
            "On top of it all, we pay most claims immediately, usually within 48 hours of a completed submission.",
            "The reason we do that is because when you leave this world, it'll already be one of the hardest days in your family's life. They shouldn't be left waiting on help.",
            "So [ClientName], we provide that money to your family the same way you would if you were still there for them.",
            "And that's all. It's really that easy.",
            "Do you have any questions about the coverage before we get into the numbers?",
            "If at any time you have any questions about the policy or the benefits, I want you to know that I'll always be here to help you in any way I can. So please, keep my number in a safe place, because that'll be the easiest way for you to reach me, okay?",
            "And in my professional opinion, this plan can cover what you need.",
            "As a new customer, I first and foremost want to make sure we find something that's affordable and comfortable for you right now, because you may not qualify for this plan or these rates again if your health changes.",
            "And the premiums will also never be more affordable than they are now."
          ],
          helperLines: [
            "Graded does not get the Easy Life rider."
          ]
        }),
        createProductOutcomeOption("eternal-legacy", {
          script: [
            "Do you have any questions about the coverage before we get into the numbers?",
            "If at any time you have any questions about the policy or the benefits, I want you to know that I'll always be here to help you in any way I can. So please, keep my number in a safe place, because that'll be the easiest way for you to reach me, okay?",
            "As a new customer, I first and foremost want to make sure we find something that's affordable and comfortable for you right now, because waiting rarely improves the path with life insurance.",
            "So if the fit is there and the budget works, I'd rather help you get this handled today."
          ],
          helperLines: [
            "Keep this route hopeful and direct. No EMC-only benefits here."
          ]
        }),
        createProductOutcomeOption("no-option", {
          script: [
            "At this point I don't have a product to present today, so don't use the pricing push. Move to your no-option wrap-up instead."
          ]
        })
      ]
    },
    prompt: {
      goal: "Cover the route-specific benefits and urgency before price",
      notes: [
        "Easy Life gets the rider language. EMC Graded does not.",
        "The good news should already be delivered before this section starts."
      ]
    }
  },
  {
    id: 20,
    title: "Price Presentation",
    qaRequired: false,
    script: [
      "Select the current product route to load the pricing language."
    ],
    branchControl: {
      stateKey: "productOutcome",
      display: false,
      replaceBaseOnSelect: true,
      options: [
        createProductOutcomeOption("easy-life", {
          script: [
            "Based on what qualified, I have three options in front of me and I want to keep this comfortable for you.",
            "Option 1 gives you [Coverage1] in coverage and comes in at [Quote1] per month.",
            "Option 2 gives you [Coverage2] in coverage and comes in at [Quote2] per month.",
            "Option 3 gives you [Coverage3] in coverage and comes in at [Quote3] per month.",
            "[RecommendedQuote] is the one I like best for value based on what you told me.",
            "Which of those feels the most comfortable to start with today?"
          ]
        }),
        createProductOutcomeOption("emc-graded", {
          script: [
            "Based on what qualified, I have three options in front of me and I want to keep this comfortable for you.",
            "Option 1 gives you [Coverage1] in coverage and comes in at [Quote1] per month.",
            "Option 2 gives you [Coverage2] in coverage and comes in at [Quote2] per month.",
            "Option 3 gives you [Coverage3] in coverage and comes in at [Quote3] per month.",
            "[RecommendedQuote] is the one I like best for value based on what you told me.",
            "Which of those feels the most comfortable to start with today?"
          ]
        }),
        createProductOutcomeOption("eternal-legacy", {
          script: [
            "Based on what qualified, I have three options in front of me and I want to keep this comfortable for you.",
            "Option 1 gives you [Coverage1] in coverage and comes in at [Quote1] per month.",
            "Option 2 gives you [Coverage2] in coverage and comes in at [Quote2] per month.",
            "Option 3 gives you [Coverage3] in coverage and comes in at [Quote3] per month.",
            "[RecommendedQuote] is the one I like best for value based on what you told me.",
            "Which of those feels the most comfortable to start with today?"
          ]
        }),
        createProductOutcomeOption("no-option", {
          script: [
            "There is no price presentation on a no-option route."
          ]
        })
      ]
    },
    prompt: {
      goal: "Guide the client to a comfortable same-day premium instead of inviting delay",
      notes: [
        "Use the quote workspace to store all three numbers so you do not lose them.",
        "Use the quick objection buttons the moment they give you a reason not to move forward."
      ]
    }
  },
  {
    id: 21,
    title: "Same-Day Commitment",
    qaRequired: false,
    script: [
      "Select the current product route to load the right commitment language."
    ],
    branchControl: {
      stateKey: "productOutcome",
      display: false,
      replaceBaseOnSelect: true,
      options: [
        createProductOutcomeOption("easy-life", {
          script: [
            "Now most people want to start their coverage right away, so we'll go ahead and start yours today.",
            "I'll collect your banking information shortly, right after we start by confirming your beneficiary specifics to make sure your [BeneficiaryRelationship] is set to receive these insurance payouts.",
            "The biggest thing with life insurance is getting the first payment set up right away so there's no delay in protecting [BeneficiaryName]."
          ]
        }),
        createProductOutcomeOption("emc-graded", {
          script: [
            "Now most people want to start their coverage right away, so we'll go ahead and start yours today.",
            "I'll collect your banking information shortly, right after we start by confirming your beneficiary specifics to make sure your [BeneficiaryRelationship] is set to receive these insurance payouts.",
            "The biggest thing with life insurance is getting the first payment set up right away so there's no delay in protecting [BeneficiaryName]."
          ]
        }),
        createProductOutcomeOption("eternal-legacy", {
          script: [
            "Now most people want to start their coverage right away, so we'll go ahead and start yours today.",
            "I'll collect your banking information shortly, right after we start by confirming your beneficiary specifics to make sure your [BeneficiaryRelationship] is set to receive these insurance payouts.",
            "The biggest thing with life insurance is getting the first payment set up right away so there's no delay in protecting [BeneficiaryName]."
          ]
        }),
        createProductOutcomeOption("no-option", {
          script: [
            "There is no same-day start on a no-option route. Use your follow-up, callback, or disposition workflow instead."
          ]
        })
      ]
    },
    prompt: {
      goal: "Normalize same-day action so payment today feels like the default move",
      notes: [
        "This is the commitment bridge into banking.",
        "Same-day pay is the operational priority here."
      ]
    }
  },
  {
    id: 22,
    title: "Start Coverage Today",
    qaRequired: false,
    script: [
      "Select the current product route to load the banking transition."
    ],
    branchControl: {
      stateKey: "productOutcome",
      display: false,
      replaceBaseOnSelect: true,
      options: [
        createProductOutcomeOption("easy-life", {
          script: [
            "Now most people want to start their coverage right away, so we'll go ahead and start yours today.",
            "I'll collect your banking information shortly, right after we start with confirming your beneficiary specifics to make sure your [BeneficiaryRelationship] is set to receive these insurance payouts.",
            "Once that first payment is set, we have your same-day start moving in the right direction."
          ]
        }),
        createProductOutcomeOption("emc-graded", {
          script: [
            "Now most people want to start their coverage right away, so we'll go ahead and start yours today.",
            "I'll collect your banking information shortly, right after we start with confirming your beneficiary specifics to make sure your [BeneficiaryRelationship] is set to receive these insurance payouts.",
            "Once that first payment is set, we have your same-day start moving in the right direction."
          ]
        }),
        createProductOutcomeOption("eternal-legacy", {
          script: [
            "Now most people want to start their coverage right away, so we'll go ahead and start yours today.",
            "I'll collect your banking information shortly, right after we start with confirming your beneficiary specifics to make sure your [BeneficiaryRelationship] is set to receive these insurance payouts.",
            "Once that first payment is set, we have your same-day start moving in the right direction."
          ]
        }),
        createProductOutcomeOption("no-option", {
          script: [
            "There is no banking transition on a no-option route."
          ]
        })
      ]
    },
    prompt: {
      goal: "Move the client from the chosen premium into same-day payment setup",
      notes: [
        "Do not reopen the whole sale here.",
        "Keep momentum tight and procedural."
      ]
    }
  },
  {
    id: 23,
    title: "Rehash / Wrap Up",
    qaRequired: false,
    script: [
      "Select the current product route to load the correct wrap-up."
    ],
    branchControl: {
      stateKey: "productOutcome",
      display: false,
      replaceBaseOnSelect: true,
      options: [
        createProductOutcomeOption("easy-life", {
          script: [
            "Congratulations, we're all set here.",
            "What happens next is the application is sent to [CarrierName] for completion, and once the first premium is taken, the coverage will be in force and they will send you a letter in the mail which will give you all the details you need including a copy of the policy.",
            "Can you grab that pen and paper again please?",
            "I'm going to give you your [PolicyLabel] number now.",
            "It is [PolicyNumber].",
            "And just as a reminder, we'll be charging the premium of [Premium] on the [DraftDate] of each month.",
            "Please keep in mind that sometimes it can take an extra two to three business days for the payment to go through, especially if that date falls on a weekend. So it's important to leave that money in your account to cover the payment and make sure your coverage doesn't lapse, okay?",
            "What's a secondary phone number we can reach you on if there's ever any need for us to reach you?",
            "And in case we have to get in touch with your beneficiary, can you provide me with their phone number as well?",
            "And just to be sure you have it, I'll give you my name and number again as well.",
            "My name is [AdvisorName] and you can reach me at [AdvisorPhone].",
            "And let me give you another number to take down as well: [CustomerExperiencePhone].",
            "This is our Customer Experience Team, so if there's ever anything you need and I'm unavailable, they can help as well.",
            "Do you have any questions for me today before we wrap things up?",
            "One last thing I'll ask is that if you have any friends or family who may need insurance, please feel encouraged to have them give me a call and I can help them out as well.",
            "So congratulations again on taking these steps in protecting your family, and thank you for choosing Insurance Supermarket."
          ]
        }),
        createProductOutcomeOption("emc-graded", {
          script: [
            "Congratulations, we're all set here.",
            "What happens next is the application is sent to [CarrierName] for completion, and once the first premium is taken, the coverage will be in force and they will send you a letter in the mail which will give you all the details you need including a copy of the policy.",
            "Can you grab that pen and paper again please?",
            "I'm going to give you your [PolicyLabel] number now.",
            "It is [PolicyNumber].",
            "And just as a reminder, we'll be charging the premium of [Premium] on the [DraftDate] of each month.",
            "Please keep in mind that sometimes it can take an extra two to three business days for the payment to go through, especially if that date falls on a weekend. So it's important to leave that money in your account to cover the payment and make sure your coverage doesn't lapse, okay?",
            "What's a secondary phone number we can reach you on if there's ever any need for us to reach you?",
            "And in case we have to get in touch with your beneficiary, can you provide me with their phone number as well?",
            "And just to be sure you have it, I'll give you my name and number again as well.",
            "My name is [AdvisorName] and you can reach me at [AdvisorPhone].",
            "And let me give you another number to take down as well: [CustomerExperiencePhone].",
            "This is our Customer Experience Team, so if there's ever anything you need and I'm unavailable, they can help as well.",
            "Do you have any questions for me today before we wrap things up?",
            "One last thing I'll ask is that if you have any friends or family who may need insurance, please feel encouraged to have them give me a call and I can help them out as well.",
            "So congratulations again on taking these steps in protecting your family, and thank you for choosing Insurance Supermarket."
          ]
        }),
        createProductOutcomeOption("eternal-legacy", {
          script: [
            "Congratulations, we're all set here.",
            "What happens next is the application is sent to [CarrierName] for completion, and once the first premium is taken, the coverage will be in force and they will send you a letter in the mail which will give you all the details you need including a copy of the policy.",
            "Can you grab that pen and paper again please?",
            "I'm going to give you your [PolicyLabel] number now.",
            "It is [PolicyNumber].",
            "And just as a reminder, we'll be charging the premium of [Premium] on the [DraftDate] of each month.",
            "Please keep in mind that sometimes it can take an extra two to three business days for the payment to go through, especially if that date falls on a weekend. So it's important to leave that money in your account to cover the payment and make sure your coverage doesn't lapse, okay?",
            "What's a secondary phone number we can reach you on if there's ever any need for us to reach you?",
            "And in case we have to get in touch with your beneficiary, can you provide me with their phone number as well?",
            "And just to be sure you have it, I'll give you my name and number again as well.",
            "My name is [AdvisorName] and you can reach me at [AdvisorPhone].",
            "And let me give you another number to take down as well: [CustomerExperiencePhone].",
            "This is our Customer Experience Team, so if there's ever anything you need and I'm unavailable, they can help as well.",
            "Do you have any questions for me today before we wrap things up?",
            "One last thing I'll ask is that if you have any friends or family who may need insurance, please feel encouraged to have them give me a call and I can help them out as well.",
            "So congratulations again on taking these steps in protecting your family, and thank you for choosing Insurance Supermarket."
          ]
        }),
        createProductOutcomeOption("no-option", {
          script: [
            "There is no policy rehash on a no-option route. Use your outcome, callback, or follow-up process instead."
          ]
        })
      ]
    },
    prompt: {
      goal: "Lock down the post-sale details and leave the client with clean next steps",
      notes: [
        "Use the workspace to store the policy number, secondary phone, and beneficiary phone so you do not lose them.",
        "This section should feel organized and complete."
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
