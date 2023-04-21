<template>
  <div id="tags-view-container" class="tags-view-container">
    <!-- <vue-scroll> -->
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.native="menuSelectedTag(tag)"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
       <!--  {{ getMenuTitle(tag) }} -->
       {{title === 'ko'? tag.meta.title : tag.meta.title2 }}
        <v-icon
          small
          v-if="!isAffix(tag)"
          class="icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        >
        $close
        </v-icon>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <!-- <li @click="refreshSelectedTag(selectedTag)">Refresh</li> -->
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
    <!-- </vue-scroll> -->
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import path from 'path'
import routers from '@/router'

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      titleLan: 'ko'
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    routes() {
      //return this.$store.state.permission.routes
      return routers.options.routes
    },
    title: {
      get() {
        return this.titleLan
      },
      set(val) {
        this.titleLan = val
      }
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    },
    
  },
  mounted() {
    this.titleLan = this.$localStore.get('locale')
    // this.$EventBus.$on(`lanCode`, lang => {
    //   console.log('lanCode',lang)
    //   //console.log('visitedViews',this.visitedViews)
    //   if(lang != 'ko') {
    //     let timer = setInterval(() =>{
    //       console.log('lanCode lan',this.$store.state.menu.routeMenus.length)
    //       this.visitedViews.forEach(view => {
    //         this.$store.state.menu.routeMenus.find((element) => {
    //           if (element.menuCode == view.meta.menu_id) {
    //             //console.log('en',element.menuCode)
    //             view.meta.title2 = element.menuName
    //           }
    //         })
    //       })
          
    //       clearInterval(timer)
    //     }, 400)
    //   }
    //   this.title = lang
    // })
    // console.log('tag',this.$route.meta.title2)
    this.initTags()
    this.addTags()
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes))
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.state.menu.routeMenus.find((element) => {
          if (element.menuCode == this.$route.meta.menu_id) {
            this.$route.meta.title2 = element.menuName
          }
        })
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            //this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.state.menu.routeMenus.find((element) => {
                if (element.menuCode == this.$route.meta.menu_id) {
                  this.$route.meta.title2 = element.menuName
                }
              })
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view

        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    menuSelectedTag(view) {
      //console.log('menuSelectedTag : ', view)
      //if(view.meta.nemu_code != '')
      this.$EventBus.$emit('App_Bar_MenuClick', view.meta.nemu_code)
    },
    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY - 64
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    handleScroll() {
      this.closeMenu()
    },
    getMenuTitle(tag) {
      return this.$t(tag.meta.title)
    }
  }
}
</script>
<style lang="scss" scoped>
.tags-view-container {
  transition: left 0.28s;
  z-index: 1004;
  height: 34px;
  width: 100%;
  background: #e5ebf9;
  border-bottom: 1px solid #e3e8ee;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
.tags-view-container .tags-view-wrapper .tags-view-item {
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 29px;
  line-height: 27px;
  border: 1px solid #455b59;
  border-radius: 3px;
  color: #495060;
  background: #f4f4f5;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px !important;
}
.tags-view-container .tags-view-wrapper .tags-view-item:first-of-type {
  margin-left: 15px;
  margin-top: 3px !important;
}
.tags-view-container .tags-view-wrapper .tags-view-item:last-of-type {
  margin-right: 15px;
  margin-top: 4px;
}
.tags-view-container .tags-view-wrapper .tags-view-item.active {
  background-color: #f4f4f5;
  color: #2b51eb;
  border-color: #2b51eb;
}
.tags-view-container .tags-view-wrapper .tags-view-item.active::before {
  content: '';
  background: #2b51eb;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 2px;
}
.tags-view-container .contextmenu {
  margin: 0;
  background: #f4f4f5;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}
.tags-view-container .contextmenu li {
  margin: 0;
  padding: 7px 16px;
  cursor: pointer;
}
.tags-view-container .contextmenu li:hover {
  background: #eee;
}
.tags-view-wrapper .tags-view-item .icon-close {
  width: 16px;
  height: 16px;
  vertical-align: -1px;
  border-radius: 50%;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-origin: 100% 50%;
}
.tags-view-wrapper .tags-view-item .icon-close:before {
  transform: scale(0.6);
  display: inline-block;
  vertical-align: -3px;
}
.tags-view-wrapper .tags-view-item .icon-close:hover {
  background-color: #b4bccc;
  color: #fff;
}
</style>