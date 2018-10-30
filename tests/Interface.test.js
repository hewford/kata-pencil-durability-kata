const UserInterface = require('../app/Interface')
const Pencil = require('../app/Pencil')
const Paper = require('../app/Paper')



describe('using Interface', () => {
    const writeExample = () => {
        events.keypress(null, {name: 'up'})
        text.split('').forEach((letter)=>{
            events.keypress(letter, {ctrl: false, name: letter})
        })
        events.keypress('enter', {ctrl: false, name: 'enter'})
    }

    const eraseExample = () => {
        events.keypress(null, {name: 'down'})
        const erase = 'Les'
        erase.split('').forEach((letter)=>{
            events.keypress(letter, {ctrl: false, name: letter})
        })
        events.keypress('enter', {ctrl: false, name: 'enter'})
    }

    const text = 'Jean Valjean is the protagonist in Les Miserables'
    let userInterface  = new UserInterface({pointDurability: 50, length: 7, eraserDurability: 100}, true)
    let session = userInterface.startSession()
    let events = session._events

    beforeEach(() => {
        session.isRaw = true
        userInterface.active = null
        userInterface.pencil = new Pencil({pointDurability: 50, length: 7, eraserDurability: 100})
        userInterface.text = ''
        userInterface.paper.text = ''
    })

    it('when control and w are pressed, property active should equal "write" and rawMode should equal false so that user can enter an entire string.', () => {
        expect(events.keypress(null, {name: 'up'})).toBe('WRITING:')
        expect(userInterface.active).toBe('write')
        expect(session.isRaw).toBe(false)
    })

    it('when active is set to write, it each keypress should concat to property text at least once', () => {
        events.keypress(null, {name: 'up'})
        events.keypress('a', {ctrl: false, name: 'a'})
        expect(userInterface.text).toBe('a')
    })

    it('when active is set to write, it each keypress should concat to property text multiple times', () => {
        events.keypress(null, {name: 'up'})
        events.keypress('a', {ctrl: false, name: 'a'})
        events.keypress('d', {ctrl: false, name: 'd'})
        expect(userInterface.text).toBe('ad')
    })

    describe('after writing to text', () => {
        beforeEach(() => {
            writeExample()
        })

        it('pressing enter should submit the text to the pencil function write', () => {
            expect(userInterface.paper.text).toBe(text)
        })

        it('pressing enter should return process to raw mode', () => {
            expect(session.isRaw).toBe(true)
        })

        it('pressing enter should reset text property to an empty string', () => {
            expect(userInterface.text).toBe('')
        })

        it('pressing enter should reset active property to false', () => {
            expect(userInterface.active).toBe(false)
        })
    })

    describe('using the eraser', () => {
        beforeEach(() => {
            writeExample()
        })

        it('when control and e are pressed, property active should equal "erase" and rawMode should equal false so that user can enter an entire string.', () => {
            expect(events.keypress(null, {name: 'down'})).toBe('ERASING:')
            expect(userInterface.active).toBe('erase')
            expect(session.isRaw).toBe(false)
        })

        it('when erase is active and this.text has a value, pressing enter should erase the characters from the paper', () => {
            eraseExample()
            expect(userInterface.paper.text).toBe('Jean Valjean is the protagonist in     Miserables')
        })
    })

    describe('using the sharpener', () => {
        it('when control and s are pressed pencil should sharpen.', () => {
            userInterface.pencil.pointDurability = 2
            expect(events.keypress(null, {name: 'right'})).toBe('PENCIL SHARPENED')
            expect(userInterface.pencil.pointDurability).toBe(userInterface.pencil.originalPointDurability)
        })
    })

    describe('using edit', () => {
        it('when control and d are pressed, property active should equal "edit" and rawMode should equal false so that user can enter an entire string', () => {
            writeExample()
            eraseExample()
            expect(events.keypress(null, {name: 'left'})).toBe('EDITING:')
            events.keypress('T', {ctrl: false, name: 'T'})
            events.keypress('h', {ctrl: false, name: 'h'})
            events.keypress('e', {ctrl: false, name: 'e'})
            events.keypress('enter', {ctrl: false, name: 'enter'})
            expect(userInterface.paper.text).toBe('Jean Valjean is the protagonist in The Miserables')
        })
    })
})