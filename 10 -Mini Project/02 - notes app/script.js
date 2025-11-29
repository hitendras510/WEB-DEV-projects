const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

// Load notes from localStorage
function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes") || "";
}
showNotes();

// Update localStorage
function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

// Create new note
createBtn.addEventListener("click", () => {
  let note = document.createElement("div");
  note.className = "input-box";

  let inputBox = document.createElement("p");
  inputBox.setAttribute("contenteditable", "true");

  let img = document.createElement("img");
  img.src = "notes-app-img/images/delete.png";

  note.appendChild(inputBox);
  note.appendChild(img);

  notesContainer.appendChild(note);
  updateStorage();
});

// Delete + update whenever user types
notesContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  }
});

// Detect typing in notes
notesContainer.addEventListener("keyup", () => {
  updateStorage();
});
