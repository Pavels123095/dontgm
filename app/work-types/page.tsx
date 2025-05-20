"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ClientButtons from "@/components/client-buttons"
import { useState } from "react"
import DeliveryCalculatorModal from "@/components/modals/delivery-calculator-modal"

export default function WorkTypesPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)
  const workTypes = [
    {
      id: "excavation",
      title: "Земляные работы",
      description: "Выполнение различных видов земляных работ с использованием современной техники.",
      details: [
        "Разработка котлованов и траншей",
        "Планировка и выравнивание участков",
        "Устройство насыпей и выемок",
        "Разработка грунта в стесненных условиях",
        "Вывоз и утилизация грунта",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "mining",
      title: "Добыча полезных ископаемых",
      description: "Профессиональная добыча различных видов полезных ископаемых с соблюдением всех экологических норм.",
      details: [
        "Разработка карьеров",
        "Добыча песка и щебня",
        "Добыча известняка и гранита",
        "Рекультивация земель после добычи",
        "Переработка добытых материалов",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "construction",
      title: "Промышленное строительство",
      description: "Строительство промышленных объектов любой сложности с соблюдением всех технических требований.",
      details: [
        "Строительство производственных зданий",
        "Возведение складских комплексов",
        "Строительство инженерных сооружений",
        "Монтаж металлоконструкций",
        "Устройство фундаментов под промышленное оборудование",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "road",
      title: "Дорожное строительство",
      description: "Строительство и ремонт дорог различных категорий с использованием современных технологий.",
      details: [
        "Устройство дорожного основания",
        "Укладка асфальтобетонного покрытия",
        "Строительство подъездных путей",
        "Устройство водоотводных сооружений",
        "Установка дорожных знаков и ограждений",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "concrete",
      title: "Бетонные работы",
      description: "Выполнение всех видов бетонных работ с гарантией качества и соблюдением технологий.",
      details: [
        "Устройство монолитных фундаментов",
        "Возведение монолитных стен и перекрытий",
        "Устройство промышленных полов",
        "Бетонирование в зимних условиях",
        "Устройство железобетонных конструкций",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px]">
        <div className="absolute inset-0">
          <Image src="/placeholder.svg?height=300&width=1200" alt="Виды работ" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-black/60">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-4">Виды работ</h1>
            <p className="text-xl text-white max-w-2xl">
              Полный спектр услуг в сфере промышленного строительства и добычи полезных ископаемых
            </p>
          </div>
        </div>
      </section>

      {/* Work Types Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Наши услуги</h2>

          <div className="space-y-16">
            {workTypes.map((workType, index) => (
              <div
                key={workType.id}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12 items-center`}
              >
                <div className="md:w-1/2 relative h-[300px] w-full rounded-lg overflow-hidden">
                  <Image
                    src={workType.image || "/placeholder.svg"}
                    alt={workType.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">{workType.title}</h3>
                  <p className="text-gray-700 mb-6">{workType.description}</p>

                  <Accordion type="single" collapsible className="mb-6">
                    <AccordionItem value="details">
                      <AccordionTrigger className="text-blue-600">Подробнее о работах</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          {workType.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="flex space-x-4">
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={openModal}>Заказать услугу</Button>
                    <ClientButtons buttonType="contactForm" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                      Узнать стоимость
                    </ClientButtons>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Нужна консультация специалиста?</h2>
            <p className="text-gray-700 mb-8">
              Наши эксперты готовы ответить на все ваши вопросы и помочь выбрать оптимальное решение для вашего проекта.
              Свяжитесь с нами для получения бесплатной консультации.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <ClientButtons buttonType="callRequest" size="lg" className="bg-blue-600 hover:bg-blue-700">
                Заказать звонок
              </ClientButtons>
              <ClientButtons buttonType="contactForm" size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Отправить запрос
              </ClientButtons>
            </div>
          </div>
        </div>
      </section>
      <DeliveryCalculatorModal open={modalOpen} onClose={closeModal} />
    </main>
  )
}
