<template>
    <div>
        <p>The visited URL is: {{ url }} </p>
        <button @click="clickFunc">click here</button>
    </div>
</template>

<script>
// import axios from 'axios'
const DEFAULT_BRAND = '2'
export default {
  data() {
    return {
      url: 'on experiment'
    }
  },
  methods: {
    clickFunc() {
        window.alert('working fine')
    },
  }
}
</script>

