const { ValidationError, UniqueConstraintError } = require("sequelize");
const { Mclient, MdressMaker } = require("../../bd/sequelize");
const { errorServer } = require("../../common/common");

module.exports = (app) => {
    app.post('/api/coutre/create-client', (req, res) => {

        let dressM, clientM;

         console.log(req.body);
        Mclient.create(req.body, { include: [MdressMaker] }).then(client => {
            clientM = client
            console.log("found clientM",clientM);

            return MdressMaker.findOne({ where: { id: req.body.dress_maker_id } })
        }).then(data => {
            dressM = data;
        // console.log("found dresssss",dressM);

            dressM.addClient(clientM);
            let message = `votre client ${clientM.name} ${clientM.lastname} a été ajouté`;
            return res.json({ message, data: clientM })
        })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(404).json({ message: error.message, data: error })
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(404).json({ message: error.message, data: error })
                }
                return res.json({ message: errorServer, data: error })
            })
    })
}