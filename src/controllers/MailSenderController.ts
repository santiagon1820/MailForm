// @ts-ignore
import nodemailer from "nodemailer";

export class MailSenderController {
  /**
  * @swagger
  * /api/sendMail:
  *   post:
  *     summary: Enviar formulario de contacto
  *     description: Recibe datos del formulario y envía un correo a la empresa.
  *     tags:
  *       - Formulario de contacto
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               - nombres
  *               - apellidos
  *               - correo
  *               - mensaje
  *             properties:
  *               nombres:
  *                 type: string
  *                 example: Juan
  *               apellidos:
  *                 type: string
  *                 example: Pérez
  *               correo:
  *                 type: string
  *                 format: email
  *                 example: juan.perez@example.com
  *               mensaje:
  *                 type: string
  *                 example: Estoy interesado en recibir más información sobre sus productos.
  *     responses:
  *       200:
  *         description: Correo enviado correctamente
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/SendMail'
  *       400:
  *         description: Datos inválidos
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/ErrorResponse'
  */
  static async sendMail(request: Request) {
    try {
      // 1. Leer body
      const { nombres, apellidos, correo, mensaje } = await request.json();

      if (!nombres || !apellidos || !correo || !mensaje) {
        return new Response(
          JSON.stringify({
            success: false,
            response: { code: 400, message: "Faltan datos obligatorios" },
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // 2. Detectar dominio que hace la petición
      const origin = request.headers.get("origin") || "";
      const referer = request.headers.get("referer") || "";

      // 3. Definir destinatario según dominio
      let destinatario = import.meta.env.MAIL_SENDER;
      if (origin.includes("forticus")) {
        destinatario = "detad16426@inupup.com";
      }else if (origin.includes("merkan")){
        destinatario = "detad16426@inupup.com";
      }

      // 4. Configurar transporte
      const transporter = nodemailer.createTransport({
        host: import.meta.env.SMTP_SERVER,
        port: Number(import.meta.env.SMTP_PORT),
        secure: false,
        auth: {
          user: import.meta.env.SMTP_USER,
          pass: import.meta.env.SMTP_PASS,
        },
      });

      // 5. Enviar correo
      await transporter.sendMail({
        from: import.meta.env.MAIL_SENDER,
        to: destinatario,
        subject: `Nuevo mensaje de contacto - ${nombres} ${apellidos}`,
        text: `De: ${nombres} ${apellidos} <${correo}>\n\n${mensaje}\n\n---\nOrigin: ${origin}\nReferer: ${referer}`,
        html: `
          <p><strong>Nombre:</strong> ${nombres} ${apellidos}</p>
          <p><strong>Correo:</strong> ${correo}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${mensaje}</p>          
        `,
      });

      // 6. Respuesta exitosa
      return new Response(
        JSON.stringify({
          success: true,
          response: { code: 200, message: "Se ha enviado correctamente" },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error: any) {
      console.error("Error enviando correo:", error);
      return new Response(
        JSON.stringify({
          success: false,
          response: { code: 500, message: "Error interno al enviar el correo" },
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
}