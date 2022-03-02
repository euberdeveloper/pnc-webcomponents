import Vue from 'vue';
import '@/plugins/vuetify';
import '@/plugins/api';

import wrap from '@vue/web-component-wrapper';
import PncGroupRegistration from '@/webcomponents/PncGroupRegistration.vue';

const CustomElement = wrap(Vue, PncGroupRegistration);
window.customElements.define('pnc-group-registration', CustomElement as unknown as CustomElementConstructor);