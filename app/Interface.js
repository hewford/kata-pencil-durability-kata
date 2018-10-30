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
        this.startTool = this.startTool.bind(this)
        this.printInterface = this.printInterface.bind(this)
    }

    production(input) {
        if (this.testing) {
            return input
        } else {
            console.log(input)
        }
    }

    printInterface() {
        this.production('point durability: ' + this.pencil.pointDurability)
        this.production('eraser durability: ' + this.pencil.eraserDurability)
        this.production('pencil length: ' + this.pencil.length)
        this.production('\n=======YOUR DOCUMENT=======\n')
        this.production(this.paper.text)
        this.production('\n===========================')
        this.active ? '' : this.production('      write\n        ∆\nedit <--|--> sharpen\n        V\n      erase')
    }

    startTool(mode) {
        process.stdin.setRawMode(mode || false)
        this.testing ? '' : process.stdout.write('\x1Bc')
        this.printInterface()

    }

    startSession() {
        this.testing ? '' : process.stdout.write('\x1Bc')
        this.printInterface()
        readline.emitKeypressEvents(process.stdin)
        process.stdin.setRawMode(true)

        return process.stdin.on('keypress', (str, key) => {
            if (key.ctrl && key.name === 'c') {
                process.exit()

            } else if (key.name === 'up') {
                this.active = 'write'
                this.startTool()
                this.production('*note: ctr + n = newline\n*press "enter" to submit/exit\nWRITING:\n')
                return "WRITING:"

            } else if (key.name === 'down') {
                this.active = 'erase'
                this.startTool()
                this.production('*note: press "enter" to submit/exit\nERASING:\n')
                return "ERASING:"

            } else if (key.name === 'right') {
                this.pencil.sharpen()
                this.startTool(true)
                this.production('PENCIL SHARPENED')
                return 'PENCIL SHARPENED'

            } else if (key.name === 'left') {
                this.active = 'edit'
                this.startTool()
                this.production('*note: press "enter" to submit/exit\nEDITING:\n')
                return 'EDITING:'

            } else if (key.name === 'enter' && this.active) {
                let action = null
                this.text === '' ? '' : action = this.pencil[this.active](this.text, this.paper)
                this.active = false
                process.stdin.setRawMode(true)
                this.printInterface()
                action ? this.production(action) : ''
                this.text = ''
                

            } else if (this.active) {
                if (key.ctrl && key.name === 'n') {
                    this.text += '\n'
                } else {
                    this.text += str
                }
            }

            return str
        })
    }
}

module.exports = UserInterface