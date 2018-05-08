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

connection.connect(function (err, res) {
    if (err) throw err;
    
    inventoryCheck();  

 });

 function inventoryCheck() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
    })


    connection.query("SELECT id, stock_quantity, inventory_purchased FROM products", function (err, stock) {
      if (err) throw err;
      var update = stock.map(function (initial) {
        return `${initial.stock_quantity} ` - ` ${initial.inventory_purchased}`;
      })
      afterConnection(update)
    })
  }

  function afterConnection(update) {
    connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err;
      
  
      for (var i = 0; i < res.length; i++){
        for (var j = i; j < update.length; j++){
          res[i]['stock_remaining'] = update[j]; 
          connection.query("UPDATE products SET stock_remaining =? where id = ?", [res[i]['stock_remaining'], [i+1]], function(err){
        })
        break;
      }
    }
       
  
       purchaseItems(); 
  
    });
  }


function purchaseItems() {
    connection.query("SELECT * FROM products", function (err, itemsForSale) {

        if (err) throw err;
        var choices = itemsForSale.map(function (item) {
            return `${item.product_name}: Price ${item.price} Stock Quantity ${item.stock_remaining}`;

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
                    name: "quantity",
                    type: "input",
                    message: "How many would you like?"

                }
            ])
            .then(function (answer) {

                var quantityPicked = answer.quantity;
                var itemPicked = answer.choice.split(":")[0];

                
                updateInventory1(quantityPicked, itemPicked);

                

            })
    })
}

function updateInventory1(quantityPicked, itemPicked) {

    var sql2 = "SELECT stock_remaining FROM products WHERE product_name = ?";
    connection.query(sql2, [itemPicked], function (err, results) {
  
  
      var newInv = results[0].stock_remaining;
      
    
      updateInventory2(quantityPicked, itemPicked, newInv)
  
    })
  
  }

  function updateInventory2(quantityPicked, itemPicked, newInv) {
 
    var stockRemaning = newInv - quantityPicked; 
  
    var sql = "UPDATE products SET stock_remaining =? WHERE product_name = ?";
    connection.query(sql, [stockRemaning, itemPicked], function (err, result) {
      console.log("RECORD UPDATED!!");
    })

    updateStock(quantityPicked, itemPicked); 
  
  }


function updateStock(quantityPicked, itemPicked) {
    var sql = "UPDATE products SET inventory_purchased = ? WHERE product_name = ?";

    var query = connection.query(sql, [quantityPicked, itemPicked], function (err, results) {

 
        connection.end();

    })

}

