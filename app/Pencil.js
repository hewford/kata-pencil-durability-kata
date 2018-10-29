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
            let regExp = new RegExp('\.{'+Math.abs(this.pointDurability)+'}$')
            // store number of empty spaces in a string
            const emptySpace = text.match(regExp)[0].split('').reduce((emptySpace) => {
                return emptySpace += ' '
            }, '')
            text = text.replace(regExp, emptySpace)
            this.pointDurability = 0
        }
        paper.text += text
        return 'wrote ' + text 
    }

    sharpen() {
        if (this.length > 0) {
            this.pointDurability = this.originalPointDurability
            this.length--
        }
        return 'sharpened pencil to original durability of: ' + this.pointDurability
    }

    erase(text, paper) {
        const countEmptySpace = (text) => {
            return text.split('').reduce((emptySpace) => {
                return emptySpace += ' '
            }, '')
        }

        if (this.eraserDurability) {
            let regExp = new RegExp(text+'\(\?\!\.\*'+text+'\)')
            
            if (paper.text.match(regExp)) {
                this.eraserDurability -= countEmptySpace(text).length

                if (this.eraserDurability<0) {
                    text = text.slice(text.length-Math.abs(this.eraserDurability))
                    regExp = new RegExp(text+'\(\?\!\.\*'+text+'\)')
                    this.eraserDurability = 0
                }

                // remember last index of an erased character
                paper.indexOfLastCharacterErased = paper.text.indexOf(text)

                paper.text = paper.text.replace(regExp, countEmptySpace(text))

                return 'erased ' + text + '. remaining eraser durability is ' + this.eraserDurability
            } else {
                return 'text to be erased could not be found on the paper'
            }
        } else {
            return 'cannot erase since the eraser is completed degraded'
        }
    }

    edit(text, paper) {
        if(text.match(/[\n\r]/)) {
            return 'invalid entry of either newline or return'
        }
        let paperText = paper.text.split('')
        for (let target = paper.indexOfLastCharacterErased, index = 0; index < text.length; index++) {
            if (paperText[target + index] !== ' ' && paperText[target + index] !== undefined && text[index] !== ' ' && paperText[target + index] !== text[index]) {
                paperText[target + index] = '@'
            } else {
                text[index] !== ' ' ? paperText[target + index] = text[index] : ''
            }
        }
        paper.text = paperText.join('')
    }
}

module.exports = Pencil