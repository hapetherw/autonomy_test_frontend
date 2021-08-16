import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

// export default ({ $config }) => {
//   Vue.use(VueSocketIOExt, io($config.SOCKET_BASE_URL))
// }
export default ({ $config }) => {
  Vue.use(new VueSocketIO({
    // debug: true,
    connection: SocketIO($config.SOCKET_BASE_URL)
  })
  )
}
