<template>
  <div class="vue-constellation" ref="vueConstellation">
    <div class = "vue-constellation_content">
      <slot/>
    </div>
  </div>
</template>

<script>
import Constellation from './Constellation.js'
export default{
  name:'vue-constellation',
  props:{
    width:{
      type: Number,
      required: false,
      default:document.documentElement.clientWidth
    },
    height:{
      type: Number,
      required: false,
      default:document.documentElement.clientHeight
    },
    starColor:{
      type: String,
      required: false,
      default:'rgba(255, 255, 255, .5)'
    },
    starWidth:{
      type: Number,
      required: false,
      default:3
    },
    starRandomWidth:{
      type: Boolean,
      required: false,
      default:true
    },
    lineColor:{
      type: String,
      required: false,
      default:'rgba(255, 255, 255, .5)'
    },
    lineWidth:{
      type: Number,
      required: false,
      default:0.2
    },
    positionX:{
      type: Number,
      required: false,
      default:0,
    },
    positionY:{
      type: Number,
      required: false,
      default:0,
    },
    velocity:{
      type: Number,
      required: false,
      default:0.1,
    },
    length:{
      type: Number,
      required: false,
      default:(document.documentElement.clientWidth / 6),
    },
    distance:{
      type: Number,
      required: false,
      default:120,
    },
    radius:{
      type: Number,
      required: false,
      default:(document.documentElement.clientHeight / 5),
    },
    stars: {
      type:Array,
      default: () => []
    }

  },
  mounted() {
    this.$nextTick(() => {

      const options = {}
      for(let key in this.$props) {
        options[key] = this.$props[key]
      }
      new Constellation(this.$el, options)

    })

  }
}
</script>

