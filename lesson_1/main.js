var users = [
    {
        id: 1,
        name: 'John',
    },
    {
        id: 2,
        name: 'Tien',
    }
];

var comments = [
    {
        id: 1,
        users_id: 1,
        content: "Hello Tien",
    },
    {
        id: 2,
        users_id: 2,
        content: "Hi Jonh",
    }
];

function getComments(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve(comments);
        },1000)
    })
}
getComments()
    .then(function(comments){
    var userIds = comments.map(function(comment){
        return comment.users_id;
    });
    return getUsersById(userIds)
        .then(function(users) {
           return {
                users: users,
                comments: comments
           }
        })
        .then(function(data) {
            var commentBlock = document.getElementById('comment-Block');
            var html = '';
            var result = data.comments.forEach(function(comment) {
                var user = data.users.find(function(user) {
                    // console.log(comment.content);
                    return user.id === comment.users_id;
                });
                // console.log(user)
                html += `<li>${user.name}: ${comment.content}</li>`
            });
            commentBlock.innerHTML = html;
            // console.log(result);
        });
});


function getUsersById(userId) {
    return new Promise(function(resolve, reject) {
        var result = users.filter(function(user) {
            return userId.includes(user.id)
        })
        
        setTimeout(function() {
            resolve(result);
        },2000)
    })
}




