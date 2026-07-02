import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "../../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-Playfair_Display",
});

export const metadata: Metadata = {
  title: "Seatown Container Line | Global Ocean Logistics Experience",
  description: "Experience premium international shipping, maritime container logistics, NVOCC cargo networks, and modern real-time ocean trade connectivity.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${playfair.variable} h-full antialiased`}>
            <body>
                {children}
            </body>
        </html>
    )
}