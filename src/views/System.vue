<template>
    <div>
        <h1>System</h1>
        <b-overlay :show="cpuTemp == null" rounded="sm">
            <b-card
                title="CPU Temperature"
                tag="article"
            >
                <b-card-text>
                {{cpuTemp}}
                </b-card-text>
            </b-card>
        </b-overlay>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "system",
    data: () => {
        return {
            cpuTemp: null
        }
    },
    mounted: function() {
    },
    timers: {
        getCPUTemperature: { time: 10000, autostart: true, repeat: true, immediate: true }
    },
    methods: {
        getCPUTemperature() {
            this.cpuTemp = null;
            axios.get('/system/cpu-temperature')
                .then((resp) => {
                    console.log('getCPUTemperature', resp);
                    
                })
                .catch((e) => {
                    console.error('getCPUTemperature', e);
                    this.cpuTemp = e.message;
                    
                });
        }
    }
}
</script>