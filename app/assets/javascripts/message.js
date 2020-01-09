$(function(){ 
  var buildHTML = function(message) {
    if (message.content && message.image) {
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
    } else if (message.content) {
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
    } else if (message.image) {
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
          <img class="message__text__img" src=${message.image} >
          </div>
        </div>`
   };
   return html;
};
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
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id =  $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message); 
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});