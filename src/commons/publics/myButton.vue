<template>
  <button @click="clickFn"></button>
</template>

<script>
export default {
    methods: {
        clickFn(){
            this.$emit('click')
        }
    }
};
</script>

<style scoped>
button {
  width: 5rem;
  height: 1.2rem;
  color: #ffffff;
  font-size: 0.46rem;
  text-align: center;
  background: #7e57c2;
  border-radius: 0.1rem;
  display: block;
  margin: 0.3rem auto;
}
</style>


