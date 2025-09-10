  export const prerender = false;

  import type { APIRoute } from "astro";
  import { MailSenderController } from "../../controllers/MailSenderController";

  // GET para los endpoints de prueba
  export const GET: APIRoute = async ({ params }) => {
    const segments: string[] = Array.isArray(params.api)
      ? params.api
      : params.api
      ? [params.api]
      : [];

    const path = segments.join("/");

    switch (path) {
      default:
        return new Response(JSON.stringify({ error: "Endpoint no válido" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
    }
  };

  // POST para enviar correos
  export const POST: APIRoute = async ({ params, request }) => {
    const segments: string[] = Array.isArray(params.api)
      ? params.api
      : params.api
      ? [params.api]
      : [];

    const path = segments.join("/");

    switch (path) {
      case "sendMail":
        return MailSenderController.sendMail(request);

      default:
        return new Response(JSON.stringify({ error: "Endpoint no válido" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
    }
  };
