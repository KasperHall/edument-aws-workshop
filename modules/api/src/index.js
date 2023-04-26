const express   = require('express');
const env       = require('./env');
const routes    = require('./routes');

// ...

const app = express();
app.use(express.json());
app.use('/', routes);

// health check.
app.get('/healthz', (_req, res) => {
    res.send('OK');
});

console.log('Test String ###########################')

const server = app.listen(env.port, () => {
    console.log(`Listening on port ${env.port}`)
});

process.on('SIGTERM', () => {
    console.log('API server: shutting down...');
    server.close(
        () => {
            console.log('API server: Shutdown complete.')
            process.exit(0);
        }
    );
  });