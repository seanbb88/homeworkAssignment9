var inquirer = require('inquirer');
var mysql = require("mysql");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();

});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        listItems();

    });
}

function listItems() {

    connection.query("SELECT * FROM products", function (err, itemsForSale) {
        if (err) throw err;
        var choices = itemsForSale.map(function (item) {
            return `${item.product_name}: Price ${item.price} Stock Quantity ${item.stock_quantity}`;
        })

        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: choices,
                    message: "What item would you like to purchase?"
                },
                {
                    name: "bid",
                    type: "input",
                    message: "How many would you like?"
                }
            ])
            .then(function (answer) {

                var quantityPicked = answer.bid;
                var itemPicked = answer.choice.split(":")[0];

                function updateSql() {
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            { stock_quantity: quantityPicked },
                            { id: itemPicked.id },
                        ]),



                    console.log(itemPicked);
                    console.log(quantityPicked);
                    console.log("Item Ordered")


                    

                }
                updateSql(); 
                connection.end();

            })

    });



}
