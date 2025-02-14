jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  //ドロワーメニュー
  $(".js-hamburger").click(function () {
    if ($(".js-hamburger").hasClass("is-active")) {
      $(".js-hamburger").removeClass("is-active");
      // $("html").toggleClass("is-fixed");
      $(".js-sp-nav").fadeOut(300);
    } else {
      $(".js-hamburger").addClass("is-active");
      $(".js-sp-nav").fadeIn(300);
    }
  });

  //メインビューのスライダー
  let mvSwiper = new Swiper(".js-mvSwiper", {
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,  // ユーザーの操作後も自動スライドが止まらないようにする
    // },
    loop: true,
  });
});

// キャンペーンカードのスライダー
let campaignSwiper = new Swiper(".js-campaignSwiper", {
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  // },
  loop: true,
  spaceBetween: 24,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
