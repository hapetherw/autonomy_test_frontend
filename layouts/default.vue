<template>
  <div>
    <Nuxt />
  </div>
</template>
<script>
export default {
  data: () => ({
  }),
  computed: {
  },
  async mounted () {
    if (window.ethereum) {
      window.web3 = new this.$Web3(window.ethereum)
      // Using provider setting from nuxt config :
      // window.web3 = new this.$web3;
      try {
        // Request account access
        await window.ethereum.enable()
        console.log('This browser is supported for ethereum')
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    }
  },
  methods: {
  }
}
</script>
