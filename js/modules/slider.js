import { getZero } from "./timer";

function slider({ everySlide, nextArrow, previousArrow, wrapper, field, container, totalCouner, currentCounter }) {
    // слайдер

    const nextBtn = document.querySelector(nextArrow);
    const prevBtn = document.querySelector(previousArrow);
    const slides = document.querySelectorAll(everySlide);
    document.querySelector(totalCouner).textContent = getZero(slides.length);
    let actingSlide = 0;
    document.querySelector(currentCounter).textContent = getZero((actingSlide + 1));

    // showSlide(0);
    // function showSlide(numberOfSlide) {
    //     slides.forEach(slide => slide.classList.add("hide"));
    //     slides.forEach(slide => slide.classList.remove("fade"));
    //     slides[numberOfSlide].classList.remove("hide");
    //     slides[numberOfSlide].classList.add("fade");
    //     slides[numberOfSlide].classList.add("show");
    // }


    // nextBtn.addEventListener("click", () => {
    //     actingSlide++;
    //     if (actingSlide > 3) {
    //         actingSlide = 0;
    //     }
    //     showSlide(actingSlide);
    //     document.querySelector("#current").textContent = getZero((actingSlide + 1));

    // });

    // prevBtn.addEventListener("click", () => {
    //     actingSlide--;
    //     if (actingSlide < 0) {
    //         actingSlide = 3;
    //     }
    //     showSlide(actingSlide);
    //     document.querySelector("#current").textContent = getZero((actingSlide + 1));

    // });


    // слайдер (второй вариант)
    const slider = document.querySelector(container);
    const slidesWraper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const width = window.getComputedStyle(slidesWraper).width;
    slidesField.style.width = 100 * slides.length + "%";

    let offset = 0;
    slides.forEach(slide => {
        slide.style.width = width;
    });
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";
    slidesWraper.style.overflow = "hidden";

    nextBtn.addEventListener("click", () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        actingSlide++;
        if (actingSlide > 3) {
            actingSlide = 0;
        }
        dots.forEach(el => el.style.opacity = "0.5");
        dots[actingSlide].style.opacity = "1";
        document.querySelector(currentCounter).textContent = getZero((actingSlide + 1));


    });
    prevBtn.addEventListener("click", () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        actingSlide--;
        if (actingSlide < 0) {
            actingSlide = 3;
        }
        dots.forEach(el => el.style.opacity = "0.5");
        dots[actingSlide].style.opacity = "1";
        document.querySelector(currentCounter).textContent = getZero((actingSlide + 1));


    });

    // навигация слайдера (точки)

    slider.style.position = "relative";
    let dots = [];
    let indicators = document.createElement("ol");
    indicators.classList.add("carousel-indicators");
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i);
        dot.classList.add("dot");
        indicators.append(dot);
        dots.push(dot);
        if (i == 0) {
            dot.style.opacity = "1";
        }
    }

    dots.forEach((dot, i) => {
        dot.addEventListener("click", (element) => {
            //let slideIndex = i;
            let slideIndex = element.target.getAttribute("data-slide-to");
            offset = +width.slice(0, width.length - 2) * slideIndex;
            slidesField.style.transform = `translateX(-${offset}px)`;
            dots.forEach(el => el.style.opacity = "0.5");
            element.target.style.opacity = "1";
            document.querySelector(currentCounter).textContent = getZero((+slideIndex + 1));
        });
    });


}

export default slider;