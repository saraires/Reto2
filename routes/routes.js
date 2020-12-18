const { Router } = require('express');
const router = Router();
const fs = require('fs');

const archivoCarros = fs.readFileSync("./carros.json", "utf8");
let carros = JSON.parse(archivoCarros);

router.get("/", (req, res) => {
    res.json("Base datos Carros");
});

router.get("/carros", (req, res) => {
    res.status(200).json(carros);
});

router.post("/carros", (req, res) => {

    const { marca, modelo, comprador, numeroTarjeta } = req.body;

    if (!marca || !modelo || !comprador || !numeroTarjeta) {
        res.status(401).json({ error: "Diligencie todos los campos" });
    } else {

        const id = carros.length + 1;

        let carroNuevo = {
            id,
            marca,
            modelo,
            comprador,
            numeroTarjeta
        };

        carros.push(carroNuevo);
        const json_carros = JSON.stringify(carros);
        fs.writeFileSync("./carros.json", json_carros, "utf-8");

        res.status(200).json(carros);
    }
});

router.put("/carros/:id", (req, res) => {

    const { marca, modelo, comprador, numeroTarjeta } = req.body;
    const id = req.params.id;

    if (!marca || !modelo || !comprador || !numeroTarjeta) {
        res.status(401).json({ error: "Diligencie todos los campos" });
    } else {

        carros.filter((carros) => {
            if (carros.id == id) {
                carros.marca = marca;
                carros.modelo = modelo;
                carros.comprador = comprador;
                carros.numeroTarjeta = numeroTarjeta;
            }
        });

        const json_carros = JSON.stringify(carros);
        fs.writeFileSync("./carros.json", json_carros, "utf-8");

        res.status(200).json(carros);
    }
});


router.delete("/carros/:id", (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(401).json({ error: "Especifique un id" });
    } else {
        const indexCarro = carros.findIndex((carros) => carros.id === id);
        carros.splice(indexCarro, 1);

        const json_carros = JSON.stringify(carros);
        fs.writeFileSync("./carros.json", json_carros, "utf-8");

        res.status(200).json(carros);
    }
});

module.exports = router;