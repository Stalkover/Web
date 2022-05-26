let Userdb = require("../model/model");

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({message: "Content can not be empty"});
        return;
    }

    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        city:req.body.city,
        password:req.body.password,
        status:req.body.status
    })

    user.save(user).then(data => {
        //res.send(data)
        res.redirect("/admin")
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a create operation"
        })
    })
}

exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id).then(data=>{
            if(!data){
                res.status(404).send({message: "Not found user with " + id + " id"})
            }
            else{
                res.send(data)
            }
        }).catch(err => {
            res.status(500).send({message: "Error retrieving user with " + id + " id"})
        })
    }else{
        Userdb.find().then(user => {
            res.send(user)
        }).catch(err => {
            res.status(500).send({message: err.message || "Error occurred while retrieving user data"})
        })
    }
}

exports.update = (req, res)=>{
    if(!req.body){
        return res.status(400).send({message: "Data to update cannot be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body).then(data => {
        if(!data){
            res.status(404).send({message: "Cannot update user with " + id + " id"})
        }
        else{
            res.send(data)
        }
    }).catch(err =>{
        res.status(500).send({
            message:"Error: couldn't update"
        })
    })
}

exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id).then(data =>{
        if(!data){
            res.status(404).send({message:"Cannot delete user with " + id + " id"})
        }
        else{
            res.send({
                message:"User deleted successfully"
            })
        }
    }).catch(err =>{
        res.status(500).send({
            message:"Couldn't delete user with " + id + " id"
        })
    })
}