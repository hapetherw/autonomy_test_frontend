export const actions = {
  getPauseSetting (ctx, { $axios }) {
    return new Promise((resolve, reject) => {
      $axios.post('get_pause_setting')
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getSetting (ctx, { $axios }) {
    return new Promise((resolve, reject) => {
      $axios.post('get_setting')
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  setPauseSetting (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('set_pause_setting', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  setSetting (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('set_setting', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getTransactions (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('get_transactions', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  }
}
