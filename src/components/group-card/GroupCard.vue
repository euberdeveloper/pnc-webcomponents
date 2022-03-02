<template>
  <v-card class="group-card mx-auto px-8" color="#26c6da" dark>
    <v-card-title class="px-2">
      <span class="text-h6 font-weight-light d-flex" style="width: 100%">
        <span>{{ group.name }}</span>
        <span class="flex-grow-1" />
        <span class="creation">{{ creation }}</span>
      </span>
    </v-card-title>

    <v-card-text class="text-h6 font-weight-bold px-2">"{{ group.description }}"</v-card-text>

    <v-card-actions class="px-2">
      <v-icon class="mr-1">mdi-account</v-icon>
      <span class="partecipants subheading mr-2">
        <span class="partecipants">{{ group.partecipants.length }}</span>
        <span class="mx-1">/</span>
        <span class="maxPartecipants">{{ group.maxPartecipants }}</span>
      </span>

      <v-row align="center" justify="end">
        <v-btn class="blue--text text--darken-3" text icon @click="$emit('edit')">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn color="red" class="mr-2" icon @click="$emit('remove')">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-row>
    </v-card-actions>

    <div class="arrow back">
      <v-btn small icon :disabled="backDisabled" @click="$emit('back')"> <v-icon large>mdi-menu-left</v-icon> </v-btn>
    </div>
    <div class="arrow next">
      <v-btn small icon :disabled="nextDisabled" @click="$emit('next')"> <v-icon large>mdi-menu-right</v-icon> </v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Group } from "pnc-sdk";

import { VCard, VCardTitle, VCardText, VCardActions, VIcon, VRow, VBtn } from "vuetify/lib";

@Component({
  components: {
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VIcon,
    VRow,
    VBtn,
  },
})
export default class GroupCard extends Vue {
  /* PROPS */

  @Prop({ type: Object, required: true })
  group!: Group;

  @Prop({ type: Boolean, required: true })
  backDisabled!: boolean;

  @Prop({ type: Boolean, required: true })
  nextDisabled!: boolean;

  /* GETTERS */

  get creation(): string {
    // TODO: handle date on sdk
    return new Date(this.group.creationDate).toLocaleDateString();
  }
}
</script>

<style lang="scss" scoped>
.group-card {
  .name {
    text-decoration: none;
    color: white;
  }

  .arrow {
    position: absolute;
    top: 0;

    width: 32px;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .back {
    left: 0;
  }
  .next {
    right: 0;
  }
}
</style>