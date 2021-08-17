<template>
  <div>
    <b-container class="p-4">
      <b-row>
        <b-col cols="12" class="py-1 px-4">
          <div class="info-box">
            USER ADDRESS
            <b-form-input
              v-model="userAddress"
            />
          </div>
        </b-col>
        <b-col cols="12" class="py-1 px-4">
          <div class="info-box">
            TIME
            <div class="d-flex flex-row">
              <b-form-datepicker
                v-model="dateString"
                :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                class="mr-1"
                style="width: 200px;"
              />
              <b-form-timepicker v-model="timeString" locale="en" class="mx-1" style="width: 200px;" />
            </div>
          </div>
        </b-col>
        <b-col cols="12" class="py-1 px-4">
          <div class="info-box">
            ETH AMOUNT
            <b-form-input
              v-model="ethAmountString"
              type="number"
            />
          </div>
        </b-col>
        <b-col cols="12" class="py-1 px-4">
          <b-button
            variant="dark"
            @click="registerAction"
          >
            REGISTER
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js'
import moment from 'moment'
import ethSenderABI from '~/static/ABI/ethSender.json'
import registryABI from '~/static/ABI/registry.json'

export default {
  data: () => ({
    userAddress: '',
    dateString: '',
    timeString: '',
    ethAmountString: 0,
    ethSenderContract: '0xfa0a8b60b2af537dec9832f72fd233e93e4c8463',
    registryContract: '0xB82Ae7779aB1742734fCE32A4b7fDBCf020F2667',
    refererContract: '0x0000000000000000000000000000000000000000'
  }),
  computed: {
  },
  mounted () {
    const date = new Date()
    this.dateString = moment(date).format('YYYY-MM-DD')
    this.timeString = moment(date).format('HH:mm:ss')
    // this.userAddress = '0x203C4186280c6fEed11200b8453A2584feEBC306'
  },
  methods: {
    async registerAction () {
      const futureTimeStamp = new Date(this.dateString + ' ' + this.timeString).getTime()
      const accounts = await window.web3.eth.getAccounts()
      const ethSender = new window.web3.eth.Contract(ethSenderABI, this.ethSenderContract)
      const registry = new window.web3.eth.Contract(registryABI, this.registryContract)
      const callData = await ethSender.methods.sendEthAtTime(futureTimeStamp, this.userAddress).encodeABI()
      const ethAmount = new BigNumber(this.ethAmountString).plus(0.01)
      await registry.methods.newReq(
        this.ethSenderContract,
        this.refererContract,
        callData,
        window.web3.utils.toWei(ethAmount.toString(), 'ether'), false, false)
        .send({
          from: accounts[0]
        })
        .then((receipt) => {
          console.log(receipt)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
