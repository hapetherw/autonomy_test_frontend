<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="py-3 px-4 d-flex justify-content-end align-items-center">
          <font-awesome-icon
            :icon="['fas', 'cog']"
            class="text-dark"
            style="cursor: pointer;font-size: 38px;"
            @click="gotoSettingAction()"
          />
        </b-col>
        <b-col cols="12" class="py-3 px-4">
          <b-row>
            <b-col cols="3">
              <div class="m-1 px-4 py-3 info-box" style="background: #d6e7f9;">
                <div class="font-weight-bold" style="font-size: 1.2rem;">
                  PROFIT TODAY
                </div>
                <div class="font-weight-bold" style="font-size: 1.2rem;">
                  {{ profitToday | decimalFormat(8) }}
                </div>
              </div>
            </b-col>
            <b-col cols="3">
              <div class="m-1 px-4 py-3 info-box" style="background: #c5f0f7;">
                <div class="font-weight-bold" style="font-size: 1.2rem;">
                  ORDERS TODAY
                </div>
                <div class="font-weight-bold" style="font-size: 1.2rem;">
                  {{ ordersToday | decimalFormat(8) }}
                </div>
              </div>
            </b-col>
            <b-col cols="3">
              <div class="m-1 px-4 py-3 info-box" style="background: #dcdcf8;">
                <div class="font-weight-bold" style="font-size: 1.2rem;">
                  TOTAL PROFIT
                </div>
                <div class="font-weight-bold" style="font-size: 1.2rem;">
                  {{ totalProfit | decimalFormat(8) }}
                </div>
              </div>
            </b-col>
            <b-col cols="3">
              <div class="m-1 px-4 py-3 info-box" style="background: #fce3de;">
                <div class="font-weight-bold" style="font-size: 1.2rem;">
                  ACCOUNT BALANCE: {{ accountCurrency }}
                </div>
                <div class="font-weight-bold" style="font-size: 1.2rem;">
                  {{ accountBalance | decimalFormat(8) }}
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" class="py-3 px-4">
          <b-button
            :variant="getPauseStatus ? 'success' : 'danger'"
            :class="getPauseStatus ? 'bg-success' : 'bg-danger'"
            class="mx-2"
            @click="pauseAction"
          >
            {{ getPauseStatus ? 'START' : 'PAUSE' }}
          </b-button>
        </b-col>
        <b-col cols="12" class="py-3 px-4">
          <b-form-checkbox
            v-model="checkTransaction"
          >
            <span class="font-weight-bold text-uppercase">Review Transactions</span>
          </b-form-checkbox>
<!--          <toggle-button-->
<!--            v-model="checkTransaction"-->
<!--            :color="{checked: '#3469ff', unchecked: '#ff008b', disabled: '#CCCCCC'}"-->
<!--            :labels="{checked: 'NO', unchecked: 'YES'}"-->
<!--            :width="60"-->
<!--            :height="25"-->
<!--            :font-size="15"-->
<!--            class="border-dark"-->
<!--            style="margin-bottom: 0"-->
<!--          />-->
        </b-col>
        <b-col v-if="checkTransaction" cols="12" class="px-4">
          <div class="d-flex justify-content-start align-items-center">
            <h6 class="text-uppercase font-weight-bold px-2">
              start date
            </h6>
            <b-form-datepicker
              v-model="filterStartDate"
              :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
              style="width: 200px;"
            />
            <!--            <v-date-picker-->
            <!--              v-model="filterStartDate"-->
            <!--              :masks="calendarMask"-->
            <!--              :model-config="calendarConfig"-->
            <!--            >-->
            <!--              <template v-slot="{ inputValue, togglePopover }">-->
            <!--                <b-input-group class="management-input">-->
            <!--                  <template v-slot:prepend>-->
            <!--                    <b-input-group-text>-->
            <!--                      <font-awesome-icon :icon="['fas', 'calendar-alt']" />-->
            <!--                    </b-input-group-text>-->
            <!--                  </template>-->
            <!--                  <b-form-input-->
            <!--                    readonly-->
            <!--                    class="rounded"-->
            <!--                    :value="inputValue"-->
            <!--                    @click="togglePopover"-->
            <!--                  />-->
            <!--                </b-input-group>-->
            <!--              </template>-->
            <!--            </v-date-picker>-->
            <h6 class="text-uppercase font-weight-bold px-2">
              end date
            </h6>
            <b-form-datepicker
              v-model="filterEndDate"
              :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
              style="width: 200px;"
            />
            <!--            <v-date-picker-->
            <!--              v-model="filterEndDate"-->
            <!--              :masks="calendarMask"-->
            <!--              :model-config="calendarConfig"-->
            <!--            >-->
            <!--              <template v-slot="{ inputValue, togglePopover }">-->
            <!--                <b-input-group class="management-input">-->
            <!--                  <template v-slot:prepend>-->
            <!--                    <b-input-group-text>-->
            <!--                      <font-awesome-icon :icon="['fas', 'calendar-alt']" />-->
            <!--                    </b-input-group-text>-->
            <!--                  </template>-->
            <!--                  <b-form-input-->
            <!--                    readonly-->
            <!--                    class="rounded"-->
            <!--                    :value="inputValue"-->
            <!--                    @click="togglePopover"-->
            <!--                  />-->
            <!--                </b-input-group>-->
            <!--              </template>-->
            <!--            </v-date-picker>-->
            <b-button
              variant="primary"
              class="mx-2 bg-primary"
              @click="getTransactionAction"
            >
              SEARCH
            </b-button>
          </div>
        </b-col>
        <b-col cols="12" class="py-3 px-4">
          <b-table
            v-if="!checkTransaction && items.length"
            :items="items"
            :fields="fields"
            sort-icon-left
            responsive
            thead-tr-class="mytable-head"
            head-variant="dark"
            :tbody-tr-class="rowClass"
          >
            <template #cell(id)="data">
              <span>{{ data.item.index }}</span>
            </template>
            <template #cell(pair)="data">
              <span class="font-weight-bold">{{ data.item.d1 }} -> {{ data.item.d2 }} -> {{ data.item.d3 }} -> {{ data.item.d1 }}<br></span>
              <span v-if="data.item.l1 === 'num'">1. <span class="font-weight-bold text-danger">SELL</span> {{ data.item.amount1 }} <span class="font-weight-bold">{{ data.item.d1 }}</span> to get {{ data.item.amount2 | decimalFormat }} <span class="font-weight-bold">{{ data.item.d2 }}</span> in market {{ data.item.d1 }}/{{ data.item.d2 }} @{{ data.item.ex_price1 | decimalFormat }} <span class="font-weight-bold">{{ data.item.d2 }}</span><br></span>
              <span v-else>1. Use {{ data.item.amount1 }} <span class="font-weight-bold">{{ data.item.d1 }}</span> to <span class="font-weight-bold text-success">BUY</span> {{ data.item.amount2 | decimalFormat }} <span class="font-weight-bold">{{ data.item.d2 }}</span> in market {{ data.item.d2 }}/{{ data.item.d1 }} @{{ data.item.ex_price1 | decimalFormat }} <span class="font-weight-bold">{{ data.item.d1 }}</span><br></span>
              <span v-if="data.item.l2 === 'num'">2. <span class="font-weight-bold text-danger">SELL</span> {{ data.item.amount2 | decimalFormat }} <span class="font-weight-bold">{{ data.item.d2 }}</span> to get {{ data.item.amount3 | decimalFormat }} <span class="font-weight-bold">{{ data.item.d3 }}</span> in market {{ data.item.d2 }}/{{ data.item.d3 }} @{{ data.item.ex_price2 | decimalFormat }} <span class="font-weight-bold">{{ data.item.d3 }}</span><br></span>
              <span v-else>2. Use {{ data.item.amount2 | decimalFormat }} <span class="font-weight-bold">{{ data.item.d2 }}</span> to <span class="font-weight-bold text-success">BUY</span> {{ data.item.amount3 | decimalFormat }} <span class="font-weight-bold">{{ data.item.d3 }}</span> in market {{ data.item.d3 }}/{{ data.item.d2 }} @{{ data.item.ex_price2 | decimalFormat }} <span class="font-weight-bold">{{ data.item.d2 }}</span><br></span>
              <span v-if="data.item.l3 === 'num'">3. <span class="font-weight-bold text-danger">SELL</span> {{ data.item.amount3 | decimalFormat }} <span class="font-weight-bold">{{ data.item.d3 }}</span> to get {{ data.item.amount4 | decimalFormat }} <span class="font-weight-bold">{{ data.item.d1 }}</span> in market {{ data.item.d3 }}/{{ data.item.d1 }} @{{ data.item.ex_price3 | decimalFormat }} <span class="font-weight-bold">{{ data.item.d1 }}</span><br></span>
              <span v-else>3. Use {{ data.item.amount3 | decimalFormat }} <span class="font-weight-bold">{{ data.item.d3 }}</span> to <span class="font-weight-bold text-success">BUY</span> {{ data.item.amount4 | decimalFormat }} <span class="font-weight-bold">{{ data.item.d1 }}</span> in market {{ data.item.d1 }}/{{ data.item.d3 }} @{{ data.item.ex_price3 | decimalFormat }} <span class="font-weight-bold">{{ data.item.d3 }}</span><br></span>
            </template>
            <template #cell(fee)="data">
              <span>{{ data.item.fee_percentage | decimalFormat }}</span>
            </template>
            <template #cell(profit)="data">
              <span>{{ data.item.profit_percentage | decimalFormat }}</span>
            </template>
            <template #cell(date)="data">
              <span>{{ data.value | dateFormat(false) }}</span>
            </template>
          </b-table>
          <b-table
            v-else-if="checkTransaction && items1.length"
            :items="items1"
            :fields="fields1"
            sort-icon-left
            responsive
            thead-tr-class="mytable-head"
            head-variant="dark"
            :tbody-tr-class="rowClass"
          >
            <template #cell(id)="data">
              <span>{{ data.item.index }}</span>
            </template>
            <template #cell(pair)="data">
              <span class="font-weight-bold">{{ data.item.symbol1 }} -> {{ data.item.symbol2 }} -> {{ data.item.symbol3 }} -> {{ data.item.symbol1 }}<br></span>
              <span v-if="data.item.first_pair_type === 'sell'">1. <span class="font-weight-bold text-danger">SELL</span> {{ data.item.first_symbol1_amount }} <span class="font-weight-bold">{{ data.item.symbol1 }}</span> to get {{ data.item.first_symbol2_amount | decimalFormat }} <span class="font-weight-bold">{{ data.item.symbol2 }}</span> in market {{ data.item.symbol1 }}/{{ data.item.symbol2 }} @{{ data.item.first_exchange_price | decimalFormat }} <span class="font-weight-bold">{{ data.item.symbol2 }}</span><br></span>
              <span v-else>1. Use {{ data.item.first_symbol1_amount }} <span class="font-weight-bold">{{ data.item.symbol1 }}</span> to <span class="font-weight-bold text-success">BUY</span> {{ data.item.first_symbol2_amount | decimalFormat }} <span class="font-weight-bold">{{ data.item.symbol2 }}</span> in market {{ data.item.symbol2 }}/{{ data.item.symbol1 }} @{{ data.item.first_exchange_price | decimalFormat }} <span class="font-weight-bold">{{ data.item.symbol1 }}</span><br></span>
              <span v-if="data.item.second_pair_type === 'sell'">2. <span class="font-weight-bold text-danger">SELL</span> {{ data.item.second_symbol1_amount | decimalFormat }} <span class="font-weight-bold">{{ data.item.symbol2 }}</span> to get {{ data.item.second_symbol2_amount | decimalFormat }} <span class="font-weight-bold">{{ data.item.symbol3 }}</span> in market {{ data.item.symbol2 }}/{{ data.item.symbol3 }} @{{ data.item.second_exchange_price | decimalFormat }} <span class="font-weight-bold">{{ data.item.symbol3 }}</span><br></span>
              <span v-else>2. Use {{ data.item.second_symbol1_amount | decimalFormat }} <span class="font-weight-bold">{{ data.item.symbol2 }}</span> to <span class="font-weight-bold text-success">BUY</span> {{ data.item.second_symbol2_amount | decimalFormat }} <span class="font-weight-bold">{{ data.item.symbol3 }}</span> in market {{ data.item.symbol3 }}/{{ data.item.symbol2 }} @{{ data.item.second_exchange_price | decimalFormat }} <span class="font-weight-bold">{{ data.item.symbol2 }}</span><br></span>
              <span v-if="data.item.third_pair_type === 'sell'">3. <span class="font-weight-bold text-danger">SELL</span> {{ data.item.third_symbol1_amount | decimalFormat }} <span class="font-weight-bold">{{ data.item.symbol3 }}</span> to get {{ data.item.third_symbol2_amount | decimalFormat }} <span class="font-weight-bold">{{ data.item.symbol1 }}</span> in market {{ data.item.symbol3 }}/{{ data.item.symbol1 }} @{{ data.item.third_exchange_price | decimalFormat }} <span class="font-weight-bold">{{ data.item.symbol1 }}</span><br></span>
              <span v-else>3. Use {{ data.item.third_symbol1_amount | decimalFormat }} <span class="font-weight-bold">{{ data.item.symbol3 }}</span> to <span class="font-weight-bold text-success">BUY</span> {{ data.item.third_symbol2_amount | decimalFormat }} <span class="font-weight-bold">{{ data.item.symbol1 }}</span> in market {{ data.item.symbol1 }}/{{ data.item.symbol3 }} @{{ data.item.third_exchange_price | decimalFormat }} <span class="font-weight-bold">{{ data.item.symbol3 }}</span><br></span>
            </template>
            <template #cell(expected_fee)="data">
              <span>{{ data.item.fee_percentage | decimalFormat }}</span>
            </template>
            <template #cell(expected_profit)="data">
              <span>{{ data.item.profit_percentage | decimalFormat }}</span>
            </template>
            <template #cell(result_fee)="data">
              <span>{{ data.item.result_fee_percentage | decimalFormat }}</span>
            </template>
            <template #cell(result_profit)="data">
              <span>{{ data.item.result_profit_percentage | decimalFormat }}</span>
            </template>
            <template #cell(date)="data">
              <span>{{ data.item.createdAt | dateFormat(false) }}</span>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
export default {
  data: () => ({
    fields: [],
    fields1: [],
    items: [],
    items1: [],
    checkTransaction: false,
    filterStartDate: '',
    filterEndDate: '',
    profitToday: 0,
    ordersToday: 0,
    totalProfit: 0,
    accountBalance: 0,
    accountCurrency: '',
    calendarMask: {
      input: 'YYYY-MM-DD'
    },
    calendarConfig: {
      type: 'string',
      mask: 'YYYY-MM-DD' // Uses 'iso' if missing
    }
  }),
  computed: {
    ...mapGetters(['getPauseStatus'])
  },
  watch: {
    checkTransaction () {
    }
  },
  mounted () {
    const date = new Date()
    this.filterStartDate = moment(date).format('YYYY-MM-DD')
    this.filterEndDate = moment(date).format('YYYY-MM-DD')
    this.getPauseSettingAction()
    this.sockets.subscribe('ARBITRAGE', (payload) => {
      if (payload.length) {
        payload.forEach((item, index) => {
          item.index = index + 1
        })
      }
      this.items = payload
    })
    this.sockets.subscribe('ARBITRAGE_STATISTICS', (payload) => {
      this.profitToday = payload.statisticsInfo.result_profit_amount !== null ? payload.statisticsInfo.result_profit_amount : 0
      this.ordersToday = payload.statisticsInfo.order_count * 3
      this.totalProfit = payload.totalProfitInfo.result_profit_amount !== null ? payload.totalProfitInfo.result_profit_amount : 0
      this.accountBalance = payload.accountBalance
      this.accountCurrency = payload.accountCurrency
    })
    this.fields = [
      {
        key: 'id',
        label: 'ID',
        sortable: false
      },
      {
        key: 'pair',
        label: 'PAIRS',
        sortable: false
      },
      {
        key: 'fee',
        label: 'FEES(%)',
        sortable: false
      },
      {
        key: 'profit',
        label: 'PROFIT(%)',
        sortable: false
      },
      {
        key: 'date',
        label: 'DATE',
        sortable: false
      }
    ]
    this.fields1 = [
      {
        key: 'id',
        label: 'ID',
        sortable: false
      },
      {
        key: 'pair',
        label: 'PAIRS',
        sortable: false
      },
      {
        key: 'expected_fee',
        label: 'EXCEPTED FEES(%)',
        sortable: false
      },
      {
        key: 'expected_profit',
        label: 'EXCEPTED PROFIT(%)',
        sortable: false
      },
      {
        key: 'result_fee',
        label: 'RESULT FEES(%)',
        sortable: false
      },
      {
        key: 'result_profit',
        label: 'RESULT PROFIT(%)',
        sortable: false
      },
      {
        key: 'date',
        label: 'DATE',
        sortable: false
      }
    ]
  },
  methods: {
    ...mapActions('api', ['setPauseSetting', 'getPauseSetting', 'getTransactions']),
    ...mapActions(['setPauseStatus']),
    rowClass (item, type) {
      if (!item || type !== 'row') {
        return
      }
      if (item.is_done === true) {
        return 'table-success'
      }
      if (item.result_profit_percentage > 0) {
        return 'table-success'
      } else {
        return 'table-danger'
      }
    },
    async getPauseSettingAction () {
      const data = await this.getPauseSetting({
        $axios: this.$axios
      })
      this.setPauseStatus(data.isPaused)
    },
    async pauseAction () {
      const data = await this.setPauseSetting({
        $axios: this.$axios,
        params: {
          isPaused: !this.getPauseStatus
        }
      })
      await this.setPauseStatus(data.is_paused)
    },
    gotoSettingAction () {
      this.$nuxt.$emit('setting-action')
    },
    async getTransactionAction () {
      const data = await this.getTransactions({
        $axios: this.$axios,
        params: {
          filterStartDate: this.filterStartDate,
          filterEndDate: this.filterEndDate
        }
      })
      this.items1 = data.transactions
      if (this.items1.length) {
        this.items1.forEach((item, index) => {
          item.index = index + 1
        })
      }
    }
  }
}
</script>
