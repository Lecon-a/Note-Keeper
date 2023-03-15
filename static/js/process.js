"use strict";

// onload
window.load = () => {
  // show home rapper
};

// get all tabs
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.onclick = (e) => {
    generalHide();
    // e.preventDefault();
    if ((e.target.innerText !== "Home") & (e.target.innerText !== "Delete")) {
      if (e.target.innerText === "Edit") {
        hideForEditOnly();
      } else if (e.target.innerText === "New") {
        hideForNewOnly();
      }

      forBothHomeAndNew(e);
    } else {
      // populate the landing page
      if (e.target.innerText === "Home") {
        forOnlyHome();
        allNotes();
      } else if (e.target.innerText === "Delete") {
        forOnlyDelete();
        allNotes();
      }
      // call to update the view with data
    }
  };
});

var note_id;

document.querySelectorAll(".edit-anchor").forEach((noteInfo) => {
  noteInfo.addEventListener("click", (e) => {
    note_id = e.target.dataset.id;
  });
});

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  // send to the endpoint
  const url = document.getElementById("form").action;
  if (url === "https://note-keeper-app-lvjd.onrender.com/notes") {
    save();
  } else {
    editNote(note_id);
  }
});

const allNotes = () => {
  fetch("https://note-keeper-app-lvjd.onrender.com//allNotes", {
    method: "get",
    headers: {
      "Content-Type": "application/app",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResult) => {
      updateView(jsonResult);
    })
    .catch((error) => {
      printError(error);
    });
};

const save = () => {
  fetch("https://note-keeper-app-lvjd.onrender.com/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      new_note_topic: document.getElementById("note-topic").value,
      new_note_body: document.getElementById("note-body").value,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonRes) => {
      successMessage("Saved!");
      resetForm();
      updateView(jsonRes);
    })
    .catch((error) => {
      printError(error);
    });
};

// Get all the delete buttons
const deleteButtons = document.querySelectorAll(".delete-btn");

deleteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const note_id = e.target.dataset.id;
    deleteNote(note_id);
    // todo remove the list item after deletion
    document.querySelector(".delete-result").classList.remove("hide");
  });
});

const deleteNote = (n_id) => {
  fetch(`https://note-keeper-app-lvjd.onrender.com/notes/${n_id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/app",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonRes) => {
      document.querySelector(".result").innerText = jsonRes["topic"];
      updateView(jsonRes);
    })
    .catch((error) => {
      printError(error);
    });
};

const editNote = (n_id) => {
  fetch(`https://note-keeper-app-lvjd.onrender.com/notes/${n_id}/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      note_topic: document.getElementById("note-topic").value,
      note_body: document.getElementById("note-body").value,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonRes) => {
      successMessage("Edited!");
      resetForm();
      // Update view
      updateView(jsonRes);
      // update ends here
    })
    .catch((error) => {
      printError(error);
    });
};

document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".delete-result").classList.add("hide");
});

const resetForm = () => {
  document.getElementById("note-topic").value = "";
  document.getElementById("note-body").value = "";
};

const updateView = (jsonResult) => {
  const data = jsonResult["data"];
  document.querySelector(".count").innerText = jsonResult["data_length"];
  // console.log(data.length);
  const parentElementList = document.querySelector(".main-list");
  // Remove element in the parentElement before appending new elements
  parentElementList.innerHTML = "";
  // loop through the result
  data.forEach((text) => {
    const createLi = document.createElement("li");
    const anchorA = document.createElement("a");
    anchorA.href = "";
    anchorA.innerText = text["topic"];
    createLi.append(anchorA);
    parentElementList.append(createLi);
  });
};

const printError = (error) => {
  alert("Error: ", error);
};

const successMessage = (success) => {
  alert(success);
};

const generalHide = () => {
  document.querySelector(".note-title").value = "";
  document.querySelector(".note-body").value = "";
  document.querySelector(".single-note-wrapper").classList.add("hide");
  document.querySelector(".single-note-wrapper").classList.remove("d-flex");
  document.querySelector(".edit-sidebar").classList.add("hide");
  document.querySelector(".edit-sidebar-2").classList.add("hide");
  document.querySelector(".new-edit-wrapper").classList.add("hide");
};

const hideForEditOnly = () => {
  document.querySelector(".edit-sidebar").classList.remove("hide");
  document.querySelector(".edit-sidebar-2").classList.remove("hide");
  document.querySelector(".form").action = "";
  document.querySelector(".form").action = "/edit";
};

const hideForNewOnly = () => {
  document.querySelector(".form").action = "";
  document.querySelector(".form").action = "/notes";
};

const forBothHomeAndNew = (e) => {
  document.querySelector(".new-edit-wrapper").classList.remove("hide");
  document.querySelector(".dynamic-title").innerText = e.target.innerText;
  document.querySelector(".form").classList.remove("hide");
  document.querySelector(".home-wrapper").classList.add("hide");
  document.querySelector(".delete-wrapper").classList.add("hide");
};

const forOnlyHome = () => {
  document.querySelector(".form").classList.add("hide");
  document.querySelector(".home-wrapper").classList.remove("hide");
  document.querySelector(".delete-wrapper").classList.add("hide");
};

const forOnlyDelete = () => {
  document.querySelector(".form").classList.add("hide");
  document.querySelector(".home-wrapper").classList.add("hide");
  document.querySelector(".delete-wrapper").classList.remove("hide");
};
