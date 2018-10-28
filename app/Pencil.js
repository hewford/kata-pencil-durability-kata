class Pencil {
    constructor(props) {
        console.log(props.pointDurability)
        this.pointDurability = props.pointDurability
    }

    write(text, paper) {
        return paper.text += text
    }
}

module.exports = Pencil