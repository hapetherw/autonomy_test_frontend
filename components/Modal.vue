<template>
  <div>
    <b-modal
      v-model="settingModal"
      centered
      hide-footer
      header-bg-variant="dark"
      header-text-variant="white"
      body-bg-variant="white"
      body-text-variant="white"
      footer-bg-variant="light"
      footer-text-variant="white"
    >
      <template v-slot:modal-header="{ close }">
        <h4 style="text-transform: uppercase">
          settings
        </h4>
        <font-awesome-icon
          :icon="['fas', 'times']"
          class="text-white"
          style="cursor: pointer;font-size: 20px;"
          @click="close()"
        />
      </template>
      <b-overlay
        :show="modalLoading"
        spinner-variant="secondary"
        opacity="0"
        no-wrap
      />
      <b-form class="px-3" @keyup.enter="saveSettingAction()">
        <b-row>
          <b-col cols="12">
            <b-form-group>
              <span class="text-dark font-weight-bold text-uppercase">base currency</span>
              <b-form-input
                v-model="$v.settingForm.baseCoin.$model"
                :state="settingValidateState('baseCoin')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group>
              <span class="text-dark font-weight-bold text-uppercase">amount</span>
              <b-form-input
                v-model="$v.settingForm.initAmount.$model"
                :state="settingValidateState('initAmount')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group>
              <span class="text-dark font-weight-bold text-uppercase">profit in %</span>
              <b-form-input
                v-model="$v.settingForm.profitPercentage.$model"
                :state="settingValidateState('profitPercentage')"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="py-4">
          <b-col cols="12">
            <b-button
              variant="dark"
              style="text-transform: none;"
              @click="saveSettingAction"
            >
              SAVE
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import common from '~/mixins/common'
export default {
  mixins: [validationMixin, common],
  data: () => ({
    settingForm: {
      baseCoin: null,
      initAmount: null,
      profitPercentage: null
    },
    settingModal: false,
    modalLoading: false
  }),
  validations: {
    settingForm: {
      baseCoin: {
        required
      },
      initAmount: {
        required
      },
      profitPercentage: {
        required
      }
    }
  },
  computed: {
  },
  created () {
    this.$nuxt.$on('setting-action', async () => {
      await this.$v.settingForm.$reset()
      this.settingModal = true
      await this.getSettingAction()
    })
  },
  async mounted () {
  },
  methods: {
    ...mapActions('api', ['setSetting', 'getSetting']),
    settingValidateState (name) {
      const { $dirty, $error } = this.$v.settingForm[name]
      return $dirty ? !$error : null
    },
    async getSettingAction () {
      this.modalLoading = true
      try {
        const data = await this.getSetting({
          $axios: this.$axios
        })
        this.settingForm.baseCoin = data.setting.base_coin
        this.settingForm.initAmount = data.setting.init_amount
        this.settingForm.profitPercentage = data.setting.profit_percentage
        this.modalLoading = false
      } catch (e) {
        this.modalLoading = false
        console.log(e)
      }
    },
    async saveSettingAction () {
      this.$v.settingForm.$touch()
      if (!this.$v.settingForm.$anyError) {
        this.modalLoading = true
        try {
          await this.setSetting({
            $axios: this.$axios,
            params: this.settingForm
          })
          this.$bvToast.toast('Setting updated!', {
            variant: 'success',
            appendToast: true,
            toaster: 'b-toaster-top-right',
            noCloseButton: true,
            autoHideDelay: 3500,
            solid: true
          })
        } catch (e) {
        }
        this.settingModal = false
        this.modalLoading = false
      }
    }
  }
}
</script>
