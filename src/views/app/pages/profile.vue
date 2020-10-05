<template>
    <div class="main-content">

      <breadcumb :page="'User Profile'" :folder="'Pages'" />
      <div class="row">
        <div class="col-md-5">
          <b-card title="Your profile">
            <b-form @submit.prevent="formSubmit">
              <div class="form-group">
                <label for="name">Your name</label>
                <input
                    id="name"
                    class="form-control"
                    type="text"
                    v-model="name"
                />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                    id="email"
                    class="form-control"
                    type="text"
                    v-model="email"
                    :disabled="role_id === 1"
                />
              </div>
              <div>
                <div class="col-md-6 pl-0 d-inline-block">
                  <button class="btn btn-primary btn-block mt-2">
                    Save
                  </button>
                  <div v-once class="typo__p mt-1 d-inline-block ml-3" v-if="profileLoading">
                    <div class="spinner sm spinner-primary" style="font-size: 5px;"></div>
                  </div>
                </div>
              </div>
            </b-form>
          </b-card>
        </div>
        <div class="col-md-5">
          <b-card title="Avatar">
            <vue-dropzone
                ref="productsImageDropzone"
                id="dropzone"
                :options="dropzoneOptions"
                v-on:vdropzone-success="dropzoneFileSuccessUploaded"
                v-on:vdropzone-queue-complete="dropzoneUploadComplete"
                v-on:vdropzone-error="dropzoneUploadError"
                v-on:vdropzone-files-added="dropzoneFileAdded"
            ></vue-dropzone>
          </b-card>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
  metaInfo: {
    title: "Profile"
  },
  data() {
    return {
      name: '',
      email: '',
      role_id: 1,
      user_id: null,
      isDropzoneUploadError: false,
      token: JSON.parse(localStorage.getItem("userInfo")),
      dropzoneOptions: this.getDropzoneOptions(),
    };
  },
  methods: {
    ...mapActions(["getProfile", "saveProfile", "updateProfile"]),
    formSubmit() {
      const data = {
        name: this.name,
        email: this.email,
      };
      this.saveProfile(data);
    },
    getDropzoneOptions() {
      const token = JSON.parse(localStorage.getItem("userInfo"));
      const dropzoneOptions = {
        url: 'http://teachers.local/api/user/profile/avatar',
            thumbnailWidth: 150,
            paramName: 'image',
            acceptedFiles: 'image/*',
            dictDefaultMessage: 'Move image for upload',
            headers: {
              "token": token,
            }
      };
      return dropzoneOptions;
    },
    dropzoneFileSuccessUploaded(file, response) {
      console.log('file uploaded', response);
      const filename = response.data.user.avatar;
      const profile = this.profile;
      profile.avatar = filename;
      this.updateProfile(profile);
    },
    dropzoneFileAdded() {
      this.isDropzoneUploadError = false;
    },
    dropzoneUploadComplete() {
      if (!this.isDropzoneUploadError) {
        this.makeToast('Image upload', 'Success', 'success');
      }
      setTimeout(() => {
        this.$refs.productsImageDropzone.removeAllFiles();
      }, 400);
    },
    dropzoneUploadError(file, message) {
      console.log('dropzoneUploadError', message);
      this.isDropzoneUploadError = true;
      this.makeToast('Image upload', 'Error');
    },
    makeToast(title = '', message = '', variant = 'danger') {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true
      });
    },
    prepareData() {
      this.name = this.profile.name;
      this.email = this.profile.email;
      this.role_id = this.profile.role_id;
    },
  },
  watch: {
    profile: function () {
      this.prepareData();
    },
  },
  computed: {
    ...mapGetters(["profileLoading", "profileError", "profileSuccess", "profile"])
  },
  components: {
    vueDropzone: vue2Dropzone,
  },
  mounted() {
    this.getProfile();
  }
}
</script>

