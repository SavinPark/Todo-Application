// test code

fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });


// server code
// --------------------------------------- // 
// app.put('/todos/:dailyKey');
// // ---- POST ---- 
app.post('/todos/:dailyKey', function(req, res, next) {
  let body = req.body;
 
  models.post.create({
    todoCode : body.todoCode,
    date: body.date,
    title: body.title,
    contents: body.contents,
    done: body.done,
    edit: body.edit,
    delete: body.delete
  })
 });
 
 // ---- UPATE ----
 app.get('/todos/:todoCode', function() {
   let code = req.params.todoCode;
   let body = req.body;
 
   models.post.update({
     todoCode : body.todoCode,
     date: body.date,
     title: body.title,
     contents: body.contents,
     done: body.done,
     edit: body.edit,
     delete: body.delete
   },{
     where:{
       todoCode : todoCode,
       date: dailyKey
     }
   })
     .then(result => {
       console.log('수정 완료');
       res.redirect("/todos/:todoCode");
     })
     .catch(error => {
       console.log('수정 실패');
     }
   );
 });
 // // ---- DELETE ---- 
 app.delete('/todos/:dailyKey', function () {
   console.log("DELETE");
 
   models.post.delete({
     todoCode : body.todoCode,
     date: body.date,
     title: body.title,
     contents: body.contents,
     done: body.done,
     edit: body.edit,
     delete: body.delete
   },{
     where:{
       todoCode : todoCode,
       date: dailyKey
     }
   })
 });
 
 // ----------------------------------------- //