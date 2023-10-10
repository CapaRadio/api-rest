
const { Utilisateur } = require("../model/utilisateur");
const client = require ("../bd/connect");
const { ObjectId } = require("mongodb");



const ajouterUtilisateur = async (req,res) => {
    try{
        let utilisateur = new Utilisateur(
            req.body.noms, 
            req.body.adresse, 
            req.body.telephone
            );
    
       let result = await client.bd().collection("utilisateurs").insertOne(utilisateur);
    
        res.status(200).json(result);

    } catch (error){
        console.log(error);
        res.status(500).json(error);
    }
};


const getTousUtilisateurs = async (req,res)=>{
    try{
        client.bd().collection("utilisateurs").find();
        let result = await cursor.toArray();
        if(result.length>0){
            res.status(200).json(result);
        }else{
            res.status(204).json({msg : "Aucun utilisateur trouvé"})
        }
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};



const getUtilisateur = async (req,res)=>{
    try{
        let id = new ObjectId(req.params.id);
        client.bd().collection("utilisateurs").find({_id : id});
        let result = await cursor.toArray();
        if(result.length>0){
            res.status(200).json(result[0]);
        }else{
            res.status(404).json({msg : "Cet utilisateur n'existe pas"})
        }
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }


};

const modifierUtilisateur = async (req,res)=>{
    try{
        let id = new ObjectId(req.params.id);
        let nNoms = req.body.noms;
        let nAdresse = req.body.adresse;
        let nTelephone = req.body.telephone;

    let result = await client
    .bd()
    .collection("utilisateurs")
    .updateOne(
        {_id : id},
        {$set : {noms : nNoms, adresse : nAdresse, telephone : nTelephone}}
        );
        if(result.modifiedCount==1){
            res.status(200).json({msg : "Modification réussie"});
        }else{
            res.status(404).json({msg : "Cet utilisateur n'existe pas"});
        }
        
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    }
};


const supprimerUtilisateur = async (req,res)=>{
    try{
        let id = new ObjectId(req.params.id);

    let result = await client
    .bd()
    .collection("utilisateurs")
    .deleteOne({_id : id});

    if(result.deleteCount==1){
        res.status(200).json({msg : "Suppression réussie"});
    } else{
        res.status(404).json({msg : "Cet utilisateur n'existe pas"});
    }
        
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    }
};




module.exports = {ajouterUtilisateur,getTousUtilisateurs, getUtilisateur, modifierUtilisateur, supprimerUtilisateur};