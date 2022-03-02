<template>
  <v-app style="max-width: 440px">
    <v-main>
      <group-card :group="selectedGroup" :backDisabled="backDisabled" :nextDisabled="nextDisabled" @back="back" @next="next" v-if="selectedGroup" />
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

  /* GETTERS */

  get selectedGroup(): Group | null {
    return this.groups[this.selectedGroupIndex] ?? null;
  }

  get backDisabled(): boolean {
    return this.selectedGroupIndex === 0;
  }
  get nextDisabled(): boolean {
    return this.selectedGroupIndex === this.groups.length - 1;
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

<style scoped>
@import "vuetify/dist/vuetify.min.css";
</style>