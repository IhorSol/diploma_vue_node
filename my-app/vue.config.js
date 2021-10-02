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
      'index': {
        entry: './src/entry/index.js',
        template: './src/pages/index.html',
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
      'avtoriz': {
        entry: './src/entry/avtoriz.js',
        template: './src/pages/avtoriz.html',
        title: 'About-html from pages'
      }
    }
  }
