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

  // キャンペーンカードのスライダー
  // inner幅の基準値を設定
  const INNER_WIDTH = 1080;

  // SwiperのspaceBetweenを計算
  function getSpaceBetween() {
    let windowWidth = window.innerWidth;

    if (windowWidth <= 375) {
      return windowWidth * (6.4 / 100); // 375px以下は 6.4vw ←(24px÷375px)×100
    } else if (windowWidth > 375 && windowWidth < 768) {
      return 24; // 375px〜767px は固定 24px
    } else if (windowWidth >= 768 && windowWidth < INNER_WIDTH) {
      return windowWidth * (3.7 / 100); // 768px〜inner幅未満は 3.7vw ←(40px÷1080px)×100
    } else {
      return 40; // inner幅以上は固定 40px
    }
  }

  // Swiperインスタンスを管理する変数
  let campaignSwiper;

  function initSwiper() {
    // 既存のSwiperを削除
    if (campaignSwiper) {
      campaignSwiper.destroy(true, true);
    }

    // 計算した spaceBetween を適用
    let spaceBetweenValue = getSpaceBetween();

    // Swiperを再初期化
    campaignSwiper = new Swiper(".js-campaignSwiper", {
      delay: 2000,
      disableOnInteraction: false,
      loop: true,
      spaceBetween: spaceBetweenValue,
      slidesPerView: 1,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        768: { slidesPerView: 3 },
      },
    });
  }
  // 初回実行
  initSwiper();

  // リサイズ時にSwiperを再初期化
  window.addEventListener("resize", initSwiper);

  // 画像アニメーション
  // 要素の取得とスピードの設定
  let imageAnimation = $(".information__image, .card-3__image, .price__image"),
    speed = 700;

  // ..information__image, .card-3__image, .price__image の付いた全ての要素に対して処理を行う
  imageAnimation.each(function () {
    let $this = $(this);

    // <div class="color"></div> を追加
    $this.append('<div class="color"></div>');

    let color = $this.find(".color"),
      image = $this.find("img"),
      counter = 0;

    // 初期スタイル設定
    image.css("opacity", "0");
    color.css("width", "0%");

    // inviewイベントを適用（背景色が画面に現れたら処理をする）
    $this.on("inview", function (event, isInView) {
      if (isInView && counter === 0) {
        color.delay(200).animate({ width: "100%" }, speed, function () {
          image.css("opacity", "1");
          $(this).css({ left: "0", right: "auto" });
          $(this).animate({ width: "0%" }, speed);
        });
        counter = 1; // 2回目の起動を制御
      }
    });
  });

  // topへ戻るボタン
  let topBtn = $(".c-to-top");
  topBtn.hide();

  // ボタンの表示設定
  $(window).scroll(function () {
    if ($(this).scrollTop() > 70) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }
  });

  // ボタンをクリックしたらスクロールして上に戻る
  topBtn.click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      300,
      "swing"
    );
    return false;
  });

});



