<template>
  <div id="interactive" class="viewport">
    <v-overlay z-index="2">
      <div class="overlay">
        <v-icon align="center" size="70">mdi-barcode-scan</v-icon>
      </div>
    </v-overlay>
  </div>
</template>

<script>
import Quagga from "quagga";
import ISBN from "isbn-verify";

export default {
  props: {
    isScanning: Boolean
  },
  mounted() {
    if (this.isScanning) {
      this.startScan();
    }
  },
  deactivated() {
    this.stopScan();
  },
  data: function() {
    return {
      frequency: 2,
      numOfWorkers: 1,
      readerSize: {
        width: innerWidth,
        height: innerHeight
      },
      quaggaState: {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: innerWidth,
            height: innerHeight,
            facingMode: "environment"
          }
        },
        decoder: {
          readers: ["ean_reader"]
        },
        locate: true,
        locator: {
          halfSample: true,
          patchSize: "medium"
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
              let isbn = result.codeResult.code;
              if (ISBN.Verify(isbn)) {
                window.console.log(result.codeResult.code);
                self.$emit("search", isbn);
                // self.stopScan();
              }
            }
          }.bind(this)
        );
      });
    },
    stopScan() {
      window.console.log("av");
      Quagga.stop();
    }
  },
  watch: {
    isScanning: function() {
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
