const editButton = document.getElementById("name-edit");
const editableName = document.getElementById("editable-name");

function editName() {
    // 2. Make the span editable and focus on it
    editButton.contentEditable = "true";
    editButton.focus();
    
    // 3. Set up a listener to handle saving the time (when 'click' is pressed)
    editButton.addEventListener('click', handleInput);
}

function handleInput() {
    editButton.removeEventListener('click', handleInput);
    
    // 2. Get the new time string (e.g., "00:15:30")
    let newName = editableName.textContent;
    

    editableName.textContent = newName;
    // 5. Restore display properties and button states
    editableName.contentEditable = "false";
}

editButton.addEventListener("click", editName)