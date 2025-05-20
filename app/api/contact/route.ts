import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Создаем транспортер для отправки писем
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // true для порта 465, false для других портов
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message } = body

    // Проверяем обязательные поля
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Отсутствуют обязательные поля" },
        { status: 400 }
      )
    }

    // Формируем содержимое письма
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      subject: `Новая заявка: ${subject || "Обратная связь"}`,
      html: `
        <h2>Новая заявка с сайта</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        ${subject ? `<p><strong>Тема:</strong> ${subject}</p>` : ""}
        ${message ? `<p><strong>Сообщение:</strong> ${message}</p>` : ""}
      `,
    }

    // Отправляем письмо
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: "Письмо успешно отправлено" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Ошибка отправки письма:", error)
    return NextResponse.json(
      { error: "Не удалось отправить письмо" },
      { status: 500 }
    )
  }
} 