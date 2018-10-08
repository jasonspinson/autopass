<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <gmap-map id="gmap" :center="center" :zoom="12" style="width:100%;  height: 600px;" @rightclick="mapRclicked">
                <gmap-marker :key="index" v-for="(m, index) in markers" :draggable="true" :position="m.position" @click="opentheinfo(m)">
                    <gmap-info-window :opened="m.ifw === true">
                        <select class="custom-select custom-select-lg" name="todoselect" id="todoselect">
                            <option v-for="item in todofromdb" :key="item.key">{{ item.content }}</option>
                        </select>
                    </gmap-info-window>
                </gmap-marker>
            </gmap-map>
        </div>
    </div>
</template>

<script>
    import GmapCustomMarker from 'vue2-gmap-custom-marker';
    import {gmapApi} from 'vue2-google-maps';
    import { db } from '../config/db.js';

    export default{
        data(){
            return{
                lastId:1,
                center:{lat: 45.508, lng: -73.587},
                markers:[],
                todofromdb:[],
            };
        },
        firebase: {
                todofromdb: db.ref('todo')
                },
        components:{
        GmapCustomMarker,
        },
        mounted() {
        this.geolocate();
        },
        computed: {
                google: gmapApi
            },
        methods:{
            geolocate: function() {
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                    };
                });
            },
            mapRclicked(mouseArgs) {
                const createdMarker = this.addMarker();
                createdMarker.position.lat = mouseArgs.latLng.lat();
                createdMarker.position.lng = mouseArgs.latLng.lng();
            },
            addMarker: function addMarker() {
            this.lastId++;
            this.markers.push({
                id: this.lastId,
                position: {
                lat: 48.8538302,
                lng: 2.2982161
                },
                opacity: 1,
                draggable: true,
                enabled: true,
                clicked: 0,
                rightClicked: 0,
                dragended: 0,
                ifw: true,
            });
            return this.markers[this.markers.length - 1];
            },
            opentheinfo(m){
                if(m.ifw === true){
                    m.ifw = false;
                }
                else if(m.ifw === false){
                    m.ifw = true;
                } 
            }
        }
    }
</script>