import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import IconMenuRight from '@/components/icons/IconMenuRight.vue';
import IconMenuLeft from '@/components/icons/IconMenuLeft.vue';
import IconAccount from '@/components/icons/IconAccount.vue';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        values: {
            'menu-right': {
                component: IconMenuRight
            },
            'menu-left': {
                component: IconMenuLeft
            },
            'account': {
                component: IconAccount
            }
        }
    }
});
