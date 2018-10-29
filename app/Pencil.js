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
            const emptySpace = text.match(regExp)[0].split('').reduce((emptySpace) => {
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
                }

                // remember last index of an erased character
                paper.indexOfLastCharacterErased = paper.text.indexOf(text)

                paper.text = paper.text.replace(regExp, countEmptySpace(text))

                return 'erased ' + text
            } else {
                return 'text to be erased could not be found on the paper'
            }
        } else {
            return 'cannot erase since the eraser is completed degraded'
        }
    }

    edit(text, paper) {
        let paperText = paper.text.split('')
        for (let target = paper.indexOfLastCharacterErased, index = 0; index < text.length; index++) {
            paperText[target + index] = text[index]
        }
        paper.text = paperText.join('')
    }
}

module.exports = Pencil