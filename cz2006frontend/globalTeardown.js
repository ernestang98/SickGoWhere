const { teardown: teardownDevServer } = require('jest-dev-server')

module.exports = async function globalTeardown() {
    await teardownDevServer()

    // Your global teardown
    console.log("\nglobalTeardown.js was invoked");
}
