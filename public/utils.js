export function makeNotificationDiv(message) {
    let newDiv = document.createElement("div");

    newDiv.textContent = message;

    newDiv.setAttribute("id", "errorDiv");
    newDiv.style.position = "absolute";
    newDiv.style.top = "0";
    newDiv.style.left = "0";
    newDiv.style.right = "0";
    newDiv.style.padding = "10px";
    newDiv.style.backgroundColor = "#6A8DAD";
    newDiv.style.color = "white";
    newDiv.style.textAlign = "center";
    newDiv.style.zIndex = "100";
    newDiv.style.display = "block";

    document.body.appendChild(newDiv);

    setTimeout(function() {
        var element = document.getElementById("errorDiv");
        element.style.display = "none";
      }, 1000);
}
