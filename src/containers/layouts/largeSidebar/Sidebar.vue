<template>
  <div
    class="side-content-wrap"
    @mouseenter="isMenuOver = true"
    @mouseleave="isMenuOver = false"
    @touchstart="isMenuOver = true"
  >
    <vue-perfect-scrollbar
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
      :class="{ open: getSideBarToggleProperties.isSideNavOpen }"
      ref="myData"
      class="sidebar-left rtl-ps-none ps scroll"
    >
      <div>
        <ul class="navigation-left">
          <li
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'dashboard' }"
            class="nav-item"
            data-item="dashboard"
            :data-submenu="true"
          >
            <a class="nav-item-hold" href="/app/dashboards/dashboard.v1">
              <i class="nav-icon i-Bar-Chart"></i>
              <span class="nav-text">Dashboard</span>
            </a>

            <div class="triangle"></div>
          </li>
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'lessons' }"
            data-item="lessons"
            :data-submenu="true"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Library"></i>
              <span class="nav-text">Lessons</span>
            </a>
            <div class="triangle"></div>
          </li>
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'schedule' }"
            data-item="schedule"
            :data-submenu="true"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Suitcase"></i>
              <span class="nav-text">Schedule</span>
            </a>
            <div class="triangle"></div>
          </li>
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'after_school' }"
            data-item="after_school"
            :data-submenu="true"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Computer-Secure"></i>
              <span class="nav-text">After school</span>
            </a>
            <div class="triangle"></div>
          </li>
        </ul>
      </div>
    </vue-perfect-scrollbar>

    <vue-perfect-scrollbar
      :class="{ open: getSideBarToggleProperties.isSecondarySideNavOpen }"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
      class="sidebar-left-secondary ps rtl-ps-none"
    >
      <div ref="sidebarChild">
        <!-- Submenu Dashboards -->
        <ul
          class="childNav d-none"
          data-parent="dashboards"
          :class="{ 'd-block': selectedParentMenu == 'dashboard' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/dashboards/dashboard.v1">
              <i class="nav-icon i-Clock-3"></i>
              <span class="item-name">Report card</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/dashboards/dashboard.v2">
              <i class="nav-icon i-Clock-4"></i>
              <span class="item-name">Awards and achievements</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/dashboards/dashboard.v3">
              <i class="nav-icon i-Over-Time"></i>
              <span class="item-name">Teachers</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/dashboards/dashboard.v4">
              <i class="nav-icon i-Clock"></i>
              <span class="item-name">Friends</span>
            </router-link>
          </li>
        </ul>
        <ul
          class="childNav d-none"
          data-parent="forms"
          :class="{ 'd-block': selectedParentMenu == 'lessons' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/forms/basicForms">
              <i class="nav-icon i-File-Clipboard-Text--Image"></i>
              <span class="item-name">New</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/forms/formLayouts">
              <i class="nav-icon i-Split-Vertical"></i>
              <span class="item-name">Late</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/forms/basicActionBar">
              <i class="nav-icon i-Receipt-4"></i>
              <span class="item-name">History</span>
            </router-link>
          </li>
        </ul>

        <ul
          class="childNav d-none"
          data-parent="forms"
          :class="{ 'd-block': selectedParentMenu == 'after_school' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/datatables/paging">
              <i class="nav-icon i-Split-Four-Square-Window"></i>
              <span class="item-name">Games</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/datatables/filter">
              <i class="nav-icon i-Split-Vertical"></i>
              <span class="item-name">Reading</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/datatables/list">
              <i class="nav-icon i-Split-Vertical"></i>
              <span class="item-name">Videos</span>
            </router-link>
          </li>
        </ul>
      </div>
    </vue-perfect-scrollbar>
    <div
      @click="removeOverlay()"
      class="sidebar-overlay"
      :class="{ open: getSideBarToggleProperties.isSecondarySideNavOpen }"
    ></div>
  </div>
  <!--=============== Left side End ================-->
</template>

<script>
import Topnav from "./TopNav";
import { isMobile } from "mobile-device-detect";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Topnav
  },

  data() {
    return {
      isDisplay: true,
      isMenuOver: false,
      isStyle: true,
      selectedParentMenu: "",
      isMobile
    };
  },
  mounted() {
    this.toggleSelectedParentMenu();
    window.addEventListener("resize", this.handleWindowResize);
    document.addEventListener("click", this.returnSelectedParentMenu);
    this.handleWindowResize();
  },

  beforeDestroy() {
    document.removeEventListener("click", this.returnSelectedParentMenu);
    window.removeEventListener("resize", this.handleWindowResize);
  },
  computed: {
    ...mapGetters(["getSideBarToggleProperties"])
  },

  methods: {
    ...mapActions([
      "changeSecondarySidebarProperties",
      "changeSecondarySidebarPropertiesViaMenuItem",
      "changeSecondarySidebarPropertiesViaOverlay",
      "changeSidebarProperties"
    ]),

    handleWindowResize() {
      //  console.log('not working is Mobile');
      if (window.innerWidth <= 1200) {
        if (this.getSideBarToggleProperties.isSideNavOpen) {
          this.changeSidebarProperties();
        }
        if (this.getSideBarToggleProperties.isSecondarySideNavOpen) {
          this.changeSecondarySidebarProperties();
        }
      } else {
        if (!this.getSideBarToggleProperties.isSideNavOpen) {
          this.changeSidebarProperties();
        }
      }
    },
    toggleSelectedParentMenu() {
      const currentParentUrl = this.$route.path
        .split("/")
        .filter(x => x !== "")[1];

      if (currentParentUrl !== undefined || currentParentUrl !== null) {
        this.selectedParentMenu = currentParentUrl.toLowerCase();
      } else {
        this.selectedParentMenu = "dashboards";
      }
    },
    toggleSubMenu(e) {
      let hasSubmenu = e.target.dataset.submenu;
      let parent = e.target.dataset.item;
      if (hasSubmenu) {
        this.selectedParentMenu = parent;

        this.changeSecondarySidebarPropertiesViaMenuItem(true);
      } else {
        this.selectedParentMenu = parent;
        this.changeSecondarySidebarPropertiesViaMenuItem(false);
      }
    },

    removeOverlay() {
      this.changeSecondarySidebarPropertiesViaOverlay();
      if (window.innerWidth <= 1200) {
        this.changeSidebarProperties();
      }
      this.toggleSelectedParentMenu();
    },
    returnSelectedParentMenu() {
      if (!this.isMenuOver) {
        this.toggleSelectedParentMenu();
      }
    },

    toggleSidebarDropdwon(event) {
      let dropdownMenus = this.$el.querySelectorAll(".dropdown-sidemenu.open");

      event.currentTarget.classList.toggle("open");

      dropdownMenus.forEach(dropdown => {
        dropdown.classList.remove("open");
      });
    }
  }
};
</script>

<style lang="" scoped>
</style>
