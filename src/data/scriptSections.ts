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

function createPriceComparisonOptions() {
  return [
    {
      value: "1",
      label: "Option 1",
      title: "The Anchor",
      subtitle: "Funeral, headstone, and extra breathing room",
      bucketText:
        "A larger protected bucket that handles the full send-off and leaves [BeneficiaryName] extra breathing room.",
      recommendation: false
    },
    {
      value: "2",
      label: "Option 2",
      title: "The Complete Solution",
      subtitle: "Solves the whole funding gap",
      bucketText:
        "A protected bucket built to solve [PrimaryConcern] without forcing [BeneficiaryName] to pull from general money.",
      recommendation: true,
      badge: "Recommended"
    },
    {
      value: "3",
      label: "Option 3",
      title: "The Safety Net",
      subtitle: "Basic funeral home costs",
      bucketText:
        "A smaller protected bucket for the funeral home and immediate first costs so [BeneficiaryName] is not starting from zero.",
      recommendation: false
    }
  ];
}

function createPricePresentationScript() {
  return [
    "Okay, [ClientName] -- I've got some really good news for you.",
    "Everything came back the way we were hoping.",
    "So what I'm going to do is walk you through what this looks like, and then we'll get you set up the right way.",
    "Based on what you shared with me, what I want to do is show you three ways to build the protected bucket so [BeneficiaryName] is not pulling from general money when that day comes.",
    "You still have that pen handy?",
    "Option 1 is the larger protected bucket.",
    "It covers the funeral, the headstone, and leaves [BeneficiaryName] some extra breathing room.",
    "That comes in at [Quote1] per month for [Coverage1] in coverage.",
    "Option 2 is the complete solution.",
    "This gives [BeneficiaryName] the protected bucket that solves those first expenses without having to pull from general money.",
    "That comes in at [Quote2] per month for [Coverage2] in coverage.",
    "Option 3 is the safety net.",
    "It gives [BeneficiaryName] a smaller protected bucket for the funeral home and those immediate first costs, so they're not starting from zero.",
    "That comes in at [Quote3] per month for [Coverage3] in coverage.",
    "[PAUSE]",
    "Most people I work with end up right there in the middle because it actually solves the whole problem without stretching things too far.",
    "Now just so I don't overdo it or underdo it for you...",
    "Out of those, where does that feel most comfortable for you?"
  ];
}

function createCloseResponseReinforcement() {
  return [
    "The main thing you said was making sure [BeneficiaryName] is taken care of...",
    "That's what this does."
  ];
}

export const scriptSections = [
  {
    id: 1,
    title: "Introduction",
    phase: "discovery",
    qaRequired: false,
    script: [
      "Oh, did you say your name was [ClientName]?",
      "Okay, wonderful. Well, I appreciate you taking the time to speak with me today, [ClientName].",
      "Before we get started, I do need to let you know this call may be recorded for quality and training purposes. That makes sense, right?",
      "Wonderful. It's kind of a staple nowadays.",
      "Allow me to introduce myself. My name is [AdvisorName], and I'm your senior licensed life insurance advisor here with Insurance Supermarket.",
      "To touch on that briefly, we're a one-stop shop for life insurance, which is great for you because I'm licensed in [ClientState] to shop multiple carriers at once.",
      "Instead of you calling all these companies yourself, I compare them and find the best option for your situation.",
      "That just makes things a lot easier to deal with, right?",
      "All the plans we're looking at are final expense policies that have been state-approved and designed specifically for folks over the age of 50.",
      "As we go through this, I'll explain everything step by step, and if anything doesn't make sense, just stop me and I'll clarify it.",
      "Fair enough?"
    ],
    performanceScript: [
      "Oh, did you say your name was [ClientName]?",
      "Okay, wonderful. Well, I appreciate you taking the time to speak with me today, [ClientName].",
      "Before we get started, I do need to let you know this call may be recorded for quality and training purposes. That makes sense, right?",
      "Wonderful. It's kind of a staple nowadays.",
      "Allow me to introduce myself. My name is [AdvisorName], and I'm your senior licensed life insurance advisor here with Insurance Supermarket.",
      "To touch on that briefly, we're a one-stop shop for life insurance, which is great for you because I'm licensed in [ClientState] to shop multiple carriers at once.",
      "Instead of you calling all these companies yourself, I compare them and find the best option for your situation.",
      "That just makes things a lot easier to deal with, right?",
      "All the plans we're looking at are final expense policies that have been state-approved and designed specifically for folks over the age of 50.",
      "Fair enough?"
    ],
    focus: {
      reminder: "Start calm, clear, and confident.",
      visualCue: "Slow down on the recording disclosure."
    },
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
    phase: "discovery",
    qaRequired: false,
    script: [
      "Were you born and raised in [ClientState], or did you move there?",
      "[PAUSE]",
      "Very nice.",
      "I've bounced around a little myself. I was in Arizona for a while, then Oregon, and now I'm out here in Oklahoma.",
      "Still getting used to the tornadoes out here. Arizona definitely didn't prepare me for that part."
    ],
    performanceScript: [
      "Were you born and raised in [ClientState], or did you move there?",
      "I've bounced around a little myself. Arizona, then Oregon, now Oklahoma.",
      "Still getting used to the tornadoes out here. Arizona definitely didn't prepare me for that part."
    ],
    focus: {
      reminder: "Keep this light, brief, and human.",
      visualCue: "Create a quick reset, then move forward."
    },
    prompt: {
      goal: "Create a quick human reset before discovery without drifting off track",
      notes: [
        "Deliver this calmly and with respect.",
        "Do not over-chat here.",
        "Use this as a short runway into the current coverage snapshot."
      ]
    }
  },
  {
    id: 2.5,
    title: "Current Coverage Snapshot",
    phase: "discovery",
    qaRequired: false,
    script: [
      "[ClientName], I definitely want to respect your time.",
      "And since we're already on the topic of life insurance, let me ask -- what company are you currently with?"
    ],
    performanceScript: [
      "[ClientName], I definitely want to respect your time.",
      "And since we're already on the topic of life insurance, let me ask -- what company are you currently with?"
    ],
    focus: {
      reminder: "Get a quick snapshot of what they already have before going deeper.",
      visualCue: "Listen for personal coverage, term or work coverage, or no coverage."
    },
    branchControl: {
      stateKey: "coverageStatus",
      label: "Current Coverage Snapshot",
      helpText: "Pick the branch that matches what they have in place right now.",
      options: [
        {
          value: "has-coverage",
          label: "Has Coverage",
          description: "Use this when they already have coverage in place and you need the quick snapshot.",
          script: [
            "That's great to hear. A lot of the people I work with already have something in place, but usually it's either not enough, or not the right type of plan. What would you say it is for you?",
            "About how much coverage do you have?",
            "Roughly what are you paying a month?",
            "And about how long ago did you get it?",
            "Got it -- that helps.",
            "Now let me get right to the heart of this..."
          ],
          performanceScript: [
            "That's great to hear. A lot of the people I work with already have something in place, but usually it's either not enough, or not the right type of plan. What would you say it is for you?",
            "About how much coverage do you have, what are you paying a month, and about how long ago did you get it?",
            "Got it -- that helps.",
            "Now let me get right to the heart of this..."
          ],
          helperLines: [
            "Keep this conversational, not like an audit.",
            "You want carrier, amount, premium, and when it started."
          ],
          promptNotes: [
            "Use this to understand whether the current plan really fits."
          ]
        },
        {
          value: "term-or-work",
          label: "Term / Work Coverage",
          description: "Use this when the coverage sounds term-based or tied to work.",
          script: [
            "That's great to hear. A lot of the people I work with already have something in place, but usually it's either not enough, or not the right type of plan. What would you say it is for you?",
            "About how much coverage do you have?",
            "Roughly what are you paying a month?",
            "And about how long ago did you get it?",
            "Got it. Those can be great for temporary coverage, especially if it's through work, but they don't always stay with you forever. That's where what we're doing today is a little different.",
            "Got it -- that helps.",
            "Now let me get right to the heart of this..."
          ],
          performanceScript: [
            "That's great to hear. A lot of the people I work with already have something in place, but usually it's either not enough, or not the right type of plan. What would you say it is for you?",
            "About how much coverage do you have, what are you paying a month, and about how long ago did you get it?",
            "Got it. Those can be great for temporary coverage, especially if it's through work, but they don't always stay with you forever. That's where what we're doing today is a little different.",
            "Got it -- that helps.",
            "Now let me get right to the heart of this..."
          ],
          helperLines: [
            "Keep the positioning line soft and matter-of-fact.",
            "Do not attack the existing coverage."
          ],
          promptNotes: [
            "Make the difference clear without sounding salesy."
          ]
        },
        {
          value: "no-coverage",
          label: "No Coverage",
          description: "Use this when they do not have anything in place right now.",
          script: [
            "Okay, well luckily nothing has happened.",
            "That's exactly why we're having this conversation now.",
            "Have you ever had coverage before?",
            "Got it -- that helps.",
            "Now let me get right to the heart of this..."
          ],
          performanceScript: [
            "Okay, well luckily nothing has happened.",
            "That's exactly why we're having this conversation now.",
            "Got it -- that helps.",
            "Now let me get right to the heart of this..."
          ],
          helperLines: [
            "Keep this calm and matter-of-fact.",
            "The goal is urgency without pressure."
          ],
          promptNotes: [
            "You only need enough here to understand the snapshot and move on."
          ]
        },
        {
          value: "unclear",
          label: "Needs Clarifying",
          description: "Use this when they are not sure what kind of coverage they have.",
          script: [
            "Is it something through work, or something you set up personally?",
            "Got it -- that helps.",
            "Now let me get right to the heart of this..."
          ],
          performanceScript: [
            "Is it something through work, or something you set up personally?",
            "Got it -- that helps.",
            "Now let me get right to the heart of this..."
          ],
          helperLines: [
            "Get enough clarity to know whether it's personal or temporary coverage.",
            "Do not get bogged down in the weeds."
          ],
          promptNotes: [
            "Keep this moving."
          ]
        }
      ]
    },
    workspace: {
      title: "Current Coverage Snapshot",
      text: "Capture what they already have, what it costs, and whether it's personal, temporary, or nothing at all.",
      groups: ["currentSupport"],
      notes: {
        key: "currentSupportNotes",
        label: "Coverage Snapshot Notes",
        placeholder: "Carrier, coverage amount, monthly premium, when it started, and whether it's personal, term, or through work"
      }
    },
    prompt: {
      goal: "Get a quick useful snapshot of current coverage before moving into the deeper why.",
      notes: [
        "Keep it conversational, not like an audit.",
        "If they already have something, find out whether it's enough and what kind of plan it is.",
        "Use the final tie-in to move naturally back into the person anchor."
      ]
    }
  },
  {
    id: 3,
    title: "Person Anchor",
    phase: "discovery",
    qaRequired: false,
    script: [
      "When you think about why you wanted to look into this, who comes to mind first?",
      "And what's their name?",
      "Tell me a little more about [BeneficiaryName].",
      "Got it... I hear that a lot.",
      "Yeah, I've got family too, so I completely get that.",
      "Would [BeneficiaryName] probably be the one handling things if something happened?",
      "So this is really about making things easier on [BeneficiaryName], right?"
    ],
    performanceScript: [
      "When you think about why you wanted to look into this, who comes to mind first?",
      "And what's their name?",
      "Tell me a little more about [BeneficiaryName].",
      "Would [BeneficiaryName] probably be the one handling things if something happened?"
    ],
    focus: {
      reminder: "Capture the name and make the conversation about that person.",
      visualCue: "Pause after they say the name."
    },
    workspace: {
      title: "Person Anchor",
      text: "Lock onto the person who matters most and the family context around them.",
      groups: ["familyContext"],
      notes: {
        key: "familyContextNotes",
        label: "Family / Call Notes",
        placeholder: "Capture family details and any running notes you want to keep"
      }
    },
    prompt: {
      goal: "Get to the person who matters most and anchor the conversation there",
      notes: [
        "Keep it person-first and easy.",
        "Use their name naturally once you have it.",
        "Do not make this sound heavy or therapeutic."
      ]
    }
  },
  {
    id: 4,
    title: "Loss / Experience Path",
    phase: "discovery",
    qaRequired: false,
    script: [
      "Have you ever had to deal with losing someone close to you before?"
    ],
    performanceScript: [
      "Have you ever had to deal with losing someone close to you before?"
    ],
    focus: {
      reminder: "Be warm, but do not linger too long.",
      visualCue: "Use memory if they have it; use gentle imagination if they do not."
    },
    branchControl: {
      stateKey: "lossExperience",
      label: "Loss / Experience Path",
      helpText: "Choose the path that matches whether they have lived through this personally yet.",
      options: [
        {
          value: "experienced-loss",
          label: "Experienced Loss",
          description: "Use this when they have personally gone through a loss or helped handle what came next.",
          script: [
            "How long ago was that?",
            "If you don't mind me asking, what did they pass away from?",
            "Wow, that must have been hard. I'm sorry.",
            "Yeah... I actually went through something similar in my own family.",
            "When that happened, what was hardest on the family afterward?",
            "Was that pressure mostly emotional, mostly financial, or a little of both?",
            "Did that experience really shape how you think about this for [BeneficiaryName]?",
            "That kind of experience really stays with people, right?"
          ],
          performanceScript: [
            "How long ago was that?",
            "If you don't mind me asking, what did they pass away from?",
            "Wow, that must have been hard. I'm sorry.",
            "When that happened, what was hardest on the family afterward?",
            "Was that pressure mostly emotional, mostly financial, or a little of both?",
            "Did that experience really shape how you think about this for [BeneficiaryName]?"
          ],
          helperLines: [
            "Be warm here, but do not linger too long.",
            "Let them answer it in their own words.",
            "Do not stack extra emotional questions if they already gave you enough."
          ],
          promptNotes: [
            "Keep this gentle and brief."
          ]
        },
        {
          value: "no-personal-experience",
          label: "No Personal Experience Yet",
          description: "Use this when they have not gone through it personally yet.",
          script: [
            "A lot of folks haven't had to deal with that personally yet.",
            "Even still, that's usually why they want to get ahead of it so [BeneficiaryName] isn't the one trying to figure it out."
          ],
          performanceScript: [
            "A lot of folks haven't had to deal with that personally yet.",
            "Even still, that's usually why they want to get ahead of it."
          ],
          helperLines: [
            "Use gentle imagination here, not heavy emotion.",
            "Keep it short and move on once they give you enough.",
            "Do not turn this into a second Paint the Picture section."
          ],
          promptNotes: [
            "Be warm here, but do not linger too long."
          ]
        }
      ]
    },
    workspace: {
      title: "Loss / Experience Path",
      text: "Use their lived experience, or lack of it, to surface who would really be carrying the weight.",
      groups: ["lossExperience"],
      notes: {
        key: "lossExperienceNotes",
        label: "Loss Notes",
        placeholder: "Who was lost, who handled things, and what felt hardest"
      }
    },
    prompt: {
      goal: "Help the client connect the topic to real life in a natural way",
      notes: [
        "Keep this gentle and brief.",
        "Do not let this feel like therapy.",
        "You only need one clear experience path here."
      ]
    }
  },
  {
    id: 5,
    title: "Paint the Picture",
    phase: "discovery",
    qaRequired: false,
    script: [
      "*slow down here*",
      "Yeah... and that's exactly why people start thinking about this a little differently.",
      "Because once you've seen what that looks like on the other side, it hits different.",
      "Imagine for a moment that [BeneficiaryName] just lost you, and they're sitting at the funeral home talking to the funeral director.",
      "The funeral director slides over a piece of paper, and it's a big number.",
      "And now [BeneficiaryName] is trying to figure out how to deal with it.",
      "Do I pull money from here or there?",
      "Do I need to ask friends or family for help?",
      "In some cases families even turn to a GoFundMe because it can get rough.",
      "That's a lot to deal with when someone is already grieving.",
      "Now imagine a different scenario.",
      "Same funeral home, same piece of paper, but instead of anxiety, [BeneficiaryName] has peace of mind knowing the financial side is handled.",
      "Now they can actually focus on remembering you, the memories, the laughter, the talks, and go through the healing process instead of being overwhelmed by money."
    ],
    performanceScript: [
      "Imagine for a moment that [BeneficiaryName] just lost you, and they're sitting at the funeral home talking to the funeral director.",
      "The funeral director slides over a piece of paper, and it's a big number.",
      "And now [BeneficiaryName] is trying to figure out how to deal with it while they're already grieving.",
      "Now imagine a different scenario, where the financial side is handled and [BeneficiaryName] can focus on remembering you instead of being overwhelmed by money."
    ],
    focus: {
      reminder: "This is the emotional anchor. Slow down and let them picture it.",
      visualCue: "Ask the picture question, then stop talking.",
      highlightLabel: "Key Emotional Anchor"
    },
    workspace: {
      title: "Paint the Picture",
      text: "Let them describe the pressure window so the burden feels real, not abstract.",
      groups: ["familyResponsibility"],
      notes: {
        key: "familyResponsibilityNotes",
        label: "Picture Notes",
        placeholder: "Capture what those first few months would really look like"
      },
      highlight: "paint-picture"
    },
    highlightStyle: "paint-picture",
    prompt: {
      goal: "Expose the real pressure window after a death without sounding clinical",
      notes: [
        "Stay close to the picture and let it land.",
        "Do not over-perform this section.",
        "This is the emotional anchor before the practical conversation."
      ]
    }
  },
  {
    id: 6,
    title: "Burial / Cremation",
    phase: "discovery",
    qaRequired: false,
    script: [
      "Did you prefer a traditional burial or cremation for yourself?"
    ],
    performanceScript: [
      "Did you prefer a traditional burial or cremation for yourself?"
    ],
    focus: {
      reminder: "Keep this practical and easy to answer.",
      visualCue: "Listen for burial costs, cremation costs, or uncertainty."
    },
    branchControl: {
      stateKey: "arrangementPreference",
      label: "Burial / Cremation",
      helpText: "Pick the path that best matches how they are picturing the arrangements right now.",
      options: [
        {
          value: "burial",
          label: "Burial",
          description: "Use this when they are picturing burial or cemetery-related costs.",
          script: [
            "Okay. And with a traditional burial, depending on how simple or how extravagant everything is, you're usually looking somewhere around fifteen to twenty-five thousand.",
            "So that number can get up there pretty quick."
          ],
          performanceScript: [
            "With a traditional burial, depending on how simple or how extravagant everything is, you're usually looking somewhere around fifteen to twenty-five thousand."
          ],
          helperLines: [
            "Let burial stay concrete, not dramatic.",
            "Keep it tied to the piece-of-paper moment you just painted."
          ],
          promptNotes: [
            "Keep this easy to picture.",
            "Stay practical here."
          ]
        },
        {
          value: "cremation",
          label: "Cremation",
          description: "Use this when they are picturing cremation but still want the first expenses handled.",
          script: [
            "Okay. And with cremation, depending on the memorial, service, and even travel details, you're usually somewhere around five to fifteen thousand.",
            "So even that can still be a pretty real number for a family."
          ],
          performanceScript: [
            "With cremation, depending on the memorial, service, and even travel details, you're usually somewhere around five to fifteen thousand."
          ],
          helperLines: [
            "Keep this simple and practical.",
            "Do not let cremation become a minimizing move."
          ],
          promptNotes: [
            "Tie this back to the same burden, not a different topic.",
            "Keep [BeneficiaryName] in the center of the answer."
          ]
        },
        {
          value: "undecided",
          label: "Still Open",
          description: "Use this when they have not decided yet and you just want to keep it practical.",
          script: [
            "If you haven't decided yet, that's okay.",
            "I just want you to know burial can run around fifteen to twenty-five thousand, and cremation can still be around five to fifteen depending on the memorial, service, and travel details."
          ],
          performanceScript: [
            "That's okay. Burial can run around fifteen to twenty-five thousand, and cremation can still be around five to fifteen depending on the memorial, service, and travel details."
          ],
          helperLines: [
            "Do not force a decision here.",
            "Use this to keep the funding conversation concrete."
          ],
          promptNotes: [
            "Keep it practical and move forward."
          ]
        }
      ]
    },
    workspace: {
      title: "Burial / Cremation",
      text: "Capture how they picture the arrangements so the next funding conversation stays concrete.",
      groups: ["burialCremation"],
      notes: {
        key: "funeralConcern",
        label: "Burial / Cremation Notes",
        placeholder: "Burial, cremation, service, cemetery, or arrangement concerns"
      }
    },
    prompt: {
      goal: "Clarify the arrangement picture before you move into the funding conversation.",
      notes: [
        "Keep this practical, not technical.",
        "You are not trying to lock the exact plan.",
        "Use the cost range to make the picture real."
      ]
    }
  },
  {
    id: 7,
    title: "Funding Gap",
    phase: "discovery",
    qaRequired: false,
    script: [
      "If something happened tomorrow, is there money specifically set aside for this, or would [BeneficiaryName] have to pull from general savings?"
    ],
    performanceScript: [
      "If something happened tomorrow, is there money specifically set aside for this, or would [BeneficiaryName] have to pull from general savings?"
    ],
    focus: {
      reminder: "Separate protected money from general money.",
      visualCue: "Do not argue with savings. Clarify what that money is really meant to do."
    },
    branchControl: {
      stateKey: "fundingStatus",
      label: "Funding Gap",
      helpText: "Choose whether the money is specifically set aside or would need to come from general savings.",
      options: [
        {
          value: "set-aside",
          label: "Money Set Aside",
          description: "Use this when they do have money available, but it may just be general savings.",
          script: [
            "Okay, that's good.",
            "Is that money really set aside for this, or is it more just general money that would have to be used if something happened?",
            "The reason I ask is sometimes people do have money, but it's not really separated out for this.",
            "Yeah... and that's what I see most of the time.",
            "It just ends up putting everything on one person all at once."
          ],
          performanceScript: [
            "Okay, that's good. Is that money really set aside for this, or is it more just general money that would have to be used if something happened?"
          ],
          helperLines: [
            "Do not argue with their savings.",
            "Keep the distinction simple and human.",
            "Listen for whether it is truly earmarked or just sitting in a general account."
          ],
          promptNotes: [
            "Keep this calm and matter-of-fact.",
            "Do not make this sound salesy."
          ]
        },
        {
          value: "would-scramble",
          label: "Would Scramble",
          description: "Use this when they admit the family would have to figure it out under pressure.",
          script: [
            "Okay, and that's exactly the kind of spot people are trying to avoid.",
            "When nothing is specifically set aside, [BeneficiaryName] ends up trying to figure it out while they're already grieving."
          ],
          performanceScript: [
            "Okay, and that's exactly the kind of spot people are trying to avoid.",
            "When nothing is specifically set aside, [BeneficiaryName] ends up trying to figure it out while they're already grieving."
          ],
          helperLines: [
            "Validate their honesty before moving forward.",
            "Keep the pressure practical, not dramatic.",
            "If they sound embarrassed, lower your tone and slow down."
          ],
          promptNotes: [
            "This is about pressure, not blame.",
            "Keep it conversational."
          ]
        }
      ]
    },
    prompt: {
      goal: "Distinguish between general savings and protected money so the need feels practical and personal.",
      notes: [
        "Even if they have money, explore whether it is truly meant for this.",
        "Keep [BeneficiaryName] at the center of the conversation."
      ]
    },
    workspace: {
      title: "Funding Gap",
      text: "Separate general savings from money that is actually protected for those first expenses.",
      groups: ["familyResponsibility", "currentSupport"],
      notes: {
        key: "currentSupportNotes",
        label: "Funding Notes",
        placeholder: "What is already set aside and where would the pressure still land?"
      }
    }
  },
  {
    id: 8,
    title: "Concern Confirmation",
    phase: "discovery",
    qaRequired: false,
    script: [
      "So the main thing you want is making sure [BeneficiaryName] doesn't have to scramble with those first expenses, right?",
      "And if that part were already handled, that just makes things a lot easier to deal with, right?"
    ],
    performanceScript: [
      "So the main thing you want is making sure [BeneficiaryName] doesn't have to scramble with those first expenses, right?",
      "And if that part were already handled, that just makes things a lot easier to deal with, right?"
    ],
    focus: {
      reminder: "Lock one clear burden before the bridge.",
      visualCue: "Get agreement in simple language."
    },
    workspace: {
      title: "Concern Confirmation",
      text: "Confirm the main burden in simple language before you pivot.",
      groups: ["protectionPriority"],
      notes: {
        key: "protectionPriorityNotes",
        label: "Bridge Notes",
        placeholder: "Capture the one pressure point you want to carry into the bridge"
      }
    },
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
    id: 10,
    title: "Hinge Bridge",
    phase: "discovery",
    qaRequired: false,
    script: [
      "Based on what you shared with me, the main thing is making sure [BeneficiaryName] isn't left trying to sort this out while they're grieving you, right?",
      "[PAUSE]",
      "So from here, my job is to narrow this down the right way for you.",
      "The only way I can point you toward the right programs is by asking a few medical questions first.",
      "Once I have that, I can guide you toward the protection options that fit what you want handled for [BeneficiaryName]."
    ],
    performanceScript: [
      "Based on what you shared with me, the main thing is making sure [BeneficiaryName] isn't left trying to sort this out while they're grieving you, right?",
      "[PAUSE]",
      "So from here, my job is to narrow this down the right way for you.",
      "The only way I can point you toward the right programs is by asking a few medical questions first.",
      "Once I have that, I can guide you toward the protection options that fit what you want handled for [BeneficiaryName]."
    ],
    focus: {
      reminder: "This is the pivot from emotion to process.",
      visualCue: "Pause after the tie-down and wait for agreement."
    },
    workspace: {
      title: "Hinge Bridge",
      text: "Tie back to the burden they named, then earn the move into medical.",
      groups: ["discoveryBridge"],
      notes: {
        key: "protectionPriorityNotes",
        label: "Bridge Notes",
        placeholder: "Capture the one pressure point you want to carry into the bridge"
      }
    },
    prompt: {
      goal: "Make the move into medical feel earned, personal, and necessary.",
      notes: [
        "Tie back to the burden they described in their own words.",
        "Get agreement before moving into medical.",
        "Present the medical questions as a sorting tool, not an obstacle."
      ]
    },
    helperLines: [
      "Use their exact concern if they gave you one: confusion, pressure, chaos, or burden.",
      "Pause after the tie-down and wait for agreement.",
      "If they hesitate, restate the reason before moving on."
    ],
    promptNotes: [
      "This is the pivot from emotion to process.",
      "Stay warm and certain.",
      "Do not sound procedural here."
    ]
  },
  {
    id: 11,
    title: "Trust Bridge / Qualification Setup",
    phase: "discovery",
    qaRequired: false,
    script: [
      "[ClientName], I really do appreciate the fact that you care enough about your family to get ahead of this.",
      "What I'm going to do from here is see if I can get you qualified for one of the preferred plans.",
      "If you do qualify, that's usually where the better value is.",
      "While I pull that up, go ahead and grab a pen and paper and let me know when you're ready.",
      "My name again is [AdvisorName].",
      "My direct line, if you need me for anything at all, is [AdvisorPhone].",
      "My National Producer Number is [AdvisorNPN]. That's just my license number if you ever want to verify who you're speaking with.",
      "And as your licensed advisor, I'll walk you through everything step by step."
    ],
    performanceScript: [
      "[ClientName], I really do appreciate the fact that you care enough about your family to get ahead of this.",
      "What I'm going to do from here is see if I can get you qualified for one of the preferred plans.",
      "While I pull that up, go ahead and grab a pen and paper and let me know when you're ready.",
      "My name again is [AdvisorName], and my direct line is [AdvisorPhone].",
      "My National Producer Number is [AdvisorNPN]. That's just my license number if you ever want to verify who you're speaking with."
    ],
    focus: {
      reminder: "Keep this calm, confident, and reassuring.",
      visualCue: "Qualification should feel like the next logical step, not a pitch reset."
    },
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
          comparisonOptions: createPriceComparisonOptions(),
          script: createPricePresentationScript()
        }),
        createProductOutcomeOption("emc-graded", {
          comparisonOptions: createPriceComparisonOptions(),
          script: createPricePresentationScript()
        }),
        createProductOutcomeOption("eternal-legacy", {
          comparisonOptions: createPriceComparisonOptions(),
          script: createPricePresentationScript()
        }),
        createProductOutcomeOption("no-option", {
          script: [
            "There is no price presentation on a no-option route."
          ]
        })
      ]
    },
    prompt: {
      goal: "Use a three-option comparison that feels natural, clear, and easy to decide on",
      notes: [
        "Lead with the good news, then walk them through what this looks like and get them set up the right way.",
        "Show Option 1 first, Option 2 second, and Option 3 third.",
        "Frame the middle as where most people land because it solves the problem without stretching them too far.",
        "Close by asking where it feels most comfortable so you do not overdo it or underdo it.",
        "Use the quick objection buttons the moment they give you a reason not to move forward."
      ]
    }
  },
  {
    id: 21,
    title: "Close Response Flow",
    qaRequired: false,
    modeSensitive: true,
    script: [
      "Select the response path that matches what the client just said."
    ],
    performanceScript: [],
    branchControl: {
      stateKey: "closeResponseFlow",
      label: "Close Response Flow",
      replaceBaseOnSelect: true,
      options: [
        {
          value: "picked-middle",
          label: "Picked Middle Option",
          status: "MOVE FORWARD",
          script: [
            "Perfect -- that's exactly where most people land.",
            "Let's go ahead and get that set up so [BeneficiaryName] is protected starting today."
          ]
        },
        {
          value: "picked-lower",
          label: "Picked Lower Option",
          script: [
            "Got it -- we can definitely do that.",
            "Just so you know, that will handle the basics...",
            "It just doesn't give quite the same breathing room we talked about.",
            "(pause)",
            "Is that what you feel comfortable with?"
          ],
          reinforcementLines: createCloseResponseReinforcement()
        },
        {
          value: "picked-higher",
          label: "Picked Higher Option",
          script: [
            "Got it -- that gives them full coverage and then some.",
            "Most people just don't want to stretch themselves too far monthly...",
            "(pause)",
            "Is that something you feel comfortable maintaining long-term?"
          ],
          reinforcementLines: createCloseResponseReinforcement()
        },
        {
          value: "hesitation",
          label: "Hesitation / Unsure",
          script: [
            "No worries.",
            "Is it the monthly you're thinking about...",
            "or just making sure we're not overdoing it?"
          ],
          reinforcementLines: createCloseResponseReinforcement()
        },
        {
          value: "need-to-think",
          label: "Need To Think About It",
          levels: [
            {
              label: "Level 1",
              lines: [
                "I hear you.",
                "Usually when someone says that, it's just because something doesn't feel 100% yet.",
                "Is it the monthly... or just wanting to make sure this is the right fit?"
              ]
            },
            {
              label: "Level 2",
              lines: [
                "Got it.",
                "Let me ask you something.",
                "If everything we went over makes sense...",
                "what specifically would you need to think through before getting this in place for [BeneficiaryName]?"
              ]
            },
            {
              label: "Level 3",
              lines: [
                "Look, I'll be straight with you.",
                "The whole point here is making sure [BeneficiaryName] doesn't get stuck dealing with this financially.",
                "We already found something that works.",
                "And the longer this sits, the more likely it is something changes on you.",
                "(pause)",
                "So let's just take care of this today while it's here and while it fits."
              ]
            }
          ],
          reinforcementLines: createCloseResponseReinforcement()
        }
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
            "Perfect -- now let's get the final details locked in the right way.",
            "We'll confirm your beneficiary details, lock in your draft date, and make sure everything is lined up correctly for the policy.",
            "Then right after that, we'll finish the banking information so your start date keeps moving in the right direction."
          ]
        }),
        createProductOutcomeOption("emc-graded", {
          script: [
            "Perfect -- now let's get the final details locked in the right way.",
            "We'll confirm your beneficiary details, lock in your draft date, and make sure everything is lined up correctly for the policy.",
            "Then right after that, we'll finish the banking information so your start date keeps moving in the right direction."
          ]
        }),
        createProductOutcomeOption("eternal-legacy", {
          script: [
            "Perfect -- now let's get the final details locked in the right way.",
            "We'll confirm your beneficiary details, lock in your draft date, and make sure everything is lined up correctly for the policy.",
            "Then right after that, we'll finish the banking information so your start date keeps moving in the right direction."
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
      goal: "Move the client from commitment into beneficiary, draft-date, and payment setup",
      notes: [
        "Do not reopen the whole sale here.",
        "Keep momentum tight and procedural.",
        "Set the draft date instead of framing it like an open-ended choice."
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
