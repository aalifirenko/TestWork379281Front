<template>
  <div class="mb-30">
    <header
      class="main-header vertical-header bg-white d-flex justify-content-between"
    >
      <div class="menu-toggle vertical-toggle" @click="mobileSidebar">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="header-toggle">
        <span>Level4</span>
        <span><i class="i-Add-UserStar ml-2 text-20 mr-2 "></i></span>
        <span>super star</span>
      </div>
       <div style="margin: auto"></div>

    <div class="header-part-right">
      <!-- User avatar dropdown -->
      <div class="dropdown">
        <b-dropdown
          id="dropdown-1"
          right
          text="Right align"
          class="m-md-2 user col align-self-end"
          toggle-class="text-decoration-none"
          no-caret
          variant="link"
        >
          <template slot="button-content">
            <span class="pr-1">{{ name }}</span>
            <img
              :src="avatar"
              id="userDropdown"
              alt
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            />
          </template>

          <div class="dropdown-menu-right" aria-labelledby="userDropdown">
            <div class="dropdown-header">
              <i class="i-Lock-User mr-1"></i> {{ email }}
            </div>
            <router-link tag="a" class="dropdown-item" to="/app/pages/profile">
              <span class="item-name">Profile</span>
            </router-link>
            <a class="dropdown-item" href="#" @click.prevent="logoutUser"
              >Sign out</a
            >
          </div>
        </b-dropdown>
      </div>
    </div>
    </header>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      name: '',
      email: '',
      avatar: '',
    };
  },
  methods: {
    ...mapActions([
        "switchSidebar",
        "sidebarCompact",
        "removeSidebarCompact",
        "mobileSidebar",
        "getProfile",
    ]),
    prepareData() {
      this.name = this.profile.name;
      this.email = this.profile.email;
      this.avatar = 'http://teachers.local/images/avatars/' + this.profile.avatar;
    },

    logoutUser() {

    },
  },
  computed: {
    ...mapGetters([
      "getVerticalCompact",
      "getVerticalSidebar",
      "getSideBarToggleProperties",
      "profile",
    ])
  },
  watch: {
    profile: {
      handler: function () {
        this.prepareData();
      },
      deep: true,
    },
  },
  mounted() {
    this.getProfile();
  }
};
</script>>
