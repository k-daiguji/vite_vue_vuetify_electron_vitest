<script setup lang="ts">
defineProps<{ msg: string }>();

const resetPosition = async (): Promise<void> => {
  const img: HTMLImageElement = document.getElementById("my_canvas") as HTMLImageElement;
  img.style.padding = "50px 100px 50px 100px";
  imgScale = 1;
  resize();
};
let imgScale = 1
/**
 * @param time タイムアウトの秒数
 */
const resize = (): void => {
  // setTimeout((): void => {
  //   alert("output");
  // }, time * 1000);
  const img: HTMLImageElement = document.getElementById("my_canvas") as HTMLImageElement;
  if (imgScale === 1) {
    img.src = "http://placehold.jp/300x200.png"
  } else if (imgScale === 2) {
    img.src = "http://placehold.jp/600x400.png"
  } else if (imgScale === 4) {
    img.src = "http://placehold.jp/1200x800.png"
  } else {
    img.src = "http://placehold.jp/300x200.png"
    imgScale = 1;
  }
};

const zoom = (e: WheelEvent) => {
  // スクロールキャンセル
  e.preventDefault(); // Do not scroll the page

  const canvasArea: HTMLElement = document.getElementById("canvas_area");
  const img: HTMLImageElement = document.getElementById("my_canvas") as HTMLImageElement;
  const prevPaddingLeft = Number(img.style.paddingLeft.replace('px', ''));
  const prevPaddingTop = Number(img.style.paddingTop.replace('px', ''));
  const prevScrollLeft = canvasArea.scrollLeft;
  const prevScrollTop = canvasArea.scrollTop;

  // 倍率設定
  imgScale = e.deltaY < 0 ? imgScale * 2 : imgScale / 2;
  console.log("scale: ", imgScale);
  if (4 < imgScale) {
    imgScale = 4;
    return;
  } else if (imgScale < 1) {
    imgScale = 1;
    return;
  }
  img.style.padding = "0px 0px 0px 0px";
  resize();

  const mousePointerX = e.offsetX - prevPaddingLeft;
  const mousePointerY = e.offsetY - prevPaddingTop;
  const paddingLeft = prevPaddingLeft - mousePointerX;
  const paddingTop = prevPaddingTop - mousePointerY;
  const scrollLeft = paddingLeft < 0 ? -paddingLeft + prevScrollLeft : 0;
  const scrollTop = paddingTop < 0 ? -paddingTop + prevScrollTop : 0;

  img.style.paddingLeft = paddingLeft < 0 ? "0px" : `${paddingLeft}px`;
  img.style.paddingRight = `${canvasArea.clientWidth - (paddingLeft + (img.clientWidth - scrollLeft))}px`;
  canvasArea.scrollLeft = scrollLeft;
  console.log("width: ", img.style.paddingLeft, img.style.paddingRight, canvasArea.scrollLeft);
  img.style.paddingTop = paddingTop < 0 ? "0px" : `${paddingTop}px`;
  img.style.paddingBottom = `${canvasArea.clientHeight - (paddingTop + (img.clientHeight - scrollTop))}px`;
  canvasArea.scrollTop = scrollTop;
  console.log("width: ", img.style.paddingTop, img.style.paddingBottom, canvasArea.scrollTop);
}

const currentPosition = (e: MouseEvent) => {
  const img: HTMLImageElement = document.getElementById("my_canvas") as HTMLImageElement;
  const prevPaddingLeft = Number(img.style.paddingLeft.replace('px', ''));
  const prevPaddingTop = Number(img.style.paddingTop.replace('px', ''));
  console.log("click: ", e.offsetX - prevPaddingLeft, e.offsetY - prevPaddingTop)
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="card">
    <button type="button" @click="resetPosition">
      Reset Position
    </button>
  </div>
  <div class="relative">
    <div id="canvas_area" class="canvas_area">
      <div class="relative">
        <img id="my_canvas" class="canvas" src="http://placehold.jp/300x200.png" @wheel="zoom" @click="currentPosition">
      </div>
    </div>
    <div>aaa</div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.relative {
  position: relative;
}

.canvas_area {
  position: relative;
  background-color: aquamarine;
  width: 500px;
  height: 300px;
  overflow-y: auto;
}

.canvas {
  position: absolute;
}
</style>
