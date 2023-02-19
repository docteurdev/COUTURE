const { ValidationError, UniqueConstraintError } = require("sequelize");
const { MdressMaker, Mclient, Mdress } = require("../../bd/sequelize");
const { errorServer, Port } = require("../../common/common");

const multer  = require('multer')
const path= require('path');


const storage= multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public");
    },
    filename: (req, file, cb) =>{
      cb(null, Date.now() + path.extname(file.originalname))  
    }
})
const upload = multer({storage: storage})



module.exports = (app) => {
    app.post("/api/coutre/create-cmd",upload.array('files'),(req, res) => {
        let clentInfo = JSON.parse(req.body.dataCmd)
        const { dressMakerID, clientId } = clentInfo;

        var dressmakerM, clientM, dressM;

        console.log(req.files);
        // console.log(req.body);
        const tissuImg = req.files.length?req.files[0].filename : null
       const  modelImg=  req.files.length?req.files[1].filename : null

        const commande ={
            ...clentInfo,
            tissus:req.files.length?`http://localhost:${Port}/${tissuImg}`: null,
            photos:req.files.length?`http://localhost:${Port}/${modelImg}`: null
    
        }

        MdressMaker.findByPk(dressMakerID).then((dressmaker) => {
            dressmakerM = dressmaker;
             Mclient.findByPk(clientId).then(client => {
                clientM = client;
             Mdress.create(commande).then(cmd =>{
                 dressM =cmd
                  dressmakerM.addCommande(dressM);
                  clientM.addCommande(dressM)
                let message=`la nouvelle commande de ${clientM.name} ${clientM.lastname} est ajoutée avec succès`
                return res.json({message, data: cmd})
             })
            })
        }).catch((err) => {
            if(err instanceof ValidationError){
                return res.json({message: err.message, data: err})
            }
            if(err instanceof UniqueConstraintError){
                return res.json({message: err.message, data: err})

            }else{
                return res.json(errorServer)

            }
        });
    })
}