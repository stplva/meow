'use strict';

//---------------------PRELOADER-------------------

window.addEventListener('load', function () {
  var preloader = document.querySelector('.preloader');
  preloader.style = 'display: none; opacity: 0';
});

//--------------------- POP UPS: LOGIN / REGISTER-------------------

var popUpBtns = document.querySelectorAll('.popUpBtn'),
  popUpClose = document.querySelectorAll('.close'),
  popUpMenuBtn = document.querySelector('a.popUpBtn');

// GENERAL
popUpBtns.forEach(function (item) {
  item.addEventListener('click', function () {
    //hide all popUps
    var popUp = document.querySelectorAll('.popUp');
    popUp.forEach((item) => {
      item.style.display = 'none';
    });
    //display the needed one
    var popUpName = item.getAttribute('data-popup');
    document.getElementById(popUpName).style.display = 'block';
  });
});

popUpClose.forEach(function (item) {
  item.addEventListener('click', function () {
    var popUp = item.closest('.popUp');
    popUp.style.display = 'none';
  });
});

// POPUP + LEFT MENU
window.addEventListener('click', function (e) {
  // close popUp
  if (e.target.classList.contains('popUp')) {
    e.target.style.display = 'none';
  }

  // close left menu when link is clicked
  if (e.target.classList.contains('menuItem')) {
    removeClassActive();
  }
  //close left menu
  else if (e.target.classList.contains('blurredBg')) {
    removeClassActive();
  }
});

document.querySelector('a.popUpBtn').addEventListener('click', function (e) {
  e.preventDefault();
});

//EASY EXAMPLE - ONE POPUP

// popUpBtn.onclick = function() {
//   popUp.style.display = "block";
// };

// popUpClose.onclick = function () {
//   popUp.style.display = "none";
// }

// window.onclick = function (e) {
//   if (e.target == popUp) {
//     popUp.style.display = "none";
//   }
// }

//---------------------LEFT MENU-------------------

var menuButton = document.querySelector('.menuButton');
var menu = document.querySelector('.menu');
var blurredBg = document.querySelector('.blurredBg');

menuButton.addEventListener('click', function (e) {
  e.preventDefault();

  menu.classList.toggle('active');
  menuButton.classList.toggle('active');
  blurredBg.classList.toggle('active');
});

// remove class .active
function removeClassActive() {
  menu.classList.remove('active');
  menuButton.classList.remove('active');
  blurredBg.classList.remove('active');
}

//---------------------TYPE WRITER-------------------

//ES6
class TypeWriter {
  constructor(txtElement, words, wait) {
    this.txtElement = txtElement;
    this.words = words;
    this.wait = wait;
    this.wordIndex = 0;
    this.txt = '';
    this.isDeleting = false;
    this.type();
  }
  type() {
    var speed = 500,
      currentIndex = this.wordIndex % this.words.length,
      currentWord = this.words[currentIndex];

    if (this.isDeleting) {
      speed = speed / 2;
      this.txt = currentWord.substring(0, this.txt.length - 1);
    } else {
      speed = 500;
      this.txt = currentWord.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = this.txt;

    if (!this.isDeleting && this.txt === currentWord) {
      this.isDeleting = true;
      speed = this.wait;
    } else if (this.isDeleting && this.txt === '') {
      this.wordIndex++;
      this.isDeleting = false;
    }

    setTimeout(() => this.type(), speed);
  }
}
document.addEventListener('DOMContentLoaded', init);
function init() {
  var txtElement = document.querySelector('.typeWriterText'),
    words = JSON.parse(txtElement.getAttribute('data-words')),
    wait = txtElement.getAttribute('data-wait');

  new TypeWriter(txtElement, words, wait);
}

//EZ VARIANT
// var message = "Do you like cats?",
//   time = 200,
//   i = 0;
//
// function typeWriter() {
//   if (i <= message.length) {
//     var txt = message.substring(0, i);
//     document.getElementById('typeWriter').innerHTML = txt;
//
//     setTimeout(typeWriter, time);
//     i++;
//   } else {
//     i = 1;
//     document.getElementById('typeWriter').innerHTML = "&nbsp;";
//     setTimeout("typeWriter()", 1000);
//   }
// };
// typeWriter();

//---------------------TABS-------------------

var tab = function () {
  var tabNav = document.querySelectorAll('.tabsNavItem'),
    tabContent = document.querySelectorAll('.tab'),
    tabName;

  tabNav.forEach((item) => {
    item.addEventListener('click', selectTabNav);
  });

  function selectTabNav() {
    tabNav.forEach((item) => {
      item.classList.remove('isActive');
    });
    this.classList.add('isActive');
    tabName = this.getAttribute('data-tab-name');
    selectTabContent(tabName);
  }

  function selectTabContent(tabName) {
    tabContent.forEach((item) => {
      item.classList.contains(tabName)
        ? item.classList.add('isActive')
        : item.classList.remove('isActive');
    });
  }
};

tab();

//---------------------TO TOP BUTTON APPEARANCE-------------------

var scrollTop = document.querySelector('.toTop');

window.addEventListener('scroll', function trackScroll() {
  var scrolled = window.pageYOffset;

  if (scrolled > 250) {
    scrollTop.style.opacity = '1';
  } else {
    scrollTop.style.opacity = '0';
  }
});
