#!/usr/bin/env node
import fs from 'fs'
// import { LocalStorage } from "node-localstorage";
import inquirer from 'inquirer'
import fetch from 'node-fetch';
import axios from 'axios'


if(process.argv[2] == 'install'){
    console.log(`installing ${process.argv[3]}..`)
// let x =await fetch(`https://RPM.amukh1.repl.co/newPackageDownload?name=${process.argv[3]}`) // add download to package
// let y = await x.text()
// console.log(y)

//     let res = await fetch(`https://RPM.amukh1.repl.co/getPackage?name=${process.argv[3]}`)
//     let data = await res.text()
//     console.log(data)

// send get req to `https://RPM.amukh1.repl.co/newPackageDownload?name=${process.argv[3]}` with axios

    axios.get(`https://RPM.amukh1.repl.co/newPackageDownload?name=${process.argv[3]}`).then(res => {
        console.log(res.data)
    })

    // send get req to `https://RPM.amukh1.repl.co/getPackage?name=${process.argv[3]}` with axios

    axios.get(`https://RPM.amukh1.repl.co/getPackage?name=${process.argv[3]}`).then(res => {
        // console.log(res.data)
        let dta = res.data
        dta.forEach(file => {
    
            // console.log(`${Object.keys(file)[0]}: ${file[Object.keys(file)[0]]}`)
            let fileName = Object.keys(file)[0]
            console.log(`Downloading.. ${fileName}`)
            let fileData = file[Object.keys(file)[0]]
            if(fs.existsSync(`./${process.argv[3]}`)){
                fs.writeFileSync(`./${process.argv[3]}/${fileName}`, fileData, (err) => {
                    if (err) throw err;
                })
            }else{
            fs.mkdirSync(`./${process.argv[3]}`)
            fs.writeFileSync(`./${process.argv[3]}/${fileName}`, fileData, (err) => {
                if (err) throw err;
            })
            }
            
            
        });
    })

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
            console.log(data)
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
            sob(packager, a)
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

let sob = (packager, a) => {
    let resp = {}
    fs.readdir(`./`, (err, files) => {
        if (err) {
          console.log(err)
        } else {
            // files = an array with all the file NAMES
            files.forEach(file => {
                // console.log(file)
                fs.readFile(`./${file}`, 'utf-8', async (err, data) => {
                    if (err) {
                        console.log(err)
                    } else {
                        // console.log('alr')
                        // data = the file's contents
                        // console.log(data)
                        resp[file] = data
                        if(files.length == Object.keys(resp).length){
                            // console.log(resp)
            //                 let res = await fetch(`https://RPM.amukh1.repl.co/newPackage?name=${packager.name}&author=${packager.author}`, {
            //     method: 'POST',
            //     body: {
            //         "readme.md": "hello world!"
            //     }
            // })
            // let data = await res.text()
            // console.log(data)
            // console.log(a)
            axios.post(`https://RPM.amukh1.repl.co/newPackage?name=${packager.name}&author=${a.username}`, resp).then(res => {
                console.log(res.data)
            })
                        }
                    }
                })
            });
        }

    });
}

// console.log(sob())

