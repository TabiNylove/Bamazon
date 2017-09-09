// VARIABLES
// node packages
var mysql = require('mysql');
var query = require('inquirer');

// connection to mysql server
var connection = mysql.createConnection({
	host: "localhost",
	port: "8889",
	user: "root",
	password: "Hittwf8*",
	database: "bamazonDB"
});
//=============================================
// CONNECT

connection.connect(function (err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	// call display function
	display();
});
//=============================================
// FUNCTIONS

// displays all products for sale
function display() {

};

// asks the customer what they'd like to buy and how many
function buy() {
	
}