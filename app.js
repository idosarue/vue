new Vue({
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
