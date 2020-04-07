# LambdaSample
# Calculador de Poliza

Ejemplo de Funcion Lambda, que calcula a el costo de la poliza que tiene que pagar una empresa
El cálculo se efectua bajo las siguientes reglas:

    a. Costo por empleado por cobertura de salud/vida:
        i. Un empleado sin hijo/as tiene un costo de 0,279 UF.
        ii. Un empleado con 1 hijo/a tiene un costo de 0,4396 UF.
        iii. Un empleado con 2 o hijo/as tiene un costo de 0,5599 UF.
    b. Costo por empleado por cobertura dental:
        i. Un empleado sin hijo/as tiene un costo de 0,12 UF.
        ii. Un empleado con 1 hijo/as tiene un costo de 0,1950 UF.
        iii. Un empleado con 2 o más hijo/as tiene un costo de 0,2480 UF.
    c. Empleados mayores a 65 años no tienen cobertura y por ende no tienen costo para la empresa.
    d. El % de la empresa es el costo que asumirá la empresa del costo total de la póliza, el resto es cubierto por cada empleado

# Respuesta
Se trata de una respuesta rest en formato json con la cantidad a pagar por la empresa y por otra parte el detalle de lo que cada trabajador debe pagar, ambas en UF.

Este ejercicio esta configurado con el plugin serverless offline
