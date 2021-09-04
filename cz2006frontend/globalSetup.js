const { setup: setupDevServer } = require('jest-dev-server')

import 'regenerator-runtime/runtime';

module.exports = async function globalSetup() {
    await setupDevServer({
        command: 'cd ../cz2006backend && npm start',
        launchTimeout: 10000,
        port: 3000
    })

    // Your global setup
    console.log("\n\nglobalSetup.js was invoked");
}
