let context = canvas.getContext("2d");

if (currentTheme == "dark") {
  //dark mode
  gradient = context.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, "black");
  gradient.addColorStop(1, "darkred");
} else if (currentTheme == "light") {
  // light Mode
  gradient = context.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, "white");
  gradient.addColorStop(1, "lightblue");
}

context.fillStyle = gradient;
context.fillRect(0, 0, canvas.width, canvas.height);
