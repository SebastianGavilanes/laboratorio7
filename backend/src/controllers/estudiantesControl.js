const db = require("./database")
const estControl = {};

estControl.getEstudiantes = (req,res)=>{
    db.query("Select * FROM estudiantes", (err,result,fields)=>{
        if (err) {
            res.status(500).send(err);
            console.log(err);
            return;
        }
        res.json(result);
    });
}

estControl.getEstudiante = (req,res)=>{
    if(isNaN(req.params.id)){
        res.status(400).send("No es un id numérico");
        return;
    }
    db.query("SELECT * FROM estudiantes WHERE id="+req.params.id, 
    (err,result,fields)=>{
        if (err) {
            res.status(500).send(err);
            console.log(err);
            return;
        }
        res.json(result);
    });
}


estControl.postEstudiante = (req,res)=>{
    const {id,nombre,apellido} = req.body;
    if(!nombre || !apellido){
        res.status(400).send("Datos incompletos {nombre, apellido}");
        return;
    }
    let SQLbody = {};
    if(!id) SQLbody = {nombre,apellido};
    else    SQLbody = {id,nombre,apellido};
    
    db.query("INSERT INTO estudiantes SET ?", [SQLbody],
    (err,result)=>{
        if (err) {
            res.status(500).send(err);
            console.log(err);
            return;
        }
        res.send('Estudiante insertado con id: '+result.insertId);
    });
}


estControl.putEstudiante = (req,res)=>{ 
    const {nombre,apellido} = req.body; 
 
    if(!nombre || !apellido){ 
        res.status(400).send("Datos incompletos {nombre, apellido}");        
        return; 
    } 
    if(isNaN(rep.params.id)){                                      
        res.status(400).send("No es un id numerico");        
        return;                                                  
    }                                                           
    db.query("UPDATE estudiantes SET nombre" +nombre+ "apellido"+apellido+"WHERE id"+ req.params.id,
    (err, result) => {             
        if (err) { 
            res.status(500).send(err);                 
            console.log(err); 
            return; 
            } 
        res.send('Estudiante actualizado'); 
        }); 
     
} 


estControl.deleteEstudiante = (req,res)=>{ 
    const {id, nombre, apellido} = req.body; 
    db.query("DELETE FROM estudiantes WHERE id="+req.params.id, 
        (err, result, fields) => { 
            if (err){ 
                res.status(500).send(err);                 
                console.log(err); 
                return; 
            } 
        res.send("Estudiante eliminado"); 
        console.log("Estudiante eliminado"); 
        }); 
} 




module.exports = estControl;
