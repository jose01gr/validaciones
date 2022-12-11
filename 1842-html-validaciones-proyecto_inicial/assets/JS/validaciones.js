export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre : {
        valueMissing: "Este campo no puede estar vacio"
    } ,
    email: {
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Minimum eight characters, at least one letter and one number"
    },
    birth: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 anos"
    },

    telefono: {
        valueMissing: "Debe ingresar un numero telefonico",
        patternMismatch: "Debe ingresar un numero telefonico valido (de 10 digitos)"
    },

    direccion: {
        valueMissing: "Debe ingresar una direccion de domicilio",
        patternMismatch: "Ingrese una direccion valida"
    },

    ciudad: {
        valueMissing: "Debe ingresar una ciudad",
        patternMismatch: "Ingrese una ciudad valida"
    },

    estado: {
        valueMissing: "Debe ingresar un estado",
        patternMismatch: "Ingrese un estado valido"
    }

}

const validadores = {
    "birth" : (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error])
            mensaje  = mensajesDeError[tipoDeInput][error];
        }
    })

    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorEdad(fechaCliente)) {
        mensaje = "debe tener al menos 18 anos de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferencialFechas = new Date(
        fecha.getFullYear() + 18,
        fecha.getMonth(),
        fecha.getDay()
    )

    return diferencialFechas <= fechaActual;
}