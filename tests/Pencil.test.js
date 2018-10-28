const Pencil = require('../app/Pencil')
const Paper = require('../app/Paper')

describe('writing with the pencil', () => {
    it('pencil should be able to write to paper', () => {
        const pencil = new Pencil()
        let paper = new Paper()
        pencil.write('hello', paper)
        expect(paper.text).toBe('hello')
    })
})