let libs = {
    ['Stdio']: `function println() {
pop edi
pop edx
pop ecx
mov ebx, 1     
mov eax, 4   
int 0x80      
push edi
ret
}

function input(){
    mov eax, 3
    mov ebx, 0  
    mov ecx, esi 
    mov edx, 2
    int 0x80
    pop esi
    ret
}`,
['Stdlib']: `
SYS_EXIT  equ 1
SYS_READ  equ 3
SYS_WRITE equ 4
STDIN     equ 0
STDOUT    equ 1

function ifEqu(){
    pop eax // return line
    pop ebx // param 2 - condition
    pop ecx // param 1 - function to execute if condition is true
    // code
    push edx // return response
    push eax // return line
}`,
}

export default libs;