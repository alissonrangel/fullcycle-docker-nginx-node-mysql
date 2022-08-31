const express = require('express');
const mysql = require('mysql2/promise');
const { geradorNome } = require('gerador-nome');

const server = express();

const pool = mysql.createPool({
  host: 'db',
  user: 'root',
  database: 'nodedb',
  password: 'root',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

server.get('/', (req, res) => {
  createPerson()
  getAllNames(res)
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log('Conectado na porta: ' + PORT);
});

async function getAllNames(res) {
  const results = await pool.query('SELECT * from people');
    
  let html = '<p><h1>Full Cycle Rocks!</h1></p>'
  html += '<p><table><tr><th>Name</th></tr>';
  
  results[0].map( value => {
    html += '<tr>'       
    html += '<td>' + value.name + '</td>'              
    html +=  '</tr>'    
  } );
  html += '</table></p>';  
  
  res.send(html);  
}

async function createPerson() {
  let name = geradorNome();
  await pool.query(
    "INSERT INTO people (name) VALUES ('" + name + "')"
  );
}
