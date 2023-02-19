const { Mdress } = require("../../bd/sequelize")

module.exports = (app) =>{
 app.get('/api/coutre/get_client-dress/:id', (req, res) =>{
    Mdress.findAll({where:{ClientId: req.params.id}}).then((dress) => {
        let message = "Toutes vos commandes ont été récupérées avec succès";
        return res.json({message, data:dress})
    }).catch((err) => {
       return res.status(500).json({message: err.message, data: err}) 
    });
 })
}