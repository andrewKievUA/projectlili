function cl(input){console.log(input)}
cl ("HelloFromMySQL")

let express =require('express')
let app =  express()
app.use(express.static('public'));
app.use (express.json())
let mysql = require('mysql');

const hostname = '192.168.1.11';

let con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database : 'lili'
  });
 
  app.get('/save', function (req, res) {

    let send1 = "INSERT INTO `lili`.`goods` (`id`, `priceTransfer`, `priceSupply`, `priceSell`, `url1`, `url2`, `comment`) VALUES ('"+req.query.id+"', '"+req.query.priceTransfer+"', '"+req.query.priceSupply+"', '"+req.query.priceSell+"', '"+req.query.url1+"', '"+req.query.url2+"', '"+req.query.comment+"');"
 
    let savePromise = new Promise(function(resolve, reject){
        con.query(send1,     
          function(error, result){
            if (error) {console.log(error)
                res.render('errorFile.pug',{
                    error:error
                })
            };
            resolve(result);
            cl (result)
 
          }); 
    });
        savePromise.then(function(value){
            cl ("EndFromMySQL")
            res.redirect('http://localhost:3000/')
        })
})

app.get('/', function (req, res) {

    let idmax = new Promise(function(resolve, reject){
        con.query("SELECT MAX(ID) FROM lili.goods",     
        function(error, result,rows,fields){
        if (error) {console.log(error)};
        resolve(JSON.parse(JSON.stringify(result)));
        });    
    });
         idmax.then(function(value){ 

        res.render('addToDB.pug',{
            "temp3":`<span > id: <input (type='number' id='id' value=${value[0]['MAX(ID)']+1} )>  </span>`
            
        })
    }); 
});
app.post('/saveGoodsByFetch', function (req, res) {

    let send1 = "INSERT INTO `lili`.`goods` (`id`, `priceTransfer`, `priceSupply`, `priceSell`, `url1`, `url2`, `comment`) VALUES ('"+req.body.id+"', '"+req.body.priceTransfer+"', '"+req.body.priceSupply+"', '"+req.body.priceSell+"', '"+req.body.url1+"', '"+req.body.url2+"', '"+req.body.comment+"');"
 
    let saveGoodsByFetch = new Promise(function(resolve, reject){
        con.query(send1,     
          function(error, result){
            if (error) {console.log(error)
                res.json(error)
            };
            resolve(result);
            // cl (result)
 
          }); 
    });
    
        saveGoodsByFetch.then(function(value){
            // cl ("EndFromMySQL")    
            res.json(value)
        })
})


app.post('/showMeLasrGoodsIdByFetch', function (req, res) {

    let showMeLasrGoodsIdByFetch = new Promise(function(resolve, reject){
        con.query("SELECT MAX(ID) FROM lili.goods",     
        function(error, result,rows,fields){
        if (error) {console.log(error)};
        resolve(JSON.parse(JSON.stringify(result)));
        }); 
    })
    showMeLasrGoodsIdByFetch.then(function(value){
        // cl ("EndFromMySQL")    
        res.json(value)
    })
})

















app.post('/showMeDescription', function (req, res) {
    //  cl(req.body.id)
    let showMeDescription = new Promise (function(resolve, reject){
        con.query("SELECT * FROM `lili`.`goods` WHERE id ="+req.body.id, 
        function(error, result){
            if (error) {console.log(error)};
            resolve(JSON.parse(JSON.stringify(result)));
            
        })
    })
    let showMeAllUnigName = new Promise (function(resolve,reject){
        con.query("SELECT id,unigURL FROM lili.suppliers",        
        function(error, result){
                if (error) {console.log(error)};
                resolve(JSON.parse(JSON.stringify(result)));
                //  res.json(result)
                // cl(result)
        })
    }) 
    Promise.all([showMeDescription , showMeAllUnigName]).then(function(value){ 
        temp1= 0 
        temp2= 0
        for (let i = 0; i< value[1].length; i++) {
            
            z = value[0][0].url1.indexOf(value[1][i].unigURL)
            if (z >1) {
                // cl("bolee then 0")               
                temp1=value[1][i].id
                temp2=1
                break
            }
                   
        }
        
        
        if(temp2==1) {              
            
            let getInfoAboutSupplier = new Promise (function(resolve, reject){
                con.query(`SELECT * FROM lili.suppliers where id = ${temp1}`, 
                function(error, result){
                    if (error) {console.log(error)};
                    resolve(JSON.parse(JSON.stringify(result)));                    
                    Promise.all([showMeDescription , getInfoAboutSupplier]).then(function(value){  

                        res.json(value)  
                    })
                })
            })
        }
        if (temp2==0){  // если значения не найдены отправляем на страницу то что есть
            // cl("значения не найдены")
              value[1]=[{ id: -1}]            
            res.json( value)
 
        }

    })
})

