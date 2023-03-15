"use stric";

const readNoteBlock = document.querySelector(".single-note-body");
const tools = document.querySelectorAll(".tool");

tools.forEach((tool) => {
  tool.addEventListener("click", () => {
    switch (tool.classList[1]) {
      case "increaseFont":
        increaseFontSize(1);
        break;
      case "decreaseFont":
        decreaseFontSize(1);
        break;
      case "changeColor":
        changeTextColor("blue");
        break;
      case "textAlignJustify":
        justifyText();
        break;
      case "textAlignCenter":
        centerText();
        break;
      case "boldText":
        boldText();
        break;
      default:
        // alert("Invalid Tool");
        break;
    }
  });
});

const increaseFontSize = (v) => {
  if (readNoteBlock.style.fontSize == "") {
    readNoteBlock.style.fontSize = "16px";
    }
    
     if (parseInt(readNoteBlock.style.fontSize.slice(0, -2)) > 92) {
       return;
    }
    
  readNoteBlock.style.fontSize =
    parseInt(readNoteBlock.style.fontSize.slice(0, -2)) + v + "px";
};

const decreaseFontSize = (v) => {
  if (readNoteBlock.style.fontSize == "") {
    readNoteBlock.style.fontSize = "16px";
  }

  if (parseInt(readNoteBlock.style.fontSize.slice(0, -2)) < 10) {
    return;
  }

  readNoteBlock.style.fontSize =
    parseInt(readNoteBlock.style.fontSize.slice(0, -2)) - v + "px";
};

const changeTextColor = (v) => {
  readNoteBlock.style.color = v;
};

const justifyText = () => {
  readNoteBlock.style.textAlign = "justify";
};

const centerText = () => {
  readNoteBlock.style.textAlign = "center";
};

const boldText = () => {
  if (readNoteBlock.style.fontWeight == "bold") {
    readNoteBlock.style.fontWeight = "normal";
  } else {
    readNoteBlock.style.fontWeight = "bold";
  }
};
