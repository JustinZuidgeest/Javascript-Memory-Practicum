<template>
  <div class="logout">

  </div>
</template>

<script>

export default {
  name: 'logout',
  created() {
    this.$store.dispatch('unsetToken')
    .then(response => {
      this.$router.push({path: '/'})
    })
    .catch(error => {
      this.$router.push({path: '/'})
    })
  }
}
</script>

<style scoped>

</style>
