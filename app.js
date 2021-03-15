const os = require("os");
const greeting = require("./greeting");
const mysql = require("./mySQLsaveData");
let express =require('express')
let app =  express()

// получим имя текущего пользователя
let userName = os.userInfo().username;
 app.set('view engine', 'pug')
 
console.log(`Дата запроса: ${greeting.date}`);
console.log(greeting.getMessage(userName));
function cl(input){console.log(input)}

const fs = require("fs")
const path = require("path")

/**
 * Look ma, it's cp -R.
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
 var copyRecursiveSync = function(src, dest) {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
      fs.mkdirSync(dest);
      fs.readdirSync(src).forEach(function(childItemName) {
        copyRecursiveSync(path.join(src, childItemName),
                          path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  };

 function renname (input1){
    tetete=0 
    fs.readdirSync(`${input1}`).forEach(file => { 
        sourseDirectory=`${input1}/`+file
        destinationDirectory=`${input1}/`+file
        console.log (sourseDirectory)
        console.log (destinationDirectory)
        fs.rename(sourseDirectory, destinationDirectory, function(err) {
          if ( err ) console.log('ERROR: ' + err);
        });
    });
 }

 function copyFolder (input1, input2){
    copyRecursiveSync (`${input1}`,`${input2}`)
}

function removeDirectory (input1){
    fs.rmdirSync(`${input1}`, { recursive: true });

}

function algoritm(callback1,callback2,callback3,callback4){    
}

function greateDirectory(input1){
    var fs = require('fs');
    var dir = `${input1}`;
    
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}
target="D:/Pug4"
algoritm(renname(target),copyFolder(target,"D:/Pug5"),greateDirectory("D:/Pug6"),removeDirectory(target)) 


