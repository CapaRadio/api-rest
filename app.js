const express = require ('express');
const { connecter } = require('./bd/connect');
const app = express();
const routesUtilisateur = require ("./route/utilisateur");


app.use(express.urlencoded({extended : true}));
app.use(express.json());


app.use("/api/v1",routesUtilisateur);



connecter("mongodb://127.0.0.1:27017", (erreur)=>{
    if(erreur){
        console.log("Erreur lors de la connexion avec la base de données");
        process.exit(-1);
    }else{
        console.log("Connexion avec la base de données établie");
        app.listen(3000);
        console.log("Attente des requêtes au port 3000")
    }
});



app.listen(3000);
console.log("Attente des requêtes au port 3000");