class Pencil {
    constructor(props) {
        this.props = {...props}
        this.pointDurability = props.pointDurability
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
        
    }
}

module.exports = Pencil