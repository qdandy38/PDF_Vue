import { ref, computed } from "vue";
import { fabric } from 'fabric';
import { storeToRefs } from 'pinia';
import { useCommonStore } from '../store';
import * as pdfjsLib from "pdfjs-dist";
export default(canvasDom) =>{
  const { signImage, fileData, base64Prefix } = storeToRefs(useCommonStore());
  const nowPage = ref(1); 
  const totalPages = ref(1);
  let allCanvas = [];

  async function initCanvas(order){
    // canvasCore = new fabric.Canvas(canvasDom.value);
    let canvasCore = new fabric.Canvas(`canvasPDF_${order+1}`);
    storeInAllCanvas(canvasCore, order); // 存進所有canvas陣列中

    const target = allCanvas[order];
    if(target.getObjects()){
      target.remove(...target.getObjects());
    }
    target.requestRenderAll();
    // canvasCore.requestRenderAll();
    const pdfData = await printPDF(order+1);
    console.log("pdfData", pdfData);
    const pdfImage = await pdfToImage(pdfData);

    // 透過比例設定 canvas 尺寸
    target.setWidth(pdfImage.width / window.devicePixelRatio);
    target.setHeight(pdfImage.height / window.devicePixelRatio);

    // 將 PDF 畫面設定為背景
    target.setBackgroundImage(pdfImage, target.renderAll.bind(target));
    
    console.log("pageState", order, totalPages.value);
    if(order+1 < totalPages.value){
      // nowPage.value++;
      initCanvas(order+1);
    }
  }
  async function printPDF(targetPage){
    pdfjsLib.GlobalWorkerOptions.workerSrc = await import('pdfjs-dist/build/pdf.worker.entry')
    // 將 base64 中的前綴刪去，並進行解碼
    const data = atob(fileData.value.substring(base64Prefix.value.length));
  
    // 利用解碼的檔案，載入 PDF 檔及第一頁
    const pdfDoc = await pdfjsLib.getDocument({ data }).promise;
    const pdfPage = await pdfDoc.getPage(targetPage);
    totalPages.value = pdfDoc.numPages;
    console.log("pdfDoc", pdfDoc, pdfPage, pdfDoc.numPages);
  
    // 設定尺寸及產生 canvas
    const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
  
    // 設定 PDF 所要顯示的寬高及渲染
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderContext = {
      canvasContext: context,
      viewport,
    };
    const renderTask = pdfPage.render(renderContext);
    // 回傳做好的 PDF canvas
    return renderTask.promise.then(() => canvas);
  }
  async function pdfToImage(pdfData){
    // 設定 PDF 轉為圖片時的比例
    const scale = 1 / window.devicePixelRatio;
  
    // 回傳圖片
    return new fabric.Image(pdfData, {
      id: "renderPDF",
      scaleX: scale,
      scaleY: scale,
    });
  }
  function goPage(targetPage){
    if(targetPage<1 || targetPage > totalPages.value) return;
    nowPage.value = targetPage;
    console.log("nowPage", nowPage.value);
    // initCanvas();
  }
  function signToCanvas(){
    if(!signImage.value) return;
    fabric.Image.fromURL(signImage.value, (image)=>{
      image.top = 400;
      image.scaleX = 0.5;
      image.scaleY = 0.5;
      allCanvas[nowPage.value-1].add(image);
    })
  }

  function storeInAllCanvas(canvasObj, order){
    const temp = [...allCanvas];
    temp[order] = canvasObj;
    allCanvas = temp;
  }

  return {
    initCanvas,
    signToCanvas,
    goPage,
    nowPage,
    totalPages
  }
}