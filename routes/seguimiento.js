var express = require("express");
var router = express.Router();

router.use((req, res, next) => {
    req.collection = req.db.collection("seguimiento");
    next();
});

router.get("/:id", (req, res, next) => {
    let id =  req.params.id;
    req.collection.find({ "id":id }).toArray().then(data => {
        res.send(data);
    }).catch(err => {
        res.send([]);
    });
});

router.get("/:id/mascotas/:nombre", (req, res, next) => {
    let id =  req.params.id;
    let nombre = req.params.nombre;
    req.collection.findOne({ "id":id, nombre: nombre   }).then(data => {
        if(data){
            res.send(data);
        }else{
            res.status(404).send();
        }
        
    }).catch(err => {
        res.status(404).send();
    });
});

router.post("/", (req, res, next) => {
    let mascota = req.body;
    req.collection.insert(mascota).then(result => {
        res.send({ success: true });
    }).catch(err => {
        res.send({ success: false });
    });
});

module.exports = router;