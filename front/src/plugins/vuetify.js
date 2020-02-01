import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            light: {
                primary: colors.amber,
                secondary: colors.grey.darken1,
                accent: colors.deepOrange,
                error: colors.red.accent3,
            },
            dark: {
                primary: colors.blue.lighten3,
            },
        }
    }
});
