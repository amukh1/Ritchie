import fs from 'fs';
import libs from './standard_libs.js';

class Compiler {
    constructor(output) {
        this.output = output
    }
    compile(code) {
let program = code

var standard_libraries = ['Stdio', 'Stdlib']
// console.log(libs['Stdio'])
// console.log(program.match(/import (.*?)\n/g))

var strings = []
var asms = []
var bss = []
var immds = []
var vars = []

program = program.replace(/\/\/(.*?)\n/g, '')


let totstrings = 0
program = program.replace(/"(.*?)"/g, (match, p1) => {
    let y = `RITCHIE_IMMD_${totstrings}`
    immds.push(`${y} db "${p1}"`)
    totstrings = totstrings+1
    return y
})


program = program.replace(/ASM{(.*?)}ASM/gms, (match, p1) => {
    asms.push(p1)
    return `RITCHIE_ASM_ID`
})

// replace all string with a unique identifier
program = program.replace(/"(.*?)"/g, (match, p1) => {
    strings.push(p1)
    return `RITCHIE_STRING_ID`
})

var imports = []
function get_imports(){
program = program.replace(/import (.*?)\n/g, (match, p1) => {
if(imports.includes(p1)){
    return ''
}else if(libs[p1]){
            let lib = libs[p1]
            // let lib = fs.readFileSync(`./standard_imports/x32/${p1}.rit`, 'utf-8')
            // console.log(lib)
            imports.push(p1)
            return lib
    }else {
        // external import :0 oh no
        let lib = fs.readFileSync(p1, 'utf-8')
        imports.push(p1)
        return lib
    }

    })
if((program.replace(/"(.*?)"/g,'')).split(' ').includes('import')){
    get_imports()
}
}
get_imports()

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
            x = x + `\nmov eax, ${param.split(' ').join('')}\npush eax`
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
program = program.replace(/var (.*?);|var (.*?)\n/g, (varName) => {
    // console.log(varName)
let name = varName.split(' ')[2]
let bytes = varName.split(' ')[1]
let value = varName.split(' ')[4]
// let data = varName.split(' ')[4]
// return `${vn} ${bytes} ${data}`
// return original
bss.push(`${name}: res${bytes} 0`)
vars.push(name)
// let value2 = (value.match(/"(.*?)"/g)[0] == value) ? value:value
/*
()=>{
newImmd()
return `RITCHIE_IMMD_ID`
}
*/
return `
mov ebx, ${value}
mov [${name}], ebx\n
`
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

    let program2 = program.split('SYS::DATA')
let data = program2[1]
// program2[1] = ''
let program3 = program2.join('section .data\n')

program = program3

program = program.replace(/RITCHIE_STRING_ID/g, (str, index, original) => {
    // console.log(index)
    let xxx = strings[0]
    strings = strings.slice(1)
    return xxx
});

program = program.replace(/RITCHIE_ASM_ID/g, (str, index, original) => {
    // console.log(index)
    let xxx = asms[0]
    asms = asms.slice(1)
    return xxx
});
// console.log(vars)
// console.log(bss)
// program = program.replace(new RegExp(vars.join('|'),'g'),(v, index)=>{
//     console.log(v)

//     if((program[index - 1].match(/[A-Za-z]|[0-9]/g) == program[index -1]) || (program[index + 1].match(/[A-Za-z]|[0-9]/g) == program[index+1])){
//         return v
//     }else {
//         return `[${v}]`
//     }
//     // return `[${v}]`
//     // return v
// })

let datasection = ''
if(program.includes('section .data')){
    datasection = ''
}else {
    datasection = 'section .data\n'
}

return `section	.text
        global _start\n` + program + datasection+immds.join('\n')+`
        section .bss
        ` + bss.join('\n')
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