<template>
  <nav>
    <router-link to="/">ModalView</router-link> |
    <router-link to="/i18n">i18nView</router-link> | 
    <router-link to="/date">DatepickView</router-link> |
    <router-link to="/loading">LoadingView</router-link> |
    <router-link to="/keyfeature">KeyFeature</router-link> | 
    <router-link to="/vuelidate">Vuelidate</router-link> | 
    <router-link to="/routerview">RouterView</router-link> |
    <router-link to="/tip">TipView</router-link> |
    <router-link to="/toast">ToastView</router-link> 
  </nav>
  <router-view />

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
