# Ritchie

## [Web Compiler](https://www.jdoodle.com/compile-assembler-nasm-online/)

## Example program (for refrence):

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
<br>

# SYS::EXIT
**Exits program**

<br>

# SYS::DATA
**Data section of the program, where you define variables, working on those too, soon to be "var name = db "value"**

**Constants are defined with "equ"**

<br>

# Functions
**Functions only take registers are parameters**

## *Defining a function:*
```
function name(p1, p2, p3) {
pop $reg1 // return line
pop $reg2 // param 1
pop $reg3 // param 2
pop $reg4 // param 3

// run code

push $reg4
}
```

## *Calling a function:*
```
name(p1, p2, p3)
```

<br>

# Imports
**Only I can make imports (working on a better solution later)**

## *Stdio:*
```
import Stdio // imports println() and input()

println($reg1, $reg2) // msg, msgLength

input($reg1) // Output register pointer
```

## *Stdlib:*
```
import Stdlib // imports Sys aliases and ifEqu()

SYS_EXIT  // 1
SYS_READ  // 3
SYS_WRITE // 4
STDIN     // 0
STDOUT    // 1

ifEqu($reg1, $reg2) // Condition, Output register pointer
```

<br>

## Authors

* **Amukh1** - [Github](https://github.com/amukh1)

See also the list of [contributors](https://github.com/amukh1/Ritchie/contributors) who participated in this project.

## License

[MIT License](https://mit-license.org/2022) © Amukh1