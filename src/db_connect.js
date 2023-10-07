const mysql = require('mysql')

module.exports = {
    login: async (ipdb, userdb, senhadb, basedb) => {
        if(ipdb === 'sss') return console.log("por favor ofereça dados validos da sua db mysql para evitar erros.")

        const connection = await mysql.createConnection({
            host: ipdb,
            user: userdb,
            password: senhadb,
            database: basedb,
        })

        connection.connect(function(err) {
            if (err) {
                console.log("\x1b[31mDataBase login err: " + err)
              return;
            }
            console.log("\x1b[32m[!] MySql DataBase status: ONLINE")
       
          });
            
          

        module.exports = connection

    }
}