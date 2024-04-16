const div = document.getElementById("asd");

document.body.addEventListener("click", () => {}, { capture: true });
div.addEventListener("click", () => {}, true);
document.body.addEventListener("click", () => {}, { capture: true });
