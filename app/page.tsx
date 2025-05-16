"use client"

import Image from "next/image"
import ClientButtons from "@/components/client-buttons"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Phone, Mail } from "lucide-react"
import { usePathname } from "next/navigation"

const navItems = [
  { label: "Главная", href: "/" },
  { label: "О компании", href: "/about" },
  { label: "Услуги", href: "/services" },
  { label: "Реализация", href: "/products" },
  { label: "Виды работ", href: "/work-types" },
  { label: "Вакансии", href: "/vacancies" },
  { label: "Контакты", href: "/contacts" },
]
export default function Home() {
  const pathname = usePathname()
  return (
    <div className="flex flex-1">
      <aside className="with-background hidden md:block w-48 p-4">
        <Image
          src="/images/logo.jpg"
          alt="logo"
          width={150}
          height={150}
          className="mb-2"
        />
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block py-2 px-4 text-black font-bold hover:bg-blue-800 hover:text-white rounded transition-colors",
                pathname === item.href ? "text-blue-600" : "text-gray-700 hover:text-blue-600 hover:bg-gray-100",
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4">
          <ClientButtons 
            buttonType="contactForm" className="w-full bg-blue-800 hover:bg-blue-900">
              Связаться
          </ClientButtons>
          </div>
        </nav>
      </aside>
      <main className="flex-1 bg-[url('/placeholder.svg?height=1&width=1&text=&bg=e6d7b9')] bg-repeat">
        <div className="max-w-5xl mx-auto bg-white">
          <section className="relative">
            <div className="relative h-[400px]">
              <Image
                src="/images/main-1.jpg"
                alt="Земснаряд"
                fill
                className="object-cover"
              />
              <div className="relative inset-0 bg-black/30 flex flex-col justify-end p-8">
                <h1 className="text-lg md:text-4xl font-bold text-white mb-2">АО «Донгидрогидромеханизация»</h1>
                <p className="text-xl text-white">Превращаем время в песок</p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-blue-800 text-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="p-6 border-b md:border-b-0 md:border-r border-blue-700 text-center">
                  <div className="text-2xl font-bold mb-1">Более 65 лет</div>
                  <div className="text-sm">существования фирмы</div>
                </div>
                <div className="p-6 border-b md:border-b-0 md:border-r border-blue-700 text-center">
                  <div className="text-2xl font-bold mb-1">200+</div>
                  <div className="text-sm">выполненных проектов</div>
                </div>
                <div className="p-6 text-center">
                  <div className="text-2xl font-bold mb-1">500+</div>
                  <div className="text-sm">довольных клиентов</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-blue-700">
                <div className="p-6 border-b md:border-b-0 md:border-r border-blue-700">
                  <div className="text-xl font-bold mb-1">260 миллионов</div>
                  <div className="text-sm">кубических метров объем изъятого грунта</div>
                </div>
                <div className="p-6 border-b md:border-b-0 md:border-r border-blue-700">
                  <div className="text-xl font-bold mb-1">5 миллионов</div>
                  <div className="text-sm">м³/год производственная мощность</div>
                </div>
                <div className="p-6 flex flex-col items-center justify-center">
                  <div className="text-xl font-bold mb-1">Круглосуточно</div>
                  <div className="text-2xl font-bold">24/7</div>
                </div>
              </div>
            </div>
          </section>

          {/* History Section */}
          <section className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3">
                <h2 className="text-xl font-bold mb-4 text-blue-800 flex items-center">
                  <div className="w-1 h-6 bg-blue-800 mr-2"></div>
                  История нашей компании
                </h2>
                <p className="text-gray-700 mb-4">
                  АО «Донгидрогидромеханизация» - одна из крупнейших компаний в России, специализирующаяся на
                  гидромеханизированной разработке грунта, дноуглубительных работах и намыве территорий.
                </p>
                <p className="text-gray-700 mb-4">
                  Компания была основана более 65 лет назад и за это время накопила огромный опыт в реализации
                  сложнейших проектов по всей территории России и за ее пределами.
                </p>
                <Button className="bg-blue-800 hover:bg-blue-900">Подробнее</Button>
              </div>
              <div className="md:w-1/3">
                <div className="relative h-48 md:h-full">
                  <Image
                    src="/images/history-main.png"
                    alt="Историческое фото"
                    fill
                    className="object-cover grayscale"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="p-6 md:p-8 bg-gray-50">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="relative h-48 md:h-full">
                  <Image
                    src="/images/main-2.jpg"
                    alt="Наши услуги"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-xl font-bold mb-4 text-blue-800 flex items-center">
                  <div className="w-1 h-6 bg-blue-800 mr-2"></div>
                  Наши услуги
                </h2>
                <p className="text-gray-700 mb-4">
                  Компания предоставляет полный комплекс услуг по гидромеханизированной разработке грунта, включая
                  проектирование, выполнение работ и сопровождение проектов.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Дноуглубительные работы на реках, озерах и водохранилищах</li>
                  <li>Намыв территорий для строительства</li>
                  <li>Добыча и поставка песка и песчано-гравийной смеси</li>
                  <li>Строительство гидротехнических сооружений</li>
                  <li>Рекультивация нарушенных земель</li>
                </ul>
                <Button className="bg-blue-800 hover:bg-blue-900">Подробнее</Button>
              </div>
            </div>
          </section>

          {/* Advantages Section */}
          <section className="p-6 md:p-8 relative">
            <div className="absolute inset-0 opacity-10">
              <Image
                src="/images/time-back.jpg"
                alt="Фон"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative">
              <h2 className="text-xl font-bold mb-6 text-blue-800 flex items-center">
                <div className="w-1 h-6 bg-blue-800 mr-2"></div>
                Преимущества работы с нами
              </h2>
              <Card className="p-6 mb-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex">
                    <div className="w-1 h-full bg-blue-800 mr-2 flex-shrink-0"></div>
                    <p>
                      <span className="font-semibold">Многолетний опыт.</span> Более 65 лет успешной работы в сфере
                      гидромеханизации и дноуглубительных работ.
                    </p>
                  </li>
                  <li className="flex">
                    <div className="w-1 h-full bg-blue-800 mr-2 flex-shrink-0"></div>
                    <p>
                      <span className="font-semibold">Собственный парк техники.</span> В распоряжении компании
                      современные земснаряды и вспомогательное оборудование.
                    </p>
                  </li>
                  <li className="flex">
                    <div className="w-1 h-full bg-blue-800 mr-2 flex-shrink-0"></div>
                    <p>
                      <span className="font-semibold">Высококвалифицированные специалисты.</span> Наши сотрудники
                      имеют большой опыт работы и регулярно повышают свою квалификацию.
                    </p>
                  </li>
                  <li className="flex">
                    <div className="w-1 h-full bg-blue-800 mr-2 flex-shrink-0"></div>
                    <p>
                      <span className="font-semibold">Комплексный подход.</span> Мы выполняем полный цикл работ от
                      проектирования до сдачи объекта.
                    </p>
                  </li>
                  <li className="flex">
                    <div className="w-1 h-full bg-blue-800 mr-2 flex-shrink-0"></div>
                    <p>
                      <span className="font-semibold">Соблюдение сроков.</span> Мы гарантируем выполнение работ в
                      установленные сроки без потери качества.
                    </p>
                  </li>
                </ul>
                <div className="mt-4">
                  <Button className="bg-blue-800 hover:bg-blue-900">Подробнее</Button>
                </div>
              </Card>
            </div>
          </section>

          {/* Projects Section */}
          <section className="p-6 md:p-8 bg-gray-50">
            <h2 className="text-xl font-bold mb-6 text-blue-800 flex items-center">
              <div className="w-1 h-6 bg-blue-800 mr-2"></div>
              Реализованные проекты
            </h2>

            <Card className="p-6 mb-6">
              <h3 className="font-bold text-lg mb-4 text-blue-800 flex items-center">
                <div className="w-1 h-5 bg-blue-800 mr-2"></div>
                Намыв территории под строительство стадиона к ЧМ-2018 по футболу
              </h3>
              <p className="text-gray-700 mb-4">
                В 2014-2015 годах компания выполнила работы по намыву территории для строительства стадиона к
                Чемпионату мира по футболу 2018 года. Было перемещено более 2,5 миллионов кубических метров грунта,
                что позволило создать надежное основание для строительства спортивного объекта.
              </p>
              <Button className="bg-blue-800 hover:bg-blue-900">Подробнее</Button>
            </Card>

            <Card className="p-6 mb-6">
              <h3 className="font-bold text-lg mb-4 text-blue-800 flex items-center">
                <div className="w-1 h-5 bg-blue-800 mr-2"></div>
                Добыча и переработка песка
              </h3>
              <p className="text-gray-700 mb-4">
                АО «Донгидрогидромеханизация» осуществляет промышленную добычу песка на собственных карьерах. Компания
                поставляет высококачественный песок для строительных и промышленных нужд. Ежегодный объем добычи
                составляет более 5 миллионов кубических метров.
              </p>
              <Button className="bg-blue-800 hover:bg-blue-900">Подробнее</Button>
            </Card>

            <Card className="p-6 mb-6">
              <h3 className="font-bold text-lg mb-4 text-blue-800 flex items-center">
                <div className="w-1 h-5 bg-blue-800 mr-2"></div>
                Строительство гидротехнических сооружений в Морском Торговом Порту
              </h3>
              <p className="text-gray-700 mb-4">
                Компания выполнила комплекс работ по строительству гидротехнических сооружений в Морском Торговом
                Порту. Работы включали дноуглубление акватории порта, укрепление берегов и строительство причальных
                стенок. Проект был успешно завершен в 2019 году.
              </p>
              <Button className="bg-blue-800 hover:bg-blue-900">Подробнее</Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4 text-blue-800 flex items-center">
                <div className="w-1 h-5 bg-blue-800 mr-2"></div>
                Строительство второй очереди канала Волго-Каспийского морского судоходного канала
              </h3>
              <p className="text-gray-700 mb-4">
                Один из крупнейших проектов компании - участие в строительстве второй очереди Волго-Каспийского
                морского судоходного канала. Работы включали дноуглубление канала для обеспечения прохода судов с
                большей осадкой. В ходе работ было извлечено более 10 миллионов кубических метров грунта.
              </p>
              <Button className="bg-blue-800 hover:bg-blue-900">Подробнее</Button>
            </Card>
          </section>

          {/* Partners Section */}
          <section className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6 text-center">Наши Партнеры</h2>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="w-32 h-32 relative">
                <Image
                  src="/images/parther-1.jpg"
                  alt="НСМЗ"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="w-32 h-32 relative">
                <Image
                  src="/images/partner-2.jpg"
                  alt="СоюзФлот"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="w-32 h-32 relative">
                <Image
                  src="/images/partner-3.jpg"
                  alt="КСМ-1"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </section>

          {/* Contact Form Button */}
          <section className="p-6 md:p-8 bg-gray-50 text-center">
          <ClientButtons buttonType="contactForm" className="bg-blue-800 hover:bg-blue-900">
            Связаться с нами</ClientButtons>
          </section>
        </div>
      </main>
    </div>
  )
}
