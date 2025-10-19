const express = require("express");
const http = require("http");
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
  io.emit("nuevo-dato", data);

  res.json({ ok: true, recibido: data });
});

// Socket.io
io.on("connection", (socket) => {
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
