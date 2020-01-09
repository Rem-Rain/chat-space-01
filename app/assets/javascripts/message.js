$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
     `<div class="message" data-message-id="${message.id}">
       <div class="message__upper-info">
        <div class="message__upper-info__talker">
         ${message.user_name}
          </div>
          <div class="message__upper-info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message__text">
          <p class="message__text__content">
            ${message.content}
            </p>
          </div>
        <img class="message__text__img" src=${message.image} >
        </div>`
     return html;
   } else {
      var html = 
      `<div class="message" data-message-id="${message.id}">
        <div class="message__upper-info">
          <div class="message__upper-info__talker">
            ${message.user_name}
          </div>
          <div class="message__upper-info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message__text">
          <p class="message__text__content">
            ${message.content}
            </p>
          </div>
        </div>`
      return html;
   };
 }
  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);      
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  })
  
});