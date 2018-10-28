const Paper = require('../app/Paper')

describe('writing with the Paper', () => {
    it('Paper should have property, text', () => {
        const paper = new Paper()
        expect(typeof paper.text).toBe('string')
    })
})