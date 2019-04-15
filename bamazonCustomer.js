const inquirer = require('inquirer');
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost', 
  port: 3306,
  user: 'root',
  password: 'FreyEV1991', 
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayItems();
});

function displayItems() {
  connection.query('select * from products', function(err, res) {
    if (err) throw (err);
    for (var i = 0; i < res.length; i++) {
      console.log('ID: ' + res[i].item_id, 'Product Name: ' + res[i].product_name, 'Price: ' + res[i].price);
    }
    cusReq();
  })
}

function cusReq() {
  inquirer
    .prompt([
      {
        type: 'number',
        name: 'id', 
        message: 'What item would you like to buy? (ID)'
        },
      {
        type: 'number', 
        name: 'amount', 
        message: 'How many would you like to buy?'
          }
    ]).then(function(ans) {
      connection.query('select stock_quantity from products where ?', {item_id: ans.id}, function(err, res) {
        if(err) throw(err);
        if (res[0].stock_quantity >= ans.amount) {
          connection.query('update products set ? where ?',
           [
             {
               stock_quantity: res[0].stock_quantity - ans.amount
             },
             {
               item_id: ans.id
             }
           ]);
          connection.query('select price from products where ?', {item_id: ans.id}, function(err, res) {
            if(err) throw (err);
            var price = res[0].price;
            var totalPrice = price * ans.amount;
            console.log("You're total comes to $" + totalPrice + '\n');
            reset();
          });
        }
          else if (res[0].stock_quantity < ans.amount) {
            console.log('Insufficient quantity! We only have ' + res[0].stock_quantity + ' of those left!\n');
            displayItems();
          }
      })
    })
};

function reset() {
  inquirer
  .prompt([
    {
      type: 'list', 
      name: 'choice', 
      message: 'What would you like to do next?',
      choices: ['Buy another item', 'Take my items and leave']
    }
  ]).then(function(ans) {
    if (ans.choice === 'Buy another item') {
      console.log('\n');
      displayItems();
    }
    else {
      console.log('Thanks for coming!')
      connection.end();
    }
  })
}



