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
        message: 'What item would you like to buy? (ID)',
      /*  validate: function (input) {
          var done = this.async();
          setTimeout(function() {
            if (typeof input !== 'number') {
              done('You need to provide a number');
              return;
            }
            done(null, true);
          }, 3000);
          }*/
        },
      {
        type: 'number', 
        name: 'amount', 
        message: 'How many would you like to buy?',
       /* validate: function (input) {
          var done = this.async();
          setTimeout(function() {
            if (typeof input !== 'number') {
              done('You need to provide a number');
              return;
            }
            done(null, true);
          }, 3000);*/
          }
    ]).then(function(ans) {
      console.log(ans);
      connection.query('select item_id from products where ?', {item_id: ans.id}, function(err, res) {
        if(err) throw(err);
        
      })
    })
}



