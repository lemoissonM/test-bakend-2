const { get, add, update, getByAvailableAt } = require('./');
const persist = require('./persist');

describe('Data', () => {
    beforeAll(() => {
        persist.sync = jest.fn();
    });
    test('Should add new reward', () => {
        add([{ availableAt: '2020-01-01T00:00:00.000Z', redeemedAt: null, expiresAt: '2020-01-02T00:00:00.000Z' }], '1');
        expect(persist.sync).toHaveBeenCalled()
    });

    test('Should another new reward', () => {
        add([{ availableAt: '2020-02-01T00:00:00.000Z', redeemedAt: null, expiresAt: '2020-02-02T00:00:00.000Z' }], '1');
        expect(persist.sync).toHaveBeenCalled()
    });

    test('Should get reward', () => {
        const result = get('1', '2020-01-01');
        expect(result[0].availableAt).toBe('2020-01-01T00:00:00.000Z');
    });

    test('Should update reward', () => {
        update('1', 0);
        expect(persist.sync).toHaveBeenCalled()
    });

    test('Should get reward by availableAt', () => {
        const result = getByAvailableAt('2020-01-01', '1');
        expect(result.existingRewardsIndex).toBe(0);
    });
})