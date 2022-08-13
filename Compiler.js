import fs from 'fs';
import libs from './standard_libs.js';

class Compiler {
    constructor(output) {
        this.output = output
    }
    compile(code) {
let program = code

var standard_libraries = ['Stdio']
// console.log(libs['Stdio'])
// console.log(program.match(/import (.*?)\n/g))
program = program.replace(/import (.*?)\n/g, (match, p1) => {
            let lib = libs[p1]
            // let lib = fs.readFileSync(`./standard_imports/x32/${p1}.rit`, 'utf-8')
            // console.log(lib)
            return lib
    })

    // console.log(code.match(/import (.*?)\n/g))

// get all import statements (import to new line)
// import regex = /import (.*?)\n/g

// function check_imports(){
//     // console.log('checking')
//     if(program.includes('import')){
// program = program.replace(/import (.*?)\n/g, (match, p1) => {
//     // console.log(match)
//     if(standard_libraries.includes(match.split(' ')[1])) {
//         let lib = fs.readFileSync(`./standard_imports/x32/${match.split(' ')[1]}.rit`, 'utf-8')
//         console.log(lib)
//         return lib
//     }
// })}
// if(program.includes('import')){
//     check_imports()
// }};
// check_imports()
// program = 'e'

// compile to x86 assembly

// clear comments (//)

// get comments regex /\/\/(.*?)\n/g


// program = program.split(/\/\/(.*?)\n/g).join('')
// program = program.split(/\/\/(.*?)?\/\//g).join('')

program = program.replace(/\/\/(.*?)\n/g, '')

// just in case
program = program.split('//').join(';')
// program = this.clearComments(code)

// (on hold) function name + params, regex: = /function (.*?){/g

// function call, regex: = /(.*?)\((.*?)\)/g

program = program.replace(/(.*?)\((.*?)\)/g, (func, index, original) => {
    if(func.split(' ')[0] == 'function'){
        // console.log('not a real function call')
        // console.log(func)
        // return func //+ '// not a real function call'
        // let funcName = func.split(' ')[1]
        // funcName = funcName.split('(')[0]
        // let funcParams = func.split('(')[1]
        // funcParams = funcParams.split(')')[0]
        return func
    }else {
        // console.log('function call')
        //return func // + '// real function call'
        let funcName = func.split('(')[0]
        funcName = funcName.split(' ').join('')
        let funcParams = func.split('(')[1]
        funcParams = funcParams.split(')')[0]
        funcParams = funcParams.split(',')
        // console.log(funcParams)
        // let x =  `push ${funcParams}`
        let x = ``
if(funcParams[0] != ''){
        funcParams.forEach(param => {
            x = x + `mov eax, ${param.split(' ').join('')}\n`
            x = x + `push eax`
        });
    }
        x = x + `\ncall ${funcName}`
        return x
    }
})

program = program.replace(/function (.*?){/g, (func, index, original) => {
            let funcName = func.split(' ')[1]
        funcName = funcName.split('(')[0]
        let funcParams = (func.split('(')[1]).split(')')[0]

        return `${funcName}:`
})

program = program.replace('SYS::EXIT', (func, index, origin) => {
    return `mov	eax, 1
int	0x80`
})



program = (program.replace(/^\s*[\r\n]/gm,''))
program = program.split('}').join('\n')
// console.log(program.replace(/.*:/g, (func, index, original) => {
//     return `\n${func}`
// }))
// let functionspaces = program.replace(/.*:/g, (func, index, original) => {
//     return `\n${func}`
// })

// var to new line regex = /var (.*?);|var (.*?)\n/g
program = program.replace(/var (.*?);|var (.*?)\n/g, (varName, index, original) => {
    // console.log(varName)
let bytes = varName.split(' ')[1]
let vn = varName.split(' ')[2]
let data = varName.split(' ')[4]
return `${vn} ${bytes} ${data}`
})

program = program.replace(/section (.*?)\n/g, (varName, index, original) => {
   return `\n${varName}`
    })

// program = functionspaces
// console.log(program)
// var regex = /(.*?)\((.*?)\)/g
// program = program.replace(regex, (func, index, original) => {
// program = program.replace(/.*:/g, (func, index, original) => {
//     return `\n${func}`
// });
// console.log(program)
// setTimeout(() => {
    program = program + '\n'
return `section	.text
        global _start\n` + program
// }, 1000);

    }
    // clearComments(c) {
    //     console.log(`clearing comments..`)
    //     return c.replace(/\/\/(.*?)\n/g, (comment, index, original) => {
    //         return ''
    //     });
    // }
}

export default Compiler