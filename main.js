document.getElementById('videoImage').addEventListener('click', function(){
    console.log('image is clicked');
 })
window.addEventListener('DOMContentLoaded', () => {
    $("a[href*='#']").on("click", function(e){
      const anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top
      }, 777);
      e.preventDefault();
      return false;
    });
  })

  function Form ({ option }) {
    return (
      <form className='account-form' onSubmit={(evt) => evt.preventDefault()}>
        <div className={'account-form-fields ' + (option === 1 ? 'sign-in' : (option === 2 ? 'sign-up' : 'forgot')) }>
          <input id='email' name='email' type='email' placeholder='E-mail' required />
          <input id='password' name='password' type='password' placeholder='Password' required={option === 1 || option === 2 ? true : false} disabled={option === 3 ? true : false} />
          <input id='repeat-password' name='repeat-password' type='password' placeholder='Repeat password' required={option === 2 ? true : false} disabled={option === 1 || option === 3 ? true : false} />
        </div>
        <button className='btn-submit-form' type='submit'>
          { option === 1 ? 'Sign in' : (option === 2 ? 'Sign up' : 'Reset password') }
        </button>
      </form>
    )
  }
  
  function App () {
    const [option, setOption] = React.useState(1)
    
    return (
      <div className='container'>
        <header>
          <div className={'header-headings ' + (option === 1 ? 'sign-in' : (option === 2 ? 'sign-up' : 'forgot')) }>
            <span>Sign in to your account</span>
            <span>Create an account</span>
            <span>Reset your password</span>
          </div>
        </header>
        <ul className='options'>
          <li className={option === 1 ? 'active' : ''} onClick={() => setOption(1)}>Sign in</li>
          <li className={option === 2 ? 'active' : ''} onClick={() => setOption(2)}>Sign up</li>
          <li className={option === 3 ? 'active' : ''} onClick={() => setOption(3)}>Forgot</li>
        </ul>
        <Form option={option} />
        <footer>
          <a href='' target='_blank'></a>
        </footer>
      </div>
    )
  }
  
  ReactDOM.render(<App />, document.getElementById('app'))
  window.onload = function() {
    (function() {
        const inputText = document.querySelectorAll('.auth-form__input');

        inputText.forEach( function(input) {
            input.addEventListener('focus', function() {
                this.classList.add('focus');
                this.parentElement.querySelector('.auth-form__placeholder').classList.add('focus');
            });
            input.addEventListener('blur', function() {
                this.classList.remove('focus');
                if (! this.value) {
                    this.parentElement.querySelector('.auth-form__placeholder').classList.remove('focus');
                }
            });
        });
    })();

    (function() {
        const togglers = document.querySelectorAll('.password-toggler');

        togglers.forEach( function(checkbox) {
            checkbox.addEventListener('change', function() {

                const toggler = this.parentElement,
                      input   = toggler.parentElement.querySelector('.input-password'),
                      icon    = toggler.querySelector('.auth-form__icon');

                if (checkbox.checked) {
                    input.type = 'text';
                    icon.classList.remove('la-eye')
                    icon.classList.add('la-eye-slash');
                }

                else
                {
                    input.type = 'password';
                    icon.classList.remove('la-eye-slash')
                    icon.classList.add('la-eye');
                }
            });
        });
    })();

    (function() {
        const validEmail = 'test@example.com',
              validPassword = 'qwerty123';
        
        document.body.querySelector('.hint')
                     .innerHTML = `<p>${validEmail}</p><p>${validPassword}</p>`;

        document.forms['form-auth'].addEventListener('submit', function(e) {
            e.preventDefault();

            const answerContainer = this.querySelector('.auth-form__answer'),
                  email = this.elements.email.value,
                  password = this.elements.password.value;

            const placeholders = document.querySelectorAll('.auth-form__placeholder');

            if (email == validEmail && password == validPassword) {
                answerContainer.innerHTML = '<span class="text-success">you\'ve been logged successfully</span>';
            }

            else {
                placeholders.forEach(function(placeholder) {
                    placeholder.classList.remove('focus');
                });
                this.elements.email.value = '';
                this.elements.password.value = '';
                answerContainer.innerHTML = '<span class="text-danger">invalid email or password</span>';
            }
        });
    })();
};

// Инициализация слайдера команды
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.team-slider')) {
    const teamSwiper = new Swiper('.team-slider', {
      loop: true,
      speed: 600,
      grabCursor: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 30
        }
      },
      // Эффект плавного перехода
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      }
    });

    // Пауза при наведении
    const sliderContainer = document.querySelector('.team-slider');
    sliderContainer.addEventListener('mouseenter', () => {
      teamSwiper.autoplay.stop();
    });
    sliderContainer.addEventListener('mouseleave', () => {
      teamSwiper.autoplay.start();
    });
  }
});

// Плавное появление карточек при скролле
document.addEventListener('DOMContentLoaded', function() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.1 });
  
  serviceCards.forEach(card => {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
  });
  
  // Параллакс-эффект для фонового изображения
  const servicesSection = document.querySelector('.services');
  if (servicesSection) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      servicesSection.style.backgroundPosition = `center ${scrollPosition * 0.3}px`;
    });
  }
});

// Меню мобильной навигации
function toggleMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('active');
    
    const body = document.body;
    if (nav.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav').classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Эффект при скролле для шапки
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Модальное окно для проигрывания треков
document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const trackId = this.getAttribute('data-track');
        openPlayerModal(trackId);
    });
});

function openPlayerModal(trackId) {
    const modal = document.getElementById('playerModal');
    const playerContainer = document.getElementById('playerContainer');
    
    // Создаем iframe для Spotify
    playerContainer.innerHTML = `
        <iframe style="border-radius:12px" 
                src="https://open.spotify.com/embed/album/${trackId}?utm_source=generator" 
                width="100%" 
                height="500" 
                frameborder="0" 
                allowfullscreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy">
        </iframe>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('playerModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    
    // Очищаем плеер
    document.getElementById('playerContainer').innerHTML = '';
}

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(e) {
    const modal = document.getElementById('playerModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Анимация появления элементов при скролле
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .client');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight * 0.8;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Инициализация анимаций
window.addEventListener('DOMContentLoaded', function() {
    // Установка начальных стилей для анимации
    document.querySelectorAll('.project-card, .client').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Анимация при загрузке
    animateOnScroll();
});

// Запуск анимации при скролле
window.addEventListener('scroll', animateOnScroll);