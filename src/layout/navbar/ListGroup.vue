<template>
  <v-list-group value="false" class="mb-1">
    <!-- <v-icon slot="prependIcon" color="nav_title">{{ item.icon }}</v-icon> -->
    <v-icon slot="appendIcon" color="nav_blue_title" class="mr-3">$arrow_d</v-icon>
    <template v-slot:activator >
      <!-- <v-list-item-content class="nav_title--text"> -->
        <v-list-item-title class="nav_title--text">
          <!-- {{ $t(item.menuCode) }} -->
          {{ item.menuName }}
        </v-list-item-title>
      <!-- </v-list-item-content> -->
    </template>

    <template v-for="(child, index) in item.children">
      <default-list-group v-if="child.children.leght > 0" :key="`sub-group-${index}`" :item="child" />
      <default-list-item v-else :key="`child-${index}`" :item="child" />
    </template>
  </v-list-group>
</template>


<script>
  import DefaultListGroup from './ListGroup'
  import DefaultListItem from './ListItem'
  export default {
    name: 'DefaultListGroup',
    components: {
      DefaultListItem,
      DefaultListGroup
    },
    props: {
      item: {
        type: Object,
        default: () => ({})

      }
    }
  }
</script>

