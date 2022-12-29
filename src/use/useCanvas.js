import { ref, computed } from "vue";
import { fabric } from 'fabric';
import { storeToRefs } from 'pinia';
import { useCommonStore } from '../store';
import * as pdfjsLib from "pdfjs-dist";
export default(canvasDom) =>{
  let canvasCore = null;
  const { signImage, fileData, base64Prefix } = storeToRefs(useCommonStore());
  const nowPage = ref(1); 
  const totalPages = ref(1);

  async function initCanvas(){
    canvasCore = new fabric.Canvas(canvasDom.value);
    canvasCore.requestRenderAll();
    const pdfData = await printPDF();
    console.log("pdfData", pdfData);
    const pdfImage = await pdfToImage(pdfData);

    // 透過比例設定 canvas 尺寸
    canvasCore.setWidth(pdfImage.width / window.devicePixelRatio);
    canvasCore.setHeight(pdfImage.height / window.devicePixelRatio);

    // 將 PDF 畫面設定為背景
    canvasCore.setBackgroundImage(pdfImage, canvasCore.renderAll.bind(canvasCore));
  }
  async function printPDF(orderPage){
    pdfjsLib.GlobalWorkerOptions.workerSrc = await import('pdfjs-dist/build/pdf.worker.entry')
    // 將 base64 中的前綴刪去，並進行解碼
    const data = atob(fileData.value.substring(base64Prefix.value.length));
  
    // 利用解碼的檔案，載入 PDF 檔及第一頁
    const pdfDoc = await pdfjsLib.getDocument({ data }).promise;
    const pdfPage = await pdfDoc.getPage(nowPage.value);
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
    initCanvas();
  }
  function signToCanvas(){
    if(!signImage.value) return;
    fabric.Image.fromURL(signImage.value, (image)=>{
      image.top = 400;
      image.scaleX = 0.5;
      image.scaleY = 0.5;
      console.log("aaa", canvasCore, canvasDom.value);
      canvasCore.add(image);
    })
  }

  return {
    initCanvas,
    signToCanvas,
    goPage,
    nowPage,
    totalPages
  }
}