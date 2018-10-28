const Pencil = require('../app/Pencil')
const Paper = require('../app/Paper')

describe('writing with the pencil', () => {

    it('pencil should be able to write', () => {
        const pencil = new Pencil()
        expect(typeof pencil.write).toBe('function')
    })
    
})