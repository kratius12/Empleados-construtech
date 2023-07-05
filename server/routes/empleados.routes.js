import {Router} from "express";
import { pool } from '../db.js'
import {
    getEmpleados,
    getEmpleado,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
} from "../controllers/empleados.controller.js"

const router = Router()

router.get("/empleados", getEmpleados,  async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM empleado ORDER BY idEmp DESC');
        res.render("empleados.hbs", {result});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
})

router.get("/empleado/:id", getEmpleado)

router.post("/empleados", createEmpleado)

router.put("/empleado/:id", updateEmpleado)

router.delete("/empleado/:id", deleteEmpleado)

router.get('/empsList',  async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM empleado ORDER BY idEmp DESC');
        res.render("empleados.hbs", {result});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
})

router.get('/addEmpleado', async(req,res)=>{
    try {
        const [result] = await pool.query('SELECT * FROM especialidad');
        res.render("addEmpleado.hbs", {result});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
});

router.post('/agregarEmp', async(req,res)=>{
    try {
        const {nombre, direccion, estado, email, telefono, cedula} = req.body
        const [result] = await pool.query('INSERT INTO empleado(nombre, direccion, estado, email, telefono, cedula) VALUES(?,?,?,?,?,?)',[nombre, direccion, estado, email, telefono, cedula])
        res.render("addEmpleado.hbs", {result});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
});

router.get("/Empedit", async (req,res) =>{
    try {
        const {idEmp, nombre, email, direccion, telefono, cedula, estado} = req.body
        const [result] = await pool.query('UPDATE empleado SET nombre = ?, email = ?, direccion = ?, telefono = ?, cedula = ?, estado = ? WHERE idEmp = ?',[nombre, email, direccion, telefono, cedula,  estado, idEmp])
        // console.log(result.affectedRows > 0)
        if (result.affectedRows > 0) {
            const [empleados] = await pool.query('SELECT *FROM empleado ORDER BY idEmp DESC')                    
            res.render("empleados", {result:empleados,message:{type:1,content:`empleado editado con exito! idEmp afectado: ${result.insertId}`}});          
        } else {
            res.render("editEmpleado.hbs",{result});
        }
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }
})

 export default router