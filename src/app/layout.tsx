import type { Metadata } from "next"
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { THEME_STORAGE_KEY } from "@/lib/theme"

// Variable font: the weight axis covers 400, 600 and 800, and next/font only
// accepts extra axes when the weight is variable.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
})

// Runs before first paint so the page never flashes the wrong theme: the saved
// choice wins, otherwise follow prefers-color-scheme.
const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`

export const metadata: Metadata = {
  title: "Björn Tirsén — Software Engineer",
  description:
    "Software engineer in Stockholm working across full stack and platform engineering, currently on identity and authentication at SBAB.",
  keywords: [
    "Björn Tirsén",
    "Full Stack Developer",
    "React",
    "Node.js",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Björn Tirsén" }],
  creator: "Björn Tirsén",
  metadataBase: new URL("https://www.bjorntirsen.se/"),
  openGraph: {
    title: "Björn Tirsén — Software Engineer",
    description:
      "Software engineer in Stockholm working across full stack and platform engineering, currently on identity and authentication at SBAB.",
    url: "https://www.bjorntirsen.se/",
    siteName: "Björn Tirsén Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Björn Tirsén — Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Björn Tirsén — Software Engineer",
    description:
      "Software engineer in Stockholm working across full stack and platform engineering, currently on identity and authentication at SBAB.",
    images: ["/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
