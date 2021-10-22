module.exports = {
   devServer: {
      proxy: {
        '^/api': {
          target: 'http://localhost:3080',
          changeOrigin: true
        },
      }
    },
    pages: {
      'main_page': { // index
        entry: './src/entry/main_page.js',
        template: './src/pages/main_page.html',
        title: 'Index-html from pages'
      },
      'my_tasks': {
        entry: './src/entry/my_tasks.js',
        template: './src/pages/my_tasks.html',
        title: 'About-html from pages'
      },
      'set_task': {
        entry: './src/entry/set_task.js',
        template: './src/pages/set_task.html',
        title: 'About-html from pages'
      },
      'settings': {
        entry: './src/entry/settings.js',
        template: './src/pages/settings.html',
        title: 'About-html from pages'
      },
      'index': { // avtoriz
        entry: './src/entry/avtoriz.js',
        template: './src/pages/avtoriz.html',
        title: 'About-html from pages'
      },
      'news': {
        entry: './src/entry/news.js',
        template: './src/pages/news.html',
        title: 'About-html from pages'
      },
      'users': {
        entry: './src/entry/users.js',
        template: './src/pages/users.html',
        title: 'About-html from pages'
      },

    }
  }
