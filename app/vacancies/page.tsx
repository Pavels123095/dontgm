import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function VacanciesPage() {
  const vacancies = [
    {
      title: "Инженер-строитель",
      location: "Москва",
      type: "Полная занятость",
      description:
        "Мы ищем опытного инженера-строителя для работы над крупными промышленными проектами. Требуется опыт работы не менее 3 лет в аналогичной должности.",
    },
    {
      title: "Оператор спецтехники",
      location: "Санкт-Петербург",
      type: "Полная занятость",
      description:
        "Требуется оператор спецтехники с опытом работы на экскаваторах и погрузчиках. Наличие соответствующих удостоверений обязательно.",
    },
    {
      title: "Менеджер по продажам",
      location: "Москва",
      type: "Полная занятость",
      description:
        "Ищем энергичного менеджера по продажам строительных материалов. Опыт работы в продажах от 2 лет, знание рынка строительных материалов.",
    },
    {
      title: "Геолог",
      location: "Екатеринбург",
      type: "Полная занятость",
      description:
        "Требуется геолог для работы на объектах добычи полезных ископаемых. Высшее профильное образование, опыт работы от 5 лет.",
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px]">
        <div className="absolute inset-0">
          <Image src="/placeholder.svg?height=300&width=1200" alt="Вакансии" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-black/60">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-4">Вакансии</h1>
            <p className="text-xl text-white max-w-2xl">
              Присоединяйтесь к нашей команде профессионалов и развивайтесь вместе с нами
            </p>
          </div>
        </div>
      </section>

      {/* Vacancies Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Открытые вакансии</h2>

            <div className="space-y-6">
              {vacancies.map((vacancy, index) => (
                <Card key={index} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{vacancy.title}</h3>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{vacancy.location}</span>
                        <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{vacancy.type}</span>
                      </div>
                      <p className="text-gray-600">{vacancy.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4">
                      <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">Откликнуться</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* No Suitable Vacancy Section */}
            <div className="mt-12 bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Не нашли подходящую вакансию?</h3>
              <p className="text-gray-600 mb-6">
                Отправьте нам свое резюме, и мы свяжемся с вами, когда появится подходящая позиция.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">Отправить резюме</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Преимущества работы у нас</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Стабильность",
                icon: "📈",
                description: "Официальное трудоустройство и стабильная заработная плата",
              },
              {
                title: "Развитие",
                icon: "🚀",
                description: "Возможности для профессионального роста и обучения",
              },
              {
                title: "Команда",
                icon: "👥",
                description: "Дружный коллектив профессионалов своего дела",
              },
              {
                title: "Проекты",
                icon: "🏗️",
                description: "Работа над интересными и масштабными проектами",
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
