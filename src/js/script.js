jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

// ローディングアニメーション終了後に全セクションを表示する
  if (window.matchMedia("(max-width: 767px)").matches) {
  window.addEventListener("load", function () {
    mvSwiper();
  });
  } else {
    const loadingEl = document.querySelector(".loading");
    if (loadingEl) {
      document.body.style.overflow = "hidden";
      loadingEl.addEventListener("animationend", function () {
        document.querySelector(".mv__header").style.opacity = "1";
        setTimeout(mvSwiper, 1000);
        setTimeout(function () {
          loadingEl.style.opacity = "0";
        }, 1000);
        setTimeout(function () {
          loadingEl.style.display = "none";
          document.body.style.overflow = "";
        }, 2000);
      });
    }
  }

//メインビューのスライダー
  function mvSwiper() {
    new Swiper(".js-mvSwiper", {
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: 3000, //フェード切り替え速度
      autoplay: {
        delay: 5000, //スライド切り替え速度
        disableOnInteraction: false,
      },
      loop: true,
    });
  }

// MVとヘッダーの下ラインが重なった時に、ヘッダーに背景色をつける
  let header = $(".header");
  let headerHeight = $(".header").height();
  let height = $(".mv").height();

  $(window).scroll(function () {
    if ($(this).scrollTop() > height - headerHeight) {
      header.addClass("is-color");
    } else {
      header.removeClass("is-color");
    }
  });

//ドロワーメニュー
  $(function () {
    $(".js-hamburger").click(function () {
      $(".js-hamburger, .header, .js-sp-nav").toggleClass("is-active");
      if ($(".js-hamburger").hasClass("is-active")) {
        $("body").css("overflow", "hidden"); //背景がスクロールされないようにする
      } else {
        $("body").css("overflow", "auto");
      }
    });
  });

  //pc画面幅ではドロワーメニューを非表示にする
  $(window).resize(function () {
    if ($(window).width() >= 768) {
      $(".js-sp-nav").removeClass("is-active").css("display", ""); // is-active を削除
      $(".header").removeClass("is-active").css("display", ""); // is-active を削除
    }
  });

// キャンペーンカードのスライダー
  // inner幅の基準値を設定
  const INNER_WIDTH = 1080;

  // SwiperのspaceBetweenを計算
  function getSpaceBetween() {
    let windowWidth = window.innerWidth;

    if (windowWidth <= 375) {
      return windowWidth * (6.4 / 100); // 375px以下は 6.4vw ←(24px/375px)×100
    } else if (windowWidth > 375 && windowWidth < 768) {
      return 24; // 376px〜767px は固定 24px
    } else if (windowWidth >= 768 && windowWidth < INNER_WIDTH) {
      return windowWidth * (3.7 / 100); // 768px〜inner幅未満は 3.7vw ←(40px/1080px)×100
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

      spaceBetween: spaceBetweenValue,
      slidesPerView: "auto",
      loop: true,
      loopedSlides: 4,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

  }

  // 初回実行
  initSwiper();

  // リサイズ時にSwiperを再初期化
  window.addEventListener("resize", initSwiper);

// 画像アニメーション
  // 要素の取得とスピードの設定
  let imageAnimation = $(".information__image, .voice-card__image, .price__image"),
    speed = 700;

  // ..information__image, .voice-card__image, .price__image の付いた全ての要素に対して処理を行う
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
    if ($(this).scrollTop() > 90) {
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



// aboutページのモーダル
  const modal = document.getElementById('modal');
  if (modal) {
    const overlay = modal.querySelector('.modal__overlay');
    const backgroundInner = modal.querySelector('.modal__background .inner');
    const content = modal.querySelector('.modal__content');

  // クリック時の処理
    if (window.innerWidth >= 768) {
    document.querySelectorAll('.gallery__item img').forEach(img => {
      img.addEventListener('click', () => {
        const column = img.closest('.gallery__column');
        if (!column) return;
        // モーダル内に画像を複製
        const clickedImg = img.cloneNode(true);
        content.innerHTML = '';
        content.appendChild(clickedImg);
        // 背景として.gallery__columnを複製
        backgroundInner.innerHTML = '';
        backgroundInner.appendChild(column.cloneNode(true));
        // モーダル表示 + スクロール禁止
        document.body.style.overflow = 'hidden';
        modal.setAttribute('aria-hidden', 'false');
      });
    });

  // 閉じる処理
    function closeModal() {
      modal.setAttribute('aria-hidden', 'true');
      content.innerHTML = '';
      backgroundInner.innerHTML = '';
      document.body.style.overflow = '';
    }
    overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
        closeModal();
        }
      });
    }
  }

