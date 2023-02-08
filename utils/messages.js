const moment = require(`moment`)

function formatMsg(usrname, text) {

    return {
        usrname,
        text,
        time: moment().format(`h:mm a`)
    }

}

module.exports = formatMsg;