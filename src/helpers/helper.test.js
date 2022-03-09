const { validateDate, validateId } = require('./validator')
const { getWeekFromDate } = require('./');

describe('Validator', () => {
    test('validateDate should return false when date is wrong', () => {
        expect(validateDate('lelele')).toBe(false);
    });

    test('validateDate should return true when date is right', () => {
        expect(validateDate('2020-01-01')).toBe(true);
    });

    test('validateId should return false when id is wrong', () => {
        expect(validateId('lelele')).toBe(false);
    });

    test('validateId should return true when id is right', () => {
        expect(validateId('1')).toBe(true);
    });
})

describe('Date helper', () => {
    test('getWeekFromDate should return an array of dates', () => {
        const dates = getWeekFromDate('2020-01-01');
        expect(dates).toBeInstanceOf(Array);
        expect(dates.length).toBe(7);
        expect(dates[0].toISOString()).toBe('2019-12-29T00:00:00.000Z');
    });
})