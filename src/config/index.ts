export default {
    API_URL: process.env.VUE_APP_API_URL,
    API_ACCESS_TOKEN: process.env.VUE_APP_API_ACCESS_TOKEN,
    API_TEST_STUDENT_ID: process.env.VUE_APP_API_TEST_STUDENT_ID,
    API_TEST_COURSE_ID: process.env.VUE_APP_API_TEST_COURSE_ID,
    AXIOS_WITH_CREDENTIALS: process.env.VUE_APP_AXIOS_WITH_CREDENTIALS === 'true',
    AXIOS_TIMEOUT: process.env.VUE_APP_AXIOS_TIMEOUT !== undefined ? +process.env.VUE_APP_AXIOS_TIMEOUT : 10000,
    VERSION: process.env.PACKAGE_VERSION ?? 'unknown'
};