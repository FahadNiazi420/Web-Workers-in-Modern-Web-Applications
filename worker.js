function applyFilter(imageData) {
    const { data, width, height } = imageData;
    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        const grayscale = 0.3 * red + 0.59 * green + 0.11 * blue;
        data[i] = data[i + 1] = data[i + 2] = grayscale;
    }
    return imageData;
}

self.onmessage = function (event) {
    var imageData = event.data;
    var modifiedImageData = applyFilter(imageData);
    self.postMessage(modifiedImageData);
};
