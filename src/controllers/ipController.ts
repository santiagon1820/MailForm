import os from "os";

// Función para obtener la IP local actual
export function getLocalIp(): string {
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    const nets = interfaces[name]; // puede ser undefined
    if (!nets) continue; // 🔑 evitamos el error

    for (const net of nets) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }

  return "127.0.0.1";
}