"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check } from "lucide-react"

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
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
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Ошибка отправки сообщения")
      }

      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      }, 3000)
    } catch (error) {
      console.error("Error sending message:", error)
      setError(error instanceof Error ? error.message : "Произошла ошибка при отправке сообщения")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px]">
        <div className="absolute inset-0">
          <Image src="/placeholder.svg?height=300&width=1200" alt="Контакты" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-black/60">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-4">Контакты</h1>
            <p className="text-xl text-white max-w-2xl">Свяжитесь с нами любым удобным для вас способом</p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Phone className="h-8 w-8 text-blue-600" />,
                title: "Телефон",
                details: ["+7 (123) 456-78-90", "+7 (123) 456-78-91"],
              },
              {
                icon: <Mail className="h-8 w-8 text-blue-600" />,
                title: "Email",
                details: ["info@example.com", "sales@example.com"],
              },
              {
                icon: <MapPin className="h-8 w-8 text-blue-600" />,
                title: "Адрес",
                details: ["123456, Россия,", "г. Москва, ул. Примерная, д. 10"],
              },
              {
                icon: <Clock className="h-8 w-8 text-blue-600" />,
                title: "Режим работы",
                details: ["Пн-Пт: 9:00 - 18:00", "Сб-Вс: выходной"],
              },
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                {item.details.map((detail, i) => (
                  <p key={i} className="text-gray-700">
                    {detail}
                  </p>
                ))}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map and Form Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Map */}
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold mb-6">Мы на карте</h2>
              <div className="h-[400px] bg-gray-300 rounded-lg relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-600">Здесь будет карта</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold mb-6">Напишите нам</h2>
              {!isSubmitted ? (
                <Card className="p-6">
                  {error && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm mb-4">
                      {error}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@mail.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Тема обращения</Label>
                      <Select onValueChange={handleSelectChange} value={formData.subject}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тему" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultation">Консультация</SelectItem>
                          <SelectItem value="order">Заказ услуги</SelectItem>
                          <SelectItem value="cooperation">Сотрудничество</SelectItem>
                          <SelectItem value="other">Другое</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Сообщение</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Опишите ваш вопрос или запрос..."
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900" disabled={isLoading}>
                      {isLoading ? "Отправка..." : "Отправить сообщение"}
                    </Button>
                  </form>
                </Card>
              ) : (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Сообщение отправлено!</h3>
                  <p className="text-gray-600">
                    Спасибо за обращение. Мы рассмотрим ваше сообщение и свяжемся с вами в ближайшее время.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Наши офисы</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                city: "Москва",
                address: "ул. Примерная, д. 10",
                phone: "+7 (123) 456-78-90",
                email: "moscow@example.com",
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                city: "Санкт-Петербург",
                address: "ул. Образцовая, д. 15",
                phone: "+7 (123) 456-78-91",
                email: "spb@example.com",
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                city: "Екатеринбург",
                address: "ул. Тестовая, д. 20",
                phone: "+7 (123) 456-78-92",
                email: "ekb@example.com",
                image: "/placeholder.svg?height=200&width=300",
              },
            ].map((office, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 relative">
                  <Image src={office.image || "/placeholder.svg"} alt={office.city} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{office.city}</h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="flex items-start">
                      <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                      <span>{office.address}</span>
                    </p>
                    <p className="flex items-center">
                      <Phone className="h-5 w-5 text-blue-600 mr-2" />
                      <span>{office.phone}</span>
                    </p>
                    <p className="flex items-center">
                      <Mail className="h-5 w-5 text-blue-600 mr-2" />
                      <span>{office.email}</span>
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
