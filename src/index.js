import express from "express";
import Lojistadb from "./lojistadb";

const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const lojistas = {};
contador = 0;

// GET em /lojistas
app.get("/lojistas", (req,res) => {
    res.send("Lista de todos os lojistas.");
});
// GET em /lojistas/id
app.get("/lojistas/:id(\\d+)", function(req, res, next) {
    let id = req.params.id;
    Lojistadb.getLojistaById(id, function(carro) {
        res.json(lojista) 
    });
});
// DELETE em /lojistas/id
app.delete("/lojistas/:id(\\d+)", function(req, res) {
    let id = req.params.id;
    console.log("Deletar lojista" + id);
    Lojistadb.deleteById(id, function(affectedRows) {
        res.json ({msg: "Lojista deletado com sucesso."})
    });
});
// GET em /lojistas/tipo (CNPJ, CPF)
app.get("/lojistas/:tipo", function(req, res) {
    let tipo = req.params.tipo;
    Lojistadb.getLojistasByTipo(tipo, function(lojistas) {
        res.json(lojistas)
    });
});
// POST para salvar um lojista
app.post("/lojistas", function(req, res) {
    let lojista = req.body;
    Lojistadb.save(lojista, function(lojista) {
        res.json(lojista)
    });
});
// PUT para atualizar um lojista
app.put("/lojistas", function(req, res) {
    let lojista = req.body;
    Lojistadb.update(lojista, function(lojista) {
        res.json ({msg: "Lojista atualizado com sucesso."})
    });
});