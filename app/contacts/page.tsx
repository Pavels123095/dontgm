import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactsPage() {
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
              <Card className="p-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ваше имя</Label>
                      <Input id="name" placeholder="Иван Иванов" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="example@mail.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Тема сообщения</Label>
                    <Input id="subject" placeholder="Тема вашего сообщения" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea id="message" placeholder="Введите ваше сообщение..." rows={5} required />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Отправить сообщение
                  </Button>
                </form>
              </Card>
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
