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
    title: "Family & Life Context",
    qaRequired: false,
    script: [
      "Tell me a little about your family these days.",
      "Who are the most important people in your life right now?",
      "Who depends on you the most, even in small ways?",
      "That gives me a better feel for what matters most to you."
    ],
    prompt: {
      goal: "Build trust naturally and understand who matters most in their life",
      notes: [
        "Keep this conversational",
        "Listen for who matters most",
        "Pause and listen"
      ]
    }
  },
  {
    id: 3,
    title: "Who Matters Most",
    qaRequired: false,
    script: [
      "Who would you most want looked after if something happened to you?",
      "Who would likely be the person helping make calls or decisions?",
      "You'd want that to be as easy on them as possible, right?"
    ],
    prompt: {
      goal: "Identify the likely decision maker and keep the tone personal",
      notes: [
        "Keep this warm and respectful",
        "Let them answer fully",
        "Use follow-up only if it feels natural"
      ]
    }
  },
  {
    id: 4,
    title: "Life Experiences With Loss",
    qaRequired: false,
    script: [
      "Have you ever had to deal with losing someone close to you?"
    ],
    branchControl: {
      stateKey: "lossExperience",
      label: "Loss Experience",
      helpText: "Choose the path that matches whether they have lived through this personally.",
      options: [
        {
          value: "experienced-loss",
          label: "Experienced Loss",
          description: "Use this when they have gone through losing someone close.",
          script: [
            "When that happened, what was hardest for the family afterward?",
            "Did it create any stress around final arrangements or expenses?",
            "Who ended up handling everything?",
            "Was that an easy process or was it a lot on the family?",
            "Did that situation shape how you think about this for your own family?",
            "That kind of experience really stays with people, right?"
          ],
          helperLines: [
            "Be warm here, but do not linger too long.",
            "Let them tell you what mattered instead of filling the silence yourself."
          ],
          promptNotes: [
            "Keep this gentle and brief."
          ]
        },
        {
          value: "no-personal-experience",
          label: "No Personal Experience With Loss",
          description: "Use this when they have not gone through it personally yet.",
          script: [
            "A lot of folks haven't had to deal with that personally yet.",
            "If something unexpected happened, who do you think would be the one trying to handle everything?",
            "What do you think that first few days would look like for them?",
            "That can put a lot on one person all at once, right?"
          ],
          helperLines: [
            "Use gentle imagination here, not heavy emotion.",
            "Keep this warm, simple, and easy to picture."
          ],
          promptNotes: [
            "Be warm here, but do not linger too long."
          ]
        }
      ]
    },
    prompt: {
      goal: "Help the client connect the topic to real life in a natural way",
      notes: [
        "Be warm here, but do not linger too long",
        "Keep this gentle and brief",
        "Do not let this feel like therapy"
      ]
    }
  },
  {
    id: 5,
    title: "Family Responsibility",
    qaRequired: false,
    script: [
      "If something happened tomorrow, who would be the one making the calls and handling everything?",
      "Would that be a smooth situation financially, or would it put pressure on them?",
      "Are there any bills or responsibilities you would not want left on someone else?",
      "What would you most want taken care of right away?",
      "If those pieces were already handled, that would make things a lot easier to deal with, right?"
    ],
    prompt: {
      goal: "Move from emotional awareness into practical responsibility",
      notes: [
        "Let the client describe the burden in their own words",
        "Let them answer fully",
        "Do not rush to solve it yet"
      ]
    }
  },
  {
    id: 6,
    title: "Current Support In Place",
    qaRequired: false,
    script: [
      "Some people I speak with already have something set aside for this, and some don't.",
      "Have you set anything aside yet to help your family with those expenses?"
    ],
    branchControl: {
      stateKey: "coverageStatus",
      label: "Current Support",
      helpText: "Use the softer path that matches whether they already have something set aside.",
      options: [
        {
          value: "has-coverage",
          label: "Some Coverage, May Need More",
          description: "Use this when they already have something set aside but it may not fully handle the burden.",
          script: [
            "That makes sense.",
            "What did you want that to help with the most?",
            "Do you feel like it would fully handle things, or would there still be some pressure left on the family?",
            "Even a small gap can become a lot to deal with in that moment, right?"
          ],
          helperLines: [
            "Keep this matter-of-fact and respectful.",
            "Do not make them defend what they already did."
          ],
          promptNotes: [
            "This is information gathering, not pressure."
          ]
        },
        {
          value: "wants-extra",
          label: "Already Set Aside, Wants Extra",
          description: "Use this when they already have something in place but want to leave a little more behind.",
          script: [
            "That makes sense.",
            "Sometimes people already have something in place and still want to leave a little more breathing room.",
            "That just gives the family one less thing to worry about, right?"
          ],
          helperLines: [
            "Validate the planning that's already there.",
            "Keep this centered on extra peace of mind, not replacement."
          ]
        },
        {
          value: "no-coverage",
          label: "Nothing Set Aside Yet",
          description: "Use this when nothing has been set aside for those expenses yet.",
          script: [
            "That's very common.",
            "A lot of people mean to get to it, and life just keeps moving.",
            "That doesn't mean it isn't important. It just means it hasn't been handled yet."
          ],
          helperLines: [
            "Ask this softly. No shame, no pressure."
          ]
        }
      ]
    },
    prompt: {
      goal: "Capture whether they already have something in place without making discovery feel like a funnel",
      notes: [
        "Keep this gentle and matter-of-fact",
        "This is information gathering, not a pitch",
        "Use tie-downs naturally if it fits"
      ]
    }
  },
  {
    id: 7,
    title: "What Would You Want Protected",
    qaRequired: false,
    script: [
      "If you could make one part of this easier on your family, what would you want handled?",
      "What would you want your loved ones to not have to worry about?",
      "Would your priority be covering final expenses, avoiding family stress, or leaving something behind?",
      "What feels most important to take care of?"
    ],
    prompt: {
      goal: "Let the client define what matters most before any recommendation talk",
      notes: [
        "Confirm what matters most before moving on",
        "Use follow-up only if it feels natural",
        "Keep this simple and easy to scan"
      ]
    }
  },
  {
    id: 8,
    title: "Priority Confirmation",
    qaRequired: false,
    script: [
      "So the main thing you'd want is making sure your family doesn't have to scramble with [PrioritySummary], right?",
      "And if that part were already handled, that would take a lot of pressure off of them, right?"
    ],
    prompt: {
      goal: "Confirm the priority in the client's own language before moving on",
      notes: [
        "Pause and get agreement here",
        "This is the anchor before the bridge",
        "Keep it warm and simple"
      ]
    }
  },
  {
    id: 9,
    title: "Advisor Bridge",
    qaRequired: false,
    script: [
      "Choose the bridge that fits the tone of the call."
    ],
    branchControl: {
      stateKey: "bridgeStyle",
      label: "Bridge Options",
      helpText: "Use the softer or steadier transition that feels most natural in the conversation.",
      replaceBaseOnSelect: true,
      options: [
        {
          value: "steady-bridge",
          label: "Steady Bridge",
          description: "Use this when you want a calm and direct transition.",
          script: [
            "Based on what you've shared with me, my role is to help make sure your family wouldn't be left carrying that burden alone."
          ],
        },
        {
          value: "soft-bridge",
          label: "Softer Transition",
          description: "Use this when you want the gentlest move into protection options.",
          script: [
            "What I can do from here is walk you through a few protection options that are designed to help with exactly those kinds of final expenses, and then we can see what feels comfortable for you."
          ]
        },
        {
          value: "guided-bridge",
          label: "Guided Bridge",
          description: "Use this when the client is engaged and ready for a simple next-step frame.",
          script: [
            "From here, I'll walk you through a few simple options built to help with the priorities you just shared, and then we can see what feels like the right next step."
          ]
        }
      ]
    },
    prompt: {
      goal: "Transition naturally from discovery into recommendation without sounding like a pitch",
      notes: [
        "Keep this calm and respectful",
        "Do not use the word insurance unless it feels necessary",
        "Choose the bridge that sounds most human in the moment"
      ]
    }
  },
  {
    id: 10,
    title: "Permission To Continue",
    qaRequired: false,
    script: [
      "If I show you a few protection options that line up with what you just shared, would you be open to taking a look?",
      "We don't have to force anything. I just want to see what would fit the priorities that matter most to you.",
      "Fair enough?"
    ],
    prompt: {
      goal: "Get a natural yes before moving into the next step of the call",
      notes: [
        "Keep this light and easy",
        "A simple yes is enough here",
        "This should feel like a natural handoff, not a close"
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
            "I'm sure that's what you'd like, right?",
            "The reason I'm hoping for that route is it's simple. There are no medical appointments, no blood work, and no doctor visits. We just verify with your doctor and the pharmacy.",
            "It also builds cash value over time, the coverage never expires as long as premiums are paid, and when a claim is made that money goes directly to your family tax-free.",
            "On top of that, most claims are paid very quickly, usually within 48 hours of a completed submission.",
            "So if this comes back the way I'm hoping, it gives your family real protection without putting them through more hoops."
          ]
        }),
        createProductOutcomeOption("emc-graded", {
          script: [
            "Now, after we're able to verify the approval factors, I hope you will qualify for the Graded Plan, which pays the full face amount from day one due to accidental death, and after two years and a day for natural causes.",
            "If you passed away during the first year it would pay 110 percent of your paid premiums.",
            "During the second year it would pay 120 percent of your paid premiums.",
            "So either way you will be better protected from day one with this plan, which is great right?",
            "The good part is there still aren't any medical appointments, blood work, or doctor visits. We just verify with your doctor and the pharmacy.",
            "It also builds cash value over time, the coverage never expires as long as premiums are paid, and when a claim is made that money goes directly to your family tax-free.",
            "On top of that, most claims are paid very quickly, usually within 48 hours of a completed submission.",
            "So if this is the route we land on, it's still a simple way to put protection in place for your family."
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
      goal: "Read the route-specific EMC QA and build value before you deliver the qualification result",
      notes: [
        "This is the anticipation step.",
        "Read the Easy Life or Graded wording verbatim when it applies.",
        "Shared EMC value build belongs here, before the good-news reveal."
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
            "You qualified for EMC Easy Life, which is one of the top tier routes we talked about.",
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
    title: "Post-Approval Confirmation",
    qaRequired: false,
    script: [
      "Select the route in the prior section to load the right post-approval confirmation."
    ],
    branchControl: {
      stateKey: "productOutcome",
      display: false,
      replaceBaseOnSelect: true,
      options: [
        createProductOutcomeOption("easy-life", {
          script: [
            "And [ClientName], another benefit you qualified for with Easy Life is the Terminal Illness Rider, which is great.",
            "If you're diagnosed with a terminal illness, the company can send you a check for up to 75 percent of your coverage amount, so you can take care of everything yourself while you're still living, which is great, isn't it?",
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
      goal: "Confirm the route-specific extras and urgency after approval before price",
      notes: [
        "Easy Life gets the rider language. EMC Graded does not.",
        "Keep this section tight. The shared plan value should already be established before the good-news reveal."
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
            "Based on what qualified, I have three options in front of me, and whether this is your first coverage, filling a gap, or giving [BeneficiaryName] extra breathing room, I want to keep this comfortable for you.",
            "Option 1 gives you [Coverage1] in coverage and comes in at [Quote1] per month.",
            "Option 2 gives you [Coverage2] in coverage and comes in at [Quote2] per month.",
            "Option 3 gives you [Coverage3] in coverage and comes in at [Quote3] per month.",
            "[RecommendedQuote] is the one I like best for value based on what you told me.",
            "Which of those feels the most comfortable to start with today?"
          ]
        }),
        createProductOutcomeOption("emc-graded", {
          script: [
            "Based on what qualified, I have three options in front of me, and whether this is your first coverage, filling a gap, or giving [BeneficiaryName] extra breathing room, I want to keep this comfortable for you.",
            "Option 1 gives you [Coverage1] in coverage and comes in at [Quote1] per month.",
            "Option 2 gives you [Coverage2] in coverage and comes in at [Quote2] per month.",
            "Option 3 gives you [Coverage3] in coverage and comes in at [Quote3] per month.",
            "[RecommendedQuote] is the one I like best for value based on what you told me.",
            "Which of those feels the most comfortable to start with today?"
          ]
        }),
        createProductOutcomeOption("eternal-legacy", {
          script: [
            "Based on what qualified, I have three options in front of me, and whether this is your first coverage, filling a gap, or giving [BeneficiaryName] extra breathing room, I want to keep this comfortable for you.",
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
    title: "Enrollment Setup",
    qaRequired: false,
    script: [
      "Select the current product route to load the enrollment transition."
    ],
    branchControl: {
      stateKey: "productOutcome",
      display: false,
      replaceBaseOnSelect: true,
      options: [
        createProductOutcomeOption("easy-life", {
          script: [
            "Now let's get the setup details locked in the right way.",
            "We'll confirm your beneficiary specifics, choose the draft day you want, and make sure everything is lined up correctly for the policy.",
            "Right after that, we'll finish the banking information so your same-day start keeps moving in the right direction."
          ]
        }),
        createProductOutcomeOption("emc-graded", {
          script: [
            "Now let's get the setup details locked in the right way.",
            "We'll confirm your beneficiary specifics, choose the draft day you want, and make sure everything is lined up correctly for the policy.",
            "Right after that, we'll finish the banking information so your same-day start keeps moving in the right direction."
          ]
        }),
        createProductOutcomeOption("eternal-legacy", {
          script: [
            "Now let's get the setup details locked in the right way.",
            "We'll confirm your beneficiary specifics, choose the draft day you want, and make sure everything is lined up correctly for the policy.",
            "Right after that, we'll finish the banking information so your same-day start keeps moving in the right direction."
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
      goal: "Move the client from commitment into beneficiary, draft-day, and payment setup",
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
