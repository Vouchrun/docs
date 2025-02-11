import DefaultTheme from 'vitepress/theme';
import { useRoute } from 'vitepress';
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client';
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
//import { Steps, Tab, Tabs } from 'nextra-theme-docs';

import './index.css';

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    // Register global components, if you don't want to use it, you don't need to add it
    ctx.app.component('vImageViewer', vImageViewer);
    // ...
  },
  setup() {
    const route = useRoute();
    imageViewer(route);
  },
  enhanceApp({ app }) {
    enhanceAppWithTabs(app);
  },
};
