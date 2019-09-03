/**
 * @summary mock db connection class
 * retrieve data from db
 * @author Amarit Jarasjindarat
 *
 * Created at : 2019-15-07
 */

const BaseDB = require('../base/basedb.js')

class MockDB extends BaseDB {

    /**
     * Events 
     * @param {*} events and event base callback
     */
    constructor(events) {
        this.events = events
    }

    /**
     * get a single message from d b
     * @param {*} id of the message
     */
    get(id) {
        setTimeout(() => {
            switch(id) {
                case 'id1':
                    const message = { id: id, message: 'hello world' }
                    this.events[Symbol.iterator]().messageFound(message)
                    break
                default:
                    const errmsg = { message: 'message does not exist' }
                    this.events[Symbol.iterator]().messageNotFound(errmsg)
            }
        }, 1000)
    }

    /**
     * store a single message from db
     */
    put(message) {
        setTimeout(() => {
            this.events[Symbol.iterator]().messageSaved(message)
        }, 1000)
    }
    
    /**
     * update a single message into db
     */
    post(message) {
        setTimeout(() => {
            switch(message.id) {
                case 'id1':
                    this.events[Symbol.iterator]().messageUpdated(message)
                    break
                default:
                    const errmsg = { message: 'message cannot be updated' }
                    this.events[Symbol.iterator]().messageNotFound(errmsg)
            }
        }, 1000)
    }

    /**
     * delete a single message from db
     */
    delete(id) {
        setTimeout(() => {
            switch(id) {
                case 'id1':
                    this.events[Symbol.iterator]().messageDeleted(message)
                    break
                default:
                    const errmsg = { message: 'message cannot be deleted' }
                    this.events[Symbol.iterator]().messageNotFound(errmsg)
            }
        }, 1000)
    }
}

module.exports = MockDB
