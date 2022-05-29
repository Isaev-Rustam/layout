import "../scss/style.scss";
import Swiper, {Pagination} from 'swiper';

document.addEventListener("DOMContentLoaded", ()=>{

const sliderOptions = {
  slidesPerView: "auto",
  spaceBetween: 16,
  loop: true,
  slideClass:"swiper__slide",
  modules: [Pagination],
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  }
}

if (window.innerWidth < 767) {
  new Swiper(".swiper", sliderOptions);
}




const showHideBlockContent= (block, blockWrap, toggleClassBlockWrap, blockBtn, toggleClassBlockBtn)=>{
  const content = document.querySelector(`${block}`);
  const contentWrap = content.querySelector(`${blockWrap}`);
  const contentBtn = content.querySelector(`${blockBtn}`);

  const listener = ()=>{
    const data = contentBtn.dataset.text;
    const toggleText = contentBtn.textContent;

    contentBtn.dataset.text = toggleText;
    contentBtn.textContent = data;

    contentWrap.classList.toggle(`${toggleClassBlockWrap}`);
    contentBtn.classList.toggle(`${toggleClassBlockBtn}`);
  }

  contentBtn.addEventListener("click", listener)
}

showHideBlockContent(
  ".main__info",
  ".main__text[hidden]",
  "main__text--active",
  ".main__btn-info",
  "btn-content--active");

showHideBlockContent(
  ".br-swiper",
  ".br-swiper__wrapper",
  "br-swiper__wrapper--show",
  ".br-swiper__btn",
  "btn-content--active");

showHideBlockContent(
  ".technics-swiper",
  ".technics-swiper__wrapper",
  "technics-swiper__wrapper--show",
  ".technics-swiper__btn",
  "btn-content--active");




const sidebarActive = ()=>{
  const sideBar = document.querySelector(".sidebar");
  const header = document.querySelector(".header");
  const btnBurger = header.querySelector(".header__burger");

  const sideBarOpen = ()=>{
  sideBar.classList.add("sidebar--active");
  }

  const sideBarClose = (e)=>{
    if (e.target.closest(".sidebar__btn-close")){
      sideBar.classList.remove("sidebar--active");
    }
    if (e.target.classList.contains("sidebar")){
      sideBar.classList.remove("sidebar--active");
    }
  }

  btnBurger.addEventListener("click", sideBarOpen);
  sideBar.addEventListener("click", sideBarClose);
}
sidebarActive();


const modalOptionsCall = {
  modalContentClass:".modal-call",
  targetContentClass:"modal-call",
  modalContentBtn:".modal-call__btn--close",
  buttonsOpenModal:".btn-phone",
  modalClassActive:"modal-call--active",
  modalClassDisabled:"modal-call--disabled",
  formName:"form-call",
}
const modalOptionsFeedBack = {
  modalContentClass:".modal-feedback",
  targetContentClass:"modal-feedback",
  modalContentBtn:".modal-feedback__btn--close",
  buttonsOpenModal:".btn-feedBack",
  modalClassActive:"modal-feedback--active",
  modalClassDisabled:"modal-feedback--disabled",
  formName:"form-feedback",
}

const showHideModal = (modalOptions)=>{
  const sideBar = document.querySelector(".sidebar");
  const modal = document.querySelector(`${modalOptions.modalContentClass}`);
  const modalContentBtn = document.querySelector(`${modalOptions.modalContentBtn}`);
  const buttons = document.querySelectorAll(`${modalOptions.buttonsOpenModal}`);
  const form = document.forms[modalOptions.formName];
  const modalElements = [...form.elements, modalContentBtn];

  const openModal = function() {
    modal.classList.toggle(`${modalOptions.modalClassActive}`);
    modal.classList.toggle(`${modalOptions.modalClassDisabled}`);

    modalElements[0].focus();
    modalElements.forEach((item, index)=>{item.tabIndex=`${index+1}`});


    const hasClassSidebar = sideBar.classList.contains("sidebar--active")
    if(hasClassSidebar){
      sideBar.classList.remove("sidebar--active");
    }
  }

  const closeModal = (e)=>{
    const btnClose = e.target.closest(`${modalOptions.modalContentBtn}`);
    const modalClose = e.target.classList.contains(`${modalOptions.targetContentClass}`);


    if (btnClose || modalClose ){
      modal.classList.toggle(`${modalOptions.modalClassDisabled}`);
      modal.classList.toggle(`${modalOptions.modalClassActive}`);

      modalElements.forEach((item, index)=>{item.removeAttribute("tabIndex")});
    }
  }

  buttons.forEach(btn=>btn.addEventListener('click', openModal));

  modal.addEventListener('click',closeModal);
}

showHideModal(modalOptionsCall)
showHideModal(modalOptionsFeedBack)





})

