<template>
  <div id="news">
    <div class="news_part">
          <div class="all_news">
            <h2>Новини компанії</h2>
            <div class="single_news" v-for="(news, index) in allNews" :key="index">
              <!-- <p>{{ news.newsTitle }}</p> -->
              <!-- <p>{{ news }}</p> -->
              <div class="news_creator_photo">
                <img class="creator_photo" :src="require(`../assets/images/${userPhoto}`)">
              </div>
              <div class="single_news_body">
                <p class="news_creator_name">
                  {{ userName }}
                </p>
                <p class="news_text">{{ news }}</p>
              </div>
            </div>


          </div>
          <div class="news_aside_part">
            <div class="add_news_form">
              <h3>Додати новину</h3>
              <!-- <input class="news_title" type="text" v-model="newsTitle" placeholder="Введіть назву новини"> -->
              <textarea class="textarea_news" v-model="newsBody" placeholder="Введіть текст"></textarea><br>
              <button class="add_news_button" @click="addNews">Додати</button>
            </div>
<!-- ****************************************************************************** -->
                <div id="m-booked-prime-days-16817">
                  <div class="weather-customize widget-type-prime-days">
                    <div class="booked-prime-days-in">
                      <div class="booked-prime-days-data">
                        <div class="booked-pd-today">
                          <div class="booked-pd-today-img wrz-18 "></div>
                          <div class="booked-pd-today-temperature">
                            <div class="booked-wzs-pd-val">
                              <div class="booked-wzs-pd-number">
                                <span class="plus">+</span>13
                                </div>
                              <div class="booked-wzs-pd-dergee">
                                <div class="booked-wzs-pd-dergee-val">&deg;
                                </div>
                                <div class="booked-wzs-pd-dergee-name">C</div>
                              </div>
                            </div>
                          </div>
                          <div class="booked-pd-today-extreme">
                            <div class="booked-pd booked-pd-h">
                              <span>Макс.:</span>
                              <span class="plus">+</span>14
                            </div>
                            <div class="booked-pd booked-pd-l">
                              <span>Мін.:</span>
                              <span class="plus">+</span>11</div>
                          </div>
                        </div>
                        <div class="booked-pd-ndays">
                          <div class="booked-pd-nitem">
                            <div class="booked-pd-nidi wrz-sml wrzs-01"></div>
                            <div class="booked-pd-nidw">Ср</div>
                          </div>  <div class="booked-pd-nitem">
                          <div class="booked-pd-nidi wrz-sml wrzs-03"></div>
                          <div class="booked-pd-nidw">Чт</div>
                        </div>  <div class="booked-pd-nitem">
                        <div class="booked-pd-nidi wrz-sml wrzs-03"></div>
                        <div class="booked-pd-nidw">Пт</div>
                      </div>  <div class="booked-pd-nitem">
                        <div class="booked-pd-nidi wrz-sml wrzs-01"></div>
                        <div class="booked-pd-nidw">Сб</div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
<!-- ****************************************************************************** -->
          </div>
        </div>
  </div>
</template>

<script>
  export default {
    name: 'News',
    data(){
      return {
        allNews: [],
        // newsTitle: '',
        newsBody: '',
        userName: localStorage.getItem("name"),
        userPhoto: localStorage.getItem("photo"),
      }
    },
    methods: {
      addNews() {
        if (this.newsBody) {
          this.allNews.unshift(this.newsBody);
          this.newsBody = '';
        } else {
          return
        }
      }
    }
  }
</script>

<style scoped>
  .all_news {
    width: 80%;
  }
  .news_creator_photo{
    overflow: hidden;
  }
  .creator_photo {
    height: 100%;
    width: 100%
  }
</style>
