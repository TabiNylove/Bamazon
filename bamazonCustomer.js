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
// array to hold all prices of items user is buying
var priceArray = [];
var quantArray = [];
var addArray = [];
var multiply;
var price;
var priceTotal;
var changedQuant;
var itemId;
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

// 'display()' displays all products for sale
function display() {
	connection.query("SELECT * FROM products", function (err, result1) {
		//if (err) throw err;
		for (var i = 0; i < result1.length; i++) {
			console.log('======================\nProduct Id: ' + result1[i].item_id + '\nItem: ' + result1[i].product_name
			+ '\nDepartment: ' + result1[i].department_name + '\nPrice: $' + result1[i].price + 
			'\nCurrently in Stock: ' + result1[i].stock_quantity + '\n======================\n');
		}
		// call buy function
		buy();
	})
};

// 'buy()' asks the customer what they'd like to buy
function buy() {
	query.prompt([
		{
			type: 'input',
			message: 'Please type the Id of the item you would like to buy:',
			name: 'itemSelect'
		}
	])
	.then(function(resultTwo) {
		//if (resultTwo.itemSelect <= result1.length) {
			itemId = resultTwo.itemSelect;
			console.log('Chosen Id: ' + itemId);
			// grab the price from the item that matches the id
			connection.query("SELECT price FROM products WHERE item_id=" + itemId, function(err, db_data) {
				if (err) throw err;
				// push the number to the array outside
				priceArray.push(db_data[0].price);

				// call howMany()
				howMany();
			})
		// } else {
		// 	console.log("That is not a valid product. Please try again.");
		// 	connection.end();
		// }
	})
};

// 'howMany()' asks the customer how many of the item they'd like to buy
function howMany() {
	query.prompt([
		{
			type: 'input',
			message: 'How many?',
			name: 'quantSelect'
		}
	])
	.then(function(result3) {
		connection.query("SELECT stock_quantity FROM products WHERE item_id=" + itemId, function(err, db_quant) {
			if (err) throw err;
			// set easy to read variables
			var userSelectedQuant = result3.quantSelect;
			var databaseQuantity = db_quant[0].stock_quantity;

			// if the request is the same amount or less, continue
			if (databaseQuantity >= userSelectedQuant) {
				// push the chosen quantity to the sister array
				quantArray.push(userSelectedQuant);

				// update database with new quantity
				changedQuant = databaseQuantity-userSelectedQuant;
				connection.query("UPDATE products SET stock_quantity=" + changedQuant
				+ " WHERE item_id=" + itemId, function(err, res) {
					if (err) throw err;
				})
				ifFinished();
			} else {
				console.log("There is not enough in stock. Please try a different amount.");
				// call howMany to get an appropriate number
				howMany();
			}
		})
	})
};

function ifFinished() {
	// Ask if done......
	query.prompt([
		{
			type: 'list',
			message: 'Continue Shopping?',
			choices: ['Yes', 'No'],
			name: 'continue'
		}
	])
	.then(function(result4) {
		if (result4.continue === 'Yes') {
			// call the display again and redo from there
			display();
		} else if (result4.continue === 'No') {
			// add up all the prices
			for (var i = 0; i < priceArray.length; i++) {
				// this multiplies the price by the matching quantity
				multiply = priceArray[i]*quantArray[i]; 
				addArray.push(multiply);
			}
			// everything in the addArray is then added together
			// for (var i = 0; i < addArray.length; i++) {
				
			// }
			console.log('Total Prices: ' + addArray);
			connection.end();
		}
	})
};

