document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".link");
  links.forEach((link) => {
    link.setAttribute("target", "_blank");
  });
  console.log("DOM fully loaded and parsed");
});
