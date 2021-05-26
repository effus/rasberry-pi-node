<template>
    <b-list-group-item class="d-flex justify-content-between align-items-center">
        {{name}}
        <b-badge variant="primary" pill>
            {{value}}
        </b-badge>
    </b-list-group-item>
</template>

<script>
export default {
    name: 'SystemItem',
    props: {
        name: {
            type: String,
        },
        value: {
            type: String|Number|Object
        }
    }
}
</script>