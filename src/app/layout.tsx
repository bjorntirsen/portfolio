import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Björn Tirsén – Full Stack Developer",
  description:
    "Portfolio of Björn Tirsén, a passionate full stack developer specializing in React, Node.js, and modern web technologies.",
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
    title: "Björn Tirsén – Full Stack Developer",
    description:
      "Explore projects and connect with Björn Tirsén, a developer passionate about building high-quality web applications.",
    url: "https://www.bjorntirsen.se/",
    siteName: "Björn Tirsén Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Björn Tirsén – Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Björn Tirsén – Full Stack Developer",
    description:
      "Passionate full stack developer building modern web experiences.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
