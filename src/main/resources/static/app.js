const serverForm = document.getElementById("server-form");
const serversTable = document.getElementById("servers-table");
const cancelButton = document.getElementById("cancel-button");
const addServerButton = document.getElementById("add-server-button");
let editingServer = null;

// Event listener for adding/editing a server
serverForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const id = document.getElementById("id").value;
    const language = document.getElementById("language").value;
    const framework = document.getElementById("framework").value;

    if (editingServer) {
        // Updating an existing server
        fetch(`/servers/${editingServer}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                id: id,
                language: language,
                framework: framework
            })
        })
            .then(response => response.json())
            .then(data => {
                editingServer = null;
                clearForm();
                updateTable();
            })
            .catch(error => console.error(error));
    } else {
        // Adding a new server
        fetch("/servers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                id: id,
                language: language,
                framework: framework
            })
        })
            .then(response => response.json())
            .then(data => {
                clearForm();
                updateTable();
            })
            .catch(error => console.error(error));
    }
});

// Event listener for cancel button
cancelButton.addEventListener("click", function() {
    clearForm();
    editingServer = null;
});

// Event listener for edit button
serversTable.addEventListener("click", function(event) {
    if (event.target.classList.contains("edit-button")) {
        const serverId = event.target.parentElement.parentElement.dataset.id;
        fetch(`/servers/${serverId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("name").value = data.name;
                document.getElementById("id").value = data.id;
                document.getElementById("language").value = data.language;
                document.getElementById("framework").value = data.framework;
                document.getElementById("form-title").textContent = "Edit Server";
                document.getElementById("server-id").value = data._id;
                editingServer = data._id;
            })
            .catch(error => console.error(error));
    }
});

// Event listener for delete button
serversTable.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-button")) {
        const serverId = event.target.parentElement.parentElement.dataset.id;
        fetch(`/servers/${serverId}`, {
            method: "DELETE"
        })
            .then(response => response.text())
            .then(data => updateTable())
            .catch(error => console.error(error));
    }
});

// Event listener for add server button
addServerButton.addEventListener("click", function() {
    clearForm();
    editingServer = null;
});

// Function to clear the form
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("id").value = "";
    document.getElementById("language").value = "";
    document.getElementById("framework").value = "";
    document.getElementById("form-title").textContent = "Add Server";
    document.getElementById("server-id").value = "";
}

// Function to update the table with server data
function updateTable() {
    fetch("/servers")
        .then(response => response.json())
        .then(data => {
            const tbody = serversTable.querySelector("tbody");
            tbody.innerHTML = "";
            for (const server of data) {
                const tr = document.createElement("tr");
                tr.dataset.id = server._id;
                tr.innerHTML = `
			<td>${server.name}</td>
			<td>${server.id}</td>
			<td>${server.language}</td>
			<td>${server.framework}</td>
			<td>
				<button class="edit-button">Edit</button>
				<button class="delete-button">Delete</button>
			</td>
			`;
                tbody.appendChild(tr);
            }
        })
        .catch(error => console.error(error));
}

// Call updateTable on page load
updateTable();