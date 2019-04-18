const inquirer = require('inquirer');
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost', 
  port: 3306,
  user: 'user',
  password: 'password231', 
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  startMenu();
});

function startMenu() {
  inquirer
    .prompt ([
      {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: ['View Products', 'View Low Inventory', 'Add Inventory', 'Add New Product']
      }
    ]).then(function(ans) {
      if(ans.option === 'View Products') {
        connection.query('select * from products', function(err, res) {
          if(err) throw(err);
          for(var i = 0; i < res.length; i++) {
            console.log('ID: ' + res[i].item_id, 'Product Name: ' + res[i].product_name, 'Price: ' + res[i].price, 'Quantity: ' + res[i].stock_quantity);}
        })
      }
      else if(ans.option === 'View Low Inventory') {
        inquirer
          .prompt ([
            {
              type: 'number', 
              name: 'quan', 
              message: 'Determine low quantity'
            }
          ]).then(function(ans) {
        connection.query('select * from products where ?', {stock_quantity: }, function(err, res) {
        if(err) throw(err);
        for(var j = 0; j < res.length; j++) {
          console.log('ID: ' + res[j].item_id, 'Product Name: ' + res[j].product_name, 'Quantity: ' + res[j].stock_quantity);}
      })
      }
    )})}
    
    
