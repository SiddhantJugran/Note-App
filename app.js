let button = document.querySelector("button");

const loadNotes= () => {
  console.log("loadNotes function called");
  let storage = document.querySelector(".storage");
  storage.innerHTML="";
  let notesList = JSON.parse(localStorage.getItem("notes"));
  notesList.forEach((val) => {
    let noteItem=createNoteItem(val);
    let deleteIcon=createIcon("delete","bx","bxs-trash");
    let editIcon=createIcon("edit","bx","bxs-edit-alt");
    noteItem.prepend(deleteIcon);
    noteItem.prepend(editIcon);
    noteItem.addEventListener("mouseenter", () => {
    deleteIcon.style.visibility = "initial";
    editIcon.style.visibility="initial";

  })
    noteItem.addEventListener("mouseleave", () => {
    deleteIcon.style.visibility = "hidden";
    editIcon.style.visibility = "hidden";

  })
    storage.append(noteItem);
  })
  
}
const createNoteItem=(val)=>{
    let div=document.createElement("div");
    div.innerText = val;
    div.style.color = "white";
    div.classList.add("item");
    return div;
}

const createIcon=(type,iconClass1,iconClass2)=>{
    let icon=document.createElement("i");
    icon.classList.add(iconClass1,iconClass2);
    icon.style.visibility = "hidden";
    icon.style.position="sticky";
    icon.style.top="0";
    icon.style.margin = type=="delete" ? "0 0 0 5%" : "0 0 0 80%";
    let handler= type=="delete" ? handleDelete: handleEdit;
    icon.addEventListener("click",handler);
    return icon;
}
const handleDelete=(event)=>{
      console.log(event.target);
      let notesList= JSON.parse(localStorage.getItem("notes"));
      let index=notesList.indexOf(event.target.parentElement.innerText);
      notesList.splice(index,1);
      localStorage.setItem("notes",JSON.stringify(notesList));
      event.target.parentElement.remove();
}
const handleEdit=(event)=>{
  // FUNCTION TO EDIT NOTES. 
}

button.addEventListener('click', () => {
  console.log("called");
  let textarea = document.createElement("textarea");
  document.body.append(textarea);
  textarea.classList.add("note")
  let save = createButton("Save")
  let discard = createButton("Discard");
  document.body.prepend(save);
  document.body.prepend(discard);

})
const createButton=(type)=>{
  let button=document.createElement("button");
  button.innerText = type;
  type=="Discard" ? button.classList.add("discard") : button.classList.add("discard","save"); 
  let handler=type=="Discard" ? discardHandler : saveHandler; 
  button.addEventListener("click",handler);
  return button;
}

const discardHandler=(event)=>{
    removeTextareaElements();
}
const saveHandler=(event)=>{
  let text=document.querySelector("textarea").value;
    removeTextareaElements();
    saveNoteToLocalStorage(text);
}
const saveNoteToLocalStorage = (text) => {
  let notesList = [];
  let result = localStorage.getItem("notes");
  if (result != null) notesList = JSON.parse(result);
  notesList.push(text)
  localStorage.setItem("notes", JSON.stringify(notesList));
  loadNotes();
}
const removeTextareaElements=()=>{
  let textarea=document.querySelector("textarea");
  let saveButton=document.querySelector(".save");
  let discardButton=document.querySelector(".discard");
  textarea.remove();
  saveButton.remove();
  discardButton.remove(); 
}

loadNotes();

