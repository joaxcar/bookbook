<template>
  <section>
    <v-row>
      <v-col align="center">
        <h1>About us</h1>

        <v-card v-for="part in info" :key="part.title">
          <v-card-title>
            {{ part.title }}
          </v-card-title>
          <v-card-text>
            {{ part.content }}
          </v-card-text>
        </v-card>

        <v-card class="elevation-0 transparent">
          <v-card-title primary-title class="layout justify-center">
            <div class="headline">Group info</div>
          </v-card-title>
          <v-card-text>
            We are a group of students doing this for the first time. Dont
            expect greatnes!
          </v-card-text>
        </v-card>
        <v-card class="elevation-0 transparent">
          <v-card-title primary-title class="layout justify-center">
            <div class="headline">Project code</div>
          </v-card-title>
          <v-card-text>
            Project source code can be found at
            <a href="https://github.com/joaxcar/bookbook">GitHub</a>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  data: function() {
    return {
      info: [
        {
          title: "Group info",
          content: `We are a group of students doing this for the first time. Dont
            expect greatnes!`
        },
        {
          title: "Project code",
          content: `Project source code can be found at
            <a href="https://github.com/joaxcar/bookbook">GitHub</a>`
        }
      ]
    };
  }
};
</script>
