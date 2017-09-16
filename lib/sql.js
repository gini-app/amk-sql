
const db = require('./knex')();

class SQL {

	constructor(table, alias) {
		this.TABLE = table;
		this.JOIN_TABLE = table + ' as ' + alias;
	}

	get(params, operation, obj) {
		let query = db(this.TABLE).select().limit(20);
		switch (arguments.length) {
			case 1: {
				query.where(params);
				break;
			}
			case 2: {
				query.where(params, operation);
				break;
			}
			case 3: {
				query.where(params, operation, obj);
				break;
			}
			default: {
				break;
			}
		}
		return query;
	}

	find(id) {
		let query = db.select().from(this.TABLE)
		if (id) {
			query.where('id', id);
		}
		return query;
	}

	insert(params) {
		return db(this.TABLE).insert(params);
	}

	update(updateValue, params) {
		return db(this.TABLE).update(updateValue).where(params);
	}

	delete(id) {
		return db(this.TABLE).delete().where('id', id);
	}

	getDB() {
		return db(this.TABLE);
	}

	getJoinDB() {
		return db(this.JOIN_TABLE);
	}

	getConn() {
		return db;
	}

}

module.exports = SQL;