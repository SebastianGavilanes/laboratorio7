const db = require("./database")
const profControl = {};

profControl.getProfesores = (req,res)=>res.json(db.profesores);
profControl.getProfesor = (req,res)=>{
    const profesor = db.profesores.find(
        (prof)=>prof.nombre == req.params.nombre
    );

    res.json(profesor);
}

profControl.postProfesor = (req,res)=>{
    const {nombre, edad} = req.body;
    if(!nombre || !edad){
        res.status(400).send("Datos incompletos{nombre, edad}");
        return;
    }
    
    const profesor2 = db.practica.find((prof)=>prof.nombre==profesor.nombre);
    if(!(profesor2==null)){
        res.status(400).send("Profesor ya se encuentra registrado")
        return;
    }
    db.practica.push(profesor);
    db.updateDB();
    res.send('Profesor ingresado con éxito');
}

profControl.putProfesor = (req,res)=>{
    const {edad} = req.body;

    if(!edad){
        res.status(400).send("Datos incompletos {edad}");
        return;
    }
    const profesor = db.profesores.find(
        (prof)=>prof.nombre == req.params.nombre
    );
    if (profesor==null){
        res.status(400).send("Profesor no registrado")
        return;
    }
    profesor.edad = edad;
    db.updateDB();
    res.send('Profesor actualizado');
}

profControl.deleteProfesor = (req,res)=>{
    const index = db.profesores.findIndex(
        (prof)=>prof.nombre == req.params.nombre
    );
    if(index < 0){
        res.status(400).send("nombre de profesor no encontrado");
        return;
    }
    db.profesores.splice(index,1);
    db.updateDB();
    res.send('Profesor eliminado');

}

module.exports = profControl;