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

// mainMenu();

// function mainMenu(){
//     inquirer
//         .prompt([
//             {
//                 name: "choice",
//                 type: "list",
//                 message: "What would you like to do first?",
//                 choices: [
//                     {
//                         name: "POST ITEM",
//                         value: 1
//                     }, 
//                     {
//                         name: "BID ON ITEM",
//                         value: 2
//                     }
//                 ]
//             }
//         ])
//         .then(function (response) {
//                 if (response.choice === 1) {
//                     //postItem();
//                     postItem();
//                 } else if (response.choice === 2) {
//                     console.log("Cool! Lets check out the items")
//                     readItems();
//                 }
//         });
// }

// function postItem() {
//     inquirer
//         .prompt([
//             {
//                 type: "input",
//                 message: "Name of Item?",
//                 name: "itemName"
//             },
//             {
//                 type: "input",
//                 message: "New or Used?",
//                 name: "condition"
//             },
//             {
//                 type: "input",
//                 message: "Minimum Bid?",
//                 name: "minBid"
//             },
//             {
//                 type: "input",
//                 message: "Category",
//                 name: "cat"

//         }]).then(function(responses) {
//             addItem(responses.itemName, responses.minBid, responses.condition, responses.cat);
//         });
// }

// function addItem(itemName, startBid, condition, cat) {
//     connection.connect(function(err) {
//         if (err) throw err;
//         console.log("connected as id " + connection.threadId);

//         console.log("Adding a new item...\n");
//         var query = connection.query(
//         "INSERT INTO items SET ?",
//         {
//             item: itemName,
//             min_bid: startBid,
//             item_condition: condition,
//             category: cat
//         },
//         function(err, res) {
//             console.log("Your post has been listed!")
//             console.log(res.affectedRows + " item entered!\n");
//             // Call updateProduct AFTER the INSERT completes
//         }
//         );
//         connection.end();
//     });
//     // logs the actual query being run
//     console.log(query.sql);
// }

// function readItems() {
//     connection.connect(function(err) {
//         if (err) throw err;
//         console.log("connected as id " + connection.threadId);

//         console.log("reading data...\n");
//         var query = connection.query(
//         "SELECT * FROM items",
//         function(err, res) {
//             console.log(res);
//         }
//         );
//         connection.end();
//     });
//     // logs the actual query being run
//     console.log(query.sql);
// }


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
                
function updateSql(){

    
}

                console.log(itemPicked);
                console.log(quantityPicked);
                 

                connection.end();

            })

    })

};




