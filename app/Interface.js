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
        this.listKeys = this.listKeys.bind(this)

        this.keyMap = new Map();
        this.keyMap.set('ctr + w', 'write');
        this.keyMap.set('ctr + s', 'sharpen');
        this.keyMap.set('ctr + e', 'eraser');
        this.keyMap.set('ctr + d', 'edit');
        this.keyMap.set('ctr + c', 'exit');
    }

    production(input) {
        if (this.testing) {
            return input
        } else {
            console.log(input)
        }
    }

    listKeys () {
        console.log(`keys:`);
        this.keyMap.forEach((value, key) => {
          console.log(`${key} - ${value}`);
        });
        console.log();
    }

    startSession () {
        readline.emitKeypressEvents(process.stdin)
        process.stdin.setRawMode(true)
        this.testing ? '' : this.listKeys()
    
        return process.stdin.on('keypress', (str, key) => {
            if (key.ctrl && key.name === 'c') {
                process.exit();
            } else if (key.ctrl && key.name === 'w') {
                this.active = 'write'
                process.stdin.setRawMode(false)
                this.production('WRITING:')
                return "WRITING:"

            } else if (key.ctrl && key.name === 'e') {
                this.active = 'erase'
                process.stdin.setRawMode(false)
                this.production('ERASING:')
                return "ERASING:"

            } else if (key.ctrl && key.name === 's') {
                this.pencil.sharpen()
                this.production('PENCIL SHARPENED')
                return 'PENCIL SHARPENED'
            } else if (key.name === 'enter' && this.active) {
                process.stdout.write('\x1Bc')
                this.production(this.pencil[this.active](this.text, this.paper))
                this.production('point durability: ' + this.pencil.pointDurability)
                this.production('eraser durability: ' + this.pencil.eraserDurability)
                this.production('pencil length: ' + this.pencil.length)
                this.production('\n=======YOUR DOCUMENT=======\n')
                this.production(this.paper.text)
                this.production('\n===========================')
                this.text = ''
                this.active = false
                process.stdin.setRawMode(true)
                
                this.testing ? '' : this.listKeys()
            } else if (this.active) {
                this.text += str
            }

            return str
        })
    }
}

module.exports = UserInterface