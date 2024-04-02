function colormain(idname:string){
    let oImg = document.getElementById(idname) as HTMLCanvasElement;
    oImg.addEventListener("load" , function () {
    const w = this.width;
    const h = this.height;
    // 创建画布
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    // 绘制图片在画布上
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.drawImage(this, 0, 0);

    let pxArr0 = context.getImageData(0, 0, w, h).data;
    let pxArr = Array.from(pxArr0);
    type stringKey = Record<string, number>
    const colorList:stringKey = {} 
    let i = 0;
    while (i < pxArr.length) {
    const r = pxArr[i];
    const g = pxArr[i + 1];
    const b = pxArr[i + 2];
    const a = pxArr[i + 3];
    i = i + 4; 
    const key = [r,g,b,a].join(',')
    key in colorList ? ++colorList[key] : (colorList[key] = 1)
    }

    let arr = [];
    for(let key in colorList){
    arr.push({
        rgba: `rgba(${key})`,
        num: colorList[key]
    })}
    arr = arr.sort((a,b) => b.num - a.num)
    })  
}