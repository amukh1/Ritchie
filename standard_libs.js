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

%macro je_reg 1
jne %%skip 
call %1
%%skip:
%endmacro

function ifEqu(a, b, c){
pop ebp 
pop ebx 
pop ecx 
pop edx 
cmp edx, ecx 
je_reg ebx
push ebp
ret
}

function strlen() {
    push ebp
    mov ebp, esp        ; setup the stack frame
    mov ecx, [ebp+8]
    xor eax, eax        ; loop counter
    pop ebp
    ret
}

`,
}

export default libs;