require('dotenv').config();
const MySqlHelper = require('../src/helpers/MySqlHelper.js');
const db = new MySqlHelper(process.env.DB_USER, process.env.DB_PASS, process.env.DB_HOST, 'raspberry');

const install = async function () {
    
    await db.selectDatabase('raspberry');
    await db.query('create table if not exists system_check (id int not null auto_increment primary key, cpu_t float, cpu_load float, mem_used float, connections int, sys_time datetime);');
    console.log('Table [system_check] created');
    await db.close();
}

install().then(() => {
    console.log('Complete');
});

