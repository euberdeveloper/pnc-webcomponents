<template>
  <div id="app">
    <pnc-group-registration :access-token="accessToken" :student-id="studentId" :course-id="courseId" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import CONFIG from '@/config';

import PncGroupRegistration from "@/webcomponents/PncGroupRegistration.vue";

@Component({
  components: {
    PncGroupRegistration,
  },
})
export default class App extends Vue {
  /* DATA */

  private accessToken = CONFIG.API_ACCESS_TOKEN;
  private studentId = CONFIG.API_TEST_STUDENT_ID;
  private courseId = CONFIG.API_TEST_COURSE_ID;
}
</script>

