[![npm version](https://badge.fury.io/js/Ritchie.svg)](https://www.npmjs.com/package/Ritchie)

# Ritchie

> A small *compiled* **programming language** similar to *C*.

<br>

> Contact me for help, because I *will* respond. Discord: amukh1#9613

## Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation
<br>

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

<br>

To install and set up the library, run:

```sh
$ npm install ritchie
```

Or if you prefer using Yarn:

```sh
$ yarn add --dev ritchie
```

## Usage

august-lang takes 2 file extentions, .aug and .asm.
<br>

rcomp is the compiler.. (*R*itchie *Comp*iler) and putting in an .rit file compiles it to a .asm file.

```sh
$ rcomp ./file.rit name
```
ASM compiles to bytecode automatically on Linux (if your on Windows/OSX use an online compiler).
[webCompiler](https://www.jdoodle.com/compile-assembler-nasm-online/)

## Example program:
<br>

```
import Stdio

function _start() {
mov	edx, len  
mov	ecx, msg
println(ecx, edx)
SYS::EXIT
}

SYS::DATA
msg db "Hello world!",0xa
len	equ	$ - msg

```
Assembly can be embedded directly into the language (Working to add features so you wouldnt need to use assembly)
<br>

### SYS::EXIT
**Exits program**

### SYS::DATA
**Data section of the program, where you define variables, working on those too, soon to be "var name = db "value"**

### Functions
**Functions only take registers are parameters**

### Imports
**Only I can make imports (working on a better solution later)**

## Contributing

You can contribute to the project by making a pull request on [GitHub](https://github.com/amukh1/Ritchie).

## Credits

### Amukh1.

## Built With

* [Node](https://nodejs.org/)
* [Assembly](http://x86asm.net/)
* [Love](https://amukh1.dev)

## Authors

* **Amukh1** - [Github](https://github.com/amukh1)

See also the list of [contributors](https://github.com/amukh1/Ritchie/contributors) who participated in this project.

## License

[MIT License](https://andreasonny.mit-license.org/2022) © Amukh1