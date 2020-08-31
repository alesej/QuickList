const router = require("express").Router();
const List = require("../models/list.model.js");

router.post("/", (req, res) => {
    const newList = new List(req.body);
    newList.save().then(()=> res.json("New List Added!")).catch(err => res.status(400).json("Error: " + err));
});

router.get("/:id",(req, res) => {
    List.findOne({ id: req.params.id })
    .then(list => res.json(list))
    .catch(err => res.status(400).json("Error: " + err));
});

router.put("/:id/update", (req, res) => {
    let updates = req.body;

    List.findOneAndUpdate({ id: req.params.id}, updates, {new: true})
    .then(updatedList => res.json(updatedList))
    .catch(err => res.status(400).json("Error: " + err));
})

router.delete("/:id",(req, res) => {
    List.findOneAndDelete({ id: req.params.id })
    .then(() => res.json("Deleted List with ID: " + req.params.id))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;