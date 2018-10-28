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

    it ('writing with pencil should decrease the durability', () => {
        pencil.write('hello', paper)
        expect(pencil.pointDurability).toBe(45)
    })
})