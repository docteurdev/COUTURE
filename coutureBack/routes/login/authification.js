const bcript= require('bcrypt');
const jwt =require('jsonwebtoken');
const private_key = require('../../auth/private_key');

const { MdressMaker } = require("../../bd/sequelize")
module.exports= (app) =>{
    app.post('/api/coutre/login', (req, res) =>{
        MdressMaker.findOne({where:{name: req.body.name, phone: req.body.phone}}).then((user) => {
           
            // console.log(req.body);
            if(user){
                bcript.compare(req.body.password, user.password).then(isPasswordValid =>{
                    if(!isPasswordValid){
                        let message= 'mot de passe incorrect';
                        return res.status(404).json(message)
                    }else{
                     const token= jwt.sign({userId: user.id}, private_key, {expiresIn:'24'});

                     const dressMaker ={
                        id: user.id,
                        name: user.name,
                        lastname: user.lastname,
                        phone: user.phone
                     }
                     let message= "Vous êtes bien connecté";
                     return res.json({message, data: dressMaker, token})
                        
                    }
                })
            }else{
                let message="soyez sûr d'avoir entré le bon de téléphone ou votre nom"
                return res.status(401).json({message})
            }
        }).catch((err) => {
            return res.json({message: err.message, data: err})
        });
    })
}