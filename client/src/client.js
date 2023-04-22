// Event listener for DOM load. When DOM is loaded, loadDOM is called.
document.addEventListener("DOMContentLoaded", loadDOM);

const log = (text) => {
    const parent = document.querySelector('#events');
    const el = document.createElement('li');
    el.innerHTML = text;
  
    parent.appendChild(el);
    parent.scrollTop = parent.scrollHeight;
  };

  const saveUserName = (text) => {
    const el = document.querySelector("#displayUName");
    let userText = "Welcome " + text + "!";

    el.innerHTML = userText;
  }

  // Data Object Model (DOM) loading
function loadDOM()
{
}

const onUserNameSubmit = (sock) => (e) => {
  e.preventDefault();

  let input = document.querySelector('#uname');
  let text = input.value;
  input.value = '';

  sock.emit('username', text);
}

const onChatSubmitted = (sock) => (e) => {
  e.preventDefault();

  let input = document.querySelector('#chat');
  let text = input.value;
  input.value = '';

  sock.emit('message', text);
  };

  (() => {

    const sock = io();
    const canvas = document.querySelector('canvas');

    sock.on('message', log);
    sock.on('username', saveUserName);

    document
    .querySelector('#chat-form')
    .addEventListener('submit', onChatSubmitted(sock));

    document
    .querySelector('#uname-form')
    .addEventListener('submit', onUserNameSubmit(sock));
  })();