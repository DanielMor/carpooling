export function getBalances(trips) {
  return Object.keys(trips).reduce((balances, tKey) => {
    const t = trips[tKey];

    if (t.driverTurn === t.driver) {
      return balances;
    }

    if (!balances[t.driver]) {
      balances[t.driver] = 0;
    }

    balances[t.driver]++;

    if (!balances[t.driverTurn]) {
      balances[t.driverTurn] = 0;
    }

    balances[t.driverTurn]--;

    return balances;
  }, {});
}