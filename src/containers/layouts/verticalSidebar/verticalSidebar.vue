<template>
<vue-perfect-scrollbar
    class="sidebar-panel   rtl-ps-none ps scroll"
    @mouseleave.native="sidebarCompact();returnSelectedParentMenu()"

    @mouseenter.native="removeSidebarCompact"
    :class="{
      'vertical-sidebar-compact': getVerticalCompact.isSidebarCompact,
      'sidebar-full-collapse': getVerticalSidebar.isMobileCompact
    }"
        :settings="{ suppressScrollX : true ,  wheelPropagation: false}"
      >
  <div>
    <div class="gull-brand text-center d-flex align-items-center pl-4 mb-2 justify-content-between">
     <div> <img class="" src="@/assets/images/logo/book.png" /></div>
    </div>

    <div class="close-mobile-menu" @click="mobileSidebar">
      <i class="text-16 text-primary i-Close-Window font-weight-bold"></i>
    </div>

    <div class="mt-4 main-menu">

      <ul class="ul-vertical-sidebar pl-4" id="menu">
        <!-- <p class="main-menu-title text-muted ml-3 font-weight-700 text-13 mt-4 mb-2">Apps</p> -->
        <li class="Ul_li--hover">
          <div v-b-toggle.collapse-1>
            <a class="has-arrow " href="#"  :class="{ active: selectedParentMenu == 'dashboard' }">
              <i class="i-Bar-Chart text-20 mr-2 "></i>
              <span
                class="text-15"
                :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                >Dashboard</span
              >
              <arrowIcon />
            </a>
          </div>
          <b-collapse id="collapse-1">
            <ul
              class="Ul_collapse"
              :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
            >
              <li>
                <router-link tag="a" class to="#">
                  <i class="i-Circular-Point mr-2"></i>
                  <span>Report Card</span>
                </router-link>
              </li>
              <li>
                <router-link tag="a" class to="#">
                  <i class="i-Circular-Point mr-2"></i>
                  <span>Awards and achievements</span>
                </router-link>
              </li>
              <li>
                <router-link tag="a" class to="#">
                  <i class="i-Circular-Point mr-2"></i>
                  <span>Teachers</span>
                </router-link>
              </li>
              <li>
                <router-link tag="a" class to="#">
                  <i class="i-Circular-Point mr-2"></i>
                  <span>Friends</span>
                </router-link>
              </li>
            </ul>
          </b-collapse>
        </li>

        <li class="Ul_li--hover">
          <div v-b-toggle.collapse-2>
            <a class="has-arrow " href="#" :class="{ active: selectedParentMenu == 'lessons' }">
              <i class="i-Library text-20 mr-2"></i>
              <span
                class="text-15"
                :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                >Lessons</span
              >
              <arrowIcon />
            </a>
          </div>
          <b-collapse id="collapse-2">
            <ul
              class="Ul_collapse"
              :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
            >
              <li class="item-name">
                <router-link tag="a" to="#">
                  <i class="i-Circular-Point mr-2"></i>
                  <span class="">New</span>
                </router-link>
              </li>
              <li class="item-name">
                <router-link tag="a" to="#">
                  <i class="i-Circular-Point mr-2"></i>
                  <span class="">Late</span>
                </router-link>
              </li>
              <li class="item-name">
                <router-link tag="a" to="#">
                  <i class="i-Circular-Point mr-2"></i>
                  <span class="">History</span>
                </router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
        <li class="Ul_li--hover">
          <div v-b-toggle.collapse-3>
            <a class="has-arrow " href="#" :class="{ active: selectedParentMenu == 'schedule' }">
              <i class="i-Suitcase text-20 mr-2 "></i>
              <span
                class="text-15 "
                :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                >Schedule</span
              >
            </a>
          </div>
        </li>
        <li class="Ul_li--hover">
          <div v-b-toggle.collapse-4>
            <a class="has-arrow " href="#" :class="{ active: selectedParentMenu == 'after_school' }">
              <i class="i-Library text-20 mr-2"></i>
              <span
                  class="text-15"
                  :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
              >After school</span
              >
              <arrowIcon />
            </a>
          </div>
          <b-collapse id="collapse-4">
            <ul
                class="Ul_collapse"
                :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
            >
              <li class="item-name">
                <router-link tag="a" to="#">
                  <i class="i-Circular-Point mr-2"></i>
                  <span class="">Games</span>
                </router-link>
              </li>
              <li class="item-name">
                <router-link tag="a" to="#">
                  <i class="i-Circular-Point mr-2"></i>
                  <span class="">Reading</span>
                </router-link>
              </li>
              <li class="item-name">
                <router-link tag="a" to="#">
                  <i class="i-Circular-Point mr-2"></i>
                  <span class="">Videos</span>
                </router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
      </ul>

    </div>
  </div>
  </vue-perfect-scrollbar>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import arrowIcon from "@/components/arrow/arrowIcon";
export default {
  components: {
    arrowIcon
  },
  computed: {
    ...mapGetters(["getVerticalCompact", "getVerticalSidebar"])
  },
  data() {
    return {
      selectedParentMenu: "",
    };
  },
   mounted() {
    this.toggleSelectedParentMenu();
     document.addEventListener("click", this.returnSelectedParentMenu);
   },
    beforeDestroy() {
    document.removeEventListener("click", this.returnSelectedParentMenu);

  },
  methods: {
    ...mapActions([
      "switchSidebar",
      "sidebarCompact",
      "removeSidebarCompact",
      "mobileSidebar"
    ]),


     toggleSelectedParentMenu() {
      const currentParentUrl = this.$route.path
        .split("/")
        .filter(x => x !== "")[1];

      if (currentParentUrl !== undefined || currentParentUrl !== null) {
        this.selectedParentMenu = currentParentUrl.toLowerCase();
        console.log(currentParentUrl)
      } else {
        this.selectedParentMenu = "dashboards";
      }
    },
      returnSelectedParentMenu() {

        this.toggleSelectedParentMenu();

    },

  }
};
</script>
<style>
</style>
