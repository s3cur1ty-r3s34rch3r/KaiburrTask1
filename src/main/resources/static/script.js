const serverForm = document.querySelector("#serverForm");
const searchForm = document.querySelector("#searchForm");
const serverList = document.querySelector("#serverList");
const cancelButton = document.querySelector("#cancelButton");

// Define an empty array to store the server data
let servers = [];

function renderServerList() {
    console.log("renderServerList() called");
    // Clear the server list
    serverList.innerHTML = "";

    // Render only the servers that match the search query
    const searchInput = searchForm.searchInput.value.toLowerCase();
    const filteredServers = servers.filter((server) => {
        return server.name.toLowerCase().includes(searchInput);
    });
    console.log("filteredServers:", filteredServers);

    // Render each server as a table row
    filteredServers.forEach((server) => {
        const row = document.createElement("div");
        row.classList.add("serverRow");
        row.innerHTML = `
      <div class="serverCell">${server.name}</div>
      <div class="serverCell">${server.language}</div>
      <div class="serverCell">${server.framework}</div>
      <div class="serverCell">
        <button class="editButton" data-id="${server.id}">Edit</button>
        <button class="deleteButton" data-id="${server.id}">Delete</button>
      </div>
    `;
        serverList.appendChild(row);
    });
}

function saveServer(event) {
    event.preventDefault();
    console.log("saveServer() called");

    // Get the form data
    const id = serverForm.id.value;
    const name = serverForm.name.value;
    const language = serverForm.language.value;
    const framework = serverForm.framework.value;

    // Check if we're adding a new server or updating an existing one
    let server;
    if (id) {
        // Update an existing server
        server = servers.find((s) => s.id === id);
        server.name = name;
        server.language = language;
        server.framework = framework;
    } else {
        // Add a new server
        server = {
            id: Date.now().toString(),
            name,
            language,
            framework,
        };
        servers.push(server);
    }

    // Clear the form
    serverForm.reset();

    // Re-render the server list
    renderServerList();
}

function editServer(event) {
    console.log("editServer() called");
    const id = event.target.dataset.id;
    const server = servers.find((s) => s.id === id);
    if (!server) {
        return;
    }
    serverForm.id.value = server.id;
    serverForm.name.value = server.name;
    serverForm.language.value = server.language;
    serverForm.framework.value = server.framework;
}

function deleteServer(event) {
    console.log("deleteServer() called");
    const id = event.target.dataset.id;
    servers = servers.filter((s) => s.id !== id);
    renderServerList();
}

function cancelForm() {
    console.log("cancelForm() called");
    serverForm.reset();
}

function showServer(id) {
    console.log("showServer() called");
    const server = servers.find((s) => s.id === id);
    if (!server) {
        return;
    }
    alert(`Name: ${server.name}\nLanguage: ${server.language}\nFramework: ${server.framework}`);
}

// Initialize the app
function init() {
    console.log("init() called");
    // Add event listeners
    serverForm.addEventListener("submit", saveServer);
    serverList.addEventListener("click", (event) => {
        if (event.target.classList.contains("editButton")) {
            editServer(event);
        } else if (event.target.classList.contains("deleteButton")) {
            deleteServer(event);
        } else {
            showServer(event.target.dataset.id);
        }
    });
    cancelButton.addEventListener("click", cancelForm);
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("searchForm submitted");
        renderServerList();
    });

    // Render the initial server list
    renderServerList();
}

init();