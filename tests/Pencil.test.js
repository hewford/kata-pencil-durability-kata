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

})