const svg = document.getElementById("strings");

const startX = 10;
const endX = 190;

const strings = [
    { y: 0, color: "blue" },
    { y: 33, color: "red" },
    { y: 66, color: "blue" },
    { y: 99, color: "blue" },
    { y: 132, color: "blue" },
];

for (const { y, color } of strings) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", startX);
    line.setAttribute("y1", y);
    line.setAttribute("x2", endX);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", "5");
    svg.appendChild(line);
}
