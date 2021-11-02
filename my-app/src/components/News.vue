<template>
  <div id="news">
    <div class="add_news_form">
      <!-- <input class="news_title" type="text" v-model="newsTitle" placeholder="Введіть назву новини"> -->
      <textarea class="textarea_news" v-model="newsBody" placeholder="Введіть новину"></textarea><br>
      <button class="add_news_button" @click="addNews">Додати новину</button>
    </div>
    <div class="all_news">
      <div class="single_news" v-for="(news, index) in allNews" :key="index">
        <!-- <p>{{ news.newsTitle }}</p> -->
        <p>{{ news }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'News',
    data(){
      return {
        allNews: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        ],
        // newsTitle: '',
        newsBody: ''
      }
    },
    methods: {
      addNews() {
        if (this.newsBody) {
          this.allNews.push(this.newsBody);
          this.newsBody = '';
        } else {
          return
        }
      }
    }
  }
</script>

<style scoped>
  .add_news_form, .all_news {
    width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  .news_title {
    width: 100%;
  }
  .textarea_news {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid silver;
    border-radius: 15px;
  }
  .add_news_button {
    border: 1px solid silver;
    /* border-radius: px; */
  }
  .all_news {
    width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
  .single_news {
    margin-top: 20px;
    margin-bottom: 30px;
    border: 1px solid silver;
    padding: 15px;
    border-radius: 15px;
    background-color: #ededed;
  }
</style>
