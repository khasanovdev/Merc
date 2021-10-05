"use strict";

const loader = document.querySelector(".loader");
setTimeout(function () {
	loader.style.opacity = "0";
}, 2000);
setTimeout(function () {
	loader.style.display = "none";
}, 3000);

window.addEventListener("DOMContentLoaded", () => {
	// TABS
	const tabs = document.querySelectorAll(".tabheader__item"),
		tabContent = document.querySelectorAll(".tabcontent"),
		headerParent = document.querySelector(".tabheader__items");

	function hideTabContent() {
		tabContent.forEach((item) => {
			item.style.display = "none";
		});
		tabs.forEach((item) => {
			item.classList.remove("tabheader__item_active");
		});
	}
	hideTabContent();

	function showTabContent(i = 0) {
		tabContent[i].style.display = "block";
		tabs[i].classList.add("tabheader__item_active");
	}
	showTabContent();

	headerParent.addEventListener("click", (e) => {
		// console.log(e);
		// console.log(e.target);
		if (e.target && e.target.classList.contains("tabheader__item")) {
			tabs.forEach((item, inx) => {
				if (e.target == item) {
					hideTabContent();
					showTabContent(inx);
				}
			});
		}
	});

	//    MODAL

	const allModalBtn = document.querySelectorAll("[data-modal]"),
		modal = document.querySelector(".modal"),
		modalClose = document.querySelector(".modal__close");

	allModalBtn.forEach((btn) => {
		btn.addEventListener("click", openModal);
	});
	modalClose.addEventListener("click", closeModal);

	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});

	window.addEventListener("scroll", showMyModalByScroll);

	const modalTimer = setTimeout(openModal, 5000);

	function openModal() {
		modal.classList.add("show");
		modal.classList.remove("hide");
		document.body.style.overflow = "hidden";
		clearInterval(openModal);
	}
	function closeModal() {
		modal.classList.add("hide");
		modal.classList.remove("show");
		document.body.style.overflow = "";
	}
	function showMyModalByScroll() {
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight
		) {
			openModal();
			window.removeEventListener("scroll", showMyModalByScroll);
		}
	}

	// DATE

	const deadline = "2021-12-31";

	function getTime(endtime) {
		const total = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(total / (1000 * 60 * 60 * 24)),
			seconds = Math.floor((total / 1000) % 60),
			minutes = Math.floor((total / 1000 / 60) % 60),
			hours = Math.floor((total / (1000 * 60 * 60)) % 24);
		return {
			total: total,
			days: days,
			seconds: seconds,
			minutes: minutes,
			hours: hours,
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return "0" + num;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector("#days"),
			hours = timer.querySelector("#hours"),
			minutes = timer.querySelector("#minutes"),
			seconds = timer.querySelector("#seconds"),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			const time = getTime(endtime);
			days.innerHTML = getZero(time.days);
			hours.innerHTML = getZero(time.hours);
			minutes.innerHTML = getZero(time.minutes);
			seconds.innerHTML = getZero(time.seconds);
			if (time.total <= 0) {
				clearInterval(timeInterval);
			}
		}
		updateClock();
	}
	setClock(".timer", deadline);

	// CLASS
	classes();
	function classes() {
		class CarCard {
			constructor(
				src,
				alt,
				title,
				descr,
				price,
				parentSelector,
				...classess
			) {
				this.src = src;
				this.alt = alt;
				this.title = title;
				this.descr = descr;
				this.price = price;
				this.parent = document.querySelector(parentSelector);
				this.transfer = 10500;
				this.classess = classess;
				this.changeToUSD();
			}

			changeToUSD() {
				this.price = parseInt(this.price / this.transfer);
			}

			render() {
				const element = document.createElement("div");

				if (this.classess.length === 0) {
					this.classess = "menu__item";
					element.classList.add(this.classess);
				} else {
					this.classess.forEach((className) =>
						element.classList.add(className)
					);
				}

				element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt} />
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Price:</div>
                        <div class="menu__item-total"><span>${this.price}</span> $</div>
                    </div>
                </div>
            `;
				this.parent.append(element);
			}
		}
		new CarCard(
			"img/tabs/1.jpg",
			"vegy",
			"2021 Mercedes-Benz C-Class",
			`The 2021 Mercedes-Benz C-Class finishes in the top half of our
        luxury small car rankings. It's powerful and upscale, but it has
        so-so handli...`,
			120000000,
			".menu .container",
			"red"
		).render();
		new CarCard(
			"img/tabs/2.jpg",
			"vegy",
			"2021 Mercedes-Benz C-Class",
			`The 2021 Mercedes-Benz C-Class finishes in the top half of our
        luxury small car rankings. It's powerful and upscale, but it has
        so-so handli...`,
			150000000,
			".menu .container"
		).render();
		new CarCard(
			"img/tabs/3.jpg",
			"vegy",
			"2021 Mercedes-Benz C-Class",
			`The 2021 Mercedes-Benz C-Class finishes in the top half of our
        luxury small car rankings. It's powerful and upscale, but it has
        so-so handli...`,
			230000000,
			".menu .container",
			"red"
		).render();
	}
	// SLIDER (EASY)

	// const slides = document.querySelectorAll(".offer__slide"),
	// 	prev = document.querySelector(".offer__slider-prev"),
	// 	next = document.querySelector(".offer__slider-next"),
	// 	current = document.querySelector("#current"),
	// 	total = document.querySelector("#total");
	// let slideIndex = 1;

	// show(slideIndex);
	// function show(s) {
	// 	if (s > slides.length) {
	// 		slideIndex = 1;
	// 	}
	// 	if (s < 1) {
	// 		slideIndex = slides.length;
	// 	}
	// 	slides.forEach((item) => (item.style.cssText = "display: none"));
	// 	slides[slideIndex - 1].style.display = "block";
	// 	if (slides.length < 10) {
	// 		current.textContent = `0${slideIndex}`;
	// 	} else {
	// 		current.textContent = slideIndex;
	// 	}
	// }

	// prev.addEventListener('click', () => {
	//     show(slideIndex -= 1)
	// });
	// next.addEventListener('click', () => {
	//     show(slideIndex += 1)
	// });

	// SLIDER
	slider();
	function slider() {
		const slides = document.querySelectorAll(".offer__slide"),
			slider = document.querySelector(".offer__slider"),
			prev = document.querySelector(".offer__slider-prev"),
			next = document.querySelector(".offer__slider-next"),
			current = document.querySelector("#current"),
			total = document.querySelector("#total"),
			slidesWrapper = document.querySelector(".offer__slider-wrapper"),
			width = window.getComputedStyle(slidesWrapper).width,
			slidesField = document.querySelector(".offer__slider-inner");
		console.log(width);
		let slideIndex = 1,
			offset = 0;

		if (slides.length < 10) {
			total.textContent = `0${slides.length}`;
			current.textContent = `0${slideIndex}`;
		} else {
			total.textContent = slides.length;
			current.textContent = slideIndex;
		}

		slidesField.style.width = 100 * slides.length + "%";
		slidesField.style.display = "flex";
		slidesField.style.transition = "0.5s all";
		slidesWrapper.style.overflow = "hidden";
		slides.forEach((slide) => {
			slide.style.width = width;
		});

		slider.style.position = "relative";
		let indicator = document.createElement("ol"),
			dots = [];

		indicator.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display:flex;
		justify-content: center;
		margin: 0 15%;
		list-style: none;
	`;

		slider.append(indicator);

		for (let i = 0; i < slides.length; i++) {
			const dot = document.createElement("li");
			dot.setAttribute("data-slide-to", i + 1);
			dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin: 0 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transform: opacity .6s ease;
		`;

			if (i == 0) {
				dot.style.opacity = 1;
			}
			indicator.append(dot);
			dots.push(dot);
		}

		next.addEventListener("click", () => {
			if (
				offset ==
				+width.slice(0, width.length - 2) * (slides.length - 1)
			) {
				offset = 0;
			} else {
				offset += +width.slice(0, width.length - 2);
			}
			slidesField.style.transform = `translateX(-${offset}px)`;
			if (slideIndex == slides.length) {
				slideIndex = 1;
			} else {
				slideIndex++;
			}

			if (slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}

			dots.forEach((dot) => (dot.style.opacity = ".5"));
			dots[slideIndex - 1].style.opacity = "1";
		});
		prev.addEventListener("click", () => {
			if (offset == 0) {
				offset =
					+width.slice(0, width.length - 2) * (slides.length - 1);
			} else {
				offset -= +width.slice(0, width.length - 2);
			}
			slidesField.style.transform = `translateX(-${offset}px)`;
			if (slideIndex == 1) {
				slideIndex = slides.length;
			} else {
				slideIndex--;
			}

			if (slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}

			dots.forEach((dot) => (dot.style.opacity = ".5"));
			dots[slideIndex - 1].style.opacity = "1";
		});

		dots.forEach((dot) => {
			dot.addEventListener("click", (e) => {
				// console.log(e.target.getAttribute("data-slide-to"));
				const slideTo = e.target.getAttribute("data-slide-to");
				slideIndex = slideTo;

				offset = +width.slice(0, width.length - 2) * (slideTo - 1);
				slidesField.style.transform = `translateX(-${offset}px)`;
				if (slides.length < 10) {
					current.textContent = `0${slideIndex}`;
				} else {
					current.textContent = slideIndex;
				}
				dots.forEach((dot) => (dot.style.opacity = ".5"));
				dots[slideIndex - 1].style.opacity = "1";
			});
		});
	}

	// ACCORDION
	accordion();
	function accordion() {
		const accordion = document.querySelectorAll(".accordion");

		accordion.forEach((acc) => {
			acc.addEventListener("click", () => {
				acc.classList.toggle("active");
				const panel = acc.nextElementSibling;
				if (panel.style.maxHeight) {
					panel.style.maxHeight = null;
				} else {
					panel.style.maxHeight = panel.scrollHeight + "px";
				}
			});
		});
	}
});
