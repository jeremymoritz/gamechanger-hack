import Vue from 'vue'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VTabs,
  VCard,
  VExpansionPanel,
  VSnackbar,
  VProgressCircular,
  VProgressLinear,
  VChip,
  VAvatar,
  VDivider,
  VSubheader,
  VMenu,
  VSpeedDial,
  VBadge,
  VTextField,
  VForm,
  VTooltip,
  VBtnToggle,
  VOverflowBtn,
  VItemGroup,
  VWindow,
  VImg,
  VCarousel,
  transitions
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VTabs,
    VCard,
    VExpansionPanel,
    VSnackbar,
    VProgressCircular,
    VProgressLinear,
    VChip,
    VAvatar,
    VDivider,
    VSubheader,
    VMenu,
    VSpeedDial,
    VBadge,
    VTextField,
    VForm,
    VTooltip,
    VBtnToggle,
    VOverflowBtn,
    VItemGroup,
    VWindow,
    VImg,
    VCarousel,

    transitions
  },
  theme: {
    //https://vuetifyjs.com/en/theme-generator
    primary: '#4db848',
    secondary: '#6441A4', //'#1dc1f7'
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
