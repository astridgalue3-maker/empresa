// NAVEGACIÓN 
function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.card');
    sections.forEach(s => s.classList.add('hidden'));

    // Para mostrar la seleccionada
    document.getElementById(sectionId).classList.remove('hidden');

    // Para Actualizar botones del menú
    const buttons = document.querySelectorAll('.menu-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

// UTILIDADES
function mostrarResultado(elementId, mensaje, esError = false) {
    const el = document.getElementById(elementId);
    el.innerText = mensaje;
    el.className = 'result-box ' + (esError ? 'error' : 'success');
}

function validarCampos(...valores) {
    return valores.every(v => v !== "" && !isNaN(v));
}

// CÁLCULOS

// 1. Regla de Tres
function calcularRegla3() {
    const a = document.getElementById('rA').value;
    const b = document.getElementById('rB').value;
    const c = document.getElementById('rC').value;
    const tipo = document.getElementById('tipoRegla').value;

    if (!validarCampos(a, b, c)) {
        return mostrarResultado('resRegla3', 'Por favor, llena todos los campos con números.', true);
    }

    let x = (tipo === 'directa') ? (c * b) / a : (a * b) / c;
    mostrarResultado('resRegla3', `El resultado de X es: ${x.toFixed(2)}`);
}

// 2. Temperatura
function convertirTemp() {
    const val = parseFloat(document.getElementById('tempVal').value);
    const de = document.getElementById('tempDe').value;
    const a = document.getElementById('tempA').value;

    if (isNaN(val)) return mostrarResultado('resTemp', 'Ingresa un número válido.', true);

    let celsius;
    // Normalizar a Celsius
    if (de === "C") celsius = val;
    else if (de === "F") celsius = (val - 32) * 5/9;
    else celsius = val - 273.15;

    let final;
    // De Celsius a destino
    if (a === "C") final = celsius;
    else if (a === "F") final = (celsius * 9/5) + 32;
    else final = celsius + 273.15;

    mostrarResultado('resTemp', `${val}°${de} equivale a ${final.toFixed(2)}°${a}`);
}

// 3. Longitud
function convertirDist() {
    const val = parseFloat(document.getElementById('distVal').value);
    const de = document.getElementById('distDe').value;

    if (isNaN(val)) return mostrarResultado('resDist', 'Ingresa un valor numérico.', true);

    const enMetros = { m: 1, km: 1000, mi: 1609.34, ft: 0.3048 };
    const base = val * enMetros[de];

    mostrarResultado('resDist', `Equivale a: 
        ${(base/1000).toFixed(2)} km | 
        ${(base/1609.34).toFixed(2)} mi | 
        ${(base/0.3048).toFixed(2)} ft`);
}

// 4. Física (M = D * V)
function calcularFisica() {
    let m = document.getElementById('fMasa').value;
    let v = document.getElementById('fVol').value;
    let d = document.getElementById('fDen').value;

    let vacios = [m, v, d].filter(x => x === "").length;

    if (vacios !== 1) {
        return mostrarResultado('resFisica', 'Deja exactamente UN campo vacío para calcularlo.', true);
    }

    if (m === "") {
        let res = parseFloat(d) * parseFloat(v);
        mostrarResultado('resFisica', `Masa = ${res.toFixed(2)} kg`);
    } else if (v === "") {
        let res = parseFloat(m) / parseFloat(d);
        mostrarResultado('resFisica', `Volumen = ${res.toFixed(2)} m³`);
    } else {
        let res = parseFloat(m) / parseFloat(v);
        mostrarResultado('resFisica', `Densidad = ${res.toFixed(2)} kg/m³`);
    }
}