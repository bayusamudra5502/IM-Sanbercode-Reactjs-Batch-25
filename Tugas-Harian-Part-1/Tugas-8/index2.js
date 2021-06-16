var readBooksPromise = require('./promise.js')
 
var books = [
    {name: 'LOTR', timeSpent: 3000}, 
    {name: 'Fidas', timeSpent: 2000}, 
    {name: 'Kalkulus', timeSpent: 4000}
]
 
// Lanjutkan code untuk menjalankan function readBooksPromise 

function bacaBuku(time=10000){
    if(books.length > 0){
        readBooksPromise(time, books.shift())
            .then(newTime => bacaBuku(newTime))
            .catch(() => {});
    }
}

bacaBuku();