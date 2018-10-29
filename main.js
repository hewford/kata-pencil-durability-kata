
const UserInterface = require('./app/Interface')
const userInterface = new UserInterface({pointDurability: 50, length: 7, eraserDurability: 100})
userInterface.startSession()