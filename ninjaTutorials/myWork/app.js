const app = new Vue({
    el : "#app",
    data : {
        name : 'Ido',
        job : 'Surfer',
        website : "https://google.com",
        websiteTag : "<a href='https://google.com'>Google</a>"
    },
    methods : {
        greet : function(time){
            return `Good ${time} ${this.name}`
        }
    }
}) 

const eventEl = new Vue({
    el : '#events',
    data : {
        message : 'Events',
        age : 23,
        x : 0,
        y : 0
    },
    methods : {
        add : function(num) { 
            this.age += num
        },
        subtract : function(num) {
            this.age -= num
        },
        updateXY : function(e){
            this.x = e.offsetX
            this.y = e.offsetY
        },
        someFunc : function() {
            alert('You clicked me')
        },
        logName : function(){
            console.log('you entered your name')
        },
        logAge : function(){
            console.log('you entered your age')
        },

    }
})

// 2 way data binding

const twoWay =new Vue({
    el : '#two-way',
    data : {
        name : '',
        age : ''
    }
})

// Computed Properties
const computed = new Vue({
    el : '#computed',
    data : {
        age : 20,
        a : 0,
        b : 0
    },
    methods : {
        // addToA : function() {
        //     console.log('AddToA');
        //     return this.a + this.age
        // },
        // addToB : function() {
        //     console.log('AddToB');
        //     return this.b + this.age
        // }
    },
    computed : {
        addToA : function() {
            console.log('AddToA');
            return this.a + this.age
        },
        addToB : function() {
            console.log('AddToB')
            return this.b + this.age
        }
    }
})

// Dynamic CSS
const dynamicCSS = new Vue({
    el : '#dynamic-classes',
    data : {
        available : false,
        nearby : false
    },
    methods : {

    },
    computed : {
        compClasses : function() {
            return {available : this.available, nearby : this.nearby}
        }
    }
})

// Conditionals

const conditionals = new Vue({
    el : '#conditionals',
    data : {
        error : false,
        success : false
    },
    methods : {

    },
    computed : {

    }
})

// Vue for

const vueFor = new Vue({
    el : '#vue-for',
    data : {
        characters : ['Mario', 'Luigi', 'Johb', 'Whatever'],
        ninjas : [
            {name : 'Ryu', age : 132},
            {name : 'Yoshi', age : 138},
            {name : 'Ken', age : 200}
        ]
    },
    methods : {

    },
    computed : {

    }
})

