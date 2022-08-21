#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import {createSpinner} from 'nanospinner';
import fs from 'fs';
import fetch from 'node-fetch';
import {exec} from 'child_process';
import Compiler from './Compiler.js';
import { stdout } from 'process';

async function main() {
    if(process.argv[3] != 'fast'){
    figlet('RITCHIE', function(err, data) {
console.log(gradient.pastel.multiline(data))
    })}else {
        console.log(chalk.yellow('Ritchie: Fast mode'))
    }

    setTimeout(() => {
        console.clear();
        console.log(chalk.bold.yellow('Developed By: Amukh1'))
    const spinner = createSpinner('Compiling..').start()

    setTimeout(() => {
      spinner.success({text: 'Done!'})
    //   go()
    croc()
    }, 1000)
    // console.log('\n')
    }, 2000)
}

async function go() {
    const response = await inquirer.prompt({
        type:'input',
        name: 'File',
        message: 'Enter the file name:',
      }).then(function(a){
        handleAnswer(a)
      })

}

function handleAnswer(a) {
    // console.log(a)
    
    const file = a.File

}

function croc() {
    // source is process args
let source = process.argv[2]
let output = process.argv[3]

if(!source.endsWith('.rit')){
    console.log(chalk.red('Invalid file format'))
    throw new Error('Invalid file format')
    return
}

let code = fs.readFileSync(source, 'utf-8')

let program = new Compiler(`./${output}.asm`).compile(code)

let program2 = program.split('SYS::DATA')
let data = program2[1]
// program2[1] = ''
let program3 = program2.join('section .data\n')



fs.writeFileSync(`${output}.asm`, program, {
    encoding: 'utf-8'
    })

    let outputName = output.split('.')
    if(outputName.length = 3){
        outputName = outputName[1]
    }else {
        outputName = outputName[0]
    }

    exec(`nasm -f elf ./${output}.asm`, (err, stdout, stderr) => {
        console.log(stdout)
    })
    exec(`ld -m elf_i386 -s -o ${output} ${output}.o`, (err, stdout, stderr) => {
        console.log(stdout)
    })
}

main()

/*
import Compiler from './Compiler.js';

// source is process args
let source = process.argv[2]
let output = process.argv[3]

let code = fs.readFileSync(source, 'utf-8')

let program = new Compiler(output).compile(code)

let program2 = program.split('SYS::DATA')
let data = program2[1]
// program2[1] = ''
let program3 = program2.join('section .data\n')

fs.writeFileSync(`${output}`, program3, {
    encoding: 'utf-8'
    })
*/