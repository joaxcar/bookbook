<template>
  <div id="scanner-wrapper">
    <div id="interactive" class="viewport">
      <v-overlay absolute>
        <div class="overlay">
          <v-icon align="center" size="70">mdi-barcode-scan</v-icon>
        </div>
      </v-overlay>
    </div>
  </div>
</template>

<script>
import Quagga from "quagga";

export default {
  props: {
    isScanning: Boolean
  },
  data: function() {
    return {
      readerSize: {
        width: innerWidth,
        height: innerHeight
      },
      quaggaState: {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#interactive"),
          constraints: {
            width: innerWidth,
            height: innerHeight,
            facingMode: "environment"
          }
        },
        decoder: {
          readers: ["ean_reader"],
          debug: {
            drawBoundingBox: true,
            drawScanLine: true
          }
        },
        locate: true,
        locator: {
          halfSample: true,
          patchSize: "large"
        }
      }
    };
  },
  methods: {
    startScan() {
      let self = this;
      Quagga.init(this.quaggaState, function(err) {
        if (err) {
          window.console.log(err);
          return;
        }
        window.console.log("init complete");
        Quagga.start();
        Quagga.onDetected(
          function(result) {
            if (result) {
              window.console.log(result.codeResult.code);
              window.console.log(self);
              let isbn = result.codeResult.code;
              if (isbn.startsWith("978")) {
                self.$emit("search", isbn);
              }
            }
          }.bind(this)
        );
      });
    },
    stopScan() {
      Quagga.stop();
    }
  },
  watch: {
    isScanning: function() {
      window.console.log(this.isScanning);
      this.isScanning === false ? this.stopScan() : this.startScan();
    }
  }
};
</script>

<style scoped>
.v-overlay {
  position: relative;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  text-transform: uppercase;
  font-weight: bold;
}

.overlay {
  position: absolute;
  background-color: white;
  opacity: 0.8;
  margin-top: 2em;
  margin-left: -2em;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
}
</style>
