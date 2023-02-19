const { Mdress, Mclient } = require("../../bd/sequelize")

module.exports = (app) =>{
 app.get('/api/coutre/get_dress/:id', (req, res) =>{
    Mdress.findAll({where:{DressMakerId: req.params.id}, include:[{model: Mclient}]}).then((dress) => {
        let message = "Toutes vos commandes ont été récupérées avec succès";
        return res.json({message, dress})
    }).catch((err) => {
       return res.status(500).json({message: err.message, data: err}) 
    });
 })
}