function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    updateCameraValue(90); // update de càmera per a correcta posició de prisme
    document.getElementById("rangeSelector").value = "90"; // update del range input per a que cuadri
    ev.dataTransfer.setData("text", ev.target.id);
    drawScene(); // actualitza el camera selector value tant aviat com pot per a que l'usuari sàpiga a on posar-ho
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));

    prismX = event.clientX - canvasmiddleX + 10;
    prismY = (- (event.clientY - canvasmiddleY)) - 25;
    var coor = "CanvasmiddleX: " + canvasmiddleX + " CanvasmiddleY: " + canvasmiddleY + " X coords: " + prismX + ", Y coords: " + prismY;
    drawPrism = true;
    drawScene();
}