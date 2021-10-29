const SomeApp = {
  data() {
    return {
      person: {},
      list: [5,6,7,8],
      message: "Waiting ...",
    }
  },
  computed: {
      prettyBirthday() {
          return dayjs(this.person.dob.date)
          .format('D MMM YYYY')
      }
  },
  methods: {
      fetchUserData() {
          //Method 1:
          fetch('https://randomuser.me/api/')
          .then(response => response.json())
          .then((json) => {
              console.log("Got json back:", json);
              this.person = json.results[0];
              console.log("C");
          })
          .catch( (error) => {
              console.error(error);
          });
      },
      fetchBookData() {
          console.log("Fetching book data for ", s);
          fetch('/api/books/')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.books = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
      }
  },
  created() {
      this.fetchUserData();
      // this.fetchBookData();
  }
}
Vue.createApp(SomeApp).mount('#someApp');

// fetch('api/offer/create.php' , {
//     method: 'POST',
//     body: JSON.stringify(this.offerForm),
//     headers: {
//         "Content-Type": "application/json; charset=utf-8"
//     }
// })
// .then( response => response.json() )
// .then( json => {
//    console.log("Returned from post:", json);
//    this.offers = json;
//    this.offerForm={};
// })
