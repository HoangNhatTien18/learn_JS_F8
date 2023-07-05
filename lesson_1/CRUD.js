var Api = 'http://localhost:3000/Book'

function start(){
    getBooks(renderBooks);
    
    handleCreateForm();
    handleUpdateForm();
}
start()
function getBooks(callback) {
    fetch(Api)
        .then(function(response){
            return response.json();
        })
        .then(callback)
        
}


function renderBooks(books){
    var html = books.map(function(book){
        return html= `<li class="books-item-${book.id}">
            <img src="${book.img}">
                <h2 style="color: red">Tên sách: </h2>  
                <h3>${book.name}</h3>

                <h2 style="color: red">Tác giả: </h2>
                <h4>${book.author}</h4>

            <Button onclick="handleDeleteBook(${book.id})">Xoá</Button>
            <Button onclick="handleUpdateBook(${book.id})">Update</Button>
        </li>`
    });
    document.getElementById('book-list').innerHTML = html.join("\n");

}


function handleDeleteBook(id) {
    var options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }
    fetch(Api + '/' + id, options)
        .then(function(response){
            return response.json();
        })
        .then(function(){
            var bookItem = document.querySelector('.books-item-'+id);
            if(bookItem){
                bookItem.remove();
            }
        });
}

function createBook(data, callback){
    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    fetch(Api, options)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function handleCreateForm() {
    var btnCreate = document.querySelector('#create');
    btnCreate.onclick = function(){
        var img = document.querySelector('input[name="img"]').value;
        var name = document.querySelector('input[name="name"]').value;
        var author = document.querySelector('input[name="author"]').value;
        var formData = {
            img: img,
            name: name,
            author: author,
        }
        createBook(formData,  function(){
            getBooks(renderBooks);
        })
    }
}

//Xử lý Update

function updateBook(id,data, callback){
    var options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    fetch(Api+ '/'+ id, options)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function handleUpdateBook(id) {
    var btnUpdate = document.querySelector('#create');
    btnUpdate.innerText = 'Update';
    var img = document.querySelector('.books-item-' + id +' img').src;
    var name = document.querySelector('.books-item-' + id +' h3').innerText;
    var author = document.querySelector('.books-item-' + id +' h4').innerText;

    document.querySelector('input[name="img"]').value = img;
    document.querySelector('input[name="name"]').value = name;
    document.querySelector('input[name="author"]').value = author;

    btnUpdate.onclick = function() {
        var img =  document.querySelector('input[name="img"]').value;
        var name =  document.querySelector('input[name="name"]').value;
        var author =  document.querySelector('input[name="author"]').value;
        var formData = {
            img: img,
            name: name,
            author: author
        }
        updateBook(id,formData, function(){
            document.querySelector('input[name="img"]').value = "";
            document.querySelector('input[name="name"]').value = "";
            document.querySelector('input[name="author"]').value = "";
            btnUpdate.innerText = 'Create';
            getBooks(renderBooks);
        })
    };
    

    
}