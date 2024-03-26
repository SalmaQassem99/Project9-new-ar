const popupModal = document.querySelector(".popup");
const popupOverlay = document.querySelector(".pop-overlay");
const game = document.querySelector(".game");
const playButton = document.querySelector(".game .card-wrapper .play");
const cardWrapper = document.querySelector(".game .cardContainer");
const body = document.querySelector(".body");
const infoIcon = document.querySelector(".info.icon");
const scoreWrapper = document.querySelector(".game .scoreWrapper");
const score = document.querySelector(".game .scoreItem .score");
const matchItems = document.querySelectorAll(
  ".match-cards .match-card .img-container .match-img"
);
const cardItems = document.querySelectorAll(
  ".cards .card .img-container .card-img"
);
const successModal = document.querySelector(".success-wrapper");
const arrows = document.querySelectorAll(".game .body .arrow");
const pauseButton = document.querySelector(".game .pause.icon");
const iconsArr = [...arrows, pauseButton];
let animationCounter = 0;
let counter = 0;

const animateInfo = () => {
  infoIcon.classList.add("show");
  infoIcon.addEventListener("animationend", () => {
    setTimeout(() => {
      infoIcon.classList.remove("show");
      infoIcon.classList.add("hide");
    }, 1000);
  });
};
infoIcon.addEventListener("click", () => {
  infoIcon.classList.remove("hide");
  animateInfo();
});
const animateNext = (i) => {
  matchItems[i].style.visibility = "visible";
  matchItems[i].classList.add("show");
  matchItems[i].addEventListener("animationend", () => {
    if (matchItems[i].classList.contains("show")) {
      matchItems[i].classList.remove("show");
      if (animationCounter === matchItems.length - 1) {
        //animate cards
        cardItems.forEach((item) => {
          item.style.visibility = "visible";
          item.classList.add("show");
          item.addEventListener("animationend", () => {
            if (item.classList.contains("show")) {
              item.classList.remove("show");
            }
          });
        });
      } else {
        animationCounter++;
        animateNext(animationCounter);
      }
    }
  });
};
playButton.addEventListener("click", () => {
  document.querySelector("#start-audio").play();
  cardWrapper.classList.add("hide");
  cardWrapper.addEventListener("animationend", () => {
    cardWrapper.classList.remove("hide");
    cardWrapper.style.visibility = "hidden";
    scoreWrapper.style.visibility = "visible";
    score.textContent = `0/${cardItems.length}`;
    body.classList.add("show");
    pauseButton.style.visibility = "visible";
    animateNext(animationCounter);
  });
});
pauseButton.addEventListener("click", () => {
  const hiddenIcon = pauseButton.querySelector("i.hide");
  const shownIcon = pauseButton.querySelector("i:not(.hide)");
  hiddenIcon.classList.remove("hide");
  shownIcon.classList.add("hide");
});
cardItems.forEach((cardItem) => {
  cardItem.addEventListener("dragstart", (event) => {
    event.stopPropagation();
    event.dataTransfer.setData("id", cardItem.dataset.index);
    document.querySelector(`audio[id="${cardItem.dataset.index}"]`).play();
  });
  cardItem.addEventListener("drag", (event) => {
    cardItem.style.opacity = "0";
  });
  cardItem.addEventListener("dragend", (event) => {
    cardItem.style.opacity = "1";
  });
});
matchItems.forEach((matchItem) => {
  matchItem.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  matchItem.addEventListener("drop", (event) => {
    event.preventDefault();
    const index = matchItem.dataset.index;
    const cardId = event.dataTransfer.getData("id");
    const cardItem = document.querySelector(
      `.cards .card .img-container .card-img[data-index="${cardId}"]`
    );
    if (index === cardId) {
      counter += 1;
      score.textContent = `${counter}/${matchItems.length}`;
      document
        .querySelector(":root")
        .style.setProperty(
          "--width",
          `${(100 / matchItems.length) * counter}%`
        );
      const matchedImg = document.querySelector(
        `.match-cards .match-card .img-container .matched-img[data-index="${cardId}"]`
      );
      matchedImg.src = cardItem.src;
      matchedImg.style.visibility = "visible";
      matchItem.parentElement.parentElement.classList.add("animate");
      matchItem.parentElement.parentElement.addEventListener(
        "animationend",
        () => {
          matchItem.parentElement.parentElement.classList.remove("animate");
        }
      );
      document
        .querySelector(`audio[id="${event.target.dataset.index}"]`)
        .play();
      cardItem.style.visibility = "hidden";
      const audio = document.querySelector("#correct-audio");
      audio.play();
      audio.addEventListener("ended", () => {
        if (counter === matchItems.length) {
          const text = document.querySelector(".text-card .score-text");
          text.textContent = `${counter}/${matchItems.length}`;
          text.setAttribute("text", `${counter}/${matchItems.length}`);
          successModal.style.visibility = "visible";
          successModal.classList.add("show");
          overlay.classList.add("show");
          document.querySelector(`audio[id="success"]`).play();
        }
      });
    } else {
      document.querySelector("#wrong-audio").play();
      cardItem.classList.add("vibrate");
      cardItem.addEventListener("animationend", () => {
        if (cardItem.classList.contains("vibrate")) {
          cardItem.classList.remove("vibrate");
        }
      });
    }
  });
});
const hideItems = () => {
  iconsArr.forEach((item) => {
    item.style.opacity = 0;
  });
};
let timer;
const resetTimer = () => {
  clearTimeout(timer);
  iconsArr.forEach((item) => {
    item.style.opacity = 1;
  });
  timer = setTimeout(hideItems, 3000);
};
document.addEventListener("mousemove", resetTimer);
document.addEventListener("touchstart", resetTimer);
const checkScreen = () => {
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  const isMobile = window.innerWidth < 768 && isPortrait;
  return isMobile;
};
window.addEventListener("load", () => {
  const is_mobile = checkScreen();
  if (is_mobile) {
    popupModal.style.visibility = "visible";
    popupOverlay.style.visibility = "visible";
  } else {
    game.style.visibility = "visible";
  }
  animateInfo();
});
document.addEventListener("contextmenu", function (event) {
  var target = event.target;
  if (target.tagName === "IMG") {
    event.preventDefault();
  }
  return false;
});
window.addEventListener("orientationchange", function () {
  const is_mobile = checkScreen();
  if (window.orientation === 90 || window.orientation === -90) {
    if (is_mobile) {
      game.style.visibility = "visible";
      popupModal.style.visibility = "hidden";
      popupOverlay.style.visibility = "hidden";
    } else {
      popupModal.style.visibility = "visible";
      popupOverlay.style.visibility = "visible";
    }
  } else {
    popupModal.style.visibility = "visible";
    popupOverlay.style.visibility = "visible";
  }
});
