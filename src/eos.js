const BigNumber = require("bignumber.js")

async function find(contractName, tableName, lowerBound, upperBound, limit = 1, json = true) {
  const records = await this.eos.getTableRows({
    code: contractName.toString(),
    json: json,
    limit: limit,
    lower_bound: lowerBound.toString(),
    scope: contractName.toString(),
    table: tableName.toString(),
    upper_bound: upperBound.toString()
  })
  return records.rows
}

async function findOne(contractName, tableName, tableKey, json = true) {
  const rows = await this.find(contractName, tableName, tableKey, tableKey.plus(1), 1, json)
  return rows[0]
}

function tableKey(oreAccountName) {
  return new BigNumber(this.eos.format.encodeName(oreAccountName, false))
}

module.exports = {
  find,
  findOne,
  tableKey
}
