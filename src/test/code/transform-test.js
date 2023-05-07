
module.exports = (dataset) => {
    return dataset.map(r => ({ ...r, CashPool: Math.floor(r.CashPool) }));
};