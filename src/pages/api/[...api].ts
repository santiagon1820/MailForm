export const prerender = false;

import type { APIRoute } from "astro";
import { HelloController } from "../../controllers/HelloController";

export const GET: APIRoute = async ({ params }) => {
  // Normalizamos params.api a un array de strings
  const segments: string[] = Array.isArray(params.api)
    ? params.api
    : params.api
    ? [params.api]
    : [];

  const path = segments.join("/");

  switch (path) {
    case "hello":
      return HelloController.sayHello();

    case "bye":
      return HelloController.sayBye();

    case "bye/api":
      return HelloController.sayByeAPI();

    default:
      return new Response(JSON.stringify({ error: "Endpoint no válido" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
  }
};
