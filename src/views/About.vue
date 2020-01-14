<template>
  <v-container>
    <v-col cols="12">
      <v-card color="blue darken-2" dark>
        <v-card-title class="headline">About us</v-card-title>

        <v-card-text class="font-regular">
          Bookbook is made by John Augustsson, Johan Carlsson and Patrik Sjöfors
          as part of KTH (Royal Institute of Technology) course
          DH2642.</v-card-text
        >

        <v-btn
          text
          href="https://www.kth.se/student/kurser/kurs/DH2642?l=en"
          target="_blank"
          >VISIT COURSE PAGE<v-icon small class="ml-2"
            >mdi-open-in-new</v-icon
          ></v-btn
        >
        <v-btn text href="https://github.com/joaxcar/bookbook" target="_blank"
          >VIEW SOURCE CODE ON GITHUB<v-icon small class="ml-2"
            >mdi-open-in-new</v-icon
          ></v-btn
        >
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card color="blue darken-2" dark>
        <v-card-title class="headline">Technologies used</v-card-title>
        <ul style="list-style-type: none">
          <li>
            <v-btn text href="https://vuejs.org/" target="_blank"
              ><v-icon small class="mr-2">mdi-image-frame</v-icon>Vue.js</v-btn
            >
          </li>
          <li>
            <v-btn text href="https://vuetifyjs.com/en/" target="_blank">
              <v-icon small class="mr-2">mdi-video-input-component</v-icon
              >Vuetify</v-btn
            >
          </li>
          <li>
            <v-btn text href="https://firebase.google.com/" target="_blank"
              ><v-icon small class="mr-2">mdi-database</v-icon>Firebase</v-btn
            >
          </li>
          <li>
            <v-btn
              text
              href="https://serratus.github.io/quaggaJS/"
              target="_blank"
            >
              <v-icon small class="mr-2">mdi-barcode-scan</v-icon
              >QuaggaJS</v-btn
            >
          </li>
          <li>
            <v-btn
              text
              href="https://developers.google.com/books"
              target="_blank"
              ><v-icon small class="mr-2">mdi-magnify</v-icon>Google Books
              API</v-btn
            >
          </li>
        </ul>
      </v-card>
    </v-col>
  </v-container>
</template>

<script></script>
<style scoped>
li {
  margin-left: -1em;
}
</style>
