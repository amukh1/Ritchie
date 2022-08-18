#!/usr/bin/env node
import fs from 'fs'
// import { LocalStorage } from "node-localstorage";
import inquirer from 'inquirer'
import fetch from 'node-fetch';


if(process.argv[2] == 'install'){
    console.log(`installing ${process.argv[3]}..`)
}else if(process.argv[2] == 'package'){
    console.log(`packaging..`)
    
    inquirer.prompt([{
        type: 'input',
        name: 'username',
        message: 'Enter your username:',
        validate: function(value) {
            if(value.length) {
                return true
            }else {
                return 'Please enter a username.'
            }
        }
    },{
        type: 'password',
        name: 'password',
        message: 'Enter your password:',
        validate: function(value) {
            if(value.length) {
                return true
            }else {
                return 'Please enter a password.'
            }
        }
    }]).then(async function(a){
        let res = await fetch(`https://RPM.amukh1.repl.co/userAuth?name=${a.username}&password=${a.password}`)
        let data = await res.text()
        if(data == 'Incorrect Password' || data == 'error'){
        }else {
            console.log('Package successfully packaged under the name: ' + a.username)
            

    fs.writeFileSync(`packager.json`, `{
        "name": "${process.argv[3]}",
        "version": "0.0.1",
        "description": "",
        "author": "${a.username}",
        "license": ""
    }`)
        }
    })
}else if(process.argv[2] == 'publish'){
    let packager = JSON.parse(fs.readFileSync(`packager.json`))
    // console.log(packager)

    /// PUBLISHING
 
    inquirer.prompt([{
        type: 'input',
        name: 'username',
        message: 'Enter your username:',
        validate: function(value) {
            if(value.length) {
                return true
            }else {
                return 'Please enter a username.'
            }
        }
    },{
        type: 'password',
        name: 'password',
        message: 'Enter your password:',
        validate: function(value) {
            if(value.length) {
                return true
            }else {
                return 'Please enter a password.'
            }
        }
    }]).then(async function(a){
        let res = await fetch(`https://RPM.amukh1.repl.co/userAuth?name=${a.username}&password=${a.password}`)
        let data = await res.text()
        if(data == 'Incorrect Password' || data == 'error'){
            console.log(data)
        }else {
            console.log('Publishing package under the name: ' + a.username)
            // fetch `https://RPM.amukh1.repl.co/newPackage?name=${packager.name}&author=${packager.author}` with body {}
            let res = await fetch(`https://RPM.amukh1.repl.co/newPackage?name=${packager.name}&author=${packager.author}`, {
                method: 'POST',
                body: {
                    croc: 'croc',
                    files: sob()
                }
            })
            
        }
    })

    /// PUBLISHING

}else if(process.argv[2] == 'createAccount'){
    inquirer.prompt([{
        type: 'input',
        name: 'username',
        message: 'Enter your username:',
        validate: function(value) {
            if(value.length) {
                return true
            }else {
                return 'Please enter a username.'
            }
        }
    },{
        type: 'password',
        name: 'password',
        message: 'Enter your password:',
        validate: function(value) {
            if(value.length) {
                return true
            }else {
                return 'Please enter a password.'
            }
        }
    }]).then(function(a){
        signup(a)
    })
}else if(process.argv[2] == 'help'){
console.log(`help message soon`)
process.exit(0)
}

function login(){
    inquirer.prompt([{
        type: 'input',
        name: 'username',
        message: 'Enter your username:',
        validate: function(value) {
            if(value.length) {
                return true
            }else {
                return 'Please enter a username.'
            }
        }
    },{
        type: 'password',
        name: 'password',
        message: 'Enter your password:',
        validate: function(value) {
            if(value.length) {
                return true
            }else {
                return 'Please enter a password.'
            }
        }
    }]).then(async function(a){
        let res = await fetch(`https://RPM.amukh1.repl.co/userAuth?name=${a.username}&password=${a.password}`)
        let data = await res.text()
        if(data == 'Incorrect Password'){
            console.log('Incorrect Password!')
            return false
        }else {
            console.log('You are now logged in as ' + a.username)
            return {
                success: true,
                user_data: a
            }
        }
    })
}


async function signup(a) {
    // sign up
    let res = await fetch(`https://RPM.amukh1.repl.co/newUser?name=${a.username}&password=${a.password}`)
    let data = await res.text()
    if(data == 'User Created!'){
        console.log('Created account: ' + a.username)
        return true
    }
}

let sob = () => {
    let resp = {}
    fs.readdir(`./`, (err, files) => {
        if (err) {
          console.log(err)
        } else {
            // files = an array with all the file NAMES
            files.forEach(file => {
                console.log(file)
                fs.readFile(`./${file}`, 'utf-8', (err, data) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('alr')
                        // data = the file's contents
                        // console.log(data)
                        resp[file] = data
                        if(files.length == Object.keys(resp).length){
                            console.log(resp)
                            return resp
                        }
                    }
                })
            });
        }

    });
}