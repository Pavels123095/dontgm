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
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    preferredTime: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const isModalOpen = isOpen && type === "callRequest"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subject: "Заказ звонка",
          message: `Заказ звонка от ${formData.name}. Предпочтительное время: ${formData.preferredTime}`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Ошибка отправки заявки")
      }

      setIsSubmitted(true)

      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          phone: "",
          preferredTime: "",
        })
        onClose()
      }, 3000)
    } catch (error) {
      console.error("Error sending request:", error)
      setError(error instanceof Error ? error.message : "Произошла ошибка при отправке заявки")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Заказать звонок</DialogTitle>
              <DialogDescription>
                Оставьте свои контактные данные, и мы свяжемся с вами в удобное для вас время.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              {error && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Иван Иванов"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTime">Удобное время для звонка</Label>
                <Input
                  id="preferredTime"
                  name="preferredTime"
                  placeholder="Например: с 14:00 до 18:00"
                  value={formData.preferredTime}
                  onChange={handleChange}
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
              Спасибо за обращение. Мы свяжемся с вами в указанное время.
            </DialogDescription>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
