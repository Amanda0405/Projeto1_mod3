const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req,res) =>{
    res.status(200).json({message: "Bem vindo a minha primeira API"});
});

const seriesRouter = require("./series");
app.use("/series", seriesRouter);

const musicasRouter = require("./musicas");
app.use("/musicas", musicasRouter);

const livrosRouter = require("./livros");
app.use("/livros", livrosRouter);

app.listen(port, () => {
    console.info(`App rodando em: http://localhost:${port}`)
});

