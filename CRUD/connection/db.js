const mysql = require('mysql2')

const connectionPool = mysql.createPool({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'web_wiki_games'
});

module.exports = connectionPool

//mysql -u root -p
