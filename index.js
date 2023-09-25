const http = require('http');
const name = '127.0.0.1';
const port = 3000;
const server = http.createServer((requete, reponse) => {
    reponse.statusCode = 200;
    reponse.setHeader('Content-Type', 'text/plain')
    reponse.end('Bonjour les SIO2');
})
server.listen(port, name, () => {
    console.log(`Le serveur est en écoute sur http://${name}:${port}/`)
})