import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { IntroSplash } from "@/components/IntroSplash";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ontologize.Aavya — Palantir Foundry & Ontology Practice",
  description:
    "Aavya's Ontologize practice helps enterprises close the gap between the data they hold and the decisions they need to make — through precision Ontology design, hands-on Palantir Foundry delivery, and training that builds lasting internal capability.",
  metadataBase: new URL("https://ontoligize.aavya.com"),
  openGraph: {
    title: "Ontologize.Aavya",
    description:
      "Precision Ontology design, hands-on Palantir Foundry delivery, training that lasts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.classList.remove("dark","light");document.documentElement.classList.add(t)}else if(window.matchMedia("(prefers-color-scheme:light)").matches){document.documentElement.classList.remove("dark");document.documentElement.classList.add("light")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <IntroSplash />
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
