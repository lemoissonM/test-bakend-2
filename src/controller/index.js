const { getWeekFromDate } = require('../helpers');
const { add: addReward, get: getRewards, getByAvailableAt, update: updateReward, getByIndex } = require('../data');

const fetchRewards = (req, res) => {
    const { userId } = req.params;
    const { at } = req.query; 

    // Check if rewards already exist and if they are available return them
    const existingRewards = getRewards(userId, at);
    if(existingRewards && existingRewards.length) {
        return res.status(200).json({ data: existingRewards });
    }
    
    // Get days from sunday to saturday for where a given date exists
    const dates = getWeekFromDate(at);

    // Create a new reward for each day
    const rewards = dates.map(date => {
        date.setUTCHours(0, 0, 0);
        const expiresAt = new Date(date);
        expiresAt.setDate(expiresAt.getDate() + 1);
        return {
            availableAt: date.toISOString(),
            redeemedAt: null,
            expiresAt: expiresAt.toISOString()
        }
    })

    // Add the new rewards to the data
    addReward(rewards, userId);
    return res.status(201).json({data: rewards });
}

const redeemRewards = (req, res) => {
    const { userId, at } = req.params;

    // Check if rewards already exist and if they are available return the index and the expiresAt
    const { existingRewardsIndex, expiresAt } = getByAvailableAt(at, userId);
    if(existingRewardsIndex < 0) {
        return res.status(404).json({ "error": { "message": "Reward not found" } });
    }

    // check if reward is expired
    if(new Date(expiresAt) < new Date()) {
        return res.status(403).json({ error: { message: "This reward is already expired" } });
    }

    // Update the reward
    updateReward(userId, existingRewardsIndex);

    return res.status(200).json({data: getByIndex(userId, existingRewardsIndex)});
}

module.exports = {
    fetchRewards,
    redeemRewards
}