const { MCatalogue, MdressMaker } = require("../../bd/sequelize")

const multer  = require('multer')
const path= require('path');
const { Port, errorServer } = require("../../common/common");
const { ValidationError, UniqueConstraintError } = require("sequelize");


const storage= multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public");
    },
    filename: (req, file, cb) =>{
      cb(null, Date.now() + path.extname(file.originalname))  
    }
})
const upload = multer({storage: storage})

module.exports= (app) =>{
    app.post('/api/coutre/get-catalogue',upload.single('model'), (req, res) =>{
        var dressMaker, newCat;
        let cat ={...req.body, image:`http://localhost:${Port}/${req.file.filename}`}
        MdressMaker.findByPk(req.body.id_dressMaker).then(dressMk =>{
            dressMaker = dressMk;
            MCatalogue.create(cat).then(catalogue =>{
                newCat = catalogue;
                dressMaker.addCatalogue(newCat)
                //console.log(catalogue);
                let message= "un model a été ajoutée dans votre catalogue"
                return res.json({message, data:newCat})
            }).catch(error =>{
                if(error instanceof ValidationError){
                    return res.status(404).json({message: error.message, data: error})
                }
                if(error instanceof UniqueConstraintError){
                    return res.status(404).json({message: error.message, data: error})
                }else{
                    return res.status(500).json({message: errorServer, data: error})

                }
            })

         
        })
    })
}