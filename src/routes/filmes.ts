import { Router, Request, Response } from "express";
import { Filme } from "../models/filme";

const router = Router()

let filmes: Filme[] = [
  { id: 1, titulo: "Lucas mogador de betas", ano: 2007, assistido: true, diretor: "Lucas" },
  { id: 2, titulo: "Caçadores de gluteos do Shida", ano: 1990, assistido: true, diretor: "Shida" }
];

router.get("/", (req: Request, res: Response) => {
  res.json(filmes)
})

router.get("/:filme_id", (req: Request, res: Response) => {
  const filme_id = Number(req.params.filme_id)
  const filme = filmes.find(f => f.id == filme_id);
  if (!filme) {
    res.status(404).json({ error: "nenhum filme encontrado" })
  }
  res.json(filmes)
})

router.post("/", (req: Request, res: Response) => {
  const { titulo, ano, diretor } = req.body
  const novoFilme: Filme = {
    id: filmes.length + 1,
    titulo: titulo,
    ano: Number(ano),
    assistido: false,
    diretor: diretor
  }
  filmes.push(novoFilme)
  res.status(201).json(novoFilme)
})

router.put("/:filme_id", (req: Request, res: Response) => {
  const filme_id = Number(req.params.filme_id);
  const filme = filmes.find(f => f.id == filme_id);
  if (!filme) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }
  const { titulo, ano, assistido, diretor } = req.body;
  filme.titulo = titulo ?? filme.titulo,
    filme.assistido = assistido ?? filme.assistido,
    filme.ano = Number(ano) ?? filme.ano
  filme.diretor = diretor ?? filme.diretor
  res.json(filme);
});

router.delete("/:filme_id", (req: Request, res: Response) => {
  const filme_id = Number(req.params.filme_id);
  filmes = filmes.filter(t => t.id !== filme_id);
  res.json({ message: `filme com id ${filme_id} excluido` })
})

export default router;