//カテゴリーボタン
  const buttons = document.querySelectorAll('.category-button');
  const cards = document.querySelectorAll('.campaign-card, .voice-card');

  // カード表示切り替え用の関数
  function showCards(targetId) {
    cards.forEach(card => {
      const category = card.getAttribute("data-category");
      if (targetId === "all" || category === targetId) {
        card.classList.add("is-active");
      } else {
        card.classList.remove("is-active");
      }
    });
  }

  // 最初は全部表示（= ALL 選択状態）
  showCards('all');
  
  buttons.forEach(button => {
    button.addEventListener("click", function () {
    const targetId = this.getAttribute("data-target");

    // ボタンの active 切り替え
    buttons.forEach(btn => btn.classList.remove("is-active"));
    this.classList.add("is-active");
  
    // カードの表示切り替え
    showCards(targetId);
  });
});


// informationのタブ
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll(".tab-panel");
  
  tabButtons.forEach(button => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetPanel = document.querySelector(targetId);

      // ボタンのactive切り替え
      tabButtons.forEach(btn => btn.classList.remove("is-active"));
      this.classList.add("is-active");

      // パネルの表示切り替え
      tabPanels.forEach(panel => panel.classList.remove("is-active"));
      if (targetPanel) {
        targetPanel.classList.add("is-active");
      }
    });
  });

  //contactフォーム
  const form = document.getElementById("contactForm");
  if (!form) return;

  let errorShown = false; // エラーを表示したかどうか

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let hasError = false;
    errorShown = true;

    // 全てのエラークラスを外す
    form.querySelectorAll(".form__row--error, .form__agreement--error")
        .forEach(el => el.classList.remove("form__row--error", "form__agreement--error"));

    // 必須項目のエラー要素を格納する配列
    const errorElements = [];

    // 必須項目チェック
    form.querySelectorAll("[required]").forEach(input => {
      if (!checkInput(input)) {
        hasError = true;
        addErrorClass(input);
        errorElements.push(input);
      }
    });

    if (hasError) {
      e.preventDefault();
      if (errorElements.length > 0) {
      // 最初のエラー項目にスクロール
      errorElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      errorElements[0].focus();
      }
    } else {
    form.style.display = 'none';
    const thanks = document.querySelector('.page-contact__thanks');
    if (thanks) {
      thanks.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  });

  // 送信後に入力があったらエラー解除
  form.querySelectorAll("[required]").forEach(input => {
    input.addEventListener("input", () => {
      if (errorShown && checkInput(input)) {
        removeErrorClass(input);
      }
    });
    input.addEventListener("change", () => {
      if (errorShown && checkInput(input)) {
        removeErrorClass(input);
      }
    });
  });

  // 入力値があるか判定
  function checkInput(input) {
    if (input.type === "checkbox" || input.type === "radio") {
      const group = form.querySelectorAll(`[name="${input.name}"]`);
      return Array.from(group).some(i => i.checked);
    }
    return input.value.trim() !== "";
  }

  //エラー時の処理
  function addErrorClass(input) {
    const row = input.closest(".form__row");
    const agreement = input.closest(".form__agreement");
    const errorMessage = document.querySelector('.page-contact__error');
    
    if (row) row.classList.add("form__row--error");
    if (agreement) agreement.classList.add("form__agreement--error");
    
    if (errorMessage) {
      errorMessage.style.display = 'block';
    }
  }
  
  //エラー解除時の処理
  function removeErrorClass(input) {
    const row = input.closest(".form__row");
    const agreement = input.closest(".form__agreement");
    const errorMessage = document.querySelector('.page-contact__error');

    if (row) row.classList.remove("form__row--error");
    if (agreement) agreement.classList.remove("form__agreement--error");

    const hasErrors = document.querySelector('.form__row--error, .form__agreement--error');
    if (!hasErrors && errorMessage) {
      errorMessage.style.display = 'none';  // エラーメッセージ非表示
    }
  }

});
