<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from "@/utils/validate";

export default {
  props: {
    to: {
      type: String,
      required: true
    },
    target: {
      type: String,
      default: "_self"
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.to);
    },
    type() {
      if (this.isExternal) {
        return "a";
      }
      return "router-link";
    }
  },
  methods: {
    linkProps(to) {
      if (this.isExternal) {
        return {
          href: to,
          target: this.target,
          rel: this.target == "_blank" ? "noopener norefferrer" : ""
        };
      }
      return {
        to: to
      };
    }
  }
};
</script>
