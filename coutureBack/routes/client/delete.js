const { Mclient } = require("../../bd/sequelize");
const {errorServer}= require('../../common/common')
module.exports= (app) =>{
    app.delete('/api/coutre/delete-client', (req, res) =>{
        Mclient.findOne({where: {DressMakerId:req.body.dressMaker_id, id: req.body.client_id}}).then((client) => {

            if(client){
                // console.log(client);
                Mclient.destroy({where: {DressMakerId:req.body.dressMaker_id, id: req.body.client_id}}).then(_ =>{
                    let message=`le client ${client.name} ${client.lastname} a été supprimé`
                   return res.json({message, data: client})
                })
            }else{
                let message="le client que voulez supprimer n'existe"
                return res.json(message)
            }
        }).catch((err) => {
            return res.json({errorServer})
            
        });
    })
}