<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <div v-if="error" class="alert alert-danger red--text">
              {{ error }}
            </div>
            <form>
              <label for="email" class="col-md-4 col-form-label text-md-right"
                >Email</label
              >

              <v-text-field
                id="email"
                type="email"
                class="form-control"
                name="email"
                value
                required
                autofocus
                @keydown.enter="submit"
                v-model="form.email"
              />

              <label
                for="password"
                class="col-md-4 col-form-label text-md-right"
                >Password</label
              >

              <v-text-field
                id="password"
                :type="showPass ? 'text' : 'password'"
                class="form-control"
                name="password"
                required
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                hint="At least 8 characters"
                counter
                @click:append="showPass = !showPass"
                @keydown.enter="submit"
                v-model="form.password"
              />

              <v-btn @click="submit" class="btn btn-primary">Login</v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import firebase from "firebase";

export default {
  data() {
    return {
      showPass: false,
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.$router.replace({ name: "Search" });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>
