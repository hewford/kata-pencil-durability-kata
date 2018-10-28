class Pencil {
    constructor(props) {
        this.pointDurability = props.pointDurability
    }

    write(text, paper) {
        this.pointDurability -= text.match(/[A-Z]/g) ? text.match(/[A-Z]/g).length*2 : 0
        this.pointDurability -= text.match(/[a-z]/g) ? text.match(/[a-z]/g).length : 0
        return paper.text += text
    }
}

module.exports = Pencil