/**
 * @summary Controller of purchase class
 * holds a business logic
 * @author Amarit Jarasjindarat
 *
 * Created at : 2019-15-07
 */

class CtrlStarter {

    /**
     * Events 
     * @param {*} events and event base callback
     */
    constructor(events) {
        this.events = events
    }

    /**
     * Bundle a user data into message
     * @param {*} message a message data
     */
    bundleUser(message) {
        message.user = { user_id: '1001', username: 'testuser' }
    }

    /**
     * Bundle a user data into message
     * @param {*} message a message data
     */
    reply(message, statusMsg) {
        statusMsg.data = message
        this.events[Symbol.iterator]().return(message)
    }

    /**
     * Generate status message with code
     * @param {*} code a code data
     */
    generateStatusMessage(code) {
        const statusMsg = { code : code }
        switch(code) {
            case 200:
                statusMsg.message = 'completed'
                break
            default:
                statusMsg.message = 'error'
                break
        }
        return statusMsg
    }
}

module.exports = CtrlStarter
