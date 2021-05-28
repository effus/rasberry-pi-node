const mariadb = require('mariadb');

class MySqlHelper {
    constructor(user, passwd, host) {
        try {
            this.pool = mariadb.createPool({
                host: host, 
                user: user, 
                password: passwd,
                connectionLimit: 5
            });
        
        } catch (e) {
            console.error('MySqlHelper.createPool error', e);
            throw e;
        }
    }

    async selectDatabase(name) {
        await this.pool.query('USE ' + name + ';');
    }

    /**
     * @param {*} query 
     * @param {*} params 
     * @returns 
     */
    async query(query, params) {
        const result = await this.pool.query(
            { namedPlaceholders: true, sql: query}, 
            params
        );
        console.log('MySqlHelper.query:', query);
        return result;
    }

    async close() {
        await this.pool.end();
    }
}

module.exports = MySqlHelper;