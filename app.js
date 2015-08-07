G = {};

function makeId() {
  var possible = 'abcdefghijklmnopqrstuvwxyz';

  var text = '';
  for (var i = 0; i < 4; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function makeIncentive($incentive, name) {
  $incentive.text(name + ' $');
  G.lastName = name;
}

function makeMessage($chat, name, message) {
  $chat.val($chat.val() + '\n' + name + ': ' + message);
}

$(document).ready(function() {
  var socket = io.connect('http://localhost:5000');

  $incentive = $('#incentive');
  $cmd = $('#cmd');
  $chat = $('#chat');

  makeIncentive($incentive, G.lastName = makeId());
  $incentive.click(function() {
    name = prompt('What is your name?');
    makeIncentive($incentive, name);
  });

  $cmd.keypress(function(event) {
    if (event.which === 13) {
      socket.emit('chat', {
        name: G.lastName,
        message: $cmd.val()
      });
      $cmd.val('');
    }
  });

  socket.on('connect', function() {
    console.log('Conntected to socket.');
  });

  socket.on('chat', function(data) {
    makeMessage($chat, data.name, data.message);
  });

  socket.emit('test', {}); // Due to bug
});

