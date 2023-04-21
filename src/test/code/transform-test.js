
module.exports = function (records) {
    return records.map(r => ({ ...r, CashPool: Math.floor(r.CashPool) }));
};