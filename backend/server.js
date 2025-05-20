require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const ExcelJS = require('exceljs');
const formidable = require('formidable');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Настройка CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://ваш-домен.ru'], // Добавьте ваш домен
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Тестовый роут
app.get('/', (req, res) => {
  res.json({ message: 'API сервер работает' });
});

// Тестовый роут для проверки API
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'API endpoint работает',
    timestamp: new Date().toISOString()
  });
});

// SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Helper function for padding numbers
function pad(num) {
  return num < 10 ? `0${num}` : num;
}

// Invoice generation endpoint
app.post('/api/invoice', async (req, res) => {
  try {
    const data = req.body;
    const now = new Date();
    const invoiceNumber = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${Math.floor(Math.random() * 1000)}`;
    const invoiceDate = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`;

    const price = 50000;
    const product = data.quarry || "Песок Арт 1";
    const quantity = Number(data.quantity) || 1;
    const sum = price * quantity;

    const workbook = new ExcelJS.Workbook();
    const ws = workbook.addWorksheet("Счет на оплату");

    // Excel generation code...
    ws.addRow(["Филиал 'Корпоративный' ПАО'Совкомбанк' г. Москва", "", "БИК", "044525360"]);
    ws.addRow(["", "", "Сч. №", "30101810445200000360"]);
    ws.addRow(["Банк получателя", "", "", "", "", ""]);
    ws.addRow(["ИНН", "6162005910", "КПП", "616201001", "Сч. №", "40702810200220740886"]);
    ws.addRow(["Донгидрогидромеханизация АО"]);
    ws.addRow([""]);
    ws.addRow(["Получатель"]);
    ws.addRow([""]);
    ws.addRow([`Счет на оплату № ${invoiceNumber} от ${invoiceDate}`]);
    ws.getRow(9).font = { bold: true, size: 16 };
    ws.addRow([""]);
    ws.addRow(["Поставщик (Исполнитель):", "Донгидрогидромеханизация АО, ИНН 6162005910, КПП 616201001, 344018, Ростовская обл, г. Ростов-На-Дону, пр. Будённовский 80, 6 этаж."]);
    
    const buyerInfo = data.personType === "individual" 
      ? `${data.fullName || "-"}`
      : `${data.company || "-"}, ${data.inn || "-"}, ${data.kpp || "-"}, ${data.address || "-"}`;
    ws.addRow(["Покупатель (Заказчик):", buyerInfo]);
    
    ws.addRow(["Основание:", "Договор"]);
    ws.addRow([""]);
    ws.addRow(["№", "Товары (работы, услуги)", "Кол-во", "Ед.", "Цена", "Сумма"]);
    ws.getRow(15).font = { bold: true };
    ws.addRow([1, product, quantity, "тн", price.toLocaleString("ru-RU"), sum.toLocaleString("ru-RU")]);
    ws.addRow([""]);
    ws.addRow(["", "", "", "Итого:", "", sum.toLocaleString("ru-RU")]);
    ws.addRow(["", "", "", "Всего к оплате:", "", sum.toLocaleString("ru-RU")]);

    ws.columns = [
      { width: 5 },
      { width: 40 },
      { width: 10 },
      { width: 8 },
      { width: 15 },
      { width: 18 },
    ];

    const buffer = await workbook.xlsx.writeBuffer();

    await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      subject: `Счет на оплату с сайта (${invoiceNumber})`,
      text: `Поступила заявка с сайта. Счет на оплату во вложении.\nПокупатель: ${data.company || "-"}\nТелефон: ${data.contactPhone || "-"}\nEmail: ${data.email || "-"}`,
      attachments: [
        {
          filename: `Счет на оплату №${invoiceNumber}.xlsx`,
          content: buffer,
        },
      ],
    });

    res.json({ ok: true });
  } catch (e) {
    console.error("Invoice API error:", e);
    res.status(500).json({ error: e.message });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Отсутствуют обязательные поля" });
    }

    await transporter.sendMail({
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
    });

    res.json({ message: "Письмо успешно отправлено" });
  } catch (error) {
    console.error("Ошибка отправки письма:", error);
    res.status(500).json({ error: "Не удалось отправить письмо" });
  }
});

// Resume upload endpoint
app.post('/api/resume', async (req, res) => {
  try {
    const form = formidable({ multiples: true });
    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "Ошибка загрузки файла" });
      }

      const file = files.resume;
      if (!file) {
        return res.status(400).json({ error: "Файл не найден" });
      }

      await transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_TO,
        subject: "Новое резюме с сайта",
        text: `Поступило новое резюме.\nИмя: ${fields.name}\nТелефон: ${fields.phone}\nEmail: ${fields.email}`,
        attachments: [
          {
            filename: file.originalFilename,
            path: file.filepath,
          },
        ],
      });

      res.json({ message: "Резюме успешно отправлено" });
    });
  } catch (error) {
    console.error("Ошибка отправки резюме:", error);
    res.status(500).json({ error: "Не удалось отправить резюме" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 