"use strict";

const readNoteAnchors = document.querySelectorAll(".read-note-anchor");
const editAnchors = document.querySelectorAll(".edit-anchor");

readNoteAnchors.forEach((readNoteAnchor) => {
  readNoteAnchor.addEventListener("click", (e) => {
    getOneNote(e.target.dataset.id, "read");
    // set other components display to none
    document.querySelector(".home-wrapper").classList.add("hide");
    document.querySelector(".single-note-wrapper").classList.remove("hide");
    document.querySelector(".single-note-wrapper").classList.add("d-flex");
  });
});

document.querySelector(".print-button").addEventListener("click", () => {
  print();
});

editAnchors.forEach((editAnchor) => {
  editAnchor.addEventListener("click", (e) => {
    getOneNote(e.target.dataset.id, "edit");
  });
});

const getOneNote = (id, location) => {
  fetch(`/notes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/app",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonRes) => {
      if (location === "read") {
        document.querySelector(".single-note-topic").innerText =
          jsonRes.note["note_topic"];
        document.querySelector(".single-note-body").innerText =
          jsonRes.note["note_body"];
      } else if (location === "edit") {
        document.querySelector(".note-title").value =
          jsonRes.note["note_topic"];
        document.querySelector(".note-body").value = jsonRes.note["note_body"];
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
