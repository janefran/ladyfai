import { getSupabase } from "@/lib/supabase";

export type Testimonial = {
  quote: string;
  highlight: string; // a substring of quote rendered in the accent colour
  name: string;
  role: string;
};

// Placeholder testimonials until real ones are added from the admin panel.
export const builtInTestimonials: Testimonial[] = [
  {
    quote:
      "I was about to spend my savings building the wrong thing. In one afternoon she showed me what people actually wanted.",
    highlight: "what people actually wanted",
    name: "Emma Carter",
    role: "Founder, wellness app",
  },
  {
    quote:
      "Six months after launch, people are still paying me. That has genuinely never happened with anything I built before.",
    highlight: "people are still paying me",
    name: "Daniel Brooks",
    role: "Solo founder, fintech",
  },
  {
    quote:
      "I finally understood my own product well enough to explain it. The credits stopped burning overnight.",
    highlight: "the credits stopped burning",
    name: "Sofia Marino",
    role: "Non-technical founder",
  },
  {
    quote:
      "Everyone else taught me to ship and then vanished. She stayed with me through the hard part after launch.",
    highlight: "She stayed with me",
    name: "Liam Walsh",
    role: "Founder, edtech",
  },
  {
    quote:
      "The system-prompt work alone changed how my product behaves. My users stopped churning.",
    highlight: "My users stopped churning",
    name: "Hannah Lee",
    role: "Founder, health app",
  },
  {
    quote:
      "Research rigor I did not know existed for products. My retention doubled in a quarter.",
    highlight: "My retention doubled",
    name: "Marcus Reid",
    role: "Indie founder",
  },
];

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data } = await supabase
      .from("testimonials")
      .select("quote,highlight,name,role")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (data && data.length) {
      return data as Testimonial[];
    }
  }
  return builtInTestimonials;
}
