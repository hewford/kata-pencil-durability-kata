const Paper = require('../app/Paper')

describe('writing with the Paper', () => {
    it('should be able to instantiate Paper', () => {
        const paper = new Paper()
        expect(typeof paper).toBe('object')
    })
})