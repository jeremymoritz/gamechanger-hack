const { twitchExtensionSecret } = require('../../../../serverless/secrets')

export const rigLogin = {
  authToken: 'rcdyg0lp13ykp3okk390m7wnybfo9r',
  displayName: 'gamechangerorg',
  id: '63636358',
  login: 'gamechangerorg',
  profileImageUrl:
    'https://static-cdn.jtvnw.net/jtv_user_pictures/af6085c5-1a1e-4fce-951b-df75b5194311-profile_image-300x300.png'
}

export const projects = [
  {
    extensionViews: [
      {
        id: '1',
        channelId: '265737932',
        type: 'panel',
        features: { isChatEnabled: false },
        linked: true,
        linkedUserId: '265737932',
        mode: 'viewer',
        isPopout: false,
        role: 'Logged-In Viewer',
        x: 0,
        y: 0,
        orientation: 'Portrait',
        frameSize: { width: 640, height: 480 }
      }
    ],
    isLocal: false,
    projectFolderPath: '',
    manifest: {
      anchor: 'panel',
      assetUrls: [],
      authorName: 'GameChanger Charity',
      bitsEnabled: true,
      canInstall: true,
      configUrl: 'https://localhost.rig.twitch.tv:8080/config.html',
      configurationLocation: 'none',
      description: 'Not a real one, just a test.',
      eulaTosUrl: '',
      hasChatSupport: false,
      iconUrl:
        'https://localhost.rig.twitch.tv:8080/internal/icon/154/540/636626294046327368.png',
      iconUrls: {
        '100x100':
          'https://localhost.rig.twitch.tv:8080/internal/icon/154/540/636626294046327368.png'
      },
      id: 'th40ow0zog4oe9by5a1mtbsuqmadvb',
      installationCount: -42,
      liveConfigUrl: 'https://localhost.rig.twitch.tv:8080/live_config.html',
      name: 'GCC Test',
      panelHeight: 500,
      privacyPolicyUrl: '',
      requestIdentityLink: true,
      requiredBroadcasterAbilities: [],
      screenshotUrls: [
        'https://localhost.rig.twitch.tv:8080/https://vulcan.curseforge.com/internal/screenshots/test_data.png'
      ],
      sku: '',
      state: 'Testing',
      summary: 'Just a test extension',
      supportEmail: 'twitch-extensions@gamechangercharity.org',
      vendorCode: '',
      version: '0.0.1',
      viewerUrl: 'https://localhost.rig.twitch.tv:8080/panel.html',
      viewerUrls: {
        mobile: 'https://localhost.rig.twitch.tv:8080/mobile.html',
        panel: 'https://localhost.rig.twitch.tv:8080/panel.html',
        component: 'https://localhost.rig.twitch.tv:8080/component.html'
      },
      views: {
        mobile: {
          viewerUrl: 'https://localhost.rig.twitch.tv:8080/mobile.html'
        },
        panel: {
          viewerUrl: 'https://localhost.rig.twitch.tv:8080/panel.html',
          height: 500,
          canLinkExternalContent: true
        },
        component: {
          viewerUrl: 'https://localhost.rig.twitch.tv:8080/component.html',
          aspectWidth: 5000,
          aspectHeight: 10000,
          size: 0,
          zoom: false,
          zoomPixels: 1024,
          canLinkExternalContent: false
        },
        config: {
          viewerUrl: 'https://localhost.rig.twitch.tv:8080/config.html',
          canLinkExternalContent: false
        },
        liveConfig: {
          viewerUrl: 'https://localhost.rig.twitch.tv:8080/live_config.html',
          canLinkExternalContent: false
        }
      },
      whitelistedConfigUrls: [],
      whitelistedPanelUrls: [
        'http://gcc-te-frontend.s3-website-us-east-1.amazonaws.com/pay.html',
        'https://localhost:8080/pay.html'
      ]
    },
    secret: twitchExtensionSecret,
    frontendFolderName: '',
    frontendCommand: '',
    backendCommand: ''
  }
]
