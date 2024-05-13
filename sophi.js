const pump = document.getElementById("pump");
const meter = document.getElementById("meter");
const message = document.getElementById("message");
const message2 = document.getElementById("message-2");
const markiplier = document.getElementById("markiplier");
const nextButton = document.getElementById("nextButton");
const congratsSound = document.getElementById("congratsSound");
const boowomp = document.getElementById("boowomp");
const boowomp2 = document.getElementById("boowomp2");
const boowomp3 = document.getElementById("boowomp3");
const policeGun = document.getElementById("police-gun");
const animeGirl = document.getElementById("anime-girl");
const spongebob = document.getElementById("spongebob");
const xqc = document.getElementById("xqc");
const xqcSmash = document.getElementById("xqc-smash");
const xqcSmash2 = document.getElementById("xqc-smash2");
const noButton = document.getElementById("jump");
const kawaii = document.getElementById("kawaii-cute-gif");
const message3 = document.getElementById("message-3");
const dattebayo = document.getElementById("dattebayo");
const araara = document.getElementById("araara");
const xqcThumbs = document.getElementById("xqc-thumbsup");
const angryAnime = document.getElementById("angry-anime");
const kiss = document.getElementById("kiss");

let charge = 0;
let jumpCounter = 0;

pump.addEventListener("click", pumpCharge);

message.textContent = "click to fill me up pls";
message.style.color = "black";
message.style.display = "block";
markiplier.style.display = "none";
nextButton.style.display = "none";
policeGun.style.display = "none";
animeGirl.style.display = "none";
spongebob.style.display = "none";
xqc.style.display = "none";
noButton.style.display = "none";
kawaii.style.display = "none";
message3.style.display = "none";
xqcThumbs.style.display = "none";
angryAnime.style.display = "none";
kiss.style.display = "none";

function pumpCharge() {
  charge += Math.floor(Math.random() * 6) + 1;
  if (charge > 15 && charge < 45) {
    message.textContent = "keep going";
  }
  if (charge > 45 && charge < 70) {
    message.textContent = "halfway there >.<";
  }
  if (charge > 70 && charge < 100) {
    message.textContent = "almost there click faster...";
  }
  if (charge >= 100) {
    charge = 100;
    congratsSound.play();
    message.textContent = "u did it :)))";
    markiplier.style.display = "block";
    nextButton.style.display = "block";
    pump.removeEventListener("click", pumpCharge);
  }
  meter.style.height = charge + "%";
}

function closePage1() {
  pump.style.display = "none";
  markiplier.style.display = "none";
  page2();
}

nextButton.addEventListener("click", closePage1);

function page2() {
  nextButton.removeEventListener("click", closePage1);
  message2.innerText = "click on the police man's gun to steal it";
  policeGun.style.display = "block";
  nextButton.style.display = "none";
  nextButton.innerText = "okay fine";
  policeGun.addEventListener("click", page3);
}

function page3() {
  policeGun.style.display = "none";
  animeGirl.style.display = "block";
  spongebob.style.display = "block";
  boowomp.play();
  setTimeout(() => {
    boowomp2.play();
  }, 500);
  setTimeout(() => {
    boowomp3.play();
  }, 1000);

  message2.innerText =
    "ha! you fell right for my trap! you have been caught and now u must go to jail.";
  nextButton.style.display = "block";
  nextButton.innerText = "womp womp";
  nextButton.removeEventListener("click", page3);
  nextButton.addEventListener("click", page4);
}

function page4() {
  message2.innerText =
    "fortunately, xQc found out about you going to jail. he has decided that a queen like u deserves better and has paid for your bail. now that he has generously set u free, you can answer one last question...";
  message.style.width = "60%";
  animeGirl.style.display = "none";
  spongebob.style.display = "none";
  xqc.style.display = "block";
  setTimeout(() => {
    xqc.style.display = "none";
    xqcThumbs.style.display = "block";
  }, 3000);
  nextButton.innerText = "ok";
  xqcSmash.play();
  setTimeout(() => {
    xqcSmash2.play();
  }, 800);
  nextButton.removeEventListener("click", page4);
  nextButton.addEventListener("click", page5);
}

function page5() {
  xqc.style.display = "none";
  xqcThumbs.style.display = "none";
  message2.innerText = "will u be my gf?";
  message2.style.fontSize = "26px";
  message2.style.width = "65%";
  nextButton.innerText = "yes";
  noButton.style.display = "block";
  kawaii.style.display = "block";
  message3.style.display = "block";
  message3.innerText = "(you can't click no)";
  nextButton.removeEventListener("click", page5);
  nextButton.addEventListener("click", finalPage);
}

function finalPage() {
  noButton.style.display = "none";
  kawaii.style.display = "none";
  angryAnime.style.display = "none";
  message3.innerText = "the end. (refresh page to play again)";
  message2.innerText = "i knew u would say yes <3";
  kiss.style.display = "block";
  nextButton.style.display = "none";
  araara.play();
}

function jump() {
  var x = Math.round(Math.random() * 90) + "%",
    y = Math.round(Math.random() * 90) + "%";
  document.getElementById("jump").style.left = x;
  document.getElementById("jump").style.top = y;
  jumpCounter++;

  if (jumpCounter > 2) {
    message3.innerText = "just click yes already! 0.o";
    kawaii.style.display = "none";
    angryAnime.style.display = "block";
    dattebayo.play();
  }
}
