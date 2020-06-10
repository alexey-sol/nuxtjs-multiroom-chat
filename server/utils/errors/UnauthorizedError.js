class UnauthorizedError extends Error {
    constructor (message = "Please sign in") {
        super(message);
        this.name = this.constructor.name;
    }
}

module.exports = UnauthorizedError;
