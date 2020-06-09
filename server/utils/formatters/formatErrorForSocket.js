function formatErrorForSocket (error = {}) {
    return { message: error.message };
}

module.exports = formatErrorForSocket;
