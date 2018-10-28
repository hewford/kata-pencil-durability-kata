const Pencil = require('../app/Pencil')

describe('writing with the pencil', () => {
    it('should be able to instantiate pencil', () => {
        const pencil = new Pencil()
        expect(typeof pencil).toBe('object')
    })
})