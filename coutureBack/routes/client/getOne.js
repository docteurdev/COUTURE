const { Mclient } = require("../../bd/sequelize");
const { errorServer } = require("../../common/common");

module.exports= (app) =>{
    app.get('/api/coutre/get-client/:id', (req, res) =>{
        Mclient.findByPk(req.params.id).then((client) => {
            if(client){
                let message= `le client ${client.name} ${client.lastname} a été récuperé avec succès`;
                return res.json({message, data: client})
            }else{
                let message= `le client que vous éssayez de récupérer n'existe pas  dans votre base de clients`;
                return res.json(message)

            }
        }).catch((err) => {

            return res.json(errorServer)

        });
    })
}