<template>
    <v-layout slot="header" align-center row spacer>
        <v-flex xs4 sm2 md1>
            <v-badge overlap>
                <span slot="badge">{{ alert.amount }}</span>
                <v-avatar size="36px">
                    <img :src="alert.avatar" alt="Avatar">
                </v-avatar>
            </v-badge>
        </v-flex>

        <v-flex sm5 md3 hidden-xs-only>
            <strong v-html="alert.name"></strong>
            <span v-if="alert.total" class="grey--text">
                &nbsp;({{ alert.total }})
            </span>
        </v-flex>

        <v-flex no-wrap xs5 sm3>
            <v-chip v-if="alert.new" :color="`${alert.color} lighten-4`" class="ml-0" label small>
                {{ alert.new }} new
            </v-chip>
            <strong v-html="alert.title"></strong>
        </v-flex>

        <v-flex v-if="alert.text" class="grey--text" ellipsis hidden-sm-and-down>
            &mdash;
            {{ alert.text }}
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Alert } from '../types'

@Component
export default class extends Vue {
  @Prop()
  private alert!: Alert
}
</script>
<style scoped lang="scss">
</style>