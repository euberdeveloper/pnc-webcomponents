<template>
  <v-app style="max-width: 440px">
    <v-main>
      <group-card :group="groups[0]" v-if="groups.length" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Group, Student } from "pnc-sdk";

import GroupCard from "@/components/group-card/GroupCard.vue";

@Component({
  components: {
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

  /* METHODS */

  async authenticate(): Promise<void> {
    const { token, user } = await this.$api.auth.loginStudent(this.accessToken, this.studentId);

    this.token = token;
    this.student = user;

    this.$api.token = token;
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