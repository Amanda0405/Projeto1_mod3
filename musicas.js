const express = require("express");
const router = express.Router();
const musicas = [];

function verificacao(musicas,res){

    if(!musicas){
        res.status(204).json();
        return true;
    };
    return false;
};

function verificaParametro(musica,res){

    if(!musica.nome){
        res.status(400).json({message:"O Campo nome está vazio."});
        return true;
    };
    if(!musica.compositor){
        res.status(400).json({message:"O Campo compositor está vazio."});
        return true;
    };
    if(!musica.cantor){
        res.status(400).json({message:"O Campo cantor está vazio."});
        return true;
    };
    if(!musica.duracao){
        res.status(400).json({message:"O Campo duração está vazio."});
        return true;
    };

    return false;
}

router.get("/", (req,res) => {
    res.status(200).json({message: "Músicas"});
});

router.get("/listar", (req,res) =>{
    res.status(200).json(musicas);
});

router.get("/listar/:id", (req,res) => {
    const id = req.params.id;
    const musica = musicas[id];

    if(verificacao(musica,res)){
        return
    };
    res.status(200).json(musica);
});

router.post("/", (req, res) => {
    const musica = req.body;

    if(verificaParametro(musica,res)){
        return
    };
    
    musicas.push(musica);

    res.status(201).json({message:"Cadastro realizado com sucesso!!"});
});

router.put("/:id", (req,res) => {
    const id = req.params.id;

    if(verificacao(musicas[id], res) || verificaParametro(req.body, res)){
        return;
    };
    musicas[id] = req.body;

    res.status(200).json(musicas[id]);
});

router.delete("/:id", (req,res) => {
    const id = req.params.id;
    delete musicas[id];
    res.status(200).json(musicas);
});

router.delete("./deletar/:id", (req,res) => {
    const id = req.params.id;
    musicas.splice(id,1);
    res.json(musicas);
});

module.exports = router;