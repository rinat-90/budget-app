import localizeFilter from "../filters/localize.filter";
export default {
  install(Vue, options) {
    Vue.prototype.$title = function (titleKey) {
      return `${localizeFilter(titleKey)} | ${process.env.VUE_APP_TITLE}`
    }
  }
}
