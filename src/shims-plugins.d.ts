import { PncSDK } from 'pnc-sdk';

declare module 'vue/types/vue' {
    import Vue from 'vue';

    interface Vue {
        $api: PncSDK;
    }
}