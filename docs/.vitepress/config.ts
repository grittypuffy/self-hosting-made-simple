import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Self-hosting made simple",
  description: "A gentle introduction to self-hosting",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' }
    ],
    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Why?', link: '/why' },
          { text: 'Pre-requisites', link: '/pre-requisites' },
        ]
      },
      {
        text: 'Services',
        items: [
          { text: 'Piped', link: '/piped' },
          { text: 'Ente', link: '/ente' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/grittypuffy/self-hosting-made-simple' }
    ]
  }
})
