import { defineConfig } from 'vitepress'
import imageFigures from 'markdown-it-image-figures';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';
import markdownItVideo from 'markdown-it-video';
import { withMermaid } from "vitepress-plugin-mermaid";
import elk from "elkjs";

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  title: "Liquid Staking",
  description: "Liquid Staking on Pulsechain",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/image/logo.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Dashboard', link: 'https://dash.vouch.run/' },
      //{ text: 'Website', link: 'https://vouch.run' },
      { text: 'Join Our Telegram', link: 'https://t.me/vouchrun/' },
    ],
     sidebar: {
      "/docs/": docs(),
    },
    search: {
      provider: 'local'
    },
    outline: {
      level: [1,4],
      // label: 'Contents',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vouchrun/' },
      { icon: 'twitter', link: 'https://x.com/vouchlsd' },
      //{ icon: 'telegram', link: 'https://t.me/vouchrun/' } // https://vitepress.dev/reference/default-theme-config#sociallinks
    ],
  },
  markdown: {
    math: true,
    config: (md) => {
      md.use(imageFigures, {
        figcaption: 'title',
        copyAttrs: '^class$',
      }),
      md.use(tabsMarkdownPlugin),
      md.use(markdownItVideo, {
        youtube: {
          width: 560,
          height: 315,
          rel: 0,
          start: 10, // start the video at 18 seconds
        }
      });
    },
  },
  mermaid: {
    // Mermaid configuration options go here
    elk: elk,
    // theme: 'default', // default, forest, dark, neutral
  },
  data: {
    myVariable: 'Hello, World!',
  },
  ignoreDeadLinks: [
    // ignore all localhost links
    /^https?:\/\/localhost/,
  ],
}));


function docs(){
  return [
    {
      text: "Introduction",
      collapsed: false,
      items: [
        {text: "Intro to LSDs", link: "/docs/introduction/intro_to_LSD"},
        {text: "Vouch Overview", link: "/docs/introduction/vouch_overview"},
        {text: "VOUCH Token Launch", link: "/docs/introduction/VOUCH_Token_Launch"},        
        ]
    },
    {
      text: "User Guide",
      collapsed: false,
        items: [
           {text: "User App Intro", link: "/docs/user_guide/user_staking_intro"},
          ]
    },

        {
          text: "Validator Guide", // https://docs.stafi.io/ethvalidator/
          collapsed: true,
          items: [
            {text: "Getting Started", link: "/docs/validator_guide/getting_started"},
            {text: "Validator Staking Guide", link: "/docs/validator_guide/validator_staking_guide"},
            {text: "pulse-staking-deposit-cli", link: "/docs/validator_guide/pulse-staking-deposit-cli"},
            {text: "Ejector Client", link: "/docs/validator_guide/ejector_client"},
            {text: "Exiting a Validator", link: "/docs/validator_guide/exiting_validators"},
          ]
        },
      {
        text: "Vouch Ecosystem",
        collapsed: false,
        items: [
          {text: "Ecosystem Overview", link: "/docs/vouch_ecosystem/Ecosystem_Overview"},
          {text: "Vouch LSD Protool", link: "/docs/vouch_ecosystem/vouch_lsd"},
          {text: "vPLS (LST) Token", link: "/docs/vouch_ecosystem/vPLS_Token"},
          {text: "VOUCH & Distributor", link: "/docs/vouch_ecosystem/VOUCH_Distributor"},
          {text: "VOUCH Token", link: "/docs/vouch_ecosystem/VOUCH_Token"},
          {text: "Vouch DAO", link: "/docs/vouch_ecosystem/Vouch_DAO"},
          ]
        },
        {
          text: "Governance",
          collapsed: true,
          items: [
            // {text: "Introduction", link: "/docs/governance/introduction"},
            // {text: "VOUCH Token", link: "/docs/governance/vouch_token"},
            {text: "Relay", link: "/docs/governance/relay"},
            {text: "Relay Client (Voter)", link: "/docs/governance/relay_client"},
          ]
        },
        {
          text: "Downloads",
          collapsed: true,
          items: [
            {text: "Branding kit", link: "/docs/downloads/branding_kit/"},
            {text: "Audits", link: "/docs/downloads/audits/"},
          ]
        },

    {
      text: "Terms of Use",
      link: "/docs/terms/terms.md"
    },
  ]
}





