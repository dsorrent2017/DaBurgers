// Import MySQL connection.
var connection = require("../config/connection.js");
var arr = [];
// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
 

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  console.log('objToSQL')

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }

      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  all: function(tableInput, cb) {
    console.log("!!!!!!!!!!!!!!!!!!! orm constructor tableInput " + tableInput)

    var queryString = null; // "SELECT * FROM " + tableInput + ";";

    var sql = null;
    //Dan
   // if(connection.database === "burger_db"){
      tableInput = "burgers";
      sql = "SELECT id, name, devoured FROM " + tableInput + ";"
      queryString = sql;
    //}

  
    console.log("ALL: " + queryString )
    
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function(table, cols, vals, cb) {
    let colsString = " (" + cols.toString() + ") ";

    //if(connection.database === "burger_db"){
    console.log("!!!! create: insert into " + table)
   
     // colsString = colsString.replace("devoured","devoured");
      //console.log("!!!!!!!! substitute devoured for devoured: "+ colsString )
    //}
    console.log("create called  cols= "+ colsString + "vals = "+ vals.toString())
    var queryString = "INSERT INTO " + table;
   
    // queryString += " (";
    // queryString += cols.toString();
    // queryString += ") ";
    queryString += colsString;
    console.log('queryString after cols.toString() = ' + queryString)
    queryString += "VALUES (" + vals.toString();
    console.log("type of vals " + typeof vals)
    queryString += ") ";

    var sql = "INSERT INTO "+ table  + colsString + " VALUES( ? )"; //Try    //https://www.javatpoint.com/nodejs-mysql-insert-record
    //console.log('QUERYSTRING ON INSERT '+ queryString + ' vals= ' + vals.toString());
     console.log("INSERTING " + sql + "(" + vals.toString() + ")")
    //connection.query(queryString, vals, function(err, result) { 
      connection.query(sql, [vals], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, devoured: true}
  update: function(table, objColVals, condition, cb) {
   

    console.log("$$$$$$$ objColVals " + JSON.stringify(objColVals))


    var queryString = "UPDATE ";
    queryString += connection.database === "burger_db" ? "burgers" : table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    

    console.log("query string after replacing table burgers with bugers\n"+ queryString)


    
    queryString += " WHERE ";
    queryString += condition;

    

        
    //if(connection.database === "burger_db"){
      console.log("$$$$$$$$ substitute devoured for devoured .....")
      if(queryString.indexOf("devoured")>0){
        queryString = queryString.replace("devoured","devoured");
      }
      console.log("!!!!!!!! substitute devoured for devoured: "+ queryString  )
    //}

    console.log("!!!!!!! queryString before update called " + queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  delete: function(table, condition, cb) {
    console.log("delete called")
    var queryString = "DELETE FROM " + connection.database === "burger_db" ? "burgers" : table;
    queryString += " WHERE ";
    queryString += condition;
    if(queryString.indexOf("devoured")>0){
      queryString = queryString.replace("devoured","devoured");
    }
    console.log("DELETE "+ queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;
