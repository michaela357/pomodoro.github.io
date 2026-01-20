const toggleSwitch = document.getElementById('toggleCheckbox');
const body = document.body;
const word = document.getElementById("light-dark-indicator")

function sendAlert() {
    body.classList.toggle('dark-mode', toggleSwitch.checked)
    if (toggleSwitch.checked) {
        console.log('light mode enabled!');
        word.textContent = "Enable Dark Mode!";
    } else {
        console.log('dark mode enabled!');
        word.textContent = "Enable Light Mode!";
    }}

toggleSwitch.addEventListener('change', sendAlert);