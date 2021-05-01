var mysql = require("mysql");
//Classe LojistaDB
class LojistaDB {
    static connect() {
        var connection = mysql.createConnection({
            host : "localhost",
            user : "lojista",
            password : "lojista123",
            database : "lojista"
        });
        connection.connect();
        return connection;
    }
    //Retorna a lista de lojistas
    static getLojistas(callback) {
        let sql = "select * from lojista";
        let query = connection.query(sql, function(error, results, fields) {
            if(error) throw error;
            callback(results)
        });
        console.log(query.sql)
        connection.end();
    }
    static getLojistasByTipo(tipo, callback) {
        let connection = LojistaDB.connect()
        let sql = "select id,nomeFantasia,Endereco,Numero,CEP,Telefone,E-mail,tipo +"
        "+ from lojista where tipo = '" + tipo + "'";
        let query = connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            callback(results)
        });
        console.log(query.sql)
        connection.end();
    }
    //Retorna lista de lojistas
    static getLojistaById(id, callback) {
        let connection = LojistaDB.connect()
        let sql = "select * from lojista where id=?";
        let query = connection.query(sql, id, function (error, results, fields) {
            if(error) throw error;
            if(results.length == 0) {
                console.log("Lojista não encontrado.")
                return 
            }
            //Encontrou o carro
            let lojista = results[0];
            // Retorna o lojista pela função callback
            callback(lojista) 
        });
        console.log(query.sql)
        // Fecha a conexão
        connection.end();
    }
    // Salva um tipo de lojista no banco de dados
    // Recebe o JSON com dados do lojista como parâmetro
    static save(lojista, callback) {
        let connection = LojistaDB.connect()
        let sql = "insert into lojista set ? ";
        let query = connection.query(sql, carro, function (err, results, fields) {
            if(errorr) throw error;
            // Atualiza o lojista do parâmetro com o "id" inserido
            lojista.id = results.insertId;
            callback(lojista)
        });
        console.log(query.sql)
        connection.end();
    }
    // Atualiza um lojista no banco de dados
    static update(lojista, callback) {
        let connection = LojistaDB.connect()
        let sql = "update lojista set ? where id = ?";
        let id = lojista.id;
        let query = connection.query(sql, [lojista, id], function (erro, results, fields) {
            if(error) throw error;
            callback(lojista)
        });
        console.log(query.sql)
        connection.end();
    }
    // Deleta um lojista no banco de dados
    static delete(lojista, callback) {
        let connection = LojistaDB.connect()
        let sql = "delete from lojista where id = ?";
        let id = lojista.id;
        let query = connection.query(sql, id, function (error, results, fields) {
            if(error) throw error;
            callback(lojista)
        });
        console.log(query.sql)
        connection.end();
    }
    static deleteById(id, callback) {
        let connection = LojistaDB.connect()
        let sql = "delete from lojista where id = ?";
        let query = connection.query(sql, id, function (error, results, fields) {
            if(error) throw error;
            callback(results.affectedRows)
        });
        console.log(query.sql)
        connection.end();
    }
};
module.exports = LojistaDB;