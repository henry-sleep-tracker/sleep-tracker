const { Router } = require('express');
const router = Router();
const {getComments} = require('../controllers/getComments')

router.get('/', async(req,res)=>{
            try{
            const allComnets = await getComments();
            if(allComnets.length){
                return res.status(200).send(allComnets)
                
            }
        }catch(error){
            res.status(400).send(alert('ERROR: No han registrado ningun comentario'))
        };
    }
);

module.exports=router;