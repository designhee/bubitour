//gnb 클릭 시
document.querySelectorAll('.gnb a[href^="#"], .util a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#") return; // 빈 링크 제외
        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        const headerHeight = document.querySelector('#header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offset = targetPosition - headerHeight;

        window.scrollTo({
            top: offset,
            behavior: "smooth"
        });
    });
});

// 어사이드

$(function(){
            //맨 위 부드럽게 이동
            //.btn-top을 클릭하면,
            $(".btn-top").click(function(){
                //html, body에게 애니메이션을 준다.
                $("html,body").animate({
                    // 스크롤 세로 위치 0
                    scrollTop : '0'
                    // 1.5초 동안
                },1500);
            });

            //일정 구간부터 버튼 나타나게 하기
            //.topBtn을 숨긴다.
            $(".aside-menu").hide();
            //스크롤하면, 
            $(window).scroll(function(){
                //100보다 크면 보이고, 100보다 작으면 사라진다.
                if ($(this).scrollTop() > 100) {
                    $(".aside-menu").fadeIn()
                } else {
                    $(".aside-menu").fadeOut()
                }
            });
        });


//메인 배너 스와이퍼
const progressCircle = document.querySelector("#hero .autoplay-progress svg");
var mainSwiper = new Swiper(".hero_slide", {
    loop: true,
    speed: 1000,
    // parallax: true,
    effect: 'fade', // ← 추가!
    fadeEffect: {
        crossFade: true, // ← 두 슬라이드 간 자연스러운 페이드
    },
    slideActiveClass: 'on',
    slidesPerView: 1,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    pagination: {
        el: "#hero .pager",
        type: "fraction",
    },
    navigation: {
        nextEl: '#hero .next',
        prevEl: '#hero .prev',
    },
    on: {
        autoplayTimeLeft(s, time, progress) {
            progressCircle.style.setProperty("--progress", 1 - progress);
        }
    }
});
$('#hero .swiper-pause').click(function () {
    mainSwiper.autoplay.stop();
});
$('#hero .swiper-play').click(function () {
    mainSwiper.autoplay.start();
});
$(function () {
    $("#hero .play").click(function () {
        $(this).toggleClass("on");
    });
});


//메인배너 문구 이동
const heroTexts = [
    {
        title: `부비투어<br>어린이날 탑승 이벤트`,
        subtitle: `버스타면 바람개비 드려요!`
    },
    {
        title: `총 상금 1000만원!<br>관광 안전 캠페인 공모전`,
        subtitle: `부비투어 X 부산교통공사 공모전`
    },
    {
        title: `부산 야경 브릿지 투어<br>5/30 예약 오픈`,
        subtitle: `빛 따라 달리는 부산의 밤`
    },
    {
        title: `여행 후기 남기고<br>선물 받아가세요!`,
        subtitle: `부비투어 탑승 후기 이벤트`
    }
];

mainSwiper.on("slideChangeTransitionStart", function () {
    const i = mainSwiper.realIndex;

    $(".hero__text").addClass("leave");

    setTimeout(() => {
        $(".hero__title").html(heroTexts[i].title);
        $(".hero__subtitle").html(heroTexts[i].subtitle);

        $(".hero__text")
            .removeClass("leave")
            .addClass("enter");
    }, 500); // fade-out 시간과 동일

    setTimeout(() => {
        $(".hero__text").removeClass("enter");
    }, 700);
});

//투어예약 스와이퍼
var swiper = new Swiper(".reservation-swiper", {

    slidesPerView: 4,
    slideToClickedSlide: true,
    autoHeight: true, // true로 설정하면 슬라이더 래퍼가 현재 활성 슬라이드의 높이에 맞게 높이를 조정합니다.
    navigation: {
        nextEl: ".reservation-swiper-button-next",
        prevEl: ".reservation-swiper-button-prev",
    },
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },

    loop: true,

});

// 추천코스:어디로 갈까요? 스와이퍼
let courseSwipers = [];

document.querySelectorAll('.CourseSwiper').forEach(function (swiperEl, index) {
    courseSwipers[index] = new Swiper(swiperEl, {
        slidesPerView: "auto",
        spaceBetween: 20,
        centeredSlides: true,
        centeredSlidesBounds: true,
        observer: true,
        observeParents: true,
        loop: true,
        lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true,
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.course-tabs__button');
    const tabContents = document.querySelectorAll('.CourseSwiper');

    tabButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            // 모든 탭 비활성화
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.course-tabs__item')
                .forEach(item => item.classList.remove('active'));
            tabContents.forEach(content => content.style.display = 'none');

            // 현재 클릭한 탭 활성화
            this.classList.add('active');
            this.closest('.course-tabs__item').classList.add('active');

            // 매칭되는 콘텐츠 보이기
            const target = this.getAttribute('data-tab-target');
            document.querySelector(target).style.display = 'block';
        });
    });

    // 초기 실행 – 첫 번째 탭 활성화
    tabButtons[0].click();
});



//지도:가장 인기있는 장소에요! 스와이퍼
var swiper = new Swiper(".map-contents__card-swiper", {
    loop: true,
    slidesPerView: "auto",
    // centeredSlides: true,
    spaceBetween: -600, // 카드를 겹치게 보이게

    effect: "coverflow",
    coverflowEffect: {
        rotate: 0,
        stretch: 70,
        depth: 600, // 깊이감 강조
        modifier: 1.8,
        scale: 0.88, // 옆 카드 조금 축소
        slideShadows: false,
    },
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: "#map .map-swiper-button-next",
        prevEl: "#map .map-swiper-button-prev",
    }
});

//맛집,숙소,체험 추천 탭 구조
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".pick-tabs__button");
    const contents = document.querySelectorAll(".pick__contents");

    // 초기 상태: 첫 번째 탭만 활성화
    contents.forEach((c, i) => {
        c.classList.toggle("active", i === 0);
    });

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            const target = document.querySelector(this.dataset.tabTarget);

            // 모든 탭 버튼 on 제거
            document.querySelectorAll(".pick-tab-list > li")
                .forEach(li => li.classList.remove("on"));

            // 현재 클릭된 탭 버튼 on 추가
            this.parentElement.classList.add("on");

            // 모든 콘텐츠 비활성화
            contents.forEach(c => c.classList.remove("active"));

            // 해당 콘텐츠만 활성화
            target.classList.add("active");
        });
    });
});

//페이지 번호
document.addEventListener("DOMContentLoaded", function () {
    const pageItems = document.querySelectorAll(".pick__page-number ul li");

    pageItems.forEach(item => {
        item.addEventListener("click", () => {

            // 숫자(p 태그)가 없는 li는 스킵 (이전/다음 버튼 제외)
            if (!item.querySelector("p")) return;

            pageItems.forEach(li => li.classList.remove("on"));
            item.classList.add("on");
        });
    });
});

//리뷰 롤링
let roller = document.querySelector('.review__list-roller .review__list');
roller.id = 'roller1';
let clone = roller.cloneNode(true)
clone.id = 'roller2';
document.querySelector('.review__list-roller').appendChild(clone);
roller.classList.add('original');
clone.classList.add('clone');

//ad 스와이퍼
var swiper = new Swiper(".ad-swiper", {
    loop: true,
    centeredSlides: true,
    centeredSlidesBounds: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    }

});