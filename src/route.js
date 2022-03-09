const express = require('express');
const { rewardValidator, redeemValidator } = require('./helpers/validator');
const { fetchRewards, redeemRewards } = require('./controller')

const app = express.Router();

app.get('/users/:userId/rewards', rewardValidator,  fetchRewards)
app.patch('/users/:userId/rewards/:at/redeem', redeemValidator, redeemRewards)

module.exports = app;
