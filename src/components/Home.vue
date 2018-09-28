<template>
    <div>
        <h1>主页</h1>
        <div id="qrcode">

        </div>
    </div>
</template>
<script>
import QRcode from "qrcodejs2";
export default {
  methods: {
    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 100,
        height: 100, // 高度
        text: "56663159" // 二维码内容
        // render: 'canvas'
        // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      });
      console.log(qrcode);
    }
  },
  mounted() {
    this.qrcode();
  }
};
</script>
