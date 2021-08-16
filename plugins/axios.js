export default ({ $axios, store, redirect, app }) => {
  $axios.defaults.timeout = 25000
  $axios.onResponse((res) => {
    return res
  })

  $axios.onError((err) => {
    const { response: { status } } = err
    if (status === 401) {
      store.dispatch('handleSignedOut')
      return redirect('/')
    }
    return Promise.reject(err)
  })
}
