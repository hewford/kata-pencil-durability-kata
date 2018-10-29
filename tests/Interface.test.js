const UserInterface = require('../app/Interface')
const Pencil = require('../app/Pencil')
const Paper = require('../app/Paper')

describe('using Interface', () => {
    const text = 'Jean Valjean is the protagonist in Les Miserables'
    let userInterface  = new UserInterface({pointDurability: 50, length: 7, eraserDurability: 100}, true)
    let session = userInterface.startSession()
    let events = session._events

    beforeEach(() => {
        session.isRaw = true
        userInterface.active = null
        userInterface.text = ''
    })

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

    it('should contains a property of class pencil and of class paper', () => {
        expect(userInterface.pencil).toEqual(new Pencil({pointDurability: 50, length: 7, eraserDurability: 100}))
        expect(userInterface.paper).toEqual(new Paper())
    })

    it('when active is set to write, it each keypress should concat to property text at least once', () => {
        events.keypress('w', {ctrl: true, name: 'w'})
        events.keypress('a', {ctrl: false, name: 'a'})
        expect(userInterface.text).toBe('a')
    })

    it('when active is set to write, it each keypress should concat to property text multiple times', () => {
        events.keypress('w', {ctrl: true, name: 'w'})
        events.keypress('a', {ctrl: false, name: 'a'})
        events.keypress('d', {ctrl: false, name: 'd'})
        expect(userInterface.text).toBe('ad')
    })

    describe('after writing to text', () => {
        beforeEach(() => {
            events.keypress('w', {ctrl: true, name: 'w'})
            text.split('').forEach((letter)=>{
                events.keypress(letter, {ctrl: false, name: letter})
            })
            events.keypress('enter', {ctrl: false, name: 'enter'})
        })

        it('pressing enter should submit the text to the pencil function write', () => {
            expect(userInterface.paper.text).toBe(text)
        })

        it('pressing enter should return process to raw mode', () => {
            expect(session.isRaw).toBe(true)
        })
    })
})