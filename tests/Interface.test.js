const UserInterface = require('../app/Interface')

describe('using Interface', () => {
    it('user interface should be able to start a process.stdin that listens for keypresses', () => {
        const userInterface = new UserInterface()
        const events = userInterface.startSession()._events
        expect(typeof events.keypress).toBe('function')
    })
})