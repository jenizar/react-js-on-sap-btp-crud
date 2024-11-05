//use express module
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//use sap hanadb database
var hana = require('@sap/hana-client');
var conn = hana.createConnection();
var conn_params = {
  serverNode  : '<Hostname:Port>',
  uid         : '<User ID>',
  pwd         : '<Password>'
};
//Create Connection
conn.connect(conn_params, function(err) {
  if (err) throw err;
  conn.exec('SELECT * FROM CRUDB.BOOKS ORDER BY ID', function (err, result) {
    if (err) throw err;
    console.log(err);
  //  console.log(result);
    conn.disconnect();
  });
  console.log('Database Connected Successfully..!!');
}); 

//route for homepage
app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.get('/books', (req, res) => {
  conn.connect(conn_params, function(err) {
     conn.exec('SELECT * FROM CRUDB.BOOKS ORDER BY ID',  function (err, results) {
        if (err) return res.json(err)        
         return res.json(results)
    });     
  });
});

//route for insert data
app.post('/save', (req, res) => {
  let id = 3 //req.params.id;
  let title = "Title from Backend"//req.params.title;
  let desc = "Description from Backend"//req.params.desc;
  let cover = "Cover from Backend"//req.params.cover; 
  //  let sql = "INSERT INTO CRUDB.BOOKS(ID, TITLE, DESC, COVER) VALUES ('"+id+"', '"+title+"', '"+desc+"', '"+cover+"')";
  let sql = "INSERT INTO CRUDB.BOOKS(TITLE, DESCR, COVER) VALUES ('Title from Backend', 'Description from Backend', 'Cover from Backend')";
   let query = conn.exec(sql, (err, results) => {      
        if (err) throw err;
       //res.redirect('/');
    });
});

app.post("/addbooks", (req, res) => {
  let ztitle = req.body.title;
  let zdesc = req.body.descr;
  let zcover = req.body.cover;
  let zprice = req.body.price;
  let zimgco = req.body.imgco;
  //const q = "INSERT INTO books(`title`, `desc`, `cover`) VALUES (?)";
  let zsql = "INSERT INTO CRUDB.BOOKS(TITLE, DESCR, COVER, PRICE, IMGCO) VALUES ('"+ztitle+"', '"+zdesc+"', '"+zcover+"', '"+zprice+"', '"+zimgco+"')";

  let zquery = conn.exec(zsql, (err, results) => {      
    if (err) throw err;
   // res.redirect('/');
});
});

//route for delete data
app.post('/delete/:id', (req, res) => {
  const bookId = req.params.id;
    let sql = 'DELETE FROM CRUDB.BOOKS WHERE ID=' + bookId;
   conn.connect(conn_params, function(err) {
    let query = conn.exec(sql, (err, results) => {
      if (err) throw err;
      res.redirect('http://localhost:3000');
      //window.location.reload();
      //console.log(bookId);
  });
  });
});

//route for update data
app.post('/update/:id', (req, res) => {
  let zid = req.params.id;
  let ztitle = req.body.title;
  let zdesc = req.body.descr;
  let zcover = req.body.cover; 
  let zprice = req.body.price; 
  let zimgco = req.body.imgco; 
  let sql = "UPDATE CRUDB.BOOKS SET TITLE='" + ztitle + "', DESCR='" + zdesc + "', COVER='" + zcover + "', PRICE='" + zprice + "', IMGCO='" + zimgco + "' WHERE ID=" + zid;
  // console.log("===debuggg===", zid, ztitle, zdesc, zcover, zprice, zimgco);
  conn.connect(conn_params, function(err) {
  let query = conn.exec(sql, (err, results) => {
    if (err) throw err;
     // console.log("====debuggg===");
    });
  });  
});

app.listen(8800, () => {
    console.log("Connected to backend.");
  });
