// Pour utiliser le serveur http
const http = require('http');

// J'importe l'app Express
const app = require('./app');

// Configure le port, qu'il soit en nombre ou string
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');

// Configure l'app Express sur le port
app.set('port', port);

// Gère les erreurs et enregistre l'erreur sur le serveur
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Execute l'app Express sur le serveur
const server = http.createServer(app);

server.on('error', errorHandler);
// Affiche dans la console le port actuel
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

// Execute le serveur sur le port
server.listen(port);
