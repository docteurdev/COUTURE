const { Mclient } = require("../../bd/sequelize");
const { errorServer } = require("../../common/common");

module.exports= (app) =>{
    app.get('/api/coutre/get-client/:id', (req, res) =>{
      console.log(req.body);
        Mclient.findAll({where: {DressMakerId: req.params.id}}).then((clients) => {
          if(clients){
            let message = `tous vos clients ont été récupérés avec succès`
            return res.json({message, data: clients})
          }
          else{
            let message = `tous vos clients ont été récupérés avec succès`
            return res.json(message);
          }  
        }).catch((err) => {
           return res.status(500).json({message:errorServer, data: err}) 
        });
    })
}