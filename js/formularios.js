document.getElementById('reservaForm').addEventListener('submit', function (e) {
    e.preventDefault();

    document.querySelectorAll('#reservaForm input, #reservaForm select, #reservaForm textarea').forEach(input => {
        input.addEventListener('input', function () {
            if (this.classList.contains('is-invalid')) {
                this.classList.remove('is-invalid');
                const errorMessage = this.parentElement.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.style.display = 'none';
                }
            }
        });
    });

    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.form-control, .form-select').forEach(el => el.classList.remove('is-invalid'));

    const nombre = document.getElementById('nombre').value.trim();
    const dni = document.getElementById('dni').value.trim();
    const especialidad = document.getElementById('especialidad').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const terminos = document.getElementById('terminos').checked;
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();
    const motivo = document.getElementById('motivo').value.trim();

    let isValid = true;

    if (!nombre || nombre.length < 3 || /\d/.test(nombre)) {
        document.getElementById('nombre').classList.add('is-invalid');
        document.getElementById('errorNombre').textContent = "Ingresa un nombre válido (mínimo 3 letras, sin números)";
        document.getElementById('errorNombre').style.display = 'block';
        isValid = false;
    }

    if (!dni || !/^\d{8}$/.test(dni)) {
        document.getElementById('dni').classList.add('is-invalid');
        document.getElementById('errorDni').textContent = "El DNI debe tener exactamente 8 dígitos.";
        document.getElementById('errorDni').style.display = 'block';
        isValid = false;
    }

    if (!telefono) {
        document.getElementById('telefono').classList.add('is-invalid');
        document.getElementById('errorTelefono').textContent = "Debes ingresar tu número de teléfono.";
        document.getElementById('errorTelefono').style.display = 'block';
        isValid = false;
    } else if (!/^\d{9}$/.test(telefono)) {
        document.getElementById('telefono').classList.add('is-invalid');
        document.getElementById('errorTelefono').textContent = "El teléfono debe tener 9 dígitos.";
        document.getElementById('errorTelefono').style.display = 'block';
        isValid = false;
    }

    if (!email) {
        document.getElementById('email').classList.add('is-invalid');
        document.getElementById('errorCorreo').textContent = "Debes ingresar un correo electrónico.";
        document.getElementById('errorCorreo').style.display = 'block';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('email').classList.add('is-invalid');
        document.getElementById('errorCorreo').textContent = "Introduce un correo electrónico válido.";
        document.getElementById('errorCorreo').style.display = 'block';
        isValid = false;
    }

    if (!especialidad) {
        document.getElementById('especialidad').classList.add('is-invalid');
        document.getElementById('errorEspecialidad').style.display = 'block';
        isValid = false;
    }

    if (!fecha) {
        document.getElementById('fecha').classList.add('is-invalid');
        document.getElementById('errorFecha').textContent = "Selecciona una fecha.";
        document.getElementById('errorFecha').style.display = 'block';
        isValid = false;
    } else {
        const hoy = new Date().toISOString().split("T")[0];
        if (fecha < hoy) {
            document.getElementById('fecha').classList.add('is-invalid');
            document.getElementById('errorFecha').textContent = "La fecha no puede ser anterior a hoy.";
            document.getElementById('errorFecha').style.display = 'block';
            isValid = false;
        }
    }

    if (!hora) {
        document.getElementById('hora').classList.add('is-invalid');
        document.getElementById('errorHora').textContent = "Selecciona una hora válida.";
        document.getElementById('errorHora').style.display = 'block';
        isValid = false;
    } else if (hora < "08:00" || hora > "20:00") {
        document.getElementById('hora').classList.add('is-invalid');
        document.getElementById('errorHora').textContent = "El horario debe ser entre 08:00 y 20:00.";
        document.getElementById('errorHora').style.display = 'block';
        isValid = false;
    }

    if (!motivo || motivo.length < 5) {
        document.getElementById('motivo').classList.add('is-invalid');
        document.getElementById('errorMotivos').textContent = "Debes especificar el motivo de la consulta (mínimo 5 caracteres).";
        document.getElementById('errorMotivos').style.display = 'block';
        isValid = false;
    }

    if (!terminos) {
        document.getElementById('errorTerminos').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        const cita = {
            id: Date.now(),
            nombre,
            dni,
            telefono,
            email,
            especialidad,
            fecha,
            hora,
            motivo,
            estado: 'Pendiente'
        };

        let citas = [];
        try {
            const citasGuardadas = localStorage.getItem('citas');
            if (citasGuardadas) {
                citas = JSON.parse(citasGuardadas);
            }
        } catch (e) {
            console.log("Error al cargar citas previas");
        }

        citas.push(cita);
        localStorage.setItem('citas', JSON.stringify(citas));

        const fechaFormateada = new Date(fecha + 'T' + hora).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        document.getElementById('confNombre').textContent = nombre;
        document.getElementById('confDni').textContent = dni;
        document.getElementById('confEspecialidad').textContent = especialidad;
        document.getElementById('confFechaHora').textContent = `${fechaFormateada} a las ${hora}`;
        document.getElementById('confirmacion').style.display = 'block';
        document.getElementById('confirmacion').scrollIntoView({ behavior: 'smooth' });

        this.reset();
    }
});

const hoy = new Date().toISOString().split('T')[0];
document.getElementById('fecha').setAttribute('min', hoy);