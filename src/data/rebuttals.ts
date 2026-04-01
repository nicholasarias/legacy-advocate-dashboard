export type RebuttalStageGroup = "early" | "late";

export interface RebuttalDefinition {
  id: number;
  label: string;
  category: string;
  stageGroup: RebuttalStageGroup;
  keywords: string[];
  favorite?: boolean;
  rebuttal: string;
  followUpLine: string;
  nextStepTarget?: string;
  sectionIds?: number[];
  sectionRange?: [number, number];
}

export const rebuttals: RebuttalDefinition[] = [
  {
    id: 101,
    label: "I already have coverage",
    category: "Already Covered",
    stageGroup: "early",
    keywords: ["already have", "already covered", "have insurance", "coverage in place", "policy"],
    favorite: true,
    rebuttal:
      "That's great to hear. A lot of people I work with already have something in place. My job is just to make sure it actually covers what they think it covers and that there isn't still a gap sitting there for [BeneficiaryName].",
    followUpLine:
      "That makes sense. Now when you think about why you wanted to look into this, who comes to mind first?",
    nextStepTarget: "person-anchor"
  },
  {
    id: 102,
    label: "Through work already",
    category: "Already Covered",
    stageGroup: "early",
    keywords: ["through work", "job coverage", "employer coverage", "benefits", "group policy"],
    favorite: true,
    rebuttal:
      "I'm glad you have that. The only issue with work coverage is it usually stays with the job, not with you. What we're doing here is making sure there is something personal in place that [BeneficiaryName] can count on no matter what changes at work.",
    followUpLine:
      "Let me narrow one thing down so I can point you the right way. Who would actually be the one handling everything if something happened?",
    nextStepTarget: "person-anchor"
  },
  {
    id: 103,
    label: "Just looking",
    category: "Interest Level",
    stageGroup: "early",
    keywords: ["just looking", "just browsing", "just checking", "looking around", "shopping around"],
    rebuttal:
      "That's fine. We do not have to force anything. Since you're already here, let me at least help you narrow down what would actually need to be handled so you know what you're comparing.",
    followUpLine:
      "When you think about taking care of this, who comes to mind first?",
    nextStepTarget: "person-anchor"
  },
  {
    id: 104,
    label: "I'm not interested",
    category: "Interest Level",
    stageGroup: "early",
    keywords: ["not interested", "no interest", "not for me", "do not want it"],
    favorite: true,
    rebuttal:
      "I understand. Most people are not interested in life insurance itself. They're interested in making sure family is not left trying to sort everything out after the fact.",
    followUpLine:
      "Let me ask you this... who would actually be the one handling everything if something happened?",
    nextStepTarget: "person-anchor"
  },
  {
    id: 105,
    label: "Busy right now",
    category: "Delay",
    stageGroup: "early",
    keywords: ["busy", "not a good time", "call back", "callback", "later", "another time"],
    favorite: true,
    rebuttal:
      "I get it. If now is not ideal, let me make the best use of the time we do have and narrow down the one thing that matters most here, so you are not starting over later.",
    followUpLine:
      "Who comes to mind first when you think about getting this taken care of?",
    nextStepTarget: "person-anchor"
  },
  {
    id: 106,
    label: "Need more info",
    category: "Trust / Info",
    stageGroup: "early",
    keywords: ["need more info", "need information", "questions", "not enough information", "explain more"],
    favorite: true,
    rebuttal:
      "Fair enough. That's exactly why I'm here. I'll keep it simple and walk you through it step by step so you can see what actually fits and what does not.",
    followUpLine:
      "Understood. Let me just narrow one thing down so I can point you the right way.",
    nextStepTarget: "person-anchor"
  },
  {
    id: 107,
    label: "Don't want to talk about death",
    category: "Emotional Pushback",
    stageGroup: "early",
    keywords: ["don't want to talk about death", "do not want to talk about death", "don't like talking about death", "death", "morbid"],
    rebuttal:
      "I understand. Nobody likes talking about it. The reason people still do is because avoiding the conversation does not stop [BeneficiaryName] from dealing with it later.",
    followUpLine:
      "Let me keep it simple. Who would be the one handling everything if something happened?",
    nextStepTarget: "person-anchor"
  },
  {
    id: 108,
    label: "I'll think about it later",
    category: "Delay",
    stageGroup: "early",
    keywords: ["think about it", "later", "sleep on it", "tomorrow", "think it over"],
    favorite: true,
    rebuttal:
      "I hear you. A lot of people say that before they've really narrowed down what they'd want handled. Before you set it aside, let me get right to the heart of it.",
    followUpLine:
      "When you think about why you wanted to look into this, who comes to mind first?",
    nextStepTarget: "person-anchor"
  },
  {
    id: 109,
    label: "Need to talk to spouse",
    category: "Talk To Someone",
    stageGroup: "early",
    keywords: ["spouse", "wife", "husband", "talk to my spouse", "talk to my wife", "talk to my husband"],
    rebuttal:
      "That makes sense. Most people want to keep their spouse in the loop. The best thing I can do is help you narrow this down first so you're bringing something clear back to them, not just a vague idea.",
    followUpLine:
      "Let me show you why this matters for [BeneficiaryName].",
    nextStepTarget: "loss-experience"
  },
  {
    id: 110,
    label: "Need to talk to family",
    category: "Talk To Someone",
    stageGroup: "early",
    keywords: ["family", "talk to family", "talk to my family", "ask my family", "kids", "children"],
    rebuttal:
      "I respect that. Family matters. Let me at least help you get clear on what would actually need to be handled so you know what you would be discussing with them.",
    followUpLine:
      "When you think about taking care of this, who comes to mind first?",
    nextStepTarget: "person-anchor"
  },
  {
    id: 111,
    label: "Need to pray about it",
    category: "Delay",
    stageGroup: "early",
    keywords: ["pray", "prayer", "need to pray", "pray about it"],
    rebuttal:
      "I understand. Most people who say that are just trying to make sure they are making the right move. Let me keep it simple and show you what this is really about first.",
    followUpLine:
      "Who would actually be the one handling everything if something happened?",
    nextStepTarget: "person-anchor"
  },
  {
    id: 112,
    label: "I have a term policy",
    category: "Already Covered",
    stageGroup: "early",
    keywords: ["term", "term policy", "term life", "term insurance"],
    rebuttal:
      "Term can be great for temporary coverage. The only issue is final expense does not usually show up on a schedule. That's where something more permanent can matter.",
    followUpLine:
      "Let me narrow one thing down so I can point you the right way. Who comes to mind first?",
    nextStepTarget: "person-anchor"
  },
  {
    id: 113,
    label: "Price concern",
    category: "Price",
    stageGroup: "early",
    keywords: ["price", "cost", "expensive", "too much", "afford", "budget"],
    rebuttal:
      "I get that. That's exactly why we do not start with numbers. First we figure out what would actually need to be handled, then we see what makes sense from there.",
    followUpLine:
      "Let me show you why this matters for [BeneficiaryName].",
    nextStepTarget: "paint-the-picture"
  },
  {
    id: 114,
    label: "Not sure",
    category: "Trust / Info",
    stageGroup: "early",
    keywords: ["not sure", "unsure", "don't know", "do not know", "not certain"],
    rebuttal:
      "That's okay. Most people are not 100% sure when we first start. My job is to narrow it down so it gets clearer as we go.",
    followUpLine:
      "Now let me get right to the heart of this... who comes to mind first?",
    nextStepTarget: "person-anchor"
  },
  {
    id: 201,
    label: "Too expensive",
    category: "Price",
    stageGroup: "late",
    keywords: ["too expensive", "expensive", "too much", "price high", "cost"],
    favorite: true,
    rebuttal:
      "I understand. A lot of people feel that way at first. The goal is not to overdo it. It is just to make sure [BeneficiaryName] is not left trying to cover all of this alone.",
    followUpLine:
      "Now just so I don't overdo it or underdo it for you... where does that feel most comfortable?",
    nextStepTarget: "price-choice"
  },
  {
    id: 202,
    label: "Already have insurance",
    category: "Already Covered",
    stageGroup: "late",
    keywords: ["already have", "already covered", "policy", "insurance", "life insurance"],
    favorite: true,
    rebuttal:
      "That's good. My job is not to tell you what you have is wrong. It's to make sure it actually covers what you want handled, especially those first expenses for [BeneficiaryName].",
    followUpLine:
      "Let's make sure that missing piece is covered too. Out of those, where does that feel most comfortable?",
    nextStepTarget: "price-choice"
  },
  {
    id: 203,
    label: "Need to think about it",
    category: "Delay",
    stageGroup: "late",
    keywords: ["think about it", "think", "sleep on it", "not sure", "later"],
    favorite: true,
    rebuttal:
      "I hear you.\nUsually when someone says that, it's just because something doesn't feel 100% yet.\nIs it the monthly, or just wanting to make sure this is the right fit?\n\nGot it.\nLet me ask you something.\nIf everything we went over makes sense, what specifically would you need to think through before getting this in place for [BeneficiaryName]?\n\nLook, I'll be straight with you.\nThe whole point here is making sure [BeneficiaryName] doesn't get stuck dealing with this financially.\nWe already found something that works.\nAnd the longer this sits, the more likely it is something changes on you.",
    followUpLine:
      "Which part feels like the bigger issue - the monthly or just making sure it's the right amount?",
    nextStepTarget: "price-choice"
  },
  {
    id: 204,
    label: "Need to talk to spouse",
    category: "Talk To Someone",
    stageGroup: "late",
    keywords: ["spouse", "wife", "husband", "talk to my spouse", "talk to my wife", "talk to my husband"],
    favorite: true,
    rebuttal:
      "I respect that. Big decisions should be shared. At the same time, the company is qualifying you, not your spouse. The smartest move is to get the approval locked in while we know it fits, and then review the details together.",
    followUpLine:
      "Let's go ahead and get this set up while everything still fits, then you can review the details together.",
    nextStepTarget: "enrollment"
  },
  {
    id: 205,
    label: "Need to talk to family",
    category: "Talk To Someone",
    stageGroup: "late",
    keywords: ["family", "talk to family", "ask family", "kids", "children", "son", "daughter"],
    rebuttal:
      "I understand. Family matters. But usually when people ask family for permission, it turns into delay, and delay is what hurts people with life insurance. The responsible move is to lock in what works while it still fits.",
    followUpLine:
      "Let's take care of this today while it is here and while it fits.",
    nextStepTarget: "enrollment"
  },
  {
    id: 206,
    label: "Need to pray about it",
    category: "Delay",
    stageGroup: "late",
    keywords: ["pray", "prayer", "need to pray", "pray about it"],
    rebuttal:
      "I respect that. Most people want peace before they make a decision. Usually the best way to get that is to make sure the numbers and the fit are clear first, so you're not still carrying uncertainty around with it.",
    followUpLine:
      "Before we leave it open-ended, is the real issue the monthly or just making sure it's the right fit?",
    nextStepTarget: "price-choice"
  },
  {
    id: 207,
    label: "Call me back",
    category: "Delay",
    stageGroup: "late",
    keywords: ["call me back", "call back", "callback", "later", "not today"],
    favorite: true,
    rebuttal:
      "I can do that, but usually when people say that they really just want a little more clarity before moving forward. So let me save you the back and forth - what's the main thing holding you up right now?",
    followUpLine:
      "If we can clear the main thing up right now, let's go ahead and get it set up while it still fits.",
    nextStepTarget: "enrollment"
  },
  {
    id: 208,
    label: "Need to check budget",
    category: "Price",
    stageGroup: "late",
    keywords: ["budget", "check budget", "monthly", "payments", "bills", "tight"],
    rebuttal:
      "I get that. That's why I showed you three ways to do this. We do not need to stretch things too far. We just need to make sure [BeneficiaryName] is not starting from zero when that day comes.",
    followUpLine:
      "Let's keep it within something comfortable. Where does that feel most manageable?",
    nextStepTarget: "price-choice"
  },
  {
    id: 209,
    label: "Employer coverage",
    category: "Already Covered",
    stageGroup: "late",
    keywords: ["job", "work", "employer", "benefits", "group policy"],
    rebuttal:
      "I'm glad you have that. The only issue with work coverage is you usually do not truly own it. If the job changes, the coverage can change too. What we're doing here is making sure you have something personal that stays with you.",
    followUpLine:
      "What we're protecting here is something you own. Let's finish locking that in for [BeneficiaryName].",
    nextStepTarget: "enrollment"
  },
  {
    id: 210,
    label: "Term policy",
    category: "Already Covered",
    stageGroup: "late",
    keywords: ["term", "term policy", "term life", "term insurance"],
    rebuttal:
      "Term can be good temporary coverage. The issue is final expense is still there whether the term is active or not. That's why people add something more permanent for this part of the plan.",
    followUpLine:
      "So let's make sure the permanent piece is handled too. Where does that feel most comfortable?",
    nextStepTarget: "price-choice"
  },
  {
    id: 211,
    label: "Has savings",
    category: "Money Elsewhere",
    stageGroup: "late",
    keywords: ["savings", "bank", "money set aside", "cash", "general savings"],
    favorite: true,
    rebuttal:
      "That's good. Savings are helpful. The issue is that money usually has more than one job. What we're doing here is building a protected bucket so [BeneficiaryName] is not pulling from general money when that day comes.",
    followUpLine:
      "Let's keep that general money intact and finish locking in the protected bucket for [BeneficiaryName].",
    nextStepTarget: "enrollment"
  },
  {
    id: 212,
    label: "Family will take care of it",
    category: "Money Elsewhere",
    stageGroup: "late",
    keywords: ["family will handle it", "family will take care", "kids will pay", "they can cover it"],
    rebuttal:
      "They probably would, because they love you. The better question is whether you want them to have to. Most people would rather leave family cared for than leave them the bill.",
    followUpLine:
      "Let's take that burden off them and get this set up today.",
    nextStepTarget: "enrollment"
  },
  {
    id: 213,
    label: "Not sure",
    category: "Delay",
    stageGroup: "late",
    keywords: ["not sure", "unsure", "don't know", "do not know", "not certain"],
    rebuttal:
      "That's okay. Usually when someone feels unsure, it just means there is one part that still needs to be narrowed down a little better.",
    followUpLine:
      "Which part feels like the bigger issue - the monthly or just making sure it's the right amount?",
    nextStepTarget: "price-choice"
  },
  {
    id: 214,
    label: "Want to wait",
    category: "Delay",
    stageGroup: "late",
    keywords: ["wait", "not today", "later on", "hold off"],
    rebuttal:
      "I understand. The only problem with waiting is this usually does not get easier later. We already found something that works today while it still fits.",
    followUpLine:
      "Let's go ahead and get this set up while everything still fits.",
    nextStepTarget: "enrollment"
  }
];
