<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Login form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field label="Login" name="login" prepend-icon="fas fa-user" type="text" v-model="username" @keypress.enter.prevent="submit" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="submit">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    username: ""
  }),
  methods: {
    submit() {
      axios.post("/api/players/add", { name: this.username }).then(() => {
        this.$store.commit("login", this.username);
        this.$router.push("/");
      });
    }
  }
});
</script>
