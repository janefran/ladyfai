export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  body: string[];
};

// The launch post. Later posts are published from /lf-studio and stored in Supabase.
export const builtInPosts: Post[] = [
  {
    slug: "why-i-left-ux-to-fix-how-founders-build",
    title:
      "I spent 13 years doing research where errors cost lives. Then I watched founders ignore research completely.",
    excerpt:
      "Most people in the product space will tell you to build fast and iterate. I am not going to tell you that. There is a step before building that almost nobody teaches, and skipping it is why most products fold.",
    date: "2026-06-12",
    body: [
      "Most people in the product space will tell you to build fast and iterate.",
      "I am not going to tell you that. Not because shipping fast is wrong. It is not. But there is a step that happens before “build fast” that almost nobody is teaching, and skipping it is exactly why most products fold. Even after raising money. Even after getting users. Even after a good launch month.",
      "That step is validation. But not the kind you have heard of.",
      "Here is what most people call validation: go talk to people. Ask them if they would use your product. If enough people say yes, build it.",
      "I have watched this play out hundreds of times. And I can tell you that “would you use this?” is probably the worst question you can ask anyone about your idea. Why? Because what people say and what people do are almost never the same thing. And if you do not know what you are trying to find out before you start asking, you are not doing research. You are collecting noise.",
      "I know what proper research looks like. I spent 13 years in scientific and medical research. In that world, you do not start asking questions until you have designed your study. You define what you are trying to learn. You think about how the data could mislead you. You build in ways to catch the difference between what a subject reports and what is actually happening. You do this because in medical research, a bad study design does not just waste time. It costs lives.",
      "Product builders do not have that pressure. So they skip the design phase entirely. They ask their friends. They get enthusiastic responses. They build. Six months later, nobody is paying.",
      "I watched this happen over and over in the UX work I was doing with startups. I would come in to design the interface and find that the product had no business being built in the first place. Not because the idea was bad, but because nobody had actually studied the problem.",
      "And there is a second thing nobody tells you. When the build itself turns into endless back and forth, when the credits burn in Lovable or Claude, founders blame themselves: “I am not technical, I must be missing something.” You are not missing anything technical. You are missing clarity on what you are building. Clarity comes from understanding your product well enough to explain it, and understanding how AI works well enough that your explanation helps it build. I learned this on my own builds. The day I had clarity, the back and forth stopped.",
      "Here is what actually happens when you validate correctly. You do not just learn whether people want your idea. You learn what is actually broken in their life right now. You learn the language they use when they are frustrated. You learn the workarounds they have already tried, and what they have already paid for that did not fix it. Then when you build, you are not guessing. You are building the exact thing the evidence told you to build.",
      "When you launch, your retention climbs, because people came looking for a solution and found it. They stay, because you solved the real problem, not the one you assumed they had. They refer others, because nothing else on the market does what yours does.",
      "This is not a theory. It is how research works. I have just applied it to product building.",
      "So what am I doing now? I am done staying in the background as a designer.",
      "I am building Verd AI, a validation tool built on actual research methodology. Bring a question, and it searches what people already say across the internet and returns a direct, evidence-backed answer. So any founder can know what they are building and why, before writing a single line of code.",
      "I also work on AI systems design for non-technical founders: the system prompts that decide how an AI product thinks and behaves. Because most founders do not just need validation help. They need someone who sits with them at the level of “how does this product actually work”, not just how it looks.",
      "Everything I put out from here is for one person: the non-technical founder building without a team or an engineering co-founder, who wants to go from idea to a product that is still growing a year after launch. Not a product that had a good first month. A product that is still there.",
      "If that is you: welcome. I show the whole process, weekly.",
    ],
  },
];
