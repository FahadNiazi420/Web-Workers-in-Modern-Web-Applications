document.addEventListener('DOMContentLoaded', function () {
    var originalCanvas = document.getElementById('originalCanvas');
    var filteredCanvas = document.getElementById('filteredCanvas');
    var applyFilterButton = document.getElementById('applyFilterButton');

    document.getElementById('fileInput').addEventListener('change', function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();
            img.onload = function () {
                var ctxOriginal = originalCanvas.getContext('2d');
                ctxOriginal.drawImage(img, 0, 0, originalCanvas.width, originalCanvas.height);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    applyFilterButton.addEventListener('click', function () {
        var imageData = originalCanvas.getContext('2d').getImageData(0, 0, originalCanvas.width, originalCanvas.height);
        var worker = new Worker('worker.js');
        worker.postMessage(imageData);
        worker.onmessage = function (event) {
            filteredCanvas.getContext('2d').putImageData(event.data, 0, 0);
        };
    });
});
