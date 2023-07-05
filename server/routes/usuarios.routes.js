import { Router } from "express";
import { pool } from "../db.js";
import {
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
} from "../controllers/usuarios.controller.js";

const router = Router();

router.get('/usuarios', getUsuarios);

router.get('/usuarios/:id', getUsuario);

router.post('/usuarios', createUsuario);

router.put('/empleados/:id', updateUsuario);

router.delete('/empleados/:id', deleteUsuario);

router.get('/userNew', (req, res) => {
    res.render('addUser');
});

router.get('/usersList',  async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM usuario ORDER BY idUsu DESC');
        res.render("usuarios.hbs", {result});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
})

router.post('/formetest', (req,res) => {
    console.log(req.body)
})

export default router;