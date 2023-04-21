<template>
  <v-list-item link :to="item.menuCode" active-class="secondary" class="my-1">
    <v-list-item-icon>
      <!-- <v-icon color="nav_title">
        ${{ item.icon }}
      </v-icon> -->
      
    </v-list-item-icon>
    <v-list-item-title class="nav_title--text" style="letter-spacing:-0.02em;">
      <!-- {{ $t(item.menuCode) }} -->
      {{ item.menuName }}
    </v-list-item-title>
  </v-list-item>
</template>

<script>
  export default {
    name: 'DefaultListItem',
    props: {
      item: {
        type: Object,
        default: () => ({}),
      }
    }
  }
</script>