const UserInterface = require('../app/Interface')

describe('using Interface', () => {
    let userInterface  = new UserInterface()
    let events = userInterface.startSession()._events

    it('user interface should be able to start a process.stdin that listens for keypresses', () => {
        expect(typeof events.keypress).toBe('function')
    })

    it('user interface should have a property active to keep track of which pencil function is being used', () => {
        expect(userInterface.hasOwnProperty('active')).toBe(true)
    })
})