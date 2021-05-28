require('dotenv').config();
var fs = require('fs');
const si = require('systeminformation');
const MySqlHelper = require('../src/helpers/MySqlHelper.js');
const db = new MySqlHelper(process.env.DB_USER, process.env.DB_PASS, process.env.DB_HOST, 'raspberry');

si.getDynamicData()
    .then(async (data) => {
        await db.selectDatabase('raspberry');
        await db.query('INSERT INTO raspberry.system_check(cpu_t, cpu_load, mem_used, connections, sys_time)  ' +
        'values(:cpuTmp, :cpuLoad, :mem, :connections, SYSDATE())', {
          cpuTmp: data.temp.main,
          cpuLoad: data.currentLoad.currentLoad,
          mem: (data.mem.used * 100 / data.mem.total),
          connections: data.networkConnections.length
        });
        await db.close();
        console.log('Done');
    })
    .catch((err) => {
      console.error('system.data', err);
    });