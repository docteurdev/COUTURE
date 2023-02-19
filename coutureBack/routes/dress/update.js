const { ValidationError, UniqueConstraintError } = require("sequelize");
const { Mdress } = require("../../bd/sequelize");
const { errorServer } = require("../../common/common");

module.exports = (app) => {
    app.put('/api/coutre/update-cmd', (req, res) => {
        const { clientId, dressMakerId, dresseId } = req.body;
        console.log(req.body);
        Mdress.update(req.body, { where: { cmd_id: dresseId, DressMakerId: dressMakerId, ClientId: clientId } }).then(_ => {
            Mdress.findOne({ where: { cmd_id: dresseId, DressMakerId: dressMakerId, ClientId: clientId } }).then(dresse => {
                let message = `la commande N°${dresse.cmd_id} a été modifié avec succès`
                return res.json({ message, data: dresse })
            })
        }).catch((err) => {
            if (err instanceof ValidationError) {
                return res.json({ message: err.message, data: err })
            }
            if (err instanceof UniqueConstraintError) {
                return res.json({ message: err.message, data: err })

            } else {
                return res.json(errorServer)

            }
        });
    })
}