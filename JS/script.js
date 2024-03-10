/*const playButton = document.querySelector(".play");
const homePage = document.querySelector(".homepage");
const gamePage = document.querySelector(".game");
const matchItems = document.querySelectorAll(
  ".match-cards .match-card .img-container .match-img"
);
const cardItems = document.querySelectorAll(
  ".cards .card .img-container .card-img"
);
const matchContainers = document.querySelectorAll(".match-cards .match-card");
const cardContainers = document.querySelectorAll(".cards .card");
const scoreItem = document.querySelector(".score");
const successModal = document.querySelector(".success-card");
const closeButton = document.querySelector(".closeModal");
const overlay = document.querySelector(".overlay");
let animationCounter = 0;
let counter = 0;
playButton.addEventListener("click", () => {
  document.querySelector("#start-audio").play();
  homePage.classList.add("hide");
  homePage.addEventListener("animationend", () => {
    homePage.classList.remove("hide");
    homePage.style.visibility = "hidden";
    gamePage.style.visibility = "visible";
    matchContainers.forEach((card) => {
      card.style.visibility = "visible";
      card.classList.add("show");
      card.addEventListener("animationend", () => {
        animationCounter++;
        card.classList.remove("show");
        if (animationCounter === matchContainers.length) {
          cardContainers.forEach((item) => {
            item.style.visibility = "visible";
            item.classList.add("show");
            item.addEventListener("animationend", () => {
              item.classList.remove("show");
            });
          });
        }
      });
    });
  });
});
cardItems.forEach((item) => {
  item.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("id", event.target.dataset.index);
  });
});
matchItems.forEach((matchItem) => {
  matchItem.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  matchItem.addEventListener("drop", (event) => {
    event.preventDefault();
    const index = event.target.dataset.index;
    const cardId = event.dataTransfer.getData("id");
    const cardItem = document.querySelector(
      `.cards .card .img-container .card-img[data-index="${cardId}"]`
    );
    if (index === cardId) {
      document.querySelector("#correct-audio").play();
      counter += 1;
      scoreItem.textContent = `${counter}/${matchItems.length}`;
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
    } else {
      document.querySelector("#wrong-audio").play();
      cardItem.parentElement.parentElement.classList.add("vibrate");
      cardItem.parentElement.parentElement.addEventListener(
        "animationend",
        () => {
          cardItem.parentElement.parentElement.classList.remove("vibrate");
        }
      );
    }
    if (counter === matchItems.length) {
      const text = document.querySelector(".text-card .score-text");
      text.textContent = `${counter}/${matchItems.length}`;
      successModal.classList.add("show");
      overlay.classList.add("show");
    }
  });
});
document.addEventListener("click", function (event) {
  const isVisible =
    window.getComputedStyle(successModal).visibility === "visible";
  var isClickInside =
    successModal.contains(event.target) || event.target === closeButton;
  if (!isClickInside && isVisible) {
    successModal.classList.remove("show");
    setTimeout(() => {
      overlay.classList.remove("show");
    }, 400);
  }
});
document.querySelector(".closeModal").addEventListener("click", () => {
  successModal.classList.remove("show");
  setTimeout(() => {
    overlay.classList.remove("show");
  }, 400);
});
window.addEventListener("load", () => {
  scoreItem.textContent = `0/${matchItems.length}`;
});*/
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
const closeButton = document.querySelector(".closeModal");
const overlay = document.querySelector(".overlay");
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
    animateNext(animationCounter);
  });
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
      document.querySelector("#correct-audio").play();
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
      if (counter === matchItems.length) {
        const text = document.querySelector(".text-card .score-text");
        text.textContent = `${counter}/${matchItems.length}`;
        text.setAttribute("text", `${counter}/${matchItems.length}`);
        successModal.style.visibility = "visible";
        successModal.classList.add("show");
        overlay.classList.add("show");
        setTimeout(() => {
          document.querySelector(`audio[id="success"]`).play();
        }, 500);
      }
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
const addCloseAnimation = () => {
  closeButton.classList.add("animate");
  closeButton.addEventListener("animationend", () => {
    closeButton.classList.remove("animate");
  });
  successModal.classList.add("hide");
  successModal.style.visibility = "hidden";
  overlay.classList.remove("show");
};
document.addEventListener("click", function (event) {
  const isVisible =
    window.getComputedStyle(successModal).visibility === "visible";
  var isClickInside =
    successModal.contains(event.target) || event.target === closeButton;
  if (!isClickInside && isVisible) {
    addCloseAnimation();
  }
});
closeButton.addEventListener("click", () => {
  addCloseAnimation();
});
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
