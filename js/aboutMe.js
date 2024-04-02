const openTab = (event, tabName) => {
  let tabContents, tabLinks;

  tabContents = document.getElementsByClassName("tab-content");

  for (let index = 0; index < tabContents.length; index++) {
    tabContents[index].style.display = "none";
  }

  tabLinks = document.getElementsByClassName("tab");

  for (let index = 0; index < tabLinks.length; index++) {
    tabLinks[index].className = tabLinks[index].className.replace(
      " tab-active",
      ""
    );
  }

  document.getElementById(tabName).style.display = "block";

  event.currentTarget.className += " tab-active";
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".tab").click();
});
