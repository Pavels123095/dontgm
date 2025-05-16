import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import ModalProvider from "@/components/modal-provider"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Промышленная компания",
  description: "Промышленное строительство и добыча полезных ископаемых",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={inter.className + " with-background"}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ModalProvider />
          <div className="flex flex-col min-h-screen">
              <Header />
              {children}
              <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
