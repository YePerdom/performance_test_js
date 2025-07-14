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