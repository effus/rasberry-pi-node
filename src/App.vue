<template>
  <b-container fluid>
    <v-menu></v-menu>
    <router-view/>
  </b-container>
</template>

<script>
import Menu from './components/Menu';
export default {
  name: 'App',
  components: {
    'v-menu': Menu
  }
}
</script>