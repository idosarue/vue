Vue.component('greeting', {
    template: '<p>Hey there, i am {{name}}. <button @click="changeName">Change Name</button> </p>',
    data: function(){
        return {
            name: 'Yoshi'
        }
    },
    methods: {
        changeName: function() {
            this.name = this.name === 'Mario' ? 'Yoshi' : 'Mario'
        }
    }
})

new Vue({
    el: '#app',
})

new Vue({
    el: '#app-two',
})

// Refs

new Vue({
    el: '#refs',
    data: {
        output: 'Your fav food'
    },
    methods: {
        readRefs: function() {
            console.log(this.$refs.test.innerText)
            this.output = this.$refs.input.value
        }
    }
})