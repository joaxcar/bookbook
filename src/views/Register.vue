<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Register</v-card-title>
          <v-card-text>
            <div v-if="error" class="alert alert-danger red--text">
              {{ error }}
            </div>
            <form @keydown.enter="submit">
              <label for="name" class="col-md-4 col-form-label text-md-right">
                Name</label
              >

              <v-text-field
                id="name"
                type="name"
                class="form-control"
                name="name"
                value
                :rules="[rules.required]"
                required
                autofocus
                v-model="form.name"
              />

              <label for="email" class="col-md-4 col-form-label text-md-right">
                Email</label
              >

              <v-text-field
                id="email"
                type="email"
                class="form-control"
                name="email"
                :rules="[rules.required]"
                value
                required
                v-model="form.email"
              />

              <label
                for="password"
                class="col-md-4 col-form-label text-md-right"
              >
                Password
              </label>

              <v-text-field
                id="password"
                :type="showPass ? 'text' : 'password'"
                class="form-control"
                name="password"
                required
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                hint="At least 8 characters"
                counter
                @click:append="showPass = !showPass"
                v-model="form.password"
              />

              <v-btn @click="submit" color="primary" class="btn btn-primary"
                >Register</v-btn
              >
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
import fs from "@/data/fs";

export default {
  data() {
    return {
      showPass: false,
      form: {
        name: "",
        email: "",
        password: ""
      },
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      },
      error: null
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.form.name
            })
            .then(() => {
              // add user to firestore
              fs.addUser();
              // user is signed in on account creation goto straight to search
              this.$router.replace("/search");
              // reload to force vue to render username in menu
              //location.reload();
            });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>
