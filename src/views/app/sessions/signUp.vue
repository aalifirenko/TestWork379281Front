<template>
  <div
    class="auth-layout-wrap bg-gray-gradient"
  >
    <div class="auth-content">
      <div class="card o-hidden">
        <div class="row">
          <div
            class="col-md-6 text-center "
            style="background-size: cover"
            :style="{ backgroundImage: 'url(' + signInImage + ')' }"
          >
            <div class="pl-3 auth-right">
              <div class="auth-logo text-center mt-4">
                <img :src="logo" alt="" />
              </div>
              <div class="flex-grow-1"></div>
              <div class="w-100 mb-30">
                <router-link
                  to="signIn"
                  class="btn btn-outline-primary btn-outline-email btn-block btn-icon-text btn-rounded"
                  href="signin.html"
                >
                  <i class="i-Mail-with-At-Sign"></i> Sign in with Email
                </router-link>
                <a
                  class="btn btn-outline-primary btn-outline-google btn-block btn-icon-text btn-rounded"
                >
                  <i class="i-Google-Plus"></i> Sign in with Google
                </a>
              </div>
              <div class="flex-grow-1"></div>
            </div>
          </div>

          <b-col md="6">
            <div class="p-4">
              <h1 class="mb-3 text-18">Sign Up</h1>
              <b-form @submit.prevent="submit" novalidate v-bind:validated="isFormInvalid">
                <b-form-group label="Your Name">
                  <b-form-input
                    class="form-control"
                    label="Name"
                    v-model.trim="form.name"
                    required
                  />
                  <b-form-invalid-feedback>Required field</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Email">
                  <b-form-input
                    class="form-control"
                    label="Name"
                    type="email"
                    v-model="form.email"
                    required
                  />
                  <b-form-invalid-feedback>Required field</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Role">
                  <b-form-select
                      :value="form.role_id"
                      v-model="form.role_id"
                      :options="role_options"
                      id="inline-form-custom-select-pref"
                  />
                  <b-form-invalid-feedback>Required field</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Password">
                  <b-form-input
                    class="form-control"
                    label="Name"
                    type="password"
                    v-model.trim="form.password"
                    :disabled="loading"
                    required
                  />
                  <b-form-invalid-feedback>Required field</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Repeat Password">
                  <b-form-input
                    class="form-control"
                    label="Name"
                    type="password"
                    v-model.trim="form.repeatPassword"
                    :disabled="loading"
                    required
                  />
                  <b-form-invalid-feedback>Required field</b-form-invalid-feedback>
                </b-form-group>

                <b-button
                  type="submit"
                  block
                  variant="primary"
                  class="btn-rounded">
                  Sign Up
                </b-button>

                <div v-once class="typo__p" v-if="loading">
                  <div class="spinner sm spinner-primary mt-3"></div>
                </div>

                <p class="typo__p" v-if="authError">
                  {{ makeToast('Sign In', authError.message) }}
                </p>
                <p v-once class="typo__p" v-if="authSuccess">
                  {{ goToDashboard() }}
                </p>
              </b-form>
            </div>
          </b-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "SignUp"
  },

  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        role_id: 1,
      },
      role_options: { 1: 'student', 2: 'teacher', 3: 'involved parent', 4: 'parent' },
      isFormInvalid: false,
      logo: require("@/assets/images/logo/book.png"),
      signInImage: require("@/assets/images/photo-long-3.jpg"),
      submitStatus: null
    };
  },

  validations: {
    fName: {
      required,
      minLength: minLength(4)
    },

    password: {
      required,
      minLength: minLength(5)
    },
    repeatPassword: {
      sameAsPassword: sameAs("password")
    }
  },

  computed: {
    ...mapGetters(["loggedInUser", "loading", "authError", "authSuccess"])
  },

  methods: {
    ...mapActions(["signUserUp"]),
    submit() {
      this.isFormInvalid = false;
      if (this.form.name
          && this.form.email
          && this.form.password
          && this.form.repeatPassword
      ) {
        if (this.form.password === this.form.repeatPassword) {
          this.signUserUp(this.form);
        } else {
          this.makeToast('Sign Up', 'Passwords should be equal');
        }
      } else {
        this.isFormInvalid = true;
      }
    },
    goToDashboard() {
      this.$router.push("/");
    },
    makeToast(title, msg, variant = 'danger') {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },
    makeToastTwo(variant = null) {
      this.$bvToast.toast("Successfully Created Account", {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true
      });
    },

    inputSubmit() {
      console.log("submitted");
    }
  }
};
</script>
<style>
.spinner.sm {
  height: 2em;
  width: 2em;
}
.bg-gray-gradient {
  background: #C9D6FF;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #E2E2E2, #C9D6FF);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #E2E2E2, #C9D6FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>


