section	.text
        global _start
import Stdio_start:mov eax, msg
push eax
mov eax, len
push eax
call printlnmov eax, msg
push eax
mov eax, len
push eax
call printlnmov	eax, 1
int	0x80
section .data
msg db "Hello world!",0xalen	equ	$ - msg
