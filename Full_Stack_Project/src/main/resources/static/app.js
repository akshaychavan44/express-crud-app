const API_URL = "http://localhost:8091/api/notes";

async function fetchNotes() {

    try {

        const response = await fetch(API_URL);

        const notes = await response.json();

        displayNotes(notes);

    } catch (error) {

        console.error("Error fetching notes:", error);
    }
}

function displayNotes(notes) {

    const container = document.getElementById("notesContainer");

    if (!container) return;

    if (notes.length === 0) {

        container.innerHTML = "<h3>No Notes Found</h3>";
        return;
    }

    container.innerHTML = notes.map(note => `

        <div class="note-card">

            <h3>${note.title}</h3>

            <p>${note.content.substring(0,100)}</p>

            <small>
                Updated:
                ${note.updatedAt || ""}
            </small>

            <div class="actions">

                <button class="view-btn"
                    onclick="viewNote('${note.id}')">
                    View
                </button>

                <button class="edit-btn"
                    onclick="editNote(
                        '${note.id}',
                        '${note.title}',
                        \`${note.content}\`
                    )">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteNote('${note.id}')">
                    Delete
                </button>

            </div>

        </div>

    `).join("");
}

async function saveNote() {

    try {

        const id =
            document.getElementById("noteId").value;

        const title =
            document.getElementById("title").value.trim();

        const content =
            document.getElementById("content").value.trim();

        if (title === "") {

            alert("Title cannot be empty");
            return;
        }

        const note = {
            title,
            content
        };

        let response;

        if (id) {

            response = await fetch(`${API_URL}/${id}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(note)
            });

        } else {

            response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(note)
            });
        }

        await response.json();

        window.location.href = "notes.html";

    } catch (error) {

        console.error("Error saving note:", error);
    }
}

function editNote(id, title, content) {

    localStorage.setItem("noteId", id);
    localStorage.setItem("title", title);
    localStorage.setItem("content", content);

    window.location.href = "index.html";
}

async function deleteNote(id) {

    const confirmDelete =
        confirm("Delete this note?");

    if (!confirmDelete) return;

    try {

        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        fetchNotes();

    } catch (error) {

        console.error("Error deleting note:", error);
    }
}

async function searchNotes() {

    try {

        const keyword =
            document.getElementById("searchInput").value;

        if (keyword.trim() === "") {

            fetchNotes();
            return;
        }

        const response = await fetch(
            `${API_URL}/search?q=${keyword}`
        );

        const notes = await response.json();

        displayNotes(notes);

    } catch (error) {

        console.error("Error searching notes:", error);
    }
}

function viewNote(id) {

    localStorage.setItem("viewNoteId", id);

    window.location.href = "view-note.html";
}

async function loadSingleNote() {

    const id =
        localStorage.getItem("viewNoteId");

    if (!id) return;

    try {

        const response =
            await fetch(`${API_URL}/${id}`);

        const note = await response.json();

        const container =
            document.getElementById("singleNote");

        if (!container) return;

        container.innerHTML = `

            <h2>${note.title}</h2>

            <p>${note.content}</p>

            <br>

            <small>
                Created:
                ${note.createdAt || ""}
            </small>

            <br><br>

            <a href="notes.html">
                <button>
                    Back
                </button>
            </a>
        `;

    } catch (error) {

        console.error("Error loading note:", error);
    }
}

window.onload = function () {

    const noteIdField =
        document.getElementById("noteId");

    if (noteIdField) {

        document.getElementById("noteId").value =
            localStorage.getItem("noteId") || "";

        document.getElementById("title").value =
            localStorage.getItem("title") || "";

        document.getElementById("content").value =
            localStorage.getItem("content") || "";

        localStorage.removeItem("noteId");
        localStorage.removeItem("title");
        localStorage.removeItem("content");
    }

    fetchNotes();

    loadSingleNote();
};