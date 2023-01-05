const { Router } = require('express');
const router = Router();
const {getComments} = require('../../controllers/getComments')
const {getUserById} = require('../../controllers/user')

router.get('/', async(req,res)=>{
            try{
            const allComments = await getComments();
            if(allComments.length){
                return res.status(200).send(allComments)
                
            }
        }catch(error){
            res.status(400).send(alert('ERROR: No han registrado ningun comentario'))
        };
    }
);

module.exports=router;