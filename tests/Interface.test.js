const UserInterface = require('../app/Interface')

describe('using Interface', () => {
    it('Should be able to instantiate Interface', () => {
        const userInterface = new UserInterface()
        expect(typeof userInterface).toBe('object')
    })
})