// Demo content: shows what blog and videos look like once populated.
// Only renders when NEXT_PUBLIC_DEMO_CONTENT=1 (set in .env.local, which never
// deploys). Titles come from LadyF's real 30-video content plan, so the
// preview reflects the actual future, not lorem ipsum.

export const demoMode = process.env.NEXT_PUBLIC_DEMO_CONTENT === "1";

export const demoPosts = [
  {
    slug: "demo-stop-building",
    title: "Stop Building. Your Idea Is Not Validated, and You Cannot Tell.",
    excerpt:
      "Shallow one-prompt validation feels like progress. Here is how to know whether you have evidence or noise, before the build eats your savings.",
    date: "2026-08-21",
  },
  {
    slug: "demo-system-prompt-brain",
    title: "The System Prompt Is Your Product's Brain. Most Founders Never Write One.",
    excerpt:
      "There is a part of your product you have never seen, and it decides whether users stay. A walkthrough for people who do not code.",
    date: "2026-08-14",
  },
  {
    slug: "demo-validate-one-afternoon",
    title: "How I Validate an AI Idea in One Afternoon. No Surveys, No Guessing.",
    excerpt:
      "The exact method: what I look for, where I look, and how I read the evidence without losing what it is telling me.",
    date: "2026-08-07",
  },
  {
    slug: "demo-lovable-bolt-cursor",
    title: "Lovable vs Bolt vs Cursor: The Only Framework a Non-Technical Founder Needs.",
    excerpt:
      "Stop comparing features. The Ladder tells you which tool to start with based on where you actually are, and when to graduate.",
    date: "2026-07-31",
  },
  {
    slug: "demo-ninety-percent-fail",
    title: "90% of AI Products Fail Here, and It Is Not the Build.",
    excerpt:
      "The failure point is upstream of the code. Where products actually die, and the discipline that keeps yours alive.",
    date: "2026-07-24",
  },
  {
    slug: "demo-context-engineering",
    title: "Context Engineering, Explained for People Who Do Not Code.",
    excerpt:
      "The term is everywhere and the explanations are for developers. Here is what it means for your product, in plain language.",
    date: "2026-07-17",
  },
  {
    slug: "demo-vibe-coded-app",
    title: "Your Vibe-Coded App Works. Why Does It Behave So Randomly?",
    excerpt:
      "It is not the tool and it is not you. It is the instructions your product is running on. The fix takes one focused afternoon.",
    date: "2026-07-10",
  },
];

export const demoVideos = [
  {
    title: "How to Build an App With Claude as a Non-Technical Founder",
    description:
      "Start before you code: the validate-first build process, shown end to end with a real idea.",
    duration: "18:42",
  },
  {
    title: "Stuck in Lovable, Burning Credits on Visual Edits?",
    description:
      "The rule nobody taught you about visual edits versus AI prompts, and how to stop the credit drain in week one.",
    duration: "12:18",
  },
  {
    title: "Stop Building. Your Idea Is Not Validated.",
    description:
      "Why one-prompt validation is noise, and what real evidence looks like before you spend a dollar.",
    duration: "15:05",
  },
  {
    title: "The System Prompt Is Your Product's Brain.",
    description:
      "The part of your product you have never seen, and how to write it without coding.",
    duration: "21:33",
  },
  {
    title: "Lovable vs Bolt vs Cursor: The Ladder.",
    description:
      "The only decision framework a non-technical founder needs for choosing a build tool.",
    duration: "16:51",
  },
  {
    title: "I Am Building Verd AI in Public. Month One, Real Numbers.",
    description:
      "Signups, spend, mistakes, and what the evidence said versus what I expected.",
    duration: "14:27",
  },
];
