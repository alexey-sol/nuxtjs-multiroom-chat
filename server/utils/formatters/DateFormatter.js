const moment = require("moment");

class DateFormatter {
    constructor (date = moment()) {
        this.date = date;
    }

    formatByPattern (
        pattern = "YYYY-MM-DD"
    ) {
        return moment(this.date).format(pattern);
    }
}

module.exports = DateFormatter;
