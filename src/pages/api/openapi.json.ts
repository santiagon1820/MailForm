export const prerender = false;
const port = import.meta.env.PORT || 4321;

import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "MailForm",
      version: "1.0.0.0",
      description: "MailForm Api de formularios"
    },
    servers: [
      { url: `http://localhost:${port}`, description: "Servidor local" }
    ],
    components: {
      schemas: {
        Saludo: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "¡Hola desde Astro 👋!"
            }
          }
        },
        Despedida: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Adiós desde Astro 👋"
            }
          }
        }
      }
    }
  },
  apis: ["src/controllers/**/*.ts"], // donde tienes tus @swagger
};

export async function GET() {
  const spec = swaggerJSDoc(options);
  return new Response(JSON.stringify(spec, null, 2), {
    headers: { "Content-Type": "application/json" }
  });
}
