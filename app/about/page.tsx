"use client"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AboutPage() {
  const timeline = [
    {
      year: "2005",
      title: "Основание компании",
      description:
        "Компания была основана группой профессионалов с многолетним опытом работы в сфере промышленного строительства.",
    },
    {
      year: "2008",
      title: "Расширение деятельности",
      description:
        "Начало работы в сфере добычи полезных ископаемых. Приобретение первого карьера для добычи песка и щебня.",
    },
    {
      year: "2012",
      title: "Модернизация оборудования",
      description:
        "Масштабное обновление парка техники и оборудования. Внедрение современных технологий добычи и переработки.",
    },
    {
      year: "2015",
      title: "Выход на новые рынки",
      description: "Расширение географии деятельности. Начало работы в новых регионах России.",
    },
    {
      year: "2018",
      title: "Сертификация ISO",
      description: "Получение международных сертификатов качества ISO 9001 и ISO 14001.",
    },
    {
      year: "2023",
      title: "Современное развитие",
      description:
        "Внедрение инновационных технологий и цифровизация бизнес-процессов. Расширение ассортимента продукции и услуг.",
    },
  ]

  const stats = [
    { value: "18+", label: "лет опыта" },
    { value: "500+", label: "реализованных проектов" },
    { value: "300+", label: "сотрудников" },
    { value: "10+", label: "регионов присутствия" },
  ]

  const certificates = [
    { src: "/images/docs/licence1.png", alt: "Сертификат 1" },
    { src: "/images/docs/licence2.png", alt: "Сертификат 2" },
    { src: "/images/docs/licence3.png", alt: "Лицензия 1" },
    { src: "/images/docs/licence4.png", alt: "Свидетельство о допуске" },
  ]
  const [lightbox, setLightbox] = useState<{src: string, alt: string} | null>(null)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px]">
        <div className="absolute inset-0">
          <Image src="/images/about.png" alt="О компании" fill className="object-cover" priority />
        </div>
        <div className="relative inset-0 bg-black/60">
          <div className="container mx-auto py-4 px-4 h-full flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-4">О компании</h1>
            <p className="text-xl text-white max-w-2xl">
              Многолетний опыт и профессионализм в сфере промышленного строительства и добычи полезных ископаемых
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Наша компания</h2>
              <p className="text-gray-700 mb-4">
                Наша компания является одним из лидеров в сфере промышленного строительства и добычи полезных
                ископаемых. Мы предлагаем полный спектр услуг от проектирования до реализации проектов любой сложности.
              </p>
              <p className="text-gray-700 mb-4">
                Многолетний опыт работы, профессиональная команда специалистов и современное оборудование позволяют нам
                выполнять работы на высоком уровне качества и в установленные сроки.
              </p>
              <p className="text-gray-700 mb-6">
                Мы гордимся нашей репутацией надежного партнера и стремимся к постоянному совершенствованию и развитию,
                внедряя инновационные технологии и оптимизируя бизнес-процессы.
              </p>
            </div>
            <div className="md:w-1/2 relative h-[400px]">
              <Image
                width={400}
                height={400}
                src="/images/logo.jpg"
                alt="О компании"
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">История компании</h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-600 z-10"></div>

                  <div
                    className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center`}
                  >
                    <div className="md:w-1/2 text-center md:text-right md:pr-12 pb-8 md:pb-0">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                    <div className="md:w-1/2 md:pl-12"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Наша команда</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Иванов Иван",
                position: "Генеральный директор",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Петров Петр",
                position: "Технический директор",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Сидорова Анна",
                position: "Финансовый директор",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Козлов Алексей",
                position: "Руководитель проектов",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-64 relative">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Сертификаты и лицензии</h2>
              <p className="text-gray-700 mb-6">
                Наша компания имеет все необходимые сертификаты и лицензии для осуществления деятельности в сфере
                промышленного строительства и добычи полезных ископаемых. Мы соблюдаем все требования законодательства и
                стандарты качества.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <span>Лицензия на добычу полезных ископаемых</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <span>Сертификат ISO 9001:2015</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <span>Сертификат ISO 14001:2015</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <span>Свидетельство СРО</span>
                </li>
              </ul>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setLightbox(certificates[0])}>Смотреть все сертификаты</Button>
            </div>
            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {certificates.map((cert, idx) => (
                <div key={idx} className="cursor-pointer group" onClick={() => setLightbox(cert)}>
                  <div className="overflow-hidden rounded shadow-md group-hover:shadow-xl transition-shadow">
                    <Image src={cert.src} alt={cert.alt} width={230} height={290} className="object-cover w-full h-auto" />
                  </div>
                  <div className="text-center text-sm mt-2 text-gray-700">{cert.alt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setLightbox(null)}>
          <div className="relative max-w-full max-h-full p-4" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-white text-2xl" onClick={() => setLightbox(null)}>&times;</button>
            <Image src={lightbox.src} alt={lightbox.alt} width={600} height={800} className="object-contain max-h-[80vh] max-w-[90vw] rounded shadow-lg" />
            <div className="text-center text-white mt-4 text-lg">{lightbox.alt}</div>
          </div>
        </div>
      )}
    </main>
  )
}
