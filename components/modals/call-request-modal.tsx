"use client"

import type React from "react"

import { useState } from "react"
import { useModal } from "@/hooks/use-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Check } from "lucide-react"

export function CallRequestModal() {
  const { isOpen, type, onClose } = useModal()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isModalOpen = isOpen && type === "callRequest"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)

      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setIsSubmitted(false)
        setName("")
        setPhone("")
        onClose()
      }, 3000)
    }, 1000)
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Заказать звонок</DialogTitle>
              <DialogDescription>
                Оставьте свои контактные данные, и наш специалист свяжется с вами в ближайшее время.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя</Label>
                <Input
                  id="name"
                  placeholder="Иван Иванов"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Номер телефона</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900" disabled={isLoading}>
                  {isLoading ? "Отправка..." : "Заказать звонок"}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl mb-2">Заявка отправлена!</DialogTitle>
            <DialogDescription>
              Спасибо за обращение. Наш специалист свяжется с вами в ближайшее время.
            </DialogDescription>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
