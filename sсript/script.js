
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // выбираем элементы HTML страницы
  const customer = document.getElementById('customer')
  const freelancer = document.getElementById('freelancer')
  const blockCustomer = document.getElementById('block-customer')
  const blockFreelance = document.getElementById('block-freelancer')
  const blockChoice = document.getElementById('block-choice')
  const btnExit = document.getElementById('btn-exit')
  const formCustomer = document.getElementById('form-customer')
  const ordersTable = document.getElementById('orders')
  const modalOrder = document.getElementById('order_read')
  const modalOrderActive = document.getElementById('order_active')
  const modalClose = document.querySelector('.close');

  const orders = []

  // рендеринг строк таблицы со всеми заказами 
  const renderOrders = () => {
    ordersTable.textContent = ''
    orders.forEach((order, i) => {

      ordersTable.innerHTML += `
                <tr class="order taken" data-number-order="${i}">
                  <td>${i + 1}</td>
                  <td>${order.title}</td>
                  <td class="${order.currency}"></td>
                  <td>${order.deadline}</td>
                </tr>
      `
    })
  }

  // модальные окна
  const openModal = (numberOrder) => {
    // console.log('numberOrder: ', numberOrder);
    const order = orders[numberOrder]
    // в зависимости от стадии  обработки заказа
    // открываем свое модальное окно 
    const modal = order.active ? modalOrderActive : modalOrder

    // всю информацию о заказе, которая есть в модальном окне, сохраняем в переменные
    const firstNameBlock = document.querySelector('.firstName')
    const titleBlock = document.querySelector('.modal-title')
    const emailBlock = document.querySelector('.email')
    const descriptionBlock = document.querySelector('.description')
    const deadlineBlock = document.querySelector('.deadline')
    const currencyBlock = document.querySelector('.currency_img')
    const countBlock = document.querySelector('.count')
    const phoneBlock = document.querySelector('.phone')

    // Извлекаем всю информацию из заказа воспользовавшись его декомпозицией
    // В дальнейшем, при необходимости это позволит легко менять шаблоны окон и заполнять их нужной информацией

    let { title, firstName, email, description, deadline, currency, amount, phone } = order
    // console.log('order: ', order);

    titleBlock.textContent = title;
    firstNameBlock.textContent = firstName;
    emailBlock.textContent = email;
    emailBlock.setAttribute('href', `mailto: ${email}`);
    descriptionBlock.textContent = description;
    deadlineBlock.textContent = deadline;
    currencyBlock.classList.add(currency);
    countBlock.textContent = amount;
    phoneBlock.textContent = phone;
    phoneBlock.setAttribute('href', `tel: ${phone}`);

    modal.style.display = "block"
  }

  // назначаем обработчик клика по выбранному заказу: открытие модального окна
  ordersTable.addEventListener('click', (event) => {
    const target = event.target
    const targetOrder = target.closest('.order')
    if (targetOrder) {
      openModal(targetOrder.dataset.numberOrder)
    }
    // console.log('Заказ: ', orders[targetOrder.dataset.numberOrder])
  })

  // назначаем обработчик клика: закрытие текущего модального окна
  modalClose.addEventListener('click', (event) => {
    const currentModal = event.target.closest('.modal');
    currentModal.style.display = 'none';
  })

  // назначаем обработчики клика по кнопкам 
  customer.addEventListener('click', () => {
    blockChoice.style.display = 'none'
    blockCustomer.style.display = 'block'
    btnExit.style.display = ' block'
  })
  freelancer.addEventListener('click', () => {
    blockChoice.style.display = 'none'
    renderOrders()
    blockFreelance.style.display = 'block'
    btnExit.style.display = ' block'
  })
  btnExit.addEventListener('click', () => {
    btnExit.style.display = 'none'
    blockFreelance.style.display = 'none'
    blockCustomer.style.display = 'none'
    blockChoice.style.display = 'block'
  })

  formCustomer.addEventListener('submit', () => {
    event.preventDefault()

    // первый вариант фильтрации (без ипользования метода filter() )
    // const obj = {}
    // for (const elem of formCustomer.elements) {
    //   if ((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
    //     (elem.type === 'radio' && elem.checked) || elem.tagName === 'TEXTAREA') {

    //     obj[elem.name] = elem.value

    //   }
    //   if (elem.type !== 'radio') {
    //     elem.value = ''
    //   }
    // }
    // orders.push(obj)

    // второй вариант: оператор spread, фильтрация с ипользованием метода filter(), ресет формы 

    const fieldsFilter = (elem) => {
      const rez = (elem.tagName === 'INPUT' && elem.type !== 'radio')
        || (elem.type === 'radio' && elem.checked)
        || (elem.tagName === 'TEXTAREA')
      return rez
    }
    const formElements = [...formCustomer.elements].filter(fieldsFilter)

    const obj = {}
    formElements.forEach(elem => obj[elem.name] = elem.value);

    orders.push(obj)

    formCustomer.reset() // очистка формы

  })


}) // end DOMContentLoaded