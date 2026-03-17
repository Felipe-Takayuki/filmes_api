import express from "express";
import filmesRoutes from "./routes/filmes"
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/filmes", filmesRoutes)

app.listen(PORT, () => {
  console.log(`Servidor executando em localhost:${PORT}`);
});

