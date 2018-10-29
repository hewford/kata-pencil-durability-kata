const UserInterface = require('../app/Interface')

describe('using Interface', () => {
    let userInterface  = new UserInterface()
    let session = userInterface.startSession()
    let events = session._events

    it('user interface should be able to start a process.stdin that listens for keypresses', () => {
        expect(typeof events.keypress).toBe('function')
    })

    it('user interface should have a property active to keep track of which pencil function is being used', () => {
        expect(userInterface.hasOwnProperty('active')).toBe(true)
    })

    it('when control and w are pressed, property active should equal "write" and rawMode should equal false so that user can enter an entire string.', () => {
        expect(events.keypress('w', {ctrl: true, name: 'w'})).toBe('WRITING:')
        expect(userInterface.active).toBe('write')
        expect(session.isRaw).toBe(false)
    })
})