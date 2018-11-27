import StoreSpace, { commitMethod } from './space'
import { RootState, ConfigState, ViewerInfo, TwitchUser } from '../types'
import { Store, ActionTree } from 'vuex'

const stateTemplate = {
  color: '#AAA',
  context: {},
  viewerInfo: {} as ViewerInfo,
  twitchUser: {} as TwitchUser,
  twitchChannelUser: {} as TwitchUser,
  queryParams: {}
}
const nullConfigState = {
  color: '#AAA',
  context: {},
  viewerInfo: {} as ViewerInfo,
  twitchUser: { display_name: '' } as TwitchUser,
  twitchChannelUser: { display_name: '' } as TwitchUser,
  queryParams: {}
}

const gettersTemplate = {
  color: (s: ConfigState) => {
    return s.color
  },
  dark: (s: ConfigState) => {
    return s.context.theme === 'dark'
  },
  isPanel: (s: ConfigState) => {
    return s.queryParams.anchor === 'panel'
  },
  userId: (s: ConfigState) => {
    return s.viewerInfo.userId
  },
  userName: (s: ConfigState) => {
    return s.viewerInfo.userName
  },
  channelName: (s: ConfigState) => {
    return s.viewerInfo.channelName
  },
  channelId: (s: ConfigState) => {
    return s.viewerInfo.channelId
  }
}
const actions: ActionTree<ConfigState, RootState> = {
  async requestIdShare({ rootState }): Promise<void> {
    await rootState.twitch.requestIdShare()
  }
}
const namespace = 'config'

export class ConfigSpace extends StoreSpace<ConfigState> {
  constructor(rootStore: Store<RootState>) {
    super(stateTemplate, namespace, rootStore, gettersTemplate, actions)
  }

  @commitMethod()
  setColor(s: ConfigState = nullConfigState, color: string): void {
    s.color = color
  }

  @commitMethod()
  setQueryParams(
    s: ConfigState = nullConfigState,
    queryParams: TwitchExtClientQueryParams
  ) {
    s.queryParams = queryParams
  }

  @commitMethod()
  setContext(
    s: ConfigState = nullConfigState,
    context: Partial<TwitchExtContext>
  ): void {
    s.context = { ...s.context, ...context }
  }

  @commitMethod()
  setViewerInfo(
    s: ConfigState = nullConfigState,
    viewerInfo: ViewerInfo
  ): void {
    s.viewerInfo = { ...s.viewerInfo, ...viewerInfo }
  }

  @commitMethod()
  setUser(s: ConfigState = nullConfigState, user: TwitchUser): void {
    s.viewerInfo = { ...s.viewerInfo, userName: user.display_name }
  }
  @commitMethod()
  setChannelUser(
    s: ConfigState = nullConfigState,
    channelUser: TwitchUser
  ): void {
    s.viewerInfo = { ...s.viewerInfo, channelName: channelUser.display_name }
  }

  @commitMethod()
  blackColorMut(s: ConfigState = nullConfigState) {
    s.color = '#001'
  }
}
