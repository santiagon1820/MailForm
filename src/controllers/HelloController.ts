
export class HelloController {

  /**
  * @swagger
  * /api/hello:
  *   get:
  *     summary: Saludo de bienvenida
  *     description: Devuelve un saludo desde Astro.
  *     tags:
  *       - Saludos
  *     responses:
  *       200:
  *         description: Respuesta exitosa
  *         content:
  *           application/json:
  *             example:
  *               message: Hola desde Astro 👋
  */
  static async sayHello() {
    return new Response(JSON.stringify({ message: "Hola desde Astro 👋" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  /**
   * @swagger
   * /api/bye:
   *   get:
   *     summary: Despedida
   *     description: Devuelve un mensaje de despedida desde Astro.
   *     tags:
   *       - Despedidas
   *     responses:
   *       200:
   *         description: Respuesta exitosa
   *         content:
   *           application/json:
   *             example:
   *               message: Adiós desde la API 👋
   */
  static async sayBye() {
    return new Response(JSON.stringify({ message: "Adiós desde la API 👋" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  /**
  * @swagger
  * /api/bye/api:
  *   get:
  *     summary: Despedida
  *     description: Devuelve un mensaje de despedida desde Astro.
  *     tags:
  *       - Despedidas
  *     responses:
  *       200:
  *         description: Respuesta exitosa
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Despedida'
  *       201:
  *         description: Respuesta exitosa
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Despedida'
  */


  static async sayByeAPI() {
    const status = Math.random() < 0.5 ? 200 : 201; // 50% de probabilidad

    const message =
      status === 200
        ? "Adiós desde Astro 👋"
        : "Nueva despedida creada 👋";

    return new Response(JSON.stringify({ message }), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }
}
