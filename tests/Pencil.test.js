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
        pencil.write('Hello', paper)
        expect(paper.text).toBe('He   ')
    })

    it('writing spaces and newlines should not degrade pencil', () => {
        pencil.write('Hello \nPillar!', paper)
        expect(pencil.pointDurability).toBe(36)
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
        expect(pencil.erase('Hello', paper)).toBe('erased Hello')
    })

    it('if eraser durability reaches 0, then the eraser should stop working', () => {
        pencil.write("Eraser? nope.", paper)
        pencil.eraserDurability = 0
        expect(pencil.erase('nope')).toBe('cannot erase since the eraser is completed degraded')
    })

    it('if the eraser degrades to 0 while erasing, it should only erase the characters up to the point that it reaches 0', () => {
        pencil.write("Eraser? nope.", paper)
        pencil.eraserDurability = 2
        pencil.erase('nope', paper)
        expect(paper.text).toBe('Eraser? no  .')
    })
})