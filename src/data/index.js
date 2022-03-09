const { getWeekFromDate } = require('../helpers');
const persist = require('./persist')

let data = {};

const initializeData = () => {
    data = persist.readFile();
}

// add rewards for a particular user / date
const add = (items, id) => {
    if(data[id]) data[id] = [...data[id], ...items];
    else data[id] = items;
    persist.sync(data);
};

// get reward for a particular user id and date
const get = (id, at) => {
    const dates = getWeekFromDate(at);
    if(data[id]) return data[id].filter(items => dates.map(d => d.toISOString()).includes(items.availableAt));
    return null;
}

// update reward for a particular user id at a particular index
const update = (id, index) => {
    data[id][index].redeemedAt = new Date().toISOString();
    persist.sync(data);
}

// get reward for a particular user id and date
const getByAvailableAt = (at, id) => {
    if(!data[id]) return { existingRewardsIndex: -1, expiresAt: null };
    const date = new Date(at);
    date.setUTCHours(0, 0, 0);
    const index = data[id].findIndex(items => items.availableAt === date.toISOString());
    return { existingRewardsIndex: index, expiresAt: data[id][index].expiresAt };
}

const getByIndex = (id, index) => {
    return data[id][index];
}

module.exports = {
    add,
    get,
    update,
    getByAvailableAt,
    getByIndex,
    initializeData
}