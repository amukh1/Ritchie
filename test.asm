section	.text
        global _start
println:
pop edi
pop edx
pop ecx
mov ebx, 1     
mov eax, 4   
int 0x80      
push edi
ret


_start:
mov	edx, len  
mov	ecx, msg
push ecx
push edx
call println
push ecx
push edx
call println
mov	eax, 1
int	0x80


section .data

msg db "Hello world!",0xa
len	equ	$ - msg

