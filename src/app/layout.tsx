import type { Metadata, Viewport } from "next";
import { Outfit, Sacramento, Dancing_Script } from "next/font/google";
import "./globals.css";

// Load Outfit font for clean readable sans-serif text
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

// Load Sacramento font for elegant large script cursive accents
const sacramento = Sacramento({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sacramento",
});

// Load Dancing Script font for charming medium cursive headings
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "To The Sweetest Girl Ever 🌸✨",
  description: "A magical, personalized digital scrapbook fairytale filled with blooming lilies, cozy memories, warm love notes, and secret surprises. Custom-made just for you.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${sacramento.variable} ${dancingScript.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fff0f5] text-[#4a2c40]">
        {children}
      </body>
    </html>
  );
}
