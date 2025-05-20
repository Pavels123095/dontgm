import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import nodemailer from "nodemailer";
import { promises as fs } from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const data = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
      const form = new IncomingForm({ keepExtensions: true });
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });
    const { name, phone, email, message } = data.fields;
    const file = data.files.resume;
    if (!file) {
      return res.status(400).json({ error: "Файл не прикреплен" });
    }
    const fileBuffer = await fs.readFile(file.filepath);
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
      subject: `Резюме с сайта от ${name}`,
      text: `Имя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nСообщение: ${message || "-"}`,
      attachments: [
        {
          filename: file.originalFilename,
          content: fileBuffer,
        },
      ],
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Resume API error:", e);
    return res.status(500).json({ error: e instanceof Error ? e.message : String(e) });
  }
} 