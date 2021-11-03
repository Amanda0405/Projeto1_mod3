const express = require("express");
const router = express.Router();
const series = [];

function verificacao(series,res){

    if(!series){
        res.status(204).json();
        return true;
    };
    return false;
};

function verificaParametro(serie,res){

    if(!serie.nome){
        res.status(400).json({message:"O Campo nome está vazio."});
        return true;
    };
    if(!serie.temporadas){
        res.status(400).json({message:"O Campo temporadas está vazio."});
        return true;
    };
    if(!serie.diretor){
        res.status(400).json({message:"O Campo diretor está vazio."});
        return true;
    };
    if(!serie.anoLan){
        res.status(400).json({message:"O Campo Ano de lançamento está vazio."});
        return true;
    };

    return false;
}

router.get("/", (req,res) => {
    res.status(200).json({message: "Séries"});
});

router.get("/listar", (req,res) =>{
    res.status(200).json(series);
});

router.get("/listar/:id", (req,res) => {
    const id = req.params.id;
    const serie = series[id];

    if(verificacao(serie,res)){
        return
    };
    res.status(200).json(serie);
});

router.post("/", (req, res) => {
    const serie = req.body;

    if(verificaParametro(serie,res)){
        return
    };
    
    series.push(serie);

    res.status(201).json({message:"Cadastro resalizado com sucesso!!"});
});

router.put("/:id", (req,res) => {
    const id = req.params.id;

    if(verificacao(series[id], res) || verificaParametro(req.body, res)){
        return;
    };
    series[id] = req.body;

    res.status(200).json(series[id]);
});

router.delete("/:id", (req,res) => {
    const id = req.params.id;
    delete series[id];
    res.status(200).json(series);
});

router.delete("./deletar/:id", (req,res) => {
    const id = req.params.id;
    series.splice(id,1);
    res.json(series);
});

module.exports = router;