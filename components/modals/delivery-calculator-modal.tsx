import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DeliveryCalculatorModalProps {
  open: boolean
  onClose: () => void
}

export default function DeliveryCalculatorModal({ open, onClose }: DeliveryCalculatorModalProps) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    company: "",
    country: "",
    inn: "",
    kpp: "",
    bank: "",
    account: "",
    address: "",
    personType: "entity",
    deliveryType: "pickup",
    quantity: "",
    date: "",
    deliveryAddress: "",
    quarry: "",
    contactPhone: "",
    email: "",
    fullName: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const nextStep = async () => {
    if (step === 3) {
      // Отправка данных на сервер
      setLoading(true)
      setError(null)
      try {
        const response = await fetch("/api/invoice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error || "Ошибка отправки заявки")
        }
        setSuccess(true)
        setStep(4)
      } catch (e: any) {
        setError(e.message || "Ошибка отправки заявки")
      } finally {
        setLoading(false)
      }
    } else {
      setStep((s) => s + 1)
    }
  }
  const prevStep = () => setStep((s) => s - 1)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Купить песок</DialogTitle>
        </DialogHeader>
        {step === 1 && (
          <div>
            <div className="mb-4 text-center font-medium">Выберите тип покупателя</div>
            <div className="flex gap-2 mb-6 justify-center">
              <Button variant={form.personType === "individual" ? "default" : "outline"} onClick={() => setForm(f => ({ ...f, personType: "individual" }))}>Физическое лицо</Button>
              <Button variant={form.personType === "entity" ? "default" : "outline"} onClick={() => setForm(f => ({ ...f, personType: "entity" }))}>Юридическое лицо</Button>
            </div>
            {form.personType === "individual" && (
              <div>
                <div className="mb-4 text-center font-medium">Заполните ФИО</div>
                <div className="space-y-2">
                  <Input name="fullName" placeholder="ФИО" value={form.fullName} onChange={handleChange} />
                </div>
              </div>
            )}
            {form.personType === "entity" && (
              <>
                <div className="mb-4 text-center font-medium">Заполните реквизиты компании</div>
                <div className="space-y-2">
                  <Input name="company" placeholder="Наименование контрагента" value={form.company} onChange={handleChange} />
                  <Input name="country" placeholder="Страна регистрации" value={form.country} onChange={handleChange} />
                  <Input name="inn" placeholder="ИНН" value={form.inn} onChange={handleChange} />
                  <Input name="kpp" placeholder="КПП" value={form.kpp} onChange={handleChange} />
                  <Input name="bank" placeholder="Банк (БИК)" value={form.bank} onChange={handleChange} />
                  <Input name="account" placeholder="Номер расчетного счета" value={form.account} onChange={handleChange} />
                  <Input name="address" placeholder="Адрес" value={form.address} onChange={handleChange} />
                </div>
              </>
            )}
            <Button className="mt-6 w-full" onClick={nextStep}>Далее &gt;</Button>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="mb-2 text-center font-medium">Условия поставки песка</div>
            <div className="flex gap-2 mb-4 justify-center">
              <Button variant={form.deliveryType === "pickup" ? "default" : "outline"} onClick={() => setForm(f => ({ ...f, deliveryType: "pickup" }))}>Самовывоз</Button>
              <Button variant={form.deliveryType === "delivery" ? "default" : "outline"} onClick={() => setForm(f => ({ ...f, deliveryType: "delivery" }))}>Доставка</Button>
            </div>
            <Input name="quantity" placeholder="Количество (тн)" value={form.quantity} onChange={handleChange} className="mb-2" />
            <Input name="date" type="date" placeholder="Дата" value={form.date} onChange={handleChange} className="mb-2" />
            <Input name="deliveryAddress" placeholder="Адрес доставки" value={form.deliveryAddress} onChange={handleChange} className="mb-2" />
            <Input name="quarry" placeholder="Выбрать карьер" value={form.quarry} onChange={handleChange} className="mb-2" />
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={prevStep}>Назад</Button>
              <Button onClick={nextStep}>Далее &gt;</Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <div className="mb-4 text-center font-medium">Заполните контактные данные</div>
            <Input name="contactPhone" placeholder="Ваш контактный номер телефона" value={form.contactPhone} onChange={handleChange} className="mb-2" />
            <Input name="email" placeholder="Ваша почта" value={form.email} onChange={handleChange} className="mb-2" />
            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={prevStep} disabled={loading}>Назад</Button>
              <Button onClick={nextStep} disabled={loading}>{loading ? "Отправка..." : "Отправить заявку"}</Button>
            </div>
          </div>
        )}
        {step === 4 && success && (
          <div className="text-center">
            <div className="mb-4 font-medium">Заявка успешно создана</div>
            <div className="mb-2">Счёт на оплату отправлен на почту</div>
            <div className="mb-2 text-left">
              <div>Поставщик (Исполнитель):</div>
              <div>Покупатель (Заказчик):</div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <Input readOnly value={form.quantity} placeholder="Кол-во песка" />
              <Input readOnly value={"..."} placeholder="Сумма" />
              <Input readOnly value={"..."} placeholder="Итого" />
            </div>
            <Button className="w-full" onClick={onClose}>Закрыть</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 