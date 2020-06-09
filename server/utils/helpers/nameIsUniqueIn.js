function nameIsUniqueIn (storage, name) {
    const roomsArray = Object.values(storage);
    return !roomsArray.find(item => item.name === name);
}

module.exports = nameIsUniqueIn;
