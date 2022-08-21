# Ritchie

## [Web Compiler](https://www.jdoodle.com/compile-assembler-nasm-online/)

## Example program (for refrence):

```
import Stdio

function _start() {
println("hi", 2)
SYS::EXIT
}

SYS::DATA
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

## *Defining a function:*
```
function name(p1, p2, p3) {
pop $reg1 // return line
pop $reg2 // param 3
pop $reg3 // param 2
pop $reg4 // param 1

// run code

push $reg1 // return line
}
```

## *Calling a function:*
```
name(p1, p2, p3)
```

<br>

# Imports
**If import is not included in *my* standard imports, then it will look around for an external import file**

## *Stdio:*
```
import Stdio // imports println() and input()

println(msg, msgLength)

input() // pushes output/response to stack
```

## *Stdlib:*
```
import Stdlib // imports Sys aliases and ifEqu()

SYS_EXIT  // 1
SYS_READ  // 3
SYS_WRITE // 4
STDIN     // 0
STDOUT    // 1

ifEqu(1, 2, function) // (Value, Value, function pointer) Does not call function
ifEqu(1, 1, function) // calls function
```
## *External Import Files:*

index.rit:
```
import external.rit // imports external .rit file (just takes contents of file, no "module.exports" or "require" statements)
import external.asm // imports external .asm file (same as above^^)
```

external.rit:
```
// No import Stdio needed, because it was included in the index.rit file, just make sure you import Stdio before importing external.rit

function external_function() {
println("Hello World!")
ret
}
```

<br>

## Authors

* **Amukh1** - [Github](https://github.com/amukh1)

See also the list of [contributors](https://github.com/amukh1/Ritchie/contributors) who participated in this project.

## License

[MIT License](https://mit-license.org/2022) © Amukh1