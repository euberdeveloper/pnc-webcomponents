import { PncSDK } from '@prebenorwegian/sdk';

declare module 'vue/types/vue' {
    import Vue from 'vue';

    interface Vue {
        $api: PncSDK;
    }
}