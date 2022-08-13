section	.text
        global _start
import Stdio_start:mov	edx, len  mov	ecx, msgpush ecx
push edx
call printlnpush ecx
push edx
call printlnmov	eax, 1
int	0x80
section .data
msg db "Hello world!",0xalen	equ	$ - msg
