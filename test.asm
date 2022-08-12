section	.text
        global _start
_start:
mov	edx, len  
mov	ecx, msg
push ecx
push edx
    mov	eax, 1
    int	0x80

if:
call println
ret
    

while:
call println
ret
    

for:
call println
ret

println:
    pop edx
    pop ecx
mov	ebx, 1	    ;file descriptor 
mov	eax, 4	    ;system call number 
int	0x80        ;call kernel
ret

section .data

msg db "Hello world!",0xa
len	equ	$ - msg
; var db msgg = "Hello World!"
