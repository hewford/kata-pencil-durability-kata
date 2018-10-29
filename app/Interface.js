const readline = require('readline');
const Pencil = require('./Pencil')
const Paper = require('./Paper')

class UserInterface {
    constructor(pencilProps, testing) {
        this.active = null
        this.paper = new Paper()
        this.pencil = new Pencil(pencilProps)
        this.text = ''
        this.testing = testing
        this.production = this.production.bind(this)
    }

    production(input) {
        if (this.testing) {
            return input
        } else {
            console.log(input)
        }
    }

    startSession () {
        readline.emitKeypressEvents(process.stdin)
        process.stdin.setRawMode(true)
    
        return process.stdin.on('keypress', (str, key) => {
            if (key.ctrl && key.name === 'w') {
                this.active = 'write'
                process.stdin.setRawMode(false)
                this.production('WRITING:')
                return "WRITING:"

            } else if (key.ctrl && key.name === 'e') {
                this.active = 'erase'
                process.stdin.setRawMode(false)
                this.production('ERASING:')
                return "ERASING:"

            } else if (key.name === 'enter' && this.active) {
                process.stdout.write('\x1Bc')
                this.production(this.pencil[this.active](this.text, this.paper))
                this.production('\n=======YOUR DOCUMENT=======\n')
                this.production(this.paper.text)
                this.production('\n===========================')
                this.text = ''
                this.active = false
                process.stdin.setRawMode(true)

            } else if (this.active) {
                this.text += str
            }

            return str
        })
    }
}

module.exports = UserInterface