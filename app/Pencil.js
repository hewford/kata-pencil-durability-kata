class Pencil {
    constructor(props) {
        console.log(props.pointDurability)
        this.pointDurability = props.pointDurability
    }

    write(text, paper) {
        this.pointDurability -= text.length
        return paper.text += text
    }
}

module.exports = Pencil