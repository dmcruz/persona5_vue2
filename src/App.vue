<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Persona 5 Royal Compendium</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
body {
  background-color: black !important;
  color: white !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #e13026;
  font-size: 20pt;
  text-transform:uppercase;
}

#nav a.router-link-exact-active {
  color: #e13026;
}
</style>
