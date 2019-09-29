/**
 * @summary presenter class, use to present between ctrl and db
 * @author Amarit Jarasjindarat
 *
 * Created at : 2019-15-07
 */

const MockDB = require('../db/mockdb.js')

const CtrlStarter = require('../ctrl/ctrl_starter.js')

class StarterPresenter {

    constructor() {
        this.events = this.event()
        this.mockdb = new MockDB(this.events)
        this.ctrlStarter = new CtrlStarter(this.events)
    }

    /**
     * Simple set callback function
     * @param {*} callback
     */
    setCallback(callback) {
        this.callback = callback
    }

    /**
     * Simple get function
     * @param {*} id of message
     */
    get(id) {
        this.mockdb.get(id)
    }

    /**
     * Simple put function
     * @param {*} message
     */
    put(message) {
        this.mockdb.put(message)
    }

    /**
     * Simple post function
     * @param {*} message
     */
    post(message) {
        this.mockdb.post(message)
    }

    /**
     * Simple delete function
     * @param {*} id of message
     */
    delete(id) {
        this.mockdb.delete(id)
    }

    /**
     * event callback from controller
     * specify an action what todo next
     */
    event() {
        const instance = this
        const events = { 
            [Symbol.iterator]() {
                return {
                    messageFound: function(message) {
                        console.log('handle message found')
                        instance.ctrlStarter.bundleUser(message)
                        return { done: false, value: message }
                    },
                    messageSaved: function(message) {
                        console.log('handle message saved')
                        instance.ctrlStarter.reply(message, 
                            instance.ctrlStarter.generateStatusMessage(200))
                        return { done: false, value: message }
                    },
                    messageUpdated: function(message) {
                        console.log('handle message updated')
                        instance.ctrlPurchase.bundleUser(message)
                        return { done: false, value: message }
                    },
                    messageDeleted: function(message) {
                        console.log('handle message deleted')
                        instance.ctrlStarter.reply(message,
                            instance.ctrlStarter.generateStatusMessage(400))
                        return { done: false, value: message }
                    },
                    messageNotFound: function(errmsg) {
                        console.log('handle message not found')
                        instance.callback(errmsg)
                        return { done: false, value: errmsg }
                    },
                    return: function(message) {
                        console.log('do return')
                        instance.callback(message)
                        return { done: true, value: message }
                    },
                    throw: function(errmsg) {
                        console.log('do throw')
                        throw new Error(errmsg)
                    }
                }
             }
          }
          return events
    }
}

module.exports = StarterPresenter