import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import MenuRight from '@/components/icons/MenuRight.vue';
import MenuLeft from '@/components/icons/MenuLeft.vue';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        values: {
            'menu-right': {
                component: MenuRight
            },
            'menu-left': {
                component: MenuLeft
            }
        }
    }
});
