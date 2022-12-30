<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCommonStore } from '../store';
const emit = defineEmits(["close", "setSign"]);
const signCanvasDom = ref(null);
const canvasSize = ref(null);
const ctx = ref(null);
const isPainting = ref(false); // 確認滑鼠/手指是否按下或在畫布範圍中
const history = ref([]); // 歷史繪圖紀錄(回上一步用)
const strokeColor = ref("black"); // 筆色

const strokeList = computed(()=>[
  {
    color: "black",
    hex: "#000"
  },
  {
    color: "blue",
    hex: "#0073EA"
  },
  {
    color: "red",
    hex: "#D83A52"
  },
]);

function initCanvas(){
  const context = signCanvasDom.value.getContext("2d");
  canvasSize.value = signCanvasDom.value.getBoundingClientRect();
  // 設定線條的相關數值
  context.lineWidth = 1;
  context.lineCap = "round";
  context.strokeStyle = "#000";
  ctx.value = context;
}

// 開始繪圖時，將狀態開啟
function startPosition(){
  isPainting.value = true;
}

// 結束繪圖時，將狀態關閉，並產生新路徑
function finishedPosition(){
  if(!isPainting.value) return;
  isPainting.value = false;
  ctx.value.beginPath();
  addHistory();
}

// 繪圖過程
function draw(e){
  // 滑鼠移動過程中，若非繪圖狀態，則跳出
  if(!isPainting.value) return;
  // 取得滑鼠/手指在畫布上的x, y軸位置位置
  const paintPosition = getPaintPosition(e);

  // 移動滑鼠位置並產生圖案
  ctx.value.lineTo(paintPosition.x, paintPosition.y);
  ctx.value.stroke();

}

function addHistory(){
  const dataUrl = signCanvasDom.value.toDataURL();
  const img = document.createElement("img");
  img.src = dataUrl;
  history.value = [...history.value, img];
}

// 取得滑鼠 / 手指在畫布上的位置
function getPaintPosition(e){
  const scaleX = signCanvasDom.value.width / canvasSize.value.width;
  const scaleY = signCanvasDom.value.height / canvasSize.value.height;
  if(e.type==="mousemove"){
    return {
      x: (e.clientX - canvasSize.value.left) * scaleX,
      y: (e.clientY - canvasSize.value.top) * scaleY,
    };
  }else{
    return {
      x: (e.touches[0].clientX - canvasSize.value.left) * scaleX,
      y: (e.touches[0].clientY - canvasSize.value.top) * scaleY,
    }
  }
}

// 重新設定畫布
function reset() {
  ctx.value.clearRect(0, 0, signCanvasDom.value.width, signCanvasDom.value.height);
}

// 回上一步
function undo(){
  reset();
  const temp = [...history.value];
  temp.splice(temp.length-1, 1);
  const latest = temp[temp.length-1];
  history.value = temp;
  if(!latest) return;
  ctx.value.drawImage(latest, 0, 0);
}

// 換筆色
function changeStrokeColor(item){
  strokeColor.value = item.color;
  ctx.value.strokeStyle = item.hex;
}

// 儲存簽名
function saveImg(){
  const newImg = signCanvasDom.value.toDataURL("image/png");
  useCommonStore().updSignImage(newImg);
  emit("setSign");
}

onMounted(()=>{
  initCanvas();
})
</script>
<template>
  <div class="popup" @click.self="emit('close')">
    <div class="popup_main">
			<Icon class="popup_main_close" name="close" @click="emit('close')" />
      <div class="popup_main_header">手寫</div>
      <div class="popup_main_body">
        <div class="undo">
          <p class="undo_btn" @click="undo">
            <Icon name="arrow_back" />
            回上一步
          </p>
        </div>
        <canvas
          ref="signCanvasDom"
          class="canvasLayout"
          @mousedown.prevent="startPosition"
          @mouseup="finishedPosition"
          @mouseleave="finishedPosition"
          @mousemove="draw"
          @touchstart.prevent="startPosition"
          @touchend="finishedPosition"
          @touchcancel="finishedPosition"
          @touchmove="draw"
        />
        <ul class="strokeList">
          <li
            v-for="(item,i) in strokeList"
            :key="i"
            :class="[item.color, {'active': strokeColor===item.color}]"
            @click="changeStrokeColor(item)"
          />
        </ul>
      </div>
      <div class="popup_main_footer">
				<button class="btn btn-secondary" @click="reset">清除</button>
				<button class="btn btn-primary confirm" @click="saveImg">儲存</button>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.popup{
  &_main{
    @apply
    w-[85%]
    md:w-[60%];
    &_body{
      @apply
      p-4;
      .canvasLayout{
        @apply
        w-full
        h-auto
        border
        border-solid
        border-gray-400;
      }
      .undo{
        @apply
        flex
        justify-end
        pb-2;
        &_btn{
          @apply
          cursor-pointer
          text-primary;
        }
      }
      .strokeList{
        @apply
        pt-2
        flex
        justify-end
        items-center;
        li{
          @apply
          w-[16px]
          h-[16px]
          rounded-[50%]
          mx-2
          cursor-pointer;
          &.active{
            @apply
            relative;
            &::after{
              @apply
              content-[""]
              absolute
              -top-1
              -left-1
              w-[24px]
              h-[24px]
              border-2
              border-solid
              rounded-[50%];
            }
          }
          &.black{
            @apply
            bg-black;
            &::after{
              @apply
              border-black;
            }
          }
          &.blue{
            @apply
            bg-general;
            &::after{
              @apply
              border-general;
            }
          }
          &.red{
            @apply
            bg-negative;
            &::after{
              @apply
              border-negative;
            }
          }
        }
      }
    }
  }
}
</style>