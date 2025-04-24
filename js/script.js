document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка при нажатии на навигационные ссылки
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Слайдер с отзывами и историями
    const stories = document.querySelectorAll('.story');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    // Функция для показа активного слайда
    function showSlide(slideIndex) {
        // Проверяем, существуют ли элементы слайдера
        if (stories.length === 0 || dots.length === 0) return;
        
        // Скрываем все слайды
        stories.forEach(story => {
            story.classList.remove('active');
        });
        
        // Убираем активный класс у всех точек
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Показываем выбранный слайд и активируем соответствующую точку
        // Проверяем, что индекс находится в пределах массива
        slideIndex = Math.max(0, Math.min(slideIndex, stories.length - 1));
        
        stories[slideIndex].classList.add('active');
        dots[slideIndex].classList.add('active');
        
        // Обновляем текущий слайд
        currentSlide = slideIndex;
    }
    
    // Инициализация слайдера
    if (stories.length > 0 && dots.length > 0) {
        // Изначально показываем первый слайд
        showSlide(currentSlide);
        
        // Обработчики клика для точек слайдера
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
        
        // Автоматическое переключение слайдов каждые 5 секунд
        const slideInterval = setInterval(function() {
            currentSlide = (currentSlide + 1) % stories.length;
            showSlide(currentSlide);
        }, 5000);
        
        // Останавливаем автопереключение при наведении мыши на слайдер
        const storiesContainer = document.querySelector('.stories-slider');
        if (storiesContainer) {
            storiesContainer.addEventListener('mouseenter', function() {
                clearInterval(slideInterval);
            });
            
            storiesContainer.addEventListener('mouseleave', function() {
                setInterval(function() {
                    currentSlide = (currentSlide + 1) % stories.length;
                    showSlide(currentSlide);
                }, 5000);
            });
        }
    } else {
        console.warn('Слайдер историй не найден или не содержит необходимых элементов');
    }
    
    // Обработка отправки формы подписки
    const subscribeForm = document.getElementById('subscribe-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            
            // Показываем сообщение успешной подписки
            if (nameInput.value && emailInput.value) {
                // Создаем элемент сообщения
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Спасибо за подписку! Чек-лист безопасности будет отправлен на ваш email.';
                successMessage.style.backgroundColor = '#dff0d8';
                successMessage.style.color = '#3c763d';
                successMessage.style.padding = '15px';
                successMessage.style.borderRadius = '5px';
                successMessage.style.marginTop = '20px';
                
                // Сбрасываем форму и добавляем сообщение
                this.reset();
                this.appendChild(successMessage);
                
                // Удаляем сообщение через 5 секунд
                setTimeout(function() {
                    successMessage.remove();
                }, 5000);
                
                // Скачиваем чек-лист
                downloadChecklist();
            }
        });
    }
    
    // Кнопка скачивания чек-листа
    const ctaButton = document.querySelector('.cta-button');
    
    // Функция для скачивания чек-листа
    function downloadChecklist() {
        // Сразу скачиваем HTML-версию без выбора формата
        window.location.href = 'downloads/checklist.html';
    }
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Скачиваем чек-лист напрямую в HTML-формате
            downloadChecklist();
            
            // Прокрутка к форме подписки
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Создание модального окна с приложениями
    function createModal() {
        // Проверяем, существует ли уже модальное окно
        if (document.getElementById('appModal')) {
            return;
        }

        // Создаем контейнер модального окна
        const modal = document.createElement('div');
        modal.id = 'appModal';
        modal.className = 'modal';
        modal.style.display = 'none';
        modal.style.position = 'fixed';
        modal.style.zIndex = '1000';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.overflow = 'auto';
        modal.style.backgroundColor = 'rgba(0,0,0,0.7)';

        // Создаем содержимое модального окна
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.backgroundColor = '#fff';
        modalContent.style.margin = '10% auto';
        modalContent.style.padding = '30px';
        modalContent.style.width = '80%';
        modalContent.style.maxWidth = '700px';
        modalContent.style.borderRadius = '10px';
        modalContent.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        modalContent.style.position = 'relative';

        // Добавляем кнопку закрытия
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-modal';
        closeBtn.innerHTML = '&times;';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '15px';
        closeBtn.style.right = '20px';
        closeBtn.style.fontSize = '30px';
        closeBtn.style.fontWeight = 'bold';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.color = '#555';

        // Заголовок модального окна
        const modalTitle = document.createElement('h3');
        modalTitle.textContent = 'Полезные приложения для путешественников';
        modalTitle.style.marginBottom = '25px';
        modalTitle.style.color = '#333';

        // Контент со списком приложений
        const appList = document.createElement('ul');
        appList.style.listStyle = 'none';
        appList.style.paddingLeft = '0';

        // Список приложений
        const apps = [
            {
                name: 'Maps.me',
                description: 'Оффлайн-карты, работающие без интернета',
                icon: 'fa-map-marker-alt'
            },
            {
                name: 'Google Translate',
                description: 'Переводчик с функцией скачивания языковых пакетов для оффлайн-работы',
                icon: 'fa-language'
            },
            {
                name: 'XE Currency',
                description: 'Конвертер валют с актуальными курсами обмена',
                icon: 'fa-money-bill-wave'
            },
            {
                name: 'TripIt',
                description: 'Организатор путешествий: хранит все билеты и бронирования',
                icon: 'fa-suitcase'
            },
            {
                name: 'Airbnb',
                description: 'Поиск жилья по всему миру',
                icon: 'fa-home'
            },
            {
                name: 'TripAdvisor',
                description: 'Обзоры отелей, ресторанов и достопримечательностей',
                icon: 'fa-info-circle'
            },
            {
                name: 'Uber/Bolt',
                description: 'Безопасный вызов такси в большинстве крупных городов',
                icon: 'fa-taxi'
            },
            {
                name: 'SOS - International Emergency',
                description: 'Справочник с номерами экстренных служб разных стран',
                icon: 'fa-ambulance'
            },
            {
                name: 'Travelsafe',
                description: 'Мобильное приложение для защиты личных данных во время путешествий',
                icon: 'fa-shield-alt'
            },
            {
                name: 'Sygic Travel',
                description: 'Планировщик путешествий с картами достопримечательностей',
                icon: 'fa-route'
            }
        ];

        // Добавляем приложения в список
        apps.forEach(app => {
            const appItem = document.createElement('li');
            appItem.style.padding = '15px 0';
            appItem.style.borderBottom = '1px solid #eee';
            
            const appIcon = document.createElement('i');
            appIcon.className = `fas ${app.icon}`;
            appIcon.style.marginRight = '15px';
            appIcon.style.color = '#ff7b00';
            appIcon.style.width = '20px';
            appIcon.style.textAlign = 'center';
            
            const appName = document.createElement('strong');
            appName.textContent = app.name;
            appName.style.marginRight = '8px';
            
            const appDesc = document.createElement('span');
            appDesc.textContent = ` — ${app.description}`;
            appDesc.style.color = '#666';
            
            appItem.appendChild(appIcon);
            appItem.appendChild(appName);
            appItem.appendChild(appDesc);
            appList.appendChild(appItem);
        });

        // Собираем модальное окно
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(appList);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Добавляем обработчик закрытия модального окна
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        // Закрытие модального окна при клике вне его содержимого
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        return modal;
    }

    // Обработчики для кнопок в секции инструментов
    const toolButtons = document.querySelectorAll('.tool-button');
    
    toolButtons.forEach(button => {
        button.addEventListener('click', function() {
            const toolName = this.previousElementSibling.previousElementSibling.textContent;
            
            if (toolName === 'Карта безопасных районов') {
                // Перенаправление на сайт с картами безопасности
                window.open('https://zagge.ru/karty-samyx-opasnyx-stran-mira/', '_blank');
            } 
            else if (toolName === 'Полезные приложения') {
                // Показать модальное окно со списком приложений
                const modal = createModal();
                modal.style.display = 'block';
            } 
            else if (toolName === 'Контакты экстренных служб') {
                // Перенаправление на страницу Википедии с номерами экстренных служб
                window.open('https://ru.wikipedia.org/wiki/%D0%9D%D0%BE%D0%BC%D0%B5%D1%80%D0%B0_%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%BE%D0%B2_%D1%8D%D0%BA%D1%81%D1%82%D1%80%D0%B5%D0%BD%D0%BD%D1%8B%D1%85_%D1%81%D0%BB%D1%83%D0%B6%D0%B1', '_blank');
            }
        });
    });

    // Эффект появления элементов при прокрутке
    const fadeElements = document.querySelectorAll('.tip-card, .tool-card, .story');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // Если элемент в видимой части окна
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Инициализация стилей для анимации при прокрутке
    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Проверяем позиции элементов при загрузке страницы и при прокрутке
    window.addEventListener('scroll', checkFade);
    window.addEventListener('resize', checkFade);
    checkFade(); // Проверяем при загрузке страницы

    // Функциональность калькулятора страховки
    const calculateBtn = document.getElementById('calculate-btn');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateInsurance);
    }
    
    // Функция расчета стоимости страховки
    function calculateInsurance() {
        // Получаем все значения из формы
        const destination = document.getElementById('destination').value;
        const duration = parseInt(document.getElementById('duration').value);
        const age = parseInt(document.getElementById('age').value);
        const coverage = document.querySelector('input[name="coverage"]:checked').value;
        const sports = document.getElementById('sports').checked;
        const covid = document.getElementById('covid').checked;
        const chronic = document.getElementById('chronic').checked;
        
        // Проверка на валидность полей
        if (!destination || isNaN(duration) || isNaN(age)) {
            alert('Пожалуйста, заполните все поля корректно');
            return;
        }
        
        // Базовые ставки по странам (рублей в день)
        const baseRates = {
            // Европа
            'austria': 50, 'belgium': 48, 'bulgaria': 35, 'uk': 65, 'hungary': 40,
            'germany': 55, 'greece': 45, 'denmark': 60, 'ireland': 55, 'spain': 50,
            'italy': 52, 'cyprus': 45, 'latvia': 35, 'lithuania': 35, 'luxembourg': 55,
            'malta': 45, 'netherlands': 55, 'norway': 70, 'poland': 35, 'portugal': 45,
            'romania': 35, 'slovakia': 38, 'slovenia': 40, 'finland': 55, 'france': 52,
            'croatia': 40, 'czech': 42, 'switzerland': 65, 'sweden': 60, 'estonia': 35,
            
            // Азия
            'azerbaijan': 40, 'armenia': 38, 'bahrain': 50, 'vietnam': 45, 'georgia': 38,
            'israel': 60, 'india': 55, 'indonesia': 50, 'jordan': 45, 'iran': 60,
            'kazakhstan': 40, 'cambodia': 45, 'qatar': 55, 'china': 60, 'kyrgyzstan': 40,
            'korea_south': 60, 'kuwait': 55, 'laos': 45, 'lebanon': 55, 'malaysia': 48,
            'maldives': 60, 'mongolia': 45, 'myanmar': 48, 'nepal': 50, 'oman': 50,
            'pakistan': 65, 'saudi_arabia': 60, 'singapore': 55, 'tajikistan': 45,
            'thailand': 50, 'turkmenistan': 45, 'uzbekistan': 40, 'philippines': 50,
            'sri_lanka': 48, 'japan': 70,
            
            // Африка
            'algeria': 60, 'angola': 70, 'botswana': 65, 'burundi': 75, 'gabon': 65,
            'gambia': 60, 'ghana': 65, 'egypt': 55, 'zambia': 70, 'zimbabwe': 70,
            'cape_verde': 60, 'kenya': 65, 'drc': 80, 'mauritius': 60, 'madagascar': 65,
            'morocco': 55, 'mozambique': 70, 'namibia': 65, 'nigeria': 75, 'reunion': 60,
            'rwanda': 70, 'seychelles': 60, 'senegal': 65, 'tanzania': 65, 'tunisia': 55,
            'uganda': 70, 'ethiopia': 75, 'south_africa': 65,
            
            // Северная Америка
            'antigua': 75, 'bahamas': 80, 'barbados': 75, 'belize': 70, 'haiti': 85,
            'guatemala': 70, 'honduras': 75, 'dominica': 70, 'dominican_republic': 70,
            'canada': 85, 'costa_rica': 70, 'cuba': 65, 'mexico': 70, 'nicaragua': 75,
            'panama': 70, 'puerto_rico': 75, 'el_salvador': 75, 'usa': 95, 'jamaica': 70,
            
            // Южная Америка
            'argentina': 70, 'bolivia': 75, 'brazil': 75, 'venezuela': 85, 'guyana': 75,
            'colombia': 80, 'paraguay': 70, 'peru': 75, 'uruguay': 70, 'chile': 70,
            'ecuador': 75,
            
            // Австралия и Океания
            'australia': 85, 'vanuatu': 75, 'new_zealand': 80, 'palau': 75, 'papua': 80,
            'samoa': 75, 'tonga': 75, 'fiji': 75, 'french_polynesia': 85
        };
        
        // Параметры для стран, которых нет в списке
        const regionRates = {
            'europe': 50,    // Средняя ставка для Европы
            'asia': 50,      // Средняя ставка для Азии
            'africa': 65,    // Средняя ставка для Африки
            'north_america': 75,  // Средняя ставка для Северной Америки
            'south_america': 75,  // Средняя ставка для Южной Америки
            'oceania': 80    // Средняя ставка для Океании
        };
        
        // Определяем регион по коду страны для маппинга имен
        const getRegion = (countryCode) => {
            const europeCodes = ['austria', 'belgium', 'bulgaria', 'uk', 'hungary', 'germany', 'greece', 'denmark', 
                                 'ireland', 'spain', 'italy', 'cyprus', 'latvia', 'lithuania', 'luxembourg', 'malta', 
                                 'netherlands', 'norway', 'poland', 'portugal', 'romania', 'slovakia', 'slovenia', 
                                 'finland', 'france', 'croatia', 'czech', 'switzerland', 'sweden', 'estonia'];
            
            const asiaCodes = ['azerbaijan', 'armenia', 'bahrain', 'vietnam', 'georgia', 'israel', 'india', 'indonesia', 
                               'jordan', 'iran', 'kazakhstan', 'cambodia', 'qatar', 'china', 'kyrgyzstan', 'korea_south', 
                               'kuwait', 'laos', 'lebanon', 'malaysia', 'maldives', 'mongolia', 'myanmar', 'nepal', 'oman', 
                               'pakistan', 'saudi_arabia', 'singapore', 'tajikistan', 'thailand', 'turkmenistan', 
                               'uzbekistan', 'philippines', 'sri_lanka', 'japan'];
            
            const africaCodes = ['algeria', 'angola', 'botswana', 'burundi', 'gabon', 'gambia', 'ghana', 'egypt', 
                                 'zambia', 'zimbabwe', 'cape_verde', 'kenya', 'drc', 'mauritius', 'madagascar', 
                                 'morocco', 'mozambique', 'namibia', 'nigeria', 'reunion', 'rwanda', 'seychelles', 
                                 'senegal', 'tanzania', 'tunisia', 'uganda', 'ethiopia', 'south_africa'];
            
            const northAmericaCodes = ['antigua', 'bahamas', 'barbados', 'belize', 'haiti', 'guatemala', 'honduras', 
                                       'dominica', 'dominican_republic', 'canada', 'costa_rica', 'cuba', 'mexico', 
                                       'nicaragua', 'panama', 'puerto_rico', 'el_salvador', 'usa', 'jamaica'];
            
            const southAmericaCodes = ['argentina', 'bolivia', 'brazil', 'venezuela', 'guyana', 'colombia', 'paraguay', 
                                       'peru', 'uruguay', 'chile', 'ecuador'];
            
            const oceaniaCodes = ['australia', 'vanuatu', 'new_zealand', 'palau', 'papua', 'samoa', 'tonga', 'fiji', 
                                 'french_polynesia'];
            
            if (europeCodes.includes(countryCode)) return 'europe';
            if (asiaCodes.includes(countryCode)) return 'asia';
            if (africaCodes.includes(countryCode)) return 'africa';
            if (northAmericaCodes.includes(countryCode)) return 'north_america';
            if (southAmericaCodes.includes(countryCode)) return 'south_america';
            if (oceaniaCodes.includes(countryCode)) return 'oceania';
            
            return 'other';
        };
        
        // Множители для разных уровней покрытия
        const coverageMultipliers = {
            'basic': 1,
            'standard': 1.4,
            'premium': 2
        };
        
        // Получаем тариф для выбранной страны или используем региональный тариф
        let rate = baseRates[destination];
        if (!rate) {
            const region = getRegion(destination);
            rate = regionRates[region] || 60; // Если регион неизвестен, берем среднее значение
        }
        
        // Расчет базовой стоимости
        let basePrice = rate * duration;
        
        // Учитываем уровень покрытия
        basePrice *= coverageMultipliers[coverage];
        
        // Учитываем возраст путешественника
        if (age < 3) {
            basePrice *= 1.3; // Для младенцев и малышей до 3 лет
        } else if (age < 16) {
            basePrice *= 0.8; // Скидка для детей
        } else if (age > 60) {
            // Повышающий коэффициент для пожилых людей
            const ageFactor = 1 + ((age - 60) / 100); // Каждый год после 60 увеличивает стоимость на 1%
            basePrice *= ageFactor;
        }
        
        // Добавляем стоимость дополнительных опций
        if (sports) {
            basePrice *= 1.3; // +30% за спортивные риски
        }
        
        if (covid) {
            basePrice += 30 * duration; // +30₽ в день за покрытие COVID-19
        }
        
        if (chronic) {
            basePrice *= 1.5; // +50% за покрытие хронических заболеваний
        }
        
        // Округляем и отображаем результат
        const finalPrice = Math.round(basePrice);
        updatePriceDisplay(finalPrice);
        
        // Обновляем описание результата
        updateResultDescription(destination, duration, coverage, finalPrice);
    }
    
    // Функция для обновления отображаемой цены
    function updatePriceDisplay(price) {
        const priceElement = document.querySelector('.price');
        if (priceElement) {
            // Анимация изменения цены
            const currentPrice = parseInt(priceElement.textContent) || 0;
            const step = Math.ceil(Math.abs(price - currentPrice) / 20);
            
            let currentStep = currentPrice;
            const interval = setInterval(() => {
                if (currentPrice < price) {
                    currentStep = Math.min(currentStep + step, price);
                } else {
                    currentStep = Math.max(currentStep - step, price);
                }
                
                priceElement.textContent = currentStep;
                
                if (currentStep === price) {
                    clearInterval(interval);
                    
                    // Добавляем форматирование с разделителями тысяч
                    priceElement.textContent = price.toLocaleString('ru-RU');
                }
            }, 20);
        }
    }
    
    // Функция для обновления описания результата
    function updateResultDescription(destination, duration, coverage, price) {
        const descriptionElement = document.querySelector('.result-description');
        if (!descriptionElement) return;
        
        // Объект со всеми странами, сгруппированными по регионам для отображения
        const countryNames = {
            // Европа
            'austria': 'Австрию', 'belgium': 'Бельгию', 'bulgaria': 'Болгарию', 'uk': 'Великобританию',
            'hungary': 'Венгрию', 'germany': 'Германию', 'greece': 'Грецию', 'denmark': 'Данию',
            'ireland': 'Ирландию', 'spain': 'Испанию', 'italy': 'Италию', 'cyprus': 'Кипр',
            'latvia': 'Латвию', 'lithuania': 'Литву', 'luxembourg': 'Люксембург', 'malta': 'Мальту',
            'netherlands': 'Нидерланды', 'norway': 'Норвегию', 'poland': 'Польшу', 'portugal': 'Португалию',
            'romania': 'Румынию', 'slovakia': 'Словакию', 'slovenia': 'Словению', 'finland': 'Финляндию',
            'france': 'Францию', 'croatia': 'Хорватию', 'czech': 'Чехию', 'switzerland': 'Швейцарию',
            'sweden': 'Швецию', 'estonia': 'Эстонию',
            
            // Азия
            'azerbaijan': 'Азербайджан', 'armenia': 'Армению', 'bahrain': 'Бахрейн', 'vietnam': 'Вьетнам',
            'georgia': 'Грузию', 'israel': 'Израиль', 'india': 'Индию', 'indonesia': 'Индонезию',
            'jordan': 'Иорданию', 'iran': 'Иран', 'kazakhstan': 'Казахстан', 'cambodia': 'Камбоджу',
            'qatar': 'Катар', 'china': 'Китай', 'kyrgyzstan': 'Киргизию', 'korea_south': 'Южную Корею',
            'kuwait': 'Кувейт', 'laos': 'Лаос', 'lebanon': 'Ливан', 'malaysia': 'Малайзию',
            'maldives': 'Мальдивы', 'mongolia': 'Монголию', 'myanmar': 'Мьянму', 'nepal': 'Непал',
            'oman': 'Оман', 'pakistan': 'Пакистан', 'saudi_arabia': 'Саудовскую Аравию', 'singapore': 'Сингапур',
            'tajikistan': 'Таджикистан', 'thailand': 'Таиланд', 'turkmenistan': 'Туркменистан',
            'uzbekistan': 'Узбекистан', 'philippines': 'Филиппины', 'sri_lanka': 'Шри-Ланку', 'japan': 'Японию',
            
            // Африка
            'algeria': 'Алжир', 'angola': 'Анголу', 'botswana': 'Ботсвану', 'burundi': 'Бурунди',
            'gabon': 'Габон', 'gambia': 'Гамбию', 'ghana': 'Гану', 'egypt': 'Египет',
            'zambia': 'Замбию', 'zimbabwe': 'Зимбабве', 'cape_verde': 'Кабо-Верде', 'kenya': 'Кению',
            'drc': 'Конго', 'mauritius': 'Маврикий', 'madagascar': 'Мадагаскар', 'morocco': 'Марокко',
            'mozambique': 'Мозамбик', 'namibia': 'Намибию', 'nigeria': 'Нигерию', 'reunion': 'Реюньон',
            'rwanda': 'Руанду', 'seychelles': 'Сейшелы', 'senegal': 'Сенегал', 'tanzania': 'Танзанию',
            'tunisia': 'Тунис', 'uganda': 'Уганду', 'ethiopia': 'Эфиопию', 'south_africa': 'ЮАР',
            
            // Северная Америка
            'antigua': 'Антигуа и Барбуду', 'bahamas': 'Багамы', 'barbados': 'Барбадос', 'belize': 'Белиз',
            'haiti': 'Гаити', 'guatemala': 'Гватемалу', 'honduras': 'Гондурас', 'dominica': 'Доминику',
            'dominican_republic': 'Доминиканскую Республику', 'canada': 'Канаду', 'costa_rica': 'Коста-Рику',
            'cuba': 'Кубу', 'mexico': 'Мексику', 'nicaragua': 'Никарагуа', 'panama': 'Панаму',
            'puerto_rico': 'Пуэрто-Рико', 'el_salvador': 'Сальвадор', 'usa': 'США', 'jamaica': 'Ямайку',
            
            // Южная Америка
            'argentina': 'Аргентину', 'bolivia': 'Боливию', 'brazil': 'Бразилию', 'venezuela': 'Венесуэлу',
            'guyana': 'Гайану', 'colombia': 'Колумбию', 'paraguay': 'Парагвай', 'peru': 'Перу',
            'uruguay': 'Уругвай', 'chile': 'Чили', 'ecuador': 'Эквадор',
            
            // Австралия и Океания
            'australia': 'Австралию', 'vanuatu': 'Вануату', 'new_zealand': 'Новую Зеландию',
            'palau': 'Палау', 'papua': 'Папуа - Новую Гвинею', 'samoa': 'Самоа', 'tonga': 'Тонгу',
            'fiji': 'Фиджи', 'french_polynesia': 'Французскую Полинезию'
        };
        
        // Регионы для стран, которых нет в списке
        const regionNames = {
            'europe': 'Европу',
            'asia': 'Азию',
            'africa': 'Африку',
            'north_america': 'Северную Америку',
            'south_america': 'Южную Америку',
            'oceania': 'Австралию и Океанию',
            'other': 'выбранную страну'
        };
        
        const coverageNames = {
            'basic': 'базовым',
            'standard': 'стандартным',
            'premium': 'премиальным'
        };
        
        // Получаем название страны или региона
        const countryName = countryNames[destination] || regionNames[getRegion(destination)] || 'выбранную страну';
        
        descriptionElement.textContent = `Стоимость страховки в ${countryName} на ${duration} дней с ${coverageNames[coverage]} покрытием. Скачайте чек-лист безопасности, чтобы быть полностью готовым к поездке!`;
    }
}); 