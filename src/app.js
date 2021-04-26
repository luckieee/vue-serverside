import Vue from 'vue'
import App from './App.vue'

export function createApp(context){
    const app = new Vue(App)
    return { App }
}

/*
const Vue = require('vue')

module.exports = (context) => {
    const app = new Vue({
        data: {
            url: context.url
        },
        template: `<div>
            <p>The visited URL is: {{ url }} </p>
            <button @click="clickFunc">click here</button>
        </div>`,
        methods: {
            clickFunc() {
                window.alert('works fine')
            }
        }
    })
    return app
}
*/



/*import Vue from 'vue'
import App from './App.vue'

// export a factory function for creating fresh app, router and store
// instances
export function createApp () {
  const app = new Vue({
    // the root instance simply renders the App component.
    render: h => h(App)
  })
  return { app }
}
*/