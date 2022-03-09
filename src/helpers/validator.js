const validateId = (id) => {
    if(isNaN(id)) return false;
    return true;
}

const validateDate = (date) => {
    if(!date) return false
    const atDate = new Date(date);
    if(atDate.getTime() !== atDate.getTime()) return false;

    return true;
}

const rewardValidator = (req, res, next) => {
    const { userId } = req.params;
    const { at } = req.query;

    if(!validateId(userId)) return res.status(400).json({error: 'id must be a number'});;
    if(!validateDate(at)) return res.status(400).json({error: 'at must be a valid date'});;

    return next();
}

const redeemValidator = (req, res, next) => {
    const { userId, at } = req.params;
    if(!validateId(userId)) return res.status(400).json({error: 'id must be a number'});;
    if(!validateDate(at)) return res.status(400).json({error: 'at must be a valid date'});;

    return next();
}

module.exports = {
    rewardValidator,
    redeemValidator,
    validateId,
    validateDate
}