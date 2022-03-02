<template>
  <v-card class="group-card mx-auto px-8" color="#26c6da" dark>
    <v-card-title class="pa-2">
      <span class="text-h6 font-weight-light d-flex" style="width: 100%">
        <span>{{ group.name }}</span>
        <span class="flex-grow-1" />
        <span class="creation">{{ creation }}</span>
      </span>
    </v-card-title>

    <v-card-text class="font-weight-bold px-2">
      <span class="text-h6">"{{ group.description }}"</span>
    </v-card-text>

    <v-card-actions class="px-2">
      <v-icon class="mr-1">$account</v-icon>
      <span class="subheading">
        <span class="partecipants">{{ group.partecipants.length }}</span>
        <span class="mx-1">/</span>
        <span class="maxPartecipants">{{ group.maxPartecipants }}</span>
      </span>

      <v-row align="center" justify="end" v-if="!checkingIfEnrolledtoCourse">
        <v-btn text :disabled="false" @click="enroll">
          <span class="group-button">{{ enrollButtonText }}</span>
        </v-btn>
      </v-row>
    </v-card-actions>

    <div class="arrow back">
      <v-btn small icon :disabled="backDisabled" @click="$emit('back')"> <v-icon large class="group-icon">$menu-left</v-icon> </v-btn>
    </div>
    <div class="arrow next">
      <v-btn small icon :disabled="nextDisabled" @click="$emit('next')"> <v-icon large class="group-icon">$menu-right</v-icon> </v-btn>
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

  @Prop({ type: String, required: true })
  studentId!: string;

  @Prop({ type: String, required: true })
  courseId!: string;

  @Prop({ type: Object, required: true })
  group!: Group;

  @Prop({ type: Boolean, required: true })
  backDisabled!: boolean;

  @Prop({ type: Boolean, required: true })
  nextDisabled!: boolean;

  @Prop({ type: Boolean, required: true })
  enrolledInThisGroup!: boolean;

  @Prop({ type: Boolean, required: true })
  enrolledInAnotherGroup!: boolean;

  @Prop({ validator: (value) => typeof value === "boolean" || value === null, required: true })
  enrolledToCourse!: boolean | null;

  /* DATA */

  private loading = false;

  /* GETTERS */

  get creation(): string {
    // TODO: handle date on sdk
    return new Date(this.group.creationDate).toLocaleDateString();
  }

  get enrollButtonText(): string {
    return this.enrolledToCourse ? (this.enrolledInThisGroup ? "UNENROLL" : "ENROLL") : "NOT ENROLLED TO COURSE";
  }

  get checkingIfEnrolledtoCourse(): boolean {
    return this.enrolledToCourse === null;
  }

  get enrollButtonDisabled(): boolean {
    return !this.enrolledToCourse || this.enrolledInAnotherGroup || this.group.partecipants.length === this.group.maxPartecipants || this.loading;
  }

  /* METHODS */

  async enroll(): Promise<void> {
    if (!this.enrollButtonDisabled) {
      try {
        this.loading = true;
        let partecipants = [];
        if (this.enrolledInThisGroup) {
          await this.$api.courses.groups(this.courseId).removePartecipant(this.group.id, this.studentId);
          partecipants = this.group.partecipants.filter((id) => id !== this.studentId);
        } else {
          await this.$api.courses.groups(this.courseId).addPartecipant(this.group.id, this.studentId);
          partecipants = [...this.group.partecipants, this.studentId];
        }
        this.$emit("update:group", { ...this.group, partecipants });
      } finally {
        this.loading = false;
      }
    }
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

  .text-h6 {
    font-size: 20px !important;
    line-height: 32px !important;
  }
  .subheading {
    font-size: 14px !important;
  }
  .group-icon {
    font-size: 36px !important;
  }
  .group-button {
    font-size: 14px !important;
    letter-spacing: 1.25px !important;
  }
  .px-8 {
    padding-left: 64px !important;
    padding-right: 64px !important;
  }
  .px-2 {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }
  .pa-2 {
    padding: 16px !important;
  }
}
</style>