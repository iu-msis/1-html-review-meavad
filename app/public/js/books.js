
const booksApp = {
    data() {
      return {
        result: undefined,
        app: 0,
        books: [],
        bookForm: {},
        selectedBook: null
      }
    }, 
    
    computed: {
    },
    
    methods: {
        prettyData(d) {
            return dayjs(d)
            .format('D MMM YYYY')
        },
    
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
    
        fetchBookData() {
            fetch('/api/books/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        postNewBook(evt) {

    
            fetch('api/books/create.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                this.books = json;
                
                // reset the form
                this.bookForm = {};
              })
            },
            selectBookToEdit(o) {
              this.selectedBook = o;
              this.bookForm = Object.assign({}, this.selectedBook);
          },
          postDeleteBook(o) {
              if (!confirm("Do you want this book to be deleted?")) {
                return;
              }
              console.log("Delete", o);
      
              fetch('api/books/delete.php', {
                  method:'POST',
                  body: JSON.stringify(o),
                  headers: {
                    "Content-Type": "application/json; charset=utf-8"
                  }
                })
                .then( response => response.json() )
                .then( json => {
                  console.log("Returned from post:", json);
                  this.books = json;
                  this.resetBookForm();
                });
            },
            resetBookForm() {
              this.selectedBook = null;
              this.bookForm = {};
          },
          postBook(evt) {
              if (this.selectedBook === null) {
                  this.postNewBook(evt);
              } else {
                  this.postEditBook(evt);
              }
            },
            postEditBook(evt) {
  
              console.log("Updating", this.bookForm);
      
              fetch('api/books/update.php', {
                  method:'POST',
                  body: JSON.stringify(this.bookForm),
                  headers: {
                    "Content-Type": "application/json; charset=utf-8"
                  }
                })
                .then( response => response.json() )
                .then( json => {
                  console.log("Returned from post:", json);
                  // TODO: test a result was returned!
                  this.books = json;
      
                  // reset the form
                  this.resetBookForm();
  
                });
            },
          },
    
    created() {
        this.fetchBookData();
    }
}
Vue.createApp(booksApp).mount('#booksApp');