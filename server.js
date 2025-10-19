const express = require("express");
const http = require("http");
const UAParser = require("ua-parser-js");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(express.json()); // 👈 Para leer JSON en el body

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 🧠 Endpoint para recibir datos
app.post("/data", (req, res) => {
  const data = req.body;
  console.log("📥 Datos recibidos en /data:", data);

  // Puedes emitirlo a todos los sockets si quieres
  io.emit("nuevo-dato", data);const express = require("express");
  const http = require("http");
  const { Server } = require("socket.io");
  const UAParser = require("ua-parser-js");
  
  const app = express();
  const server = http.createServer(app);
  
  app.use(express.json());
  
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  
  // Endpoint para recibir datos
  app.post("/data", (req, res) => {
    const data = req.body;
    console.log("📥 Datos recibidos en /data:", data);
    io.emit("nuevo-dato", data);
    res.json({ ok: true, recibido: data });
  });
  
  // Socket.io
  io.on("connection", (socket) => {
    const userAgent = socket.handshake.headers["user-agent"];
    const parser = new UAParser(userAgent);
    const deviceInfo = parser.getResult(); // Objeto con info completa
  
    console.log(`\n✅ Cliente conectado OOO: ${socket.id}`);
    console.log("🧾 User-Agent:", userAgent);
    console.log("💻 Sistema operativo:", deviceInfo.os.name, deviceInfo.os.version);
    console.log("🌐 Navegador:", deviceInfo.browser.name, deviceInfo.browser.version);
    console.log("📱 Tipo de dispositivo:", deviceInfo.device.type || "desktop");
    console.log("🏷 Marca:", deviceInfo.device.vendor || "N/A");
    console.log("🔹 Modelo:", deviceInfo.device.model || "N/A");
    console.log("⚙ CPU:", deviceInfo.cpu.architecture || "N/A");
  
    socket.on("mensaje", (data) => {
      console.log(`📩 Mensaje de ${socket.id}:`, data);
      io.emit("mensaje", { id: socket.id, texto: data, deviceInfo });
    });
  
    socket.on("disconnect", () => {
      console.log(`❌ Cliente desconectado: ${socket.id}`);
    });
  });
  
  const PORT = 3007;
  server.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  });
  

  res.json({ ok: true, recibido: data });
});

// Socket.io
io.on("connection", (socket) => {
  const userAgent = socket.handshake.headers["user-agent"];
    const parser = new UAParser(userAgent);
    const deviceInfo = parser.getResult(); // Objeto con info completa
  
    console.log(`\n✅ Cliente conectado OOO: ${socket.id}`);
    console.log("🧾 User-Agent:", userAgent);
    console.log("💻 Sistema operativo:", deviceInfo.os.name, deviceInfo.os.version);
    console.log("🌐 Navegador:", deviceInfo.browser.name, deviceInfo.browser.version);
    console.log("📱 Tipo de dispositivo:", deviceInfo.device.type || "desktop");
    console.log("🏷 Marca:", deviceInfo.device.vendor || "N/A");
    console.log("🔹 Modelo:", deviceInfo.device.model || "N/A");
    console.log("⚙ CPU:", deviceInfo.cpu.architecture || "N/A");
  
  console.log("✅ Cliente conectado:", socket.id);

  socket.on("mensaje", (data) => {
    console.log("📩 Mensaje recibido:", data);
    io.emit("mensaje", { id: socket.id, texto: data });
  });

  socket.on("disconnect", () => {
    console.log("❌ Cliente desconectado:", socket.id);
  });
});

const PORT = 3007;
server.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
