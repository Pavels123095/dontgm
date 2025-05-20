import React, { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ResumeSendModalProps {
  open: boolean
  onClose: () => void
}

export default function ResumeSendModal({ open, onClose }: ResumeSendModalProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)
    if (!file) {
      setError("Пожалуйста, прикрепите файл резюме.")
      setLoading(false)
      return
    }
    try {
      const formData = new FormData()
      formData.append("name", form.name)
      formData.append("phone", form.phone)
      formData.append("email", form.email)
      formData.append("message", form.message)
      formData.append("resume", file)
      const res = await fetch("/api/resume", {
        method: "POST",
        body: formData,
      })
      if (res.ok) {
        setSuccess(true)
        setForm({ name: "", phone: "", email: "", message: "" })
        setFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
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
          <DialogTitle>Отправить резюме</DialogTitle>
        </DialogHeader>
        {success ? (
          <div className="text-center py-8">
            <div className="text-green-600 font-bold mb-2">Спасибо!</div>
            <div>Ваше резюме отправлено. Мы свяжемся с вами при необходимости.</div>
            <Button className="mt-6 w-full" onClick={onClose}>Закрыть</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input name="name" placeholder="Ваше имя" value={form.name} onChange={handleChange} required />
            <Input name="phone" placeholder="Телефон" value={form.phone} onChange={handleChange} required />
            <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} required type="email" />
            <input name="resume" ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required className="block w-full border rounded p-2" />
            <textarea name="message" placeholder="Сообщение (необязательно)" value={form.message} onChange={handleChange} className="w-full border rounded p-2 min-h-[80px]" />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Отправка..." : "Отправить резюме"}</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
} 