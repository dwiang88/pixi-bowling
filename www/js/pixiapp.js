/**
 * Created by sanjoy on 3/20/15.
 */
var pixiapp= {
    initialize: function(){
        this.bindEvents();
    },
    bindEvents: function(){
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function(){
        this.receiveEvents('deviceready')
    },
    receiveEvents: function(eventId){

    }
}