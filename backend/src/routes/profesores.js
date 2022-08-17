const {Router}=require('express');
const router1 = Router();

const {getProfesores,getProfesor,postProfesor,putProfesor,deleteProfesor} = require ('../controllers/profesoresControl.js');

router1.route('/')
    .get(getProfesores)
    .post(postProfesor);

router1.route('/:nombre')
    .get(getProfesor)
    .put(putProfesor)
    .delete(deleteProfesor);


module.exports = router1
