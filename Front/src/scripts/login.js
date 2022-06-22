const formularioIngreso = {
    formulario: document.getElementById('inicioSesion'),
    email: document.querySelector('#user'),
    password: document.querySelector('#password'),
}

function valiadarIngreso(email, password) {
    // Datos Vacios
    if(email.length < 0 && password.length < 0){
        return console.error('Ingrese un usuario y contraseña');
    }

    // Email no valido
    const emailregex = /^[a-z.]+@(amigo.edu.co)$/i;
    if(!emailregex.test(email)){
        return console.warn('El email no tiene el formato correcto', 'amigo.edu.co');
    }

    // Contraseña corta
    if(password.length < 6){
        return console.warn('La contraseña debe tener al menos 6 caracteres');
    }

    // Correo valido
    return true;
}

formularioIngreso.formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    let [email, password] = [formularioIngreso.email.value, formularioIngreso.password.value];

    if(valiadarIngreso(email, password)){
        console.info('Campos correctos');
    }

    // Auntenticar con Firebase

})