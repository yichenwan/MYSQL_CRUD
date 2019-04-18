var mysql = require('mysql2');

// local enviroment
var pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: 'mysql', 
    database: 'carrie'
});

// var pool = mysql.createPool({
//   host     : 'us-cdbr-iron-east-02.cleardb.net',
//   user     : 'b6673daff53673',
//   password : '9dd755f9',
//   database : 'heroku_a01b7153a162f5d'
// });

// var query = function(sql, options, callback) {
//     console.log(sql, options, callback);
//     if (typeof options === "function") {
//         callback = options;
//         options = undefined;
//     }
//     pool.getConnection(function(err, conn){
//         if (err) {
//             callback(err, null, null);
//         } else {
//             conn.query(sql, options, function(err, results, fields){
//                 // callback
//                 callback(err, results, fields);
//             });
//             // release connection。
//             // 要注意的是，connection 的釋放需要在此 release，而不能在 callback 中 release
//             conn.release();
//         }
//     });
// };

// module.exports = {
// 	query
// };

module.exports = pool.promise();