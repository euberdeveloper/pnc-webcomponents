<template>
  <v-app style="max-width: 440px">
    <v-main>
      <group-card
        :courseId="courseId"
        :studentId="studentId"
        :group.sync="groups[selectedGroupIndex]"
        :backDisabled="backDisabled"
        :nextDisabled="nextDisabled"
        :enrolledInThisGroup="enrolledInThisGroup"
        :enrolledInAnotherGroup="enrolledInAnotherGroup"
        @back="back"
        @next="next"
        v-if="selectedGroup"
      />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Group, Student } from "pnc-sdk";

import "@/plugins/api";
import vuetify from "@/plugins/vuetify";

import { VApp, VMain } from "vuetify/lib";
import GroupCard from "@/components/group-card/GroupCard.vue";

@Component({
  vuetify,
  components: {
    VApp,
    VMain,
    GroupCard,
  },
})
export default class PncGroupRegistration extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  accessToken!: string;

  @Prop({ type: String, required: true })
  studentId!: string;

  @Prop({ type: String, required: true })
  courseId!: string;

  /* DATA */

  private token: string | null = null;
  private student: Student | null = null;
  private groups: Group[] = [];
  private selectedGroupIndex = 0;

  /* GETTERS AND SETTERS */

  get selectedGroup(): Group | null {
    return this.groups[this.selectedGroupIndex] ?? null;
  }

  get backDisabled(): boolean {
    return this.selectedGroupIndex === 0;
  }
  get nextDisabled(): boolean {
    return this.selectedGroupIndex === this.groups.length - 1;
  }

  get enrolledInThisGroup(): boolean {
    return this.selectedGroup !== null && this.selectedGroup.partecipants.includes(this.studentId);
  }

  get enrolledInAnotherGroup(): boolean {
    return this.groups.some((group, index) => index !== this.selectedGroupIndex && group.partecipants.includes(this.studentId));
  }

  /* METHODS */

  async authenticate(): Promise<void> {
    const { token, user } = await this.$api.auth.loginStudent(this.accessToken, this.studentId);

    this.token = token;
    this.student = user;

    this.$api.token = token;
  }

  back(): void {
    this.selectedGroupIndex--;
  }

  next(): void {
    if (!this.nextDisabled) {
      this.selectedGroupIndex++;
    }
  }

  /* LIFE CYCLE */

  async created() {
    try {
      await this.authenticate();

      this.groups = await this.$api.courses.groups(this.courseId).getAll();
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style>
@import "vuetify/dist/vuetify.min.css";
</style>

<style>
/* This is because vuetify uses rem, so to make it behave everywhere the same I set the root font-size */
:host {
  font-size: 100px!important;
}

* {
  text-align: left;
}
</style>