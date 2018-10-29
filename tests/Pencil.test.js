const Pencil = require('../app/Pencil')
const Paper = require('../app/Paper')

describe('writing with the pencil', () => {
    let pencil, paper
    let props = {pointDurability: 50}
    beforeEach(() => {
        pencil = new Pencil({...props})
        paper = new Paper()
    })

    it('pencil should be able to write to paper', () => {
        pencil.write('hello', paper)
        expect(paper.text).toBe('hello')
    })

    it('pencil should be able to write to paper multiple times', () => {
        pencil.write('Hello', paper)
        pencil.write(' Pillar!', paper)
        expect(paper.text).toBe('Hello Pillar!')
    })

    it('pencil should have a point durability', () => {
        expect(pencil.pointDurability).toBe(50)
    })

    it('writing lowercase with pencil should decrease the durability by 1', () => {
        pencil.write('hello', paper)
        expect(pencil.pointDurability).toBe(45)
    })

    it('writing uppercase with pencil should decrease the durability by 2', () => {
        pencil.write('Hel23', paper)
        expect(pencil.pointDurability).toBe(44)
    })

    it('if pencil durability reaches 0, remaining characters should be blank spaces', () => {
        pencil.pointDurability = 3
        expect(pencil.write('Hello', paper)).toBe('wrote He   ')
        expect(paper.text).toBe('He   ')
    })

    it('writing spaces and newlines should not degrade pencil', () => {
        pencil.write('Hello \nPillar!', paper)
        expect(pencil.pointDurability).toBe(36)
    })

    it('Point durability should never fall below 0', () => {
        pencil.write('Les Miserables is the best! Yeah', paper)
        pencil.write('Les Miserables is the best! Yeah', paper)
        expect(pencil.pointDurability).toBe(0)
    })
})

describe('using the sharpener', () => {
    let pencil, paper
    let props = {pointDurability: 50, length: 7}
    beforeEach(() => {
        pencil = new Pencil({...props})
        paper = new Paper()
    })

    it('pencil should be able to be sharpened to original point durability', () => {
        pencil.write('Hello', paper)
        pencil.sharpen()
        expect(pencil.pointDurability).toBe(50)
    })

    it('pencil should be instantiated with a length property', () => {
        expect(pencil.length).toBe(7)
    })

    it('sharpening pencil should degrade the length by 1', () => {
        pencil.sharpen()
        expect(pencil.length).toBe(6)
    })

    it('if length reaches 0, the pencil should not be able to be sharpened anymore', () => {
        pencil.length = 0
        pencil.pointDurability = 0
        pencil.sharpen()
        expect(pencil.pointDurability).toBe(0)
    })
})

describe('using the eraser', () => {
    let pencil, paper
    let props = {pointDurability: 50, length: 7, eraserDurability: 100}
    beforeEach(() => {
        pencil = new Pencil({...props})
        paper = new Paper()
    })

    it('pencil should be instantiated with an eraserDurability property', () => {
        expect(pencil.eraserDurability).toBe(100)
    })

    it('eraser should be able to delete text and replace it with whitespace', () => {
        pencil.write("Hello Pillar. Let's get to it!", paper)
        pencil.erase('get', paper)
        expect(paper.text).toBe("Hello Pillar. Let's     to it!")
    })

    it('if there are multiple occurrences of the word to erase, the last occurrence should be erased', () => {
        pencil.write("Hello Pillar. Hello World!", paper)
        pencil.erase('Hello', paper)
        expect(paper.text).toBe("Hello Pillar.       World!")
    })

    it('erasing should degrade the eraser durability by 1 per character erased', () => {
        pencil.write("Hello Pillar.", paper)
        pencil.erase('Hello', paper)
        expect(pencil.eraserDurability).toBe(95)
    })

    it('trying to erase a set of characters that does not exist should alert the user', () => {
        pencil.write("Hello Pillar.", paper)
        expect(pencil.erase('Held', paper)).toBe('text to be erased could not be found on the paper')
    })

    it('successful erasing should alert the user what was erased', () => {
        pencil.write("Hello Pillar.", paper)
        expect(pencil.erase('Hello', paper)).toBe('erased "Hello". remaining eraser durability is 95')
    })

    it('if eraser durability reaches 0, then the eraser should stop working', () => {
        pencil.write("Eraser? nope.", paper)
        pencil.eraserDurability = 0
        expect(pencil.erase('nope', paper)).toBe('cannot erase since the eraser is completed degraded')
        expect(paper.text).toBe('Eraser? nope.')
    })

    it('if the eraser degrades to 0 while erasing, it should only erase the characters up to the point that it reaches 0', () => {
        pencil.write("Eraser? nope.", paper)
        pencil.eraserDurability = 2
        expect(pencil.erase('nope', paper)).toBe('erased "pe". remaining eraser durability is 0')
        expect(paper.text).toBe('Eraser? no  .')
    })

    it('erasing works with newlines', () => {
        pencil.write("\na \nHello Pillar.", paper)
        expect(pencil.erase('Hello', paper)).toBe('erased "Hello". remaining eraser durability is 95')
        expect(paper.text).toBe('\na \n      Pillar.')
    })
})

describe('editing erased space', () => {
    const text = 'Jean Valjean is the protagonist in Les Miserables'                  
    let pencil, paper
    let props = {pointDurability: 50, length: 7, eraserDurability: 100}

    beforeEach(() => {
        pencil = new Pencil({...props})
        paper = new Paper()
    })

    it('paper should remember the index of the last space erased', () => {
        pencil.write(text, paper)
        pencil.erase('Les', paper)
        expect(paper.indexOfLastCharacterErased).toBe(35)
    })

    it('index of last character erased should be accurate if the eraser runs out', () => {
        pencil.write("Eraser? nope.", paper)
        pencil.eraserDurability = 2
        expect(pencil.erase('nope', paper)).toBe('erased "pe". remaining eraser durability is 0')
        expect(paper.indexOfLastCharacterErased).toBe(10)
    })

    it('pencil should be able to use edit to write in targeted white space made by the eraser', () => {
        pencil.write(text, paper)
        pencil.erase('Les', paper)
        pencil.edit('The', paper)
        expect(paper.text).toBe('Jean Valjean is the protagonist in The Miserables')
    })

    it('if edit overlaps characters, the character should be replaced with an @ symbol if they are not the same character', () => {
        pencil.write(text, paper)
        pencil.erase('Les', paper)
        pencil.sharpen()
        pencil.edit('That French Book', paper)
        expect(paper.text).toBe('Jean Valjean is the protagonist in ThatM@@e@@@l@@ok')
    })

    it('editing should not accept newlines or returns', () => {
        pencil.write(text, paper)
        pencil.erase('Les', paper)
        pencil.sharpen()
        expect(pencil.edit('That\r French\n Book', paper)).toBe('invalid entry of either newline or return')
    })

    it('editing should also degrade the pencil point', () => {
        pencil.write(text, paper)
        pencil.erase('Les', paper)
        pencil.sharpen()
        pencil.edit('That French Book', paper)
        expect(pencil.pointDurability).toBe(33)
    })

    it('if pencil durability reaches 0 while editing, remaining characters should be blank spaces', () => {
        pencil.write(text, paper)
        pencil.erase('Les', paper)
        pencil.pointDurability = 7
        pencil.edit('That French Book', paper)
        expect(paper.text).toBe('Jean Valjean is the protagonist in ThatM@serables')
    })
})