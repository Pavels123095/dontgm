import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import ExcelJS from "exceljs";

function pad(num: number) {
  return num < 10 ? `0${num}` : num;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const data = req.body;
    // Генерируем номер счета и дату
    const now = new Date();
    const invoiceNumber = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${Math.floor(Math.random() * 1000)}`;
    const invoiceDate = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`;

    // Фиксированные значения
    const price = 50000; // фиксированная цена за тонну
    const product = data.quarry || "Песок Арт 1";
    const quantity = Number(data.quantity) || 1;
    const sum = price * quantity;

    // Excel
    const workbook = new ExcelJS.Workbook();
    const ws = workbook.addWorksheet("Счет на оплату");

    // Шапка банка
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

    // Ширина колонок
    ws.columns = [
      { width: 5 },
      { width: 40 },
      { width: 10 },
      { width: 8 },
      { width: 15 },
      { width: 18 },
    ];

    // Сохраняем файл в буфер
    const buffer = await workbook.xlsx.writeBuffer();

    // Отправляем письмо
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      subject: `Счет на оплату с сайта (${invoiceNumber})`,
      text: `Поступила заявка с сайта. Счет на оплату во вложении.\nПокупатель: ${data.company || "-"}\nТелефон: ${data.contactPhone || "-"}\nEmail: ${data.email || "-"}`,
      attachments: [
        {
          filename: `Счет на оплату №${invoiceNumber}.xlsx`,
          content: Buffer.from(buffer),
        },
      ],
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Invoice API error:", e);
    return res.status(500).json({ error: e instanceof Error ? e.message : String(e) });
  }
} 