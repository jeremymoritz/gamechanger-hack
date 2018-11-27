// tslint:disable-next-line:no-console
console.log(process.env)
export default {
  ebsUrl: process.env.VUE_APP_EBS_URL,
  payFrontEndUrl: process.env.VUE_APP_PAY_FRONT_END_URL,
  amazonPayWidgetUrl: process.env.VUE_APP_AMAZON_PAY_WIDGET_URL,
  twitchBitsUseLoopback: process.env.VUE_APP_TWITCH_BITS_USE_LOOPBACK
}
