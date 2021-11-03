const express = require("express");
const router = express.Router();
const livros = [];

function verificacao(livros,res){

    if(!livros){
        res.status(204).json();
        return true;
    };
    return false;
};

function verificaParametro(livro,res){

    if(!livro.nome){
        res.status(400).json({message:"O Campo nome está vazio."});
        return true;
    };
    if(!livro.autor){
        res.status(400).json({message:"O Campo autor está vazio."});
        return true;
    };
    if(!livro.paginas){
        res.status(400).json({message:"O Campo páginas está vazio."});
        return true;
    };
    if(!livro.editora){
        res.status(400).json({message:"O Campo editora está vazio."});
        return true;
    };
    if(!livro.lancamento){
        res.status(400).json({message:"O Campo lançamento está vazio."});
        return true;
    };

    return false;
}

router.get("/", (req,res) => {
    res.status(200).json({message: "Livros"});
});

router.get("/listar", (req,res) =>{
    res.status(200).json(livros);
});

router.get("/listar/:id", (req,res) => {
    const id = req.params.id;
    const livro = livros[id];

    if(verificacao(livro,res)){
        return
    };
    res.status(200).json(livro);
});

router.post("/", (req, res) => {
    const livro = req.body;

    if(verificaParametro(livro,res)){
        return
    };
    
    livros.push(livro);

    res.status(201).json({message:"Cadastro realizado com sucesso!!"});
});

router.put("/:id", (req,res) => {
    const id = req.params.id;

    if(verificacao(livros[id], res) || verificaParametro(req.body, res)){
        return;
    };
    livros[id] = req.body;

    res.status(200).json(livros[id]);
});

router.delete("/:id", (req,res) => {
    const id = req.params.id;
    delete livros[id];
    res.status(200).json(livros);
});

router.delete("./deletar/:id", (req,res) => {
    const id = req.params.id;
    livros.splice(id,1);
    res.json(livros);
});

module.exports = router;