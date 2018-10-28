class Pencil {
    constructor(props) {
        this.originalPointDurability = {...props}.pointDurability
        this.pointDurability = props.pointDurability
        this.length = props.length
        this.eraserDurability = props.eraserDurability
    }

    write(text, paper) {
        this.pointDurability -= text.match(/[A-Z]/g) ? text.match(/[A-Z]/g).length*2 : 0
        this.pointDurability -= text.match(/[^A-Z\s]/g) ? text.match(/[^A-Z\s]/g).length : 0

        if (this.pointDurability <= 0) {
            let regExp = new RegExp('\\w{'+Math.abs(this.pointDurability)+'}$')
            // store number of empty spaces in a string
            const emptySpace = text.match(regExp)[0].split('').reduce((emptySpace, space) => {
                return emptySpace += ' '
            }, '')
            text = text.replace(regExp, emptySpace)
        }

        return paper.text += text
    }

    sharpen() {
        if (this.length > 0) {
            this.pointDurability = this.originalPointDurability
            this.length--
        }
    }

    erase(text, paper) {
        const emptySpace = text.split('').reduce((emptySpace, character) => {
            return emptySpace += ' '
        }, '')
        const regExp = new RegExp(text)
        return paper.text = paper.text.replace(regExp, emptySpace)
    }
}

module.exports = Pencil