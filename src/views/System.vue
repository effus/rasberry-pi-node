<template>
    <div>
        <h1>System</h1>
        <b-alert show variant="warning">{{error}}</b-alert>
        <b-overlay :show="flagLoading == true" rounded="sm">
            <b-card
                title="System information"
                tag="article"
            >   
            <b-list-group>
                <system-item name="CPU temperature" :value="cpuTemp"></system-item>
                <system-item name="CPU load" :value="cpuLoad"></system-item>
                <system-item v-for="item in fs" 
                    :key="item.name" :name="'File system: ' + item.name" 
                    :value="item.use"></system-item>
                <system-item name="Memory used" :value="memoryUsed"></system-item>
                <system-item name="Network connections" :value="connections"></system-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                    System time: {{systemTime}}
                </b-list-group-item>
            </b-list-group>


            </b-card>
        </b-overlay>
    </div>
</template>

<script>
import axios from 'axios';
import SystemItem from '../components/SystemItem.vue';
export default {
    name: "system",
    components: {
        SystemItem
    },
    data: () => {
        return {
            flagLoading: false,
            error: '',
            cpuTemp: null,
            cpuLoad: null,
            fs: [],
            memoryUsed: null,
            connections: null,
            systemTime: null
        }
    },
    mounted: function() {
    },
    timers: {
        getSystemData: { time: 10000, autostart: true, repeat: true, immediate: true }
    },
    methods: {
        getSystemData() {
            this.flagLoading = true;
            axios.get('/system/data')
                .then((resp) => {
                    const values = resp.data.data;
                    this.cpuTemp = values.temp.main + ' C';
                    this.cpuLoad = values.currentLoad.currentLoad.toFixed(2) + '%';
                    this.fs = values.fsSize.map(item => {
                        return {
                            name: item.fs,
                            use: item.use
                        }
                    });
                    this.memoryUsed = (values.mem.used * 100 / values.mem.total).toFixed(2) + '%';
                    this.connections = values.networkConnections.length;
                    this.systemTime = new Date(values.time.current);
                    this.flagLoading = false;
                    this.error = null;
                })
                .catch((e) => {
                    this.error = e;
                });
        },
    }
}
</script>