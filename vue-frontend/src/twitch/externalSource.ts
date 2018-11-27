import { sourceScript } from '../external'
async function sourceTwitchExtension() {
  const twitchExtUrl =
    'https://extension-files.twitch.tv/helper/v1/twitch-ext.min.js'
  return sourceScript(twitchExtUrl, document)
}
