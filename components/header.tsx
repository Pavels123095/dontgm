"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import ClientButtons from "@/components/client-buttons"

const navItems = [
  { label: "Главная", href: "/" },
  { label: "О компании", href: "/about" },
  // { label: "Услуги", href: "/services" },
  { label: "Реализация", href: "/products" },
  { label: "Виды работ", href: "/work-types" },
  { label: "Вакансии", href: "/vacancies" },
  { label: "Контакты", href: "/contacts" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/images/logo.jpg"
              alt="Логотип"
              width={75}
              height={75}
              className="mr-2"
            />
          </div>
          <nav className="hidden md:flex space-x-4 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-gray-600 hover:text-blue-800",
                  pathname === item.href ? "text-blue-600" : "text-gray-700 hover:text-blue-600 hover:bg-gray-100",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-2">
          <ClientButtons
              buttonType="callRequest"
              className="text-blue-800 border-blue-800"
              variant="outline"
              size="sm"
            >
              Заказать звонок
            </ClientButtons>
          </div>
        </div>
      </header>
  )
}
