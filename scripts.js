console.log("Hola, este es el script.js de mis 10 proyectos JS");

// contador

const contador = document.getElementById('contador');

let cuenta = parseInt(localStorage.getItem('valor-contador')) || 0;
function actualizar(){
    contador.textContent = cuenta;
    if (cuenta > 0){
        contador.style.color = '#4CAF50';
    } else if (cuenta < 0){
        contador.style.color = '#f44336';
    } else {
        contador.style.color = '#9e9e9e';
    }
    localStorage.setItem('valor-contador', cuenta);
}
function sumar(){
    cuenta ++;
    actualizar();
}
function resetear(){
    cuenta = 0;
    actualizar();
}
function restar(){
    cuenta -- ;
    actualizar();
}

actualizar();


//-------------------------------------------------------------------------------

//lista de tareas

const inputLista = document.getElementById('input_lista');
const lista = document.getElementById('lista');
const STORAGE_LISTA_KEY = 'tareas_lista';


//guarda los elementos de la lista completa en localStorage
function guardarLista() {
    const items = Array.from(lista.children).map(li => {
        const checkbox = li.querySelector('input[type="checkbox"]');
        return {
            texto: li.childNodes[0].textContent.trim(),
            completado: checkbox ? checkbox.checked : false
        };
    });
    localStorage.setItem(STORAGE_LISTA_KEY, JSON.stringify(items));
}

function crearElemento(texto, completado = false) {
    
    //crea el texto de la tarea nueva
    const li = document.createElement('li');
    li.textContent = texto + ' ';

    //crea el checkbox para poder marcar la tarea como completada
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completado;

    //cuando se marca o desmarca una checkbox,
    //se ejecuta la funcion guardarLista 
    // para actualizar el estado de la lista en localStorage
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completado', checkbox.checked);
        guardarLista();
    });
    if (completado) {
        li.classList.add('completado');
    }

    //crea el boton para eliminar la tarea
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', () => {
        lista.removeChild(li);
        guardarLista();
    });

    li.appendChild(checkbox);
    li.appendChild(botonEliminar);
    return li;
}

//carga la lista de tareas desde localStorage al iniciar la pagina
function cargarLista() {
    const datos = JSON.parse(localStorage.getItem(STORAGE_LISTA_KEY) || '[]');
    datos.forEach(item => {
        lista.appendChild(crearElemento(item.texto, item.completado));
    });
}

// ejecuta la funcion crear elemento con el texto del input
//y lo agrega a la lista
function agregarElemento() {
    const texto = inputLista.value.trim();
    if (!texto) return;

    const li = crearElemento(texto);
    lista.appendChild(li);
    guardarLista();

    inputLista.value = '';
    inputLista.focus();
}

//elimina el elemento de la lista
function eliminarElemento(boton) {
    const li = boton.parentElement;
    if (li && li.parentElement) {
        li.parentElement.removeChild(li);
        guardarLista();
    }
}

//carga la lista de tareas al iniciar la pagina. No lo borres
cargarLista();

//-------------------------------------------------------------------------------
//adivinar numero

const numero_misterioso = document.getElementById('numero_misterioso');
const contador_intentos = document.getElementById('contador_intentos');

let numero = Math.floor(Math.random() * 100) + 1;
let intentos = 0;

function generarNumero() {
    numero = Math.floor(Math.random() * 100) + 1;
}

function verificarNumero() {
    const inputNumero = document.getElementById('input_numero');
    const numeroIngresado = parseInt(inputNumero.value);

    if (isNaN(numeroIngresado) || numeroIngresado < 1 || numeroIngresado > 100) {
        alert('Por favor, ingresa un número válido entre 1 y 100.');
        return;
    }

    intentos++;

    if (numeroIngresado === numero) {
        alert(`¡Felicidades! Adivinaste el número en ${intentos} intentos.`);
        reiniciarJuego();
    
    } else {
        contador_intentos.textContent = intentos;
        if (numeroIngresado < numero) {
        numero_misterioso.textContent = "El número es mayor.";
        } else {
            numero_misterioso.textContent = "El número es menor.";
        }
    }
}

function reiniciarJuego() {
    generarNumero();
    intentos = 0;
    contador_intentos.textContent = intentos;
    document.getElementById('input_numero').value = '';
    numero_misterioso.textContent = "?";

}

//-------------------------------------------------------------------------------
//calculadora

const displayCalculadora = document.getElementById('display_calculadora');

function agregarNumero(num) {
    if (displayCalculadora.textContent === 'Error') {
        displayCalculadora.textContent = num;
    }
    else if (displayCalculadora.textContent === '_') {
        displayCalculadora.textContent = num;
    } else {
        displayCalculadora.textContent += num;
    }
}

function agregarOperacion(op) {
    displayCalculadora.textContent += op;
}

function calcularResultado() {
    try {
        if (displayCalculadora.textContent.trim() === '0/0') { //este if muestra el error si se intenta dividir
            displayCalculadora.textContent = 'Error';          //0 entre 0 ,de otro modo el resultado lo muestra como nan
            return;
        }
        const resultado = eval(displayCalculadora.textContent);
        displayCalculadora.textContent = resultado;
    } catch (error) {
        displayCalculadora.textContent = 'Error';
    }
}

function limpiarDisplay() {
    displayCalculadora.textContent = '_';
}

//-------------------------------------------------------------------------------
//generador de colores

const codigoHex = document.getElementById('codigo_hex')

function generarColor() {
  // Genera un número aleatorio, lo convierte a base 16 y toma los últimos 6 dígitos
    let color = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
    codigoHex.textContent = color;
    document.body.style.backgroundColor = color;
}

function copiarColor() {
    navigator.clipboard.writeText(codigoHex.textContent);
    alert('Color copiado al portapapeles:' + codigoHex.textContent);
}

function reiniciarColor() {
    codigoHex.textContent = "#";
    document.body.style.backgroundColor = "#d4e0ff";
}

//-------------------------------------------------------------------------------
//temporizador

const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');

let minutosRestantes = parseInt(minutos.textContent);
let segundosRestantes = parseInt(segundos.textContent);
let temporizadorActivo = false;

function iniciarTemporizador() {
    
    if (temporizadorActivo==true) {
        temporizadorActivo = true; //sin esta linea el temporizador va mas rapido si lo pulsas muchas veces
    }else if (minutosRestantes >= 0 && segundosRestantes != 0 ) {
        temporizadorActivo = true;
        ejecutarTemporizador();
    }else if (minutosRestantes > 0 && segundosRestantes == 0) {
        temporizadorActivo = true;
        ejecutarTemporizador();
    }
}

function pausarTemporizador() {
    temporizadorActivo = false;
}

function reiniciarTemporizador() {
    temporizadorActivo = false;

    minutosRestantes = 0;
    minutos.textContent = minutosRestantes < 10 ? '0' + minutosRestantes : minutosRestantes;

    segundosRestantes = 0;
    segundos.textContent = segundosRestantes < 10 ? '0' + segundosRestantes : segundosRestantes;

}

//a partir de aqui son los que suman o restan
function sumarMinutos() {
    minutosRestantes++;
    minutos.textContent = minutosRestantes < 10 ? '0' + minutosRestantes : minutosRestantes;
}

function restarMinutos() {
    if (minutosRestantes > 0) {
        minutosRestantes--;
        minutos.textContent = minutosRestantes < 10 ? '0' + minutosRestantes : minutosRestantes;
    }
}

function sumarSegundos() {
    segundosRestantes++;
    if (segundosRestantes > 59) {
        segundosRestantes = 0;
        minutosRestantes++;
    }
    segundos.textContent = segundosRestantes < 10 ? '0' + segundosRestantes : segundosRestantes;
    minutos.textContent = minutosRestantes < 10 ? '0' + minutosRestantes : minutosRestantes;

}

function restarSegundos() {

    if(minutosRestantes >= 0 && segundosRestantes != 0) {
        segundosRestantes--;
        if (segundosRestantes < 0) {
            segundosRestantes = 59;
            minutosRestantes--;
        }
    }else if (minutosRestantes > 0 && segundosRestantes == 0) {
        segundosRestantes--;
        if (segundosRestantes < 0) {
            segundosRestantes = 59;
            minutosRestantes--;
        }

    }

    segundos.textContent = segundosRestantes < 10 ? '0' + segundosRestantes : segundosRestantes;
    minutos.textContent = minutosRestantes < 10 ? '0' + minutosRestantes : minutosRestantes;

}

//hasta aqui son los que suman o restan


// Esto es una espera de 1 segundo
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function delay() {

    await esperar(1000); // espera 1 segundo
    restarSegundos()
    console.log("mambo")
}

async function ejecutarTemporizador() {
    while (temporizadorActivo) {
        await esperar(1000);
        restarSegundos();
        if (minutosRestantes === 0 && segundosRestantes === 0) {
            temporizadorActivo = false;
            alert('¡Tiempo terminado!');
        }
    }

}

//-------------------------------------------------------------------------------
//generador de contraseñas

const contraseñaGenerada = document.getElementById('contraseña_generada');
const incluirMayusculas = document.getElementById('incluir_mayusculas');
const incluirMinusculas = document.getElementById('incluir_minusculas');
const incluirNumeros = document.getElementById('incluir_numeros');
const incluirSimbolos = document.getElementById('incluir_simbolos');
const longitudContraseña = document.getElementById('longitud_contraseña');

function generarContraseña() {
    const longitud = parseInt(longitudContraseña.value, 10);
    const mayusculas = incluirMayusculas.checked;
    const minusculas = incluirMinusculas.checked;
    const numeros = incluirNumeros.checked;
    const simbolos = incluirSimbolos.checked;

    if (!mayusculas && !minusculas && !numeros && !simbolos) {
        alert('Selecciona al menos un tipo de carácter para generar la contraseña.');
        return;
    }

    if (isNaN(longitud) || longitud < 1) {
        alert('Ingresa una longitud válida para la contraseña.');
        return;
    }

    const mayusculasChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const minusculasChars = 'abcdefghijklmnopqrstuvwxyz';
    const numerosChars = '0123456789';
    const simbolosChars = '!@#$%^&*()-_=+[]{};:,<.>/?~';

    let caracteresDisponibles = '';
    if (mayusculas) caracteresDisponibles += mayusculasChars;
    if (minusculas) caracteresDisponibles += minusculasChars;
    if (numeros) caracteresDisponibles += numerosChars;
    if (simbolos) caracteresDisponibles += simbolosChars;

    let contraseña = '';
    for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteresDisponibles.length);
        contraseña += caracteresDisponibles.charAt(indice);
    }

    contraseñaGenerada.textContent = contraseña;
}

function copiarContraseña() {
    const texto = contraseñaGenerada.textContent;
    if (!texto || texto === '0' || texto === '#') {
        alert('Genera primero una contraseña antes de copiarla.');
        return;
    }

    navigator.clipboard.writeText(texto)
        .then(() => {
            alert('Contraseña copiada al portapapeles.');
        })
        .catch(() => {
            alert('No se pudo copiar la contraseña. Intenta con otro navegador.');
        });
}

//-------------------------------------------------------------------------------
//modo oscuro
const MODO_OSCURO_KEY = 'modoOscuro';
let modoOscuroActivo = false;
const botonModoOscuro = document.getElementById('boton_modo_oscuro');
const sections = document.querySelectorAll('section');

function aplicarModoOscuro(activar) {
    modoOscuroActivo = activar;
    if (modoOscuroActivo) {
        document.body.style.backgroundColor = '#1c1c25';
        sections.forEach(section => {
            section.style.backgroundColor = '#535374';
            section.style.color = 'white';
        });
        botonModoOscuro.textContent = '☀️';
    } else {
        document.body.style.backgroundColor = '#d4e0ff';
        sections.forEach(section => {
            section.style.backgroundColor = '#acd8ff';
            section.style.color = 'black';
        });
        botonModoOscuro.textContent = '🌙';
    }
    localStorage.setItem(MODO_OSCURO_KEY, modoOscuroActivo.toString());
}

function cargarModoOscuro() {
    const valorGuardado = localStorage.getItem(MODO_OSCURO_KEY) ?? localStorage.getItem('isModoOsuro');
    aplicarModoOscuro(valorGuardado === 'true');
}

function toggleModoOscuro() {
    aplicarModoOscuro(!modoOscuroActivo);
}

cargarModoOscuro();

//-------------------------------------------------------------------------------
//piedra papel tijera

const eleccionCpuMostrar = document.getElementById('cpu_piedra_papel_tijera');
const resultadoPiedraPapelTijera = document.getElementById('resultado_piedra_papel_tijera');

const marcadorJugador = document.getElementById('marcador_jugador');
const marcadorCpu = document.getElementById('marcador_cpu');

let marcadorInternoJugador = 0;
let marcadorInternoCpu = 0;