app.get('/supplier', function (req, res) {
    res.render('supplier.pug',{
        
    })
 
    });

    app.get('/curt'   , function (req, res) { 
        res.render('curt.pug',{
           
        })
    });

    app.get('/navigation', function (req, res) {
        res.render('navigation.pug',{
            
        })
    });

    app.get('/saveSupplier', function (req, res) {
        // cl(req.query) 
        let send1 = "INSERT INTO `lili`.`suppliers` ( `firstName`, `unigURL`, `contact_message`, `phone`, `url1`, `url2`, `comment`) VALUES ( '"+req.query.firstName+"', '"+req.query.unigURL+"', '"+req.query.contact_message+"', '"+req.query.phone+"', '"+req.query.url1+"','"+req.query.url2+"','"+req.query.comment+"');"
    
        let savePromise = new Promise(function(resolve, reject){
            con.query(send1,     
              function(error, result){
                if (error) {console.log(error)
                    res.render('errorFile.pug',{
                        error:error
                    })
                };
                resolve(result);
                // cl (result)
              }); 
        });
    
        savePromise.then(function(value){
            // cl ("EndFromMySQL")       

        res.redirect('http://localhost:3000/supplier')
    })
    })

    app.get('/deleteSupplier', function (req, res) {
        // cl(req.query) 

            let send1 = "DELETE FROM `lili`.`suppliers` WHERE (`id` = "+req.query.id+");"
        let savePromise = new Promise(function(resolve, reject){
            con.query(send1,     
              function(error, result){
                if (error) {console.log(error)
                    res.render('errorFile.pug',{
                        error:error
                    })
                };
                resolve(result);
                // cl (result)
              }); 
        });
    
        savePromise.then(function(value){
            // cl ("EndFromMySQL")       
        //  res.render('supplier.pug',{   })
        // res.redirect('http://localhost:3000/supplier')
        res.redirect('http://localhost:3000/supplier')
    })
    })
   

// 
    app.get('/updateSupplier', function (req, res) {
        // cl(req.query) 
        text=`UPDATE lili.suppliers SET firstName = '${req.query.firstName}', unigURL = '${req.query.unigURL}', contact_message = '${req.query.contact_message}',`
        text+=`phone = '${req.query.phone}', url1 = '${req.query.url1}', url2 = '${req.query.url2}', comment = '${req.query.comment}' WHERE (id = '${req.query.id}');`
        // cl(text)
        
     
        let savePromise = new Promise(function(resolve, reject){
            con.query(text,function(error, result){
                if (error) {console.log(error)
                    res.render('errorFile.pug',{
                        error:error
                    })
                };
                resolve(result);
                // cl (result)
              }); 
        });
    
        savePromise.then(function(value){
            // cl ("EndFromMySQL")       

        res.redirect('http://localhost:3000/supplier')
        })
    })











    app.get('/deletepProduct', function (req, res) {
        cl(req.query.id) 
        let send1 =`DELETE FROM lili.goods WHERE (id =  ${req.query.id})  `
        let savePromise = new Promise(function(resolve, reject){
            con.query(send1,     
              function(error, result){
                if (error) {console.log(error)
                    res.render('errorFile.pug',{
                        error:error
                    })
                };
                resolve(result);
                cl (result)
              }); 
        });
        savePromise.then(function(value){
            cl ("EndFromMySQL")       
        res.redirect('http://localhost:3000/')
    })
    })

 
    app.post('/showMeSupplierNode', function (req, res) {
        //   cl(req.body.id)  
        let showMeDescription = new Promise (function(resolve, reject){
            con.query("SELECT * FROM `lili`.`suppliers` WHERE id ="+req.body.id, 
            function(error, result){
                if (error) {console.log(error)};
                // cl(result) 
                resolve(JSON.parse(JSON.stringify(result)));
                res.json(result)
            })
        })
    })


//SELECT id, priceTransfer, priceSupply, priceSell, url1, url2, comment FROM lili.goods ORDER BY id DESC LIMIT 1


app.post('/showMeLastGoodsNode', function (req, res) {
    //   cl(req.body.id)  
    let showMeDescription = new Promise (function(resolve, reject){
        con.query("SELECT id, priceTransfer, priceSupply, priceSell, url1, url2, comment FROM lili.goods ORDER BY id DESC LIMIT 1", 
        function(error, result){
            if (error) {console.log(error)};
            // cl(result) 
            resolve(JSON.parse(JSON.stringify(result)));
            res.json(result)
        })
    })
})


const port = 3000
app.listen( port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
