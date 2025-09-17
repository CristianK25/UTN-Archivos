const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// fetch para Node.js CommonJS
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    const webhookUrl = "https://cristiankrahulik.app.n8n.cloud/webhook/e497d926-a518-4786-920c-da0dc79ce604"; // Poner tu URL real

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      });
    } catch (err) {
      console.error("Error llamando a n8n:", err);
    }

    return res.json({ message: "Login exitoso" });
  } else {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }
});

app.listen(3000, () => {
  console.log("Servidor backend corriendo en http://localhost:3000");
});