function jugarPiedraPapelTijera(eleccion) {

    // 1=piedra, 2=papel, 3=tijera
    let eleccionCpu = Math.floor(Math.random() * 3) + 1;
    
    if (eleccionCpu === 1 && eleccion === '1') {
        eleccionCpuMostrar.textContent = '🪨';
        resultadoPiedraPapelTijera.textContent = 'Empate';
    }else if (eleccionCpu === 2 && eleccion === '2') {
        eleccionCpuMostrar.textContent = '📄';
        resultadoPiedraPapelTijera.textContent = 'Empate';
    }else if (eleccionCpu === 3 && eleccion === '3') {
        eleccionCpuMostrar.textContent = '✂️';
        resultadoPiedraPapelTijera.textContent = 'Empate';
    }else if (eleccionCpu === 1 && eleccion === '2') {
        eleccionCpuMostrar.textContent = '🪨';
        resultadoPiedraPapelTijera.textContent = 'Ganaste';
        marcadorInternoJugador++;
    }else if (eleccionCpu === 1 && eleccion === '3') {
        eleccionCpuMostrar.textContent = '🪨';
        resultadoPiedraPapelTijera.textContent = 'Perdiste';
        marcadorInternoCpu++;
    }
    else if (eleccionCpu === 2 && eleccion === '1') {
        eleccionCpuMostrar.textContent = '📄';
        resultadoPiedraPapelTijera.textContent = 'Perdiste';
        marcadorInternoCpu++;
    }else if (eleccionCpu === 2 && eleccion === '3') {
        eleccionCpuMostrar.textContent = '📄';
        resultadoPiedraPapelTijera.textContent = 'Ganaste';
        marcadorInternoJugador++;
    }else if (eleccionCpu === 3 && eleccion === '1') {
        eleccionCpuMostrar.textContent = '✂️';
        resultadoPiedraPapelTijera.textContent = 'Ganaste';
        marcadorInternoJugador++;
    }else if (eleccionCpu === 3 && eleccion === '2') {
        eleccionCpuMostrar.textContent = '✂️';
        resultadoPiedraPapelTijera.textContent = 'Perdiste';
        marcadorInternoCpu++;
    }

    marcadorJugador.textContent = marcadorInternoJugador;
    marcadorCpu.textContent = marcadorInternoCpu;
    // console.log(eleccionCpu)
}

function reiniciarMarcador() {

    eleccionCpuMostrar.textContent = '❓';
    marcadorInternoJugador = 0;
    marcadorInternoCpu = 0;
    marcadorJugador.textContent = marcadorInternoJugador;
    marcadorCpu.textContent = marcadorInternoCpu;
    // console.log(eleccionCpu)

}

//-------------------------------------------------------------------------------
//funcionalidad modales

function abrirModalImagen(id) {
    const modalImg = document.getElementById('modal_imagen');
    const overlay = document.querySelector('.overlay');
    const imagenesModal = document.querySelectorAll('.imagen_galeria_2');

    imagenesModal.forEach(imagen => {
        imagen.classList.add('hidden');
    });

    const imagenSeleccionada = document.getElementById(id);
    if (imagenSeleccionada) {
        imagenSeleccionada.classList.remove('hidden');
    }

    modalImg.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function cerrarModal() {
    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.modal');

    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}


function abrirModalMenu() {

    const modalMenu = document.getElementById('modal_menu');
    const overlay = document.querySelector('.overlay');

    modalMenu.classList.remove('hidden')
    overlay.classList.remove('hidden');


}

function cerrarModalMenu() {

    const modalMenu = document.getElementById('modal_menu');
    const overlay = document.querySelector('.overlay');

    modalMenu.classList.add('hidden');
    overlay.classList.  add('hidden');

}

function mostrarSeccion(id) {
    const modalMenu = document.getElementById('modal_menu');
    const overlay = document.querySelector('.overlay');
    const sectionsModal = document.querySelectorAll('.seccion');

    sectionsModal.forEach(section => {
        section.classList.add('hidden');
    });

    const seccionSeleccionada = document.getElementById(id);
    seccionSeleccionada.classList.remove('hidden');


    modalMenu.classList.add('hidden');
    overlay.classList.add('hidden');
}



//-------------------------------------------------------------------------------
//galeria

function filtrarPorCategoria(p) {
    const imagenes = document.querySelectorAll('.imagen_galeria');
    
    imagenes.forEach(imagen => {
        imagen.classList.add('hidden');
    });

    if (p === 'todos') {
        imagenes.forEach(imagen => imagen.classList.remove('hidden'));
        return;
    }

    const imagenesSeleccionadas = document.querySelectorAll(`.imagen_galeria.${p}`);
    imagenesSeleccionadas.forEach(imagen => {
        imagen.classList.remove('hidden');
    });
}

function buscarImagenes() {

    const imagenes = document.querySelectorAll('.imagen_galeria');
    const inputBusqueda = document.getElementById('filtro_input')
    
    imagenes.forEach(imagen => {
        imagen.classList.add('hidden');
    });

    const texto = inputBusqueda.value.trim();

    const busqueda = document.querySelectorAll(`.imagen_galeria.${texto}`);
    busqueda.forEach(imagen => {
        imagen.classList.remove('hidden');
    });

}

