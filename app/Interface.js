const readline = require('readline');
const Pencil = require('./Pencil')
const Paper = require('./Paper')

class UserInterface {
    startSession () {
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);

        return process.stdin.on('keypress', (str, key) => {
            return str
        })
    }
}

module.exports = UserInterface