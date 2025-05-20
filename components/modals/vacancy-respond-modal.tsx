import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface VacancyRespondModalProps {
  open: boolean
  onClose: () => void
  vacancy?: string
}

export default function VacancyRespondModal({ open, onClose, vacancy }: VacancyRespondModalProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)
    try {
      const res = await fetch("/api/vacancy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, vacancy }),
      })
      if (res.ok) {
        setSuccess(true)
        setForm({ name: "", phone: "", email: "", message: "" })
      } else {
        setError("Ошибка отправки. Попробуйте позже.")
      }
    } catch {
      setError("Ошибка отправки. Попробуйте позже.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Откликнуться на вакансию</DialogTitle>
        </DialogHeader>
        {success ? (
          <div className="text-center py-8">
            <div className="text-green-600 font-bold mb-2">Спасибо за отклик!</div>
            <div>Мы свяжемся с вами в ближайшее время.</div>
            <Button className="mt-6 w-full" onClick={onClose}>Закрыть</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input name="name" placeholder="Ваше имя" value={form.name} onChange={handleChange} required />
            <Input name="phone" placeholder="Телефон" value={form.phone} onChange={handleChange} required />
            <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} required type="email" />
            {vacancy && <input type="hidden" name="vacancy" value={vacancy} />}
            <textarea name="message" placeholder="Сообщение (необязательно)" value={form.message} onChange={handleChange} className="w-full border rounded p-2 min-h-[80px]" />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Отправка..." : "Откликнуться"}</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
} 