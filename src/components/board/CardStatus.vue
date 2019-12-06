<template>
    <div class="card-status" :id="'card-'+id+'-status'">
    </div>
</template>

<script>

export default {
    name: 'CardStatus',
    props: ['status','id'],
    mounted() {
        this.updateStatus(this.status);
    },
    methods: {
        updateStatus: function(status) {
            switch(status) {
                case 'ok':
                    document.querySelector(`#card-${this.id}-status`).style.backgroundColor = '#41B883';
                    break;
                case 'warning':
                    document.querySelector(`#card-${this.id}-status`).style.backgroundColor = '#F56C1A';
                    break;
                case 'alert':
                    document.querySelector(`#card-${this.id}-status`).style.backgroundColor = '#DF2B53';
                    break;
                case 'unknown':
                    document.querySelector(`#card-${this.id}-status`).style.backgroundColor = 'yellow';
                    break
                default:
                    document.querySelector(`#card-${this.id}-status`).style.backgroundColor = '#f7f7f7';
            }
        }
    }
}
</script>

<style scoped>
    .card-status {
        height: 30px;
        width: 100%;
        position: relative;
        top: 0px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        /* border: rgb(100, 99, 99) solid 1px;
        border-bottom: none; */
    }
</style>