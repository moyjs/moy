/**
 * Module : compox-util dataTable
 * Author : huyue(huyueb@yonyou.com)
 * Date	  : 2017-01-18 09:34:01
 */

const addDataTable = function (dataTable) {
    this.dataTables[dataTable.id] = dataTable
    return this
}
const getDataTable = function (id) {
    return this.dataTables[id]
}

const getDataTables = function () {
    return this.dataTables
}

export {
	addDataTable,
	getDataTable,
	getDataTables
}
