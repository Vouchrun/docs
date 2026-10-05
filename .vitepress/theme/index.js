import DefaultTheme from 'vitepress/theme';
import { useData, useRoute } from 'vitepress';
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client';
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import VouchWidget from './components/VouchWidget.vue';
import Layout from './Layout.vue';
//import { Steps, Tab, Tabs } from 'nextra-theme-docs';

import './index.css';

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    // Register global components, if you don't want to use it, you don't need to add it
    ctx.app.component('vImageViewer', vImageViewer);
    ctx.app.component('VouchWidget', VouchWidget);
    // ...
  },
  setup() {
    const route = useRoute();
    const { isDark } = useData();
    // Re-init the image viewer when the theme changes, so the zoom overlay shows
    // the active theme's image. Viewer.js caches images at init and the plugin
    // only re-inits on route change, so a theme-aware pseudo-route is passed to
    // make its internal watch fire on isDark changes too.
    imageViewer({
      get path() {
        return `${route.path}${isDark.value ? '#dark' : '#light'}`;
      },
    });
  },
  enhanceApp({ app }) {
    enhanceAppWithTabs(app);
  },
};
