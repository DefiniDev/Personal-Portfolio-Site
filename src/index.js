"use strict";
import "./normalize.css" assert { type: "css" };
import "./style.css" assert { type: "css" };

(function () {
  window.ondragstart = function () {
    return false;
  };

  // Selectors & variables
  const navbarButtons = document.querySelectorAll(".navbar-links");
  const navbarMenuItems = document.querySelectorAll(".navbar-menu-item");
  const navbarMenuLinks = document.querySelectorAll(".navbar-menu-links");
  const navbarMenuButton = document.querySelector("#navbar-menu-button");
  const navbarMenuButtonBars = document.querySelectorAll(".bar");
  const navbarHamburgerMenu = document.querySelector("#navbar-hamburger-menu");
  const slides = document.querySelectorAll(".slides");
  const bullets = document.getElementsByClassName("bullets");
  let slideIndex = 0;

  // ID Selector function
  function $(x) {
    return document.getElementById(x);
  }

  const updateGlows = () => {
    [...bullets].forEach((el) => el.classList.remove("active"));
    bullets[slideIndex].classList.add("active");
    [...navbarButtons].forEach((el) => el.classList.remove("active"));
    navbarButtons[slideIndex].classList.add("active");
    [...navbarMenuLinks].forEach((el) => el.classList.remove("active"));
    navbarMenuLinks[slideIndex].classList.add("active");
  };

  const showSlides = (n) => {
    // console.log(n);
    if (n > 2) {
      slideIndex = 0;
    }
    if (n < 0) {
      slideIndex = 2;
    }
    slides.forEach((el) => el.classList.remove("opaque"));
    slides[slideIndex].classList.add("opaque");
    updateGlows();
  };

  // Show hamburger menu (1 listener)
  const hamburgerMenuOpen = () => {
    navbarMenuButton.classList.toggle("is-active");
    navbarHamburgerMenu.classList.toggle("active");
  };

  // Add all listeners
  for (let i = 0; i < 3; i++) {
    if (i == 0) {
      // Open hamburger menu
      navbarMenuButton.addEventListener("click", hamburgerMenuOpen);

      // Arrow btns
      $("prev").addEventListener("click", () => {
        showSlides((slideIndex -= 1));
      });
      $("next").addEventListener("click", () => {
        showSlides((slideIndex += 1));
      });

      // Navbar hamburger-menu button highlight
      navbarMenuButton.addEventListener("mouseover", () => {
        if (!navbarMenuButton.classList.contains("is-active"))
          navbarMenuButtonBars.forEach((el) =>
            el.classList.toggle("highlight")
          );
      });
      navbarMenuButton.addEventListener("mouseout", () => {
        if (!navbarMenuButton.classList.contains("is-active"))
          navbarMenuButtonBars.forEach((el) =>
            el.classList.toggle("highlight")
          );
      });

      // Close hamburger menu on any link click (multiple listeners)
      document.querySelectorAll("a").forEach((el) =>
        el.addEventListener("click", () => {
          if (navbarMenuButton.classList.contains("is-active")) {
            navbarMenuButton.classList.toggle("is-active");
            navbarHamburgerMenu.classList.toggle("active");
            navbarMenuButtonBars.forEach((el) =>
              el.classList.toggle("highlight")
            );
          }
        })
      );
    }

    // Navbar horizontal-menu btn handlers (3)
    navbarButtons[i].addEventListener("click", () => {
      slideIndex = i;
      showSlides(i);
      updateGlows();
    });

    // Bullet-menu btn handlers (3)
    bullets[i].addEventListener("click", () => {
      slideIndex = i;
      showSlides(i);
      updateGlows();
    });

    // Hamburger menu link btns
    navbarMenuLinks[i].addEventListener("click", () => {
      slideIndex = i;
      showSlides(i);
      updateGlows();
    });

    // About "Contact" link btn
  }

  // Init
  $("body").classList.toggle("transparent");
  showSlides(slideIndex);
})();
