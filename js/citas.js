// -------------------- DATOS DE PRUEBA --------------------
let citas = [
    {
        id: 1,
        nombre: "Juan Pérez",
        dni: "12345678",
        especialidad: "Cardiología",
        fecha: "2025-10-10",
        hora: "10:00",
        estado: "Pendiente"
    },
    {
        id: 2,
        nombre: "María López",
        dni: "87654321",
        especialidad: "Dermatología",
        fecha: "2025-10-12",
        hora: "15:30",
        estado: "Confirmada"
    },
    {
        id: 3,
        nombre: "Carlos Ruiz",
        dni: "45678912",
        especialidad: "Pediatría",
        fecha: "2025-11-01",
        hora: "09:00",
        estado: "Pendiente"
    }
];

let filtroEstado = "all";
let searchTerm = "";

document.addEventListener("DOMContentLoaded", () => {
    renderCitas();
    actualizarContadores();
    configurarFiltros();
    document.getElementById("searchInput").addEventListener("input", (e) => {
        searchTerm = e.target.value.toLowerCase();
        renderCitas();
    });
});

function renderCitas() {
    const tableContent = document.getElementById("tableContent");

    let citasFiltradas = citas.filter(cita => {
        const matchSearch =
            cita.nombre.toLowerCase().includes(searchTerm) ||
            cita.dni.includes(searchTerm);
        const matchEstado =
            filtroEstado === "all" || cita.estado === filtroEstado;

        return matchSearch && matchEstado;
    });

    let html = `
       <div class="table-responsive">
      <table class="table table-striped table-hover">
          <thead class="table-dark">
              <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>DNI</th>
                  <th>Especialidad</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Estado</th>
                  <th>Acciones</th>
              </tr>
          </thead>
          <tbody>
    `;

    if (citasFiltradas.length === 0) {
        html += `<tr><td colspan="8" class="text-center text-muted">No se encontraron citas</td></tr>`;
    } else {
        citasFiltradas.forEach((cita, index) => {
            html += `
            <tr>
                <td>${index + 1}</td>
                <td>${cita.nombre}</td>
                <td>${cita.dni}</td>
                <td>${cita.especialidad}</td>
                <td>${cita.fecha}</td>
                <td>${cita.hora}</td>
                <td><span class="badge ${cita.estado === "Pendiente" ? "bg-warning" : "bg-success"}">${cita.estado}</span></td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="verDetalle(${cita.id})"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarCita(${cita.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
        });
    }

    html += `</tbody></table>`;
    tableContent.innerHTML = html;

    document.getElementById("resultCount").innerText = `(${citasFiltradas.length} resultados)`;
}

function configurarFiltros() {
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            filtroEstado = btn.getAttribute("data-filter");
            renderCitas();
        });
    });
}

function actualizarContadores() {
    document.getElementById("totalCitas").textContent = citas.length;
    document.getElementById("citasPendientes").textContent = citas.filter(c => c.estado === "Pendiente").length;
    document.getElementById("citasConfirmadas").textContent = citas.filter(c => c.estado === "Confirmada").length;
}

function verDetalle(id) {
    const cita = citas.find(c => c.id === id);
    if (!cita) return;

    const detalleHTML = `
        <p><i class="fas fa-user"></i> <strong>Nombre:</strong> ${cita.nombre}</p>
        <p><i class="fas fa-id-card"></i> <strong>DNI:</strong> ${cita.dni}</p>
        <p><i class="fas fa-stethoscope"></i> <strong>Especialidad:</strong> ${cita.especialidad}</p>
        <p><i class="fas fa-calendar-alt"></i> <strong>Fecha:</strong> ${cita.fecha}</p>
        <p><i class="fas fa-clock"></i> <strong>Hora:</strong> ${cita.hora}</p>
        <p><i class="fas fa-info-circle"></i> <strong>Estado:</strong> ${cita.estado}</p>
    `;

    document.getElementById('detailContent').innerHTML = detalleHTML;
    new bootstrap.Modal(document.getElementById('detailModal')).show();
}

function eliminarCita(id) {
    const modal = new bootstrap.Modal(document.getElementById("deleteModal"));
    modal.show();

    document.getElementById("confirmDelete").onclick = () => {
        citas = citas.filter(c => c.id !== id);
        renderCitas();
        actualizarContadores();
        modal.hide();
        mostrarToast("Cita cancelada correctamente.", "danger");
    };
}

function imprimirTabla() {
    window.print();
}

function exportarCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Nombre,DNI,Especialidad,Fecha,Hora,Estado\n";
    citas.forEach(cita => {
        csvContent += `${cita.nombre},${cita.dni},${cita.especialidad},${cita.fecha},${cita.hora},${cita.estado}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "citas_medicas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function mostrarToast(mensaje, tipo = "success") {
    const toastContainer = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast align-items-center text-white bg-${tipo} border-0 show`;
    toast.role = "alert";
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${mensaje}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}
