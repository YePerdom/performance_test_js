const eventsApi = "http://localhost:5000/events";

export async function showVisitors() {
    const resp = await fetch(`${eventsApi}?is_active=true`);
    const events = await resp.json();
    const tbody = document.querySelector("#table-events tbody");
    tbody.innerHTML = "";

    events.forEach(event => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${event.name}</td>
            <td>${event.description}</td>
            <td>${event.capacity}</td>
            <td>${event.date}</td>
            <td>
              <button>registrarse</button>
            </td>
            `;
        tbody.appendChild(fila);
    });
}

export async function showAdmin() {
    const resp = await fetch(`${eventsApi}?is_active=true`);
    const events = await resp.json();
    const header = document.getElementById("header");
    const form = document.createElement("form");
    header.appendChild(form);
    form.innerHTML = `
    <input type="text" name="newEvent" id="newEvent" placeholder="evento">
    <input type="text" name="description" id="description" placeholder="descripción">
    <input type="number" name="capacity" id="capacity" placeholder="capacidad">
    <input type="date" name="date" id="date" placeholder="fecha">
    <button type="button">crear</button>
    `

    const tbody = document.querySelector("#table-events tbody");
    tbody.innerHTML = "";

    events.forEach(event => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${event.name}</td>
            <td>${event.description}</td>
            <td>${event.capacity}</td>
            <td>${event.date}</td>
            <td>
              <button>Editar</button>
              <button>Eliminar</button>
            </td>
            `;
        tbody.appendChild(fila);
    });
}