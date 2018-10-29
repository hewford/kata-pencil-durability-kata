const readline = require('readline');
const Pencil = require('./Pencil')
const Paper = require('./Paper')

class UserInterface {
    constructor(pencilProps) {
        this.active = null
        this.paper = new Paper()
        this.pencil = new Pencil(pencilProps)
        this.text = ''
    }

    startSession () {
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);
    
        return process.stdin.on('keypress', (str, key) => {
            if (key.ctrl && key.name === 'w') {
                this.active = 'write'
                process.stdin.setRawMode(false)
                return "WRITING:"
            } else if (this.active) {
                this.text += str
            }

            return str
        })
    }
}

module.exports = UserInterface