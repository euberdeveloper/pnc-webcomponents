<template>
  <div>ciao {{ student ? student.email : null }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Student } from "pnc-sdk";

@Component
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


  /* LIFE CYCLE */

  async created() {
    try {
      const { token, user } = await this.$api.auth.loginStudent(this.accessToken, this.studentId);
      this.token = token;
      this.student = user;
    } catch (error) {
      console.error(error);
    }
  }
}
</script>