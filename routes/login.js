const express = require('express');
const router = express.Router();

router.post("/", (req, res) => {
    const { username, senha } = req.body;
    if (username === "admin" && senha === "web2025")
        res.status(200).json({ acesso: true, msg: "Você está logado!"});
    else
        res.status(200).json({ acesso: false, msg: "Acesso negado!"});
});

module.exports = router;
