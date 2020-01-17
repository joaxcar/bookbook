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
    group(func) {
      let times = new Map();
      return isbns => {
        if (isbns) {
          let isbn = isbns.codeResult.code;
          if (!times.get(isbn)) {
            times.set(isbn, { val: 1 });
          } else if (times.get(isbn).val > 10) {
            func(isbns);
          } else {
            times.get(isbn).val++;
          }
        }
      };
    },
    startScan() {
      let self = this;
      Quagga.init(this.quaggaState, function(err) {
        if (err) {
          window.console.log(err);
          return;
        }
        Quagga.start();
        Quagga.onDetected(
          self
            .group(
              function(result) {
                if (result) {
                  let isbn = result.codeResult.code;
                  self.$emit("search", isbn);
                  // self.stopScan();
                }
              }.bind(this)
            )
            .bind(self)
        );
      });
    },
    stopScan() {
      if (this.isScanning) {
        Quagga.stop();
      }
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
