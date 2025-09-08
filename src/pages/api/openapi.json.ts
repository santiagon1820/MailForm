import os from "os";
// @ts-ignore
import swaggerJSDoc from "swagger-jsdoc";
import { getLocalIp } from "../../controllers/ipController.ts";

export const prerender = false;
const port = import.meta.env.PORT || 4321;

const localIp = getLocalIp();

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "MailForm",
      version: "1.0.0.0",
      description: "MailForm Api de formularios"
    },
    servers: [
      { url: `http://localhost:${port}`, description: "Servidor local" },
      { url: `http://${localIp}:${port}`, description: "Servidor local" }
    ],
    components: {
      schemas: {
        SendMail: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true
            },
            response: {
              type: "object",
              properties: {
                code: {
                  type: "integer",
                  example: 200
                },
                message: {
                  type: "string",
                  example: "Se ha enviado correctamente"
                }
              }
            }
          }
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false
            },
            response: {
              type: "object",
              properties: {
                code: {
                  type: "integer",
                  example: 400
                },
                message: {
                  type: "string",
                  example: "Faltan datos obligatorios"
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ["src/controllers/**/*.ts"],
};

export async function GET() {
  const spec = swaggerJSDoc(options);
  return new Response(JSON.stringify(spec, null, 2), {
    headers: { "Content-Type": "application/json" }
  });
}
