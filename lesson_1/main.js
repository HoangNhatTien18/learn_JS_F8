// var postApi = 'http://localhost:3000/Book';

// fetch(postApi)
//     .then(function(response){   
//         return response.json();
//     })

//     .then(function(books){
//         var htmls = books.map(function(book){
//             return `<li>
//                 <img src="${book.img}">
//                 <h1>Tên Sách: ${book.name}</h1>
//                 <h2>Tác giả: ${book.author}</h2>
//             </li>`
//         });
//         document.getElementById('book-list').innerHTML = htmls.join('\n');
//     }).catch(function(){
//         var html = `<img src="https://www.elegantthemes.com/blog/wp-content/uploads/2020/08/000-http-error-codes.png" alt="">`
//         document.getElementById('comment-Block').innerHTML = html;
//     })