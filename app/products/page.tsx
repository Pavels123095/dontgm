import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductsPage() {
  const categories = [
    { id: "sand", name: "Песок" },
    { id: "gravel", name: "Щебень" },
    { id: "concrete", name: "Бетон" },
    { id: "soil", name: "Грунт" },
  ]

  const products = {
    sand: [
      {
        id: 1,
        name: "Песок речной",
        image: "/placeholder.svg?height=200&width=300",
        price: "от 850 ₽/м³",
        description:
          "Речной песок высокого качества для строительных работ. Подходит для приготовления бетонных и растворных смесей.",
      },
      {
        id: 2,
        name: "Песок карьерный",
        image: "/placeholder.svg?height=200&width=300",
        price: "от 750 ₽/м³",
        description: "Карьерный песок для различных строительных работ. Идеально подходит для подсыпки и выравнивания.",
      },
      {
        id: 3,
        name: "Песок намывной",
        image: "/placeholder.svg?height=200&width=300",
        price: "от 900 ₽/м³",
        description: "Намывной песок высокого качества. Отличается чистотой и отсутствием примесей.",
      },
    ],
    gravel: [
      {
        id: 4,
        name: "Щебень гранитный",
        image: "/placeholder.svg?height=200&width=300",
        price: "от 1200 ₽/м³",
        description: "Гранитный щебень фракции 5-20 мм. Высокая прочность и морозостойкость.",
      },
      {
        id: 5,
        name: "Щебень известняковый",
        image: "/placeholder.svg?height=200&width=300",
        price: "от 950 ₽/м³",
        description: "Известняковый щебень фракции 20-40 мм. Подходит для дорожного строительства.",
      },
      {
        id: 6,
        name: "Щебень гравийный",
        image: "/placeholder.svg?height=200&width=300",
        price: "от 1100 ₽/м³",
        description: "Гравийный щебень различных фракций для строительных работ.",
      },
    ],
    concrete: [
      {
        id: 7,
        name: "Бетон М200",
        image: "/placeholder.svg?height=200&width=300",
        price: "от 3800 ₽/м³",
        description: "Бетон марки М200 для фундаментных работ и стяжки пола.",
      },
      {
        id: 8,
        name: "Бетон М300",
        image: "/placeholder.svg?height=200&width=300",
        price: "от 4200 ₽/м³",
        description: "Бетон марки М300 для монолитных конструкций и промышленных полов.",
      },
      {
        id: 9,
        name: "Бетон М400",
        image: "/placeholder.svg?height=200&width=300",
        price: "от 4600 ₽/м³",
        description: "Бетон марки М400 для ответственных конструкций с повышенными требованиями к прочности.",
      },
    ],
    soil: [
      {
        id: 10,
        name: "Чернозем",
        image: "/placeholder.svg?height=200&width=300",
        price: "от 950 ₽/м³",
        description: "Плодородный чернозем для озеленения и благоустройства территорий.",
      },
      {
        id: 11,
        name: "Растительный грунт",
        image: "/placeholder.svg?height=200&width=300",
        price: "от 850 ₽/м³",
        description: "Растительный грунт для посадки растений и создания газонов.",
      },
      {
        id: 12,
        name: "Торф",
        image: "/placeholder.svg?height=200&width=300",
        price: "от 1100 ₽/м³",
        description: "Торф высокого качества для улучшения структуры почвы.",
      },
    ],
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px]">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=300&width=1200"
            alt="Реализация материалов"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/60">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-4">Реализация материалов</h1>
            <p className="text-xl text-white max-w-2xl">
              Широкий ассортимент строительных материалов высокого качества по конкурентным ценам
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="sand" className="w-full">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-6">Наши материалы</h2>
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-base py-3">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {Object.entries(products).map(([category, items]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="h-48 relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-semibold">{product.name}</h3>
                          <span className="text-blue-600 font-medium">{product.price}</span>
                        </div>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <div className="flex space-x-3">
                          <Button className="bg-blue-600 hover:bg-blue-700 flex-1">Заказать</Button>
                          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                            Подробнее
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Delivery Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 relative h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Доставка материалов"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Доставка материалов</h2>
              <p className="text-gray-700 mb-4">
                Мы осуществляем доставку строительных материалов по Москве и Московской области. Наш автопарк включает
                самосвалы различной грузоподъемности, что позволяет нам оперативно доставлять материалы в любых объемах.
              </p>
              <p className="text-gray-700 mb-6">
                Стоимость доставки рассчитывается индивидуально в зависимости от объема заказа и расстояния до объекта.
                Для получения точной информации о стоимости и сроках доставки, пожалуйста, свяжитесь с нашими
                менеджерами.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">Рассчитать стоимость доставки</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Специальные предложения</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Скидка 10% на первый заказ",
                image: "/placeholder.svg?height=200&width=300",
                description: "Получите скидку 10% на первый заказ любых материалов при заказе от 20 м³.",
              },
              {
                title: "Бесплатная доставка",
                image: "/placeholder.svg?height=200&width=300",
                description: "Бесплатная доставка при заказе от 40 м³ в пределах 30 км от МКАД.",
              },
              {
                title: "Комплексные поставки",
                image: "/placeholder.svg?height=200&width=300",
                description: "Скидки до 15% при комплексных поставках различных материалов.",
              },
            ].map((offer, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 relative">
                  <Image src={offer.image || "/placeholder.svg"} alt={offer.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{offer.title}</h3>
                  <p className="text-gray-600 mb-4">{offer.description}</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full">Узнать подробнее</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
