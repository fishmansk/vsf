<template>
  <div
    style="height: 100vh; display: flex; flex-direction: row; justify-content: center; align-items: center"
  >
    <div>
      <b-card title="Авторизация">
        <b-form>
          <b-form-group id="input-group-1" label="Username:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="username"
              type="text"
              required
              placeholder="Enter username"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-1" label="Password:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="password"
              type="password"
              required
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>
          <b-button href="#" variant="primary" style="width: 100%" @click="signin()">Войти</b-button>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Block",
  //   components: {
  //   },

  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {},
  mounted() {},
  methods: {
    signin() {
      let body = JSON.stringify({
        username: this.username,
        password: this.password
      });
      let self = this;
      fetch("http://localhost:8083/api/auth/signin", {
        method: "POST",
        body: body
      })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            localStorage.setItem('auth.token', json.token);
            this.$emit('signin');
        })
        .catch(err => {
          this.$bvToast.toast("Неправильный логин или пароль", {
            title: `Ошибка авторизации`,
            solid: true
          });
        });
    }
  }
};
</script>

<style scoped>
</style>
