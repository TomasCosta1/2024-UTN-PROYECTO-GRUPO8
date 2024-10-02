# Proyecto de Gestión de Restaurantes 
Este proyecto es una aplicación web para la gestión de restaurantes que permite a los comensales escanear un código QR para acceder al menú, realizar pedidos y pagar de manera individual o colectiva. El sistema también gestiona órdenes desde su creación hasta la entrega, permitiendo un control eficiente del flujo de trabajo y el registro de ventas diarias. 

## Requisitos previos 
Antes de comenzar, asegurate de tener instalados los siguientes programas en tu computadora: 
- [Node.js](https://nodejs.org/) (versión 14.x o superior) 
- [Git](https://git-scm.com/) 

## Instalación del proyecto 

1. **Clonar el repositorio:** Primero, debes clonar el repositorio en tu máquina local. En tu terminal, ejecuta el siguiente comando: ```git clone https://github.com/TomasCosta1/2024-UTN-PROYECTO-GRUPO8 ``` 
2. **Moverte a la carpeta del proyecto:** ```cd 2024-UTN-PROYECTO-GRUPO8 ``` 
3. **Crear una rama para tu trabajo:** Cada miembro del equipo debe crear una rama para trabajar en su historia de usuario. Usa el siguiente comando para crear y moverte a tu propia rama: ```git checkout -b nombre-de-tu-rama ``` Ejemplo: ```git checkout -b feature/listado-productos ``` 
4. **Instalar dependencias del backend:** Mueve a la carpeta del backend y ejecuta el siguiente comando para instalar todas las dependencias necesarias: ```cd backend npm install ``` 
5. **Instalar dependencias del frontend:** Mueve a la carpeta del frontend y ejecuta el siguiente comando para instalar las dependencias del frontend: ```cd ../frontend npm install ``` 

## Ejecutar la aplicación 

### 1. **Correr el backend:** 
Primero, abre una terminal en la carpeta `backend` y ejecuta el siguiente comando para iniciar el servidor del backend (asegúrate de que el puerto configurado sea el 3001): ```npm start ``` 
### 2. **Correr el frontend:** 
En otra terminal, ve a la carpeta `frontend` y ejecuta el siguiente comando para iniciar la aplicación de React: ```npm start ``` Esto debería abrir la aplicación en tu navegador en `http://localhost:3000`. 

## Trabajar con Git 

### Hacer cambios en tu rama 
1. Asegúrate de estar en tu rama de trabajo: 
```git checkout nombre-de-tu-rama ``` 
2. Haz cambios en el código, y luego agrega y comitea los archivos modificados: 
```git add . ```
```git commit -m "Descripción de los cambios" ``` 
3. Para subir tus cambios al repositorio remoto, ejecuta: 
```git push origin nombre-de-tu-rama ``` 
### Actualizar tu rama con los últimos cambios de `main` 
1. Cambia a la rama `main` para asegurarte de tener la última versión: 
```git checkout main git pull origin main ``` 
2. Luego, vuelve a tu rama y actualízala con los cambios recientes de `main`: 
```git checkout nombre-de-tu-rama git merge main ```

## Buenas prácticas 
- Siempre trabaja en tu propia rama. 
- Haz `pull` frecuentemente desde `main` para mantener tu rama actualizada. 
- Haz `commit` y `push` regularmente para evitar perder trabajo. 
- Antes de hacer `push`, asegúrate de que tu código funciona correctamente.
