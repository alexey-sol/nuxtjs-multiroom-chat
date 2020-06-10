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

    getItems (filterByField) {
        return (filterByField)
            ? filterItemsByField(this.storage, filterByField)
            : this.storage;
    }

    removeItem (id) {
        const filteredItems = this.storage.filter(item => item.id !== id);
        this.storage = filteredItems;

        const didDeletionSucceed = this.storage.length !== filteredItems.length;

        return (didDeletionSucceed)
            ? id
            : null;
    }
}

module.exports = Storage;
