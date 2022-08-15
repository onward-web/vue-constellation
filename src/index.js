import VueConstellationComponent from './vue-constellation.vue';

const VueConstellation = {
    install (Vue, options) {
        Vue.component('vue-constellation', VueConstellationComponent)
    }

}

export default VueConstellation;
