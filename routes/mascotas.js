var express = require("express");
var router = express.Router();

router.use((req, res, next) => {
    req.collection = req.db.collection("mascotas");
    next();
});

router.get("/", (req, res, next) => {
    req.collection.find().toArray().then(data => {
        res.send(data);
    }).catch(err => {
        res.send([]);
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

router.put("/:id", (req, res, next) => {
    let id = new ObjectID(req.params.id);
    let mascota = req.body;
    req.collection.updateOne({_id:id}, {$set:mascota}).then(result=>{
        res.send({success:true});
    }).catch(err=>{
        res.send({success:false})
    });

   
});

router.delete("/:id", (req, res, next) => {
    let id = new ObjectID(req.params.id);
    req.collection.deleteOne({_id:id}).then(result=>{
        res.send({success:true});
    })
    .catch(err=>{
        res.send({success:false});
    
    }); 
});

module.exports = router;