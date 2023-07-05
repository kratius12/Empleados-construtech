import {pool} from "../db.js"
export const getEmpleados = async (req,res) =>{
    try {
        const [result] = await pool.query('SELECT *FROM empleado ORDER BY idEmp DESC')
        res.json(result)            
    } catch (error) {
        return res.status(500).json({message: error.message})
    }         
}

export const getEmpleado = async (req,res) =>{
    try {
        const [result] = await pool.query('SELECT *FROM empleado WHERE idEmp = ?', [req.params.id])
        if (result.length === 0) {
        return res.status(404).json({mensaje:"No se pudo encontrar el empleado"})        
        }
        return res.json(result[0])        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createEmpleado = async (req,res) =>{
    try {
        const {nombre, direccion, estado, email, telefono, cedula} = req.body
        const [result] = await pool.query('INSERT INTO empleado(nombre, direccion, estado, email, telefono, cedula) VALUES(?,?,?,?,?,?)',[nombre, direccion, estado, email, telefono, cedula])
        console.log(result)
        res.json({
            id:"Id insertado:"+result.insertId,
            nombre, 
            direccion, 
            estado, 
            email, 
            telefono, 
            cedula
        })        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

export const updateEmpleado = async (req,res) =>{
    try {
        const [result] = await pool.query('UPDATE empleado SET ? WHERE idEmp = ?', [req.body, req.params.id])
        if (result.affectedRows === 0) {
        return res.status(404).json({mensaje:"No se pudo encontrar el empleado"})        
        }
        return res.status(204).send("Empleado actualizado con exito!")        
    } catch (error) {
        return res.status(500).json({message: error.message})   
    }
}

export const deleteEmpleado = async (req,res) =>{
    try {
        const [result] = await pool.query('DELETE FROM empleado WHERE idEmp = ?', [req.params.id])  
        if (result.affectedRows ==0) {
            return res.status(404).json({mensage:"empleado no encontrado"})
        }
        return res.status(204).send("Empleado eliminado con exito")        
    } catch (error) {
        return res.status(500).json({message: error.message})           
    }
}