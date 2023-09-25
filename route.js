import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express')
const app = express();
const path = require('path');

import {listeEleves} from "./sources/eleves.mjs"

app.get('/', (requete, reponse) => {
    reponse.send('Bonjour les SIO2 SLAM')
})
app.get('/accueil', (requete, reponse) => {
    reponse.send("Bienvenue sur la page d'accueil");
})

app.get('/bienvenue', (requete, reponse) => {
    reponse.sendFile(path.join(__dirname, 'bienvenue.html'));
})

app.get('/panorama', (requete, reponse) => {
    reponse.sendFile(path.join(__dirname, 'planDuSite.html'));
})

app.get('/exempleParam', (requete, reponse) => {
    const jesuisUnParam = requete.query.nomDuParamDansURL

    reponse.send(`Bonjour ${jesuisUnParam} trouvé dans le paramètre jesuisUnParam`);
})



app.get('/exempleParam/:jesuisUnParam', (requete, reponse) => {
    const jesuisUnParam = requete.params.jesuisUnParam
    reponse.send(`Bonjour ${jesuisUnParam} trouvé dans le paramètre jesuisUnParam`);
})

app.get('/exempleParam/:idEleve',(requete, resultat) => {
    const nomEtudiant = requete.params.idElve
    resultat.send('Bonjour mr ou mme '+nomEtudiant)
})

app.get('/api/leseleves',(requete,resultat)=>{
    const listePartielle = listeEleves.map(eleve =>{
        return{ nomEleve: eleve.nom, prenomEleve: eleve.prenom}
    })
    resultat.json(listePartielle)
})

app.get('/api/cherche/:nomEleve',(requete,resultat) =>
{
    const nomDeMonEleve = requete.params.nomEleve
    console.log(nomDeMonEleve)
    const etudiantTrouve = listeEleves.find((nomEleveBoucleTableau) =>
    nomEleveBoucleTableau.nom === nomDeMonEleve)
    console.log(etudiantTrouve)
    resultat.json(etudiantTrouve)
})

app.get('/api/eleves', (requete,reponse)=>
{
    reponse.json(listeEleves)
})

app.get('/api/cherchePartielle',(requete,resultat)=>{

})

app.listen(3005, () => {
    console.log('Le serveur est en écoute sur http://localhost:3005/');
})



