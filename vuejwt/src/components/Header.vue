<template>
  <div id="nav">
    <div class="centered">
      <router-link to="/memory">MEMORY</router-link> |
      <router-link to="/resources">RESOURCES</router-link> |
      <router-link to="/about">ABOUT</router-link>
    </div>
    <div class="right">
      <router-link v-if="!authenticated" to="/">LOGIN</router-link>
      <router-link v-if="authenticated" to="/logout">LOGOUT</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    authenticated(){
      return this.$store.getters.authenticated;
    }
  }
}
</script>

<style scoped>
#nav {
  display: flex;
  justify-content: flex-start;
  padding: 20px 0;
  margin: 0;
  background-color: #444444;
  border-bottom: 2px solid #222222;
  margin-bottom: 10px;
}

#nav a {
  text-decoration: none;
  font-weight: bold;
  padding-left: 20px;
  padding-right: 20px;
  color: #dbdbdb;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.centered{
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.right{
  margin-left: auto;
  padding-right: 20px;
}

/* ALTERNATIVE STYLING: */
/* #nav {
    display: flex;
    list-style: none;
    padding: 20px 0;
    margin: 0;
    justify-content: flex-end;
    background-color: #444444;
    border-bottom: 1px solid #333333;
    margin-bottom: 10px;
}

#nav a {
  font-weight: bold;
  text-decoration: none;
  padding-left: 20px;
  padding-right: 20px;
  color: #dbdbdb;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
