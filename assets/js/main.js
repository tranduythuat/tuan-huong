let wishSwiper;

// Kích hoạt ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Gọi các hiệu ứng có sẵn
document.addEventListener("DOMContentLoaded", () => {
  // var swiper = new Swiper(".wish-swiper", {
  //   slidesPerView: "auto",
  //   centeredSlides: true,
  //   spaceBetween: 30,
  //   grabCursor: true,
  //   pagination: {
  //     el: ".swiper-pagination",
  //     clickable: true,
  //   },
  // });

  const swiperAlbum = new Swiper(".album-swiper", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    // thumbs: {
    //   swiper: thumbSwiper,
    // },
    autoplay: {
      delay: 3000, // thời gian giữa các lần chuyển (ms)
      disableOnInteraction: true, // không tắt khi người dùng bấm
    },

    loop: true, // lặp lại ảnh
    effect: "fade", // hiệu ứng chuyển mượt
    fadeEffect: { crossFade: true },
    speed: 1000 // tốc độ chuyển (ms)
  });

  gsapFlipIn(".animate-flip");
  gsapFadeIn(".fade-in");
  gsapFadeRight(".fade-right");
  gsapFadeLeft(".fade-left");
  gsapFadeUp(".fade-up");
  gsapFadeDown(".fade-down");
  gsapRotateBottomLeft(".rotate-bl");
  gsapRotateBottomRight(".rotate-br");
  gsapFlipVerticalLeft(".flip-vertical-left");
  gsapRollInLeft(".roll-in-left");
  gsap_rotate_bl__float(".rotate-bl--float");

  // Tạo timeline
  // const tl = gsap.timeline({
  //   repeatDelay: 0,  // delay giữa các lần lặp
  //   defaults: { duration: .8, ease: "power2.out" }, // giá trị mặc định
  //   scrollTrigger: {
  //     trigger: ".timeline",
  //     start: "top 85%", // khi phần tử xuất hiện 80% trong viewport
  //   }
  // });

  // // Thêm các animation theo thứ tự
  // tl.from(".timeline-1", { y: 80, opacity: 0 })        
  //   .from(".timeline-2", { y: 80, opacity: 0 }, "-=0.5")     
  //   .from(".timeline-3", { y: 80, opacity: 0 }, "-=0.5")  
  //   .from(".timeline-4", { y: 80, opacity: 0 }, "-=0.5")   
  //   .from(".timeline-5", { y: 80, opacity: 0 }, "-=0.5")  
  //   .from(".timeline-6", { y: 80, opacity: 0 }, "-=0.5");   

  async function toggleMusic(e) {
    console.log('togle')
    const audio = document.getElementById('audio');
    const iconSvg = document.getElementById('iconSvg');
    if (!audio.src) {
        alert('Chưa có nhạc, vui lòng thêm src cho audio.');
        return;
    }
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }

    audio.addEventListener('play', () => {
        iconSvg.classList.add('spin');
    });
    audio.addEventListener('pause', () => {
        iconSvg.classList.remove('spin');
    });
  }
  const btn = document.getElementById('player-btn');
  btn.addEventListener('click', toggleMusic);

  // const qrcode = document.getElementById('qr-btn');
  // qrcode.addEventListener("click", toggleQR);

  function toggleQR(e) {
      e.preventDefault();
      Swal.fire({
          title: "",
          text: "국민 506-502-0438-6633",
          confirmButtonColor: "#838484",
          showCloseButton: true,
          showConfirmButton: false,
          imageUrl: "https://pub-d341ea7ec201435598469d75d8c4a056.r2.dev/huy-tra/MTN00804_Original.webp",
          imageWidth: "100%",
          imageHeight: "450",
          imageAlt: "Custom image",
          html: `
              <div class="qrcode-box">
                  <div class="item">
                      <div class="info">
                          <p>Tên TK: PHAM THANH TRA</p>
                          <p>Số TK: 68622042003</p>
                          <p>Ngân hàng: MBBank</p>
                      </div>
                      <div class="qrcode-img">
                          <img src="../assets/images/IMG_4883.jpg" alt="">
                      </div>
                  </div>
              </div>
          `,
      });
  }

  async function handleFormSubmit(e, lang) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log("🚀 ~ handleFormSubmit ~ data:", data);

    const {
      name: name,
      confirm: confirm,
      phone: phone,
      relation: relation,
      guest_number: guest_number,
    } = data;
    console.log("🚀 ~ handleFormSubmit 2~ data:", data);

    // Thông báo khi bắt đầu gửi
    Swal.fire({
      title: 'Đang gửi ...',
      text: "Vui lòng chờ trong giây lát",
      icon: "info",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const sheetURL = "https://script.google.com/macros/s/AKfycbyyQCsFjLGcNXa0hgY1hevp0NUg9n8ziR1tw3VEXY0MQS0jDM_rv2lHGQqFaYKwW0fz/exec?sheet=confirm";

    try {
      const res = await fetch(sheetURL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name,
          confirm,
          phone,
          relation,
          guest_number,
        }),
      });

      const result = await res.json().catch(() => ({}));
      console.log("Server response:", result);

      form.reset();

      // Thông báo thành công
      Swal.fire({
        title: "Thành công!",
        text: "Cảm ơn bạn đã xác nhận. Thông tin đã được chuyển đến cô dâu và chú rể rồi nha.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#000",
      });
    } catch (error) {
      console.error("Error:", error);

      // Thông báo lỗi
      Swal.fire({
        title: "Lỗi!",
        text: "OPPS! Something went wrong: " + error.message,
        icon: "error",
        confirmButtonText: "Try again.",
        confirmButtonColor: "#000",
      });
    }
  }

  function loadCSS(href) {
    if (document.querySelector(`link[href="${href}"]`)) return;
  
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyyQCsFjLGcNXa0hgY1hevp0NUg9n8ziR1tw3VEXY0MQS0jDM_rv2lHGQqFaYKwW0fz/exec";

  fetch(SHEET_URL + "?sheet=wish")
  .then(res => res.json())
  .then(data => {
    const wrapper = document.getElementById("wish-wrapper");
    if (!data.length) {
      wrapper.innerHTML = `
        <div class="swiper-slide wish-slide">
          <div class="wish-card wish-empty">
            <p>Chưa có lời chúc nào 💌</p>
            <span>Hãy là người đầu tiên gửi lời chúc nhé!</span>
          </div>
        </div>
      `;
      initWishSwiper();
      return;
    }

    // nếu muốn mới nhất lên trước
    data.reverse();

    data.forEach(item => {
      if (!item.wish) return;

      const slide = document.createElement("div");
      slide.className = "swiper-slide wish-slide";
      slide.innerHTML = `
        <div class="wish-card">
          <p class="wish-message">${item.wish}</p>
          <span class="wish-name">— ${item.name || "Ẩn danh"} —</span>
        </div>
      `;
      wrapper.appendChild(slide);
    });

    initWishSwiper();
  })
  .catch(err => console.error("Fetch wish error:", err));


  // handle submit send wish message
  const wishBtn = document.getElementById('wish-btn');
  wishBtn.addEventListener("click", toggleWishSubmit);
  function toggleWishSubmit(e) {
    e.preventDefault();
    Swal.fire({
      title: "Gửi lời chúc 💖",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Tên của bạn">
        <textarea id="swal-wish" class="swal2-textarea" placeholder="Lời chúc dành cho cô dâu & chú rể"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Gửi",
      cancelButtonText: "Huỷ",
      preConfirm: () => {
        const name = document.getElementById("swal-name").value.trim();
        const wish = document.getElementById("swal-wish").value.trim();

        if (!wish) {
          Swal.showValidationMessage("Vui lòng nhập lời chúc ❤️");
          return false;
        }

        return { name, wish };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        submitWish(result.value);
      }
    });
  }

  function submitWish(data) {
    Swal.fire({
      title: "Đang gửi...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });
  
    fetch(SHEET_URL, {
      method: "POST",
      body: new URLSearchParams({
        sheet: "wish",
        name: data.name,
        wish: data.wish
      })
    })
    .then(res => {
      if (!res.ok) throw new Error("Request failed");
      return res.text();
    })
    .then(() => {
      Swal.fire("Thành công 🎉", "Lời chúc đã được gửi!", "success");
      reloadWishSlider();
    })
    .catch(err => {
      console.error(err);
      Swal.fire("Lỗi 😢", "Không gửi được lời chúc", "error");
    });
  }

  function reloadWishSlider() {
    fetch(SHEET_URL + "?sheet=wish")
      .then(res => res.json())
      .then(data => {
        const wrapper = document.getElementById("wish-wrapper");
        wrapper.innerHTML = "";
  
        if (!data.length) {
          wrapper.innerHTML = `
            <div class="swiper-slide">
              <div class="wish-card wish-empty">
                <p>Chưa có lời chúc nào 💌</p>
              </div>
            </div>
          `;
          wishSwiper.update();
          return;
        }

        data.reverse().forEach(item => {
          const slide = document.createElement("div");
          slide.className = "swiper-slide wish-slide";
          slide.innerHTML = `
            <div class="wish-card">
              <p class="wish-message">${item.wish}</p>
              <span class="wish-name">— ${item.name || "Ẩn danh"} —</span>
            </div>
          `;
          wrapper.appendChild(slide);
        });
  
        wishSwiper.update();
      });
  }

  function initWishSwiper() {
    wishSwiper = new Swiper(".wish-swiper", {
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 30,
      grabCursor: true,
      pagination: {
        el: ".swiper-scrollbar",
        clickable: true,
      },
    });
  }

  function startCountdown(targetDate) {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("mins");
    const secsEl = document.getElementById("secs");
  
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;
  
      if (distance <= 0) {
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minsEl.textContent = "00";
        secsEl.textContent = "00";
        clearInterval(timer);
        return;
      }
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, "0");
      hoursEl.textContent = String(hours).padStart(2, "0");
      minsEl.textContent = String(minutes).padStart(2, "0");
      secsEl.textContent = String(seconds).padStart(2, "0");
    }
  
    updateCountdown(); // chạy lần đầu
    const timer = setInterval(updateCountdown, 1000);
  }

  const weddingDate = new Date("2026-03-29T12:00:00");
  startCountdown(weddingDate);

  const form = document.forms["rsvpForm"];
  const formChinese = document.forms["rsvpForm-chinese"];
  if (form) {
    form.addEventListener("submit", (e) => handleFormSubmit(e, 'vi'));
  }

  if (formChinese) {
    formChinese.addEventListener("submit", (e) => handleFormSubmit(e, 'ch'));
  }
});
