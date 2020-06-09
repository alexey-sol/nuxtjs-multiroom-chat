const filterItemsByField = require("@utils/helpers/filterItemsByField");

class Storage {
    constructor () {
        this.storage = [];
    }

    addItem (item = {}) {
        this.storage.push(item);
        return item;
    }

    getItem (id) {
        return this.storage.find(item => item.id === id);
    }

    getItems (filter) {
        return (filter)
            ? filterItemsByField(this.storage, filter)
            : this.storage;
    }

    removeItem (id) {
        const filteredItems = this.storage.filter(item => item.id !== id);
        this.storage = filteredItems;

        const didDelete = this.storage.length !== filteredItems.length;

        return (didDelete)
            ? id
            : null;
    }
}

module.exports = Storage;
