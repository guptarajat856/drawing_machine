
function testImg() {
    let canvas = document.getElementById("c");

        let ctx = canvas.getContext("2d");
        
        canvas.width = 100;
        canvas.height = 100;
        let srcImg = document.getElementById("sof");
        ctx.drawImage(srcImg, 0, 0, ctx.canvas.width, ctx.canvas.height);
        let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        let pixels = imgData.data;

        return pixels;
}
