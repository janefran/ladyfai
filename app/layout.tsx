import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import MouseTrail from "@/components/MouseTrail";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "LadyF AI | From idea to a product still winning a year after launch",
    template: "%s | LadyF AI",
  },
  description: site.description,
  keywords: [
    "LadyF AI",
    "Janefrances Christopher",
    "AI product strategist",
    "validate AI product idea",
    "non-technical founder",
    "Build Gate",
    "Aha Walk",
    "Verd AI",
    "system prompt",
    "product retention",
  ],
  openGraph: {
    title: "LadyF AI",
    description: site.description,
    url: site.url,
    siteName: "LadyF AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LadyF AI",
    description: site.description,
  },
};

const themeInit = `
(function () {
  try {
    var saved = localStorage.getItem("ladyfai-theme");
    if (saved === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={`${display.variable} ${body.variable}`}>
        <MouseTrail />
        {children}
      </body>
    </html>
  );
}
