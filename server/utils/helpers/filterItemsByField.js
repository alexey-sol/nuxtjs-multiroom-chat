function filterItemsByField (items = [], field = {}) {
    return items.filter(item => {
        const [key, value] = Object.entries(field)[0];
        return item[key] === value;
    });
}

module.exports = filterItemsByField;
