const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const mobileSignUp = document.getElementById('mobileSignUp');
const mobileSignIn = document.getElementById('mobileSignIn');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

mobileSignUp.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

mobileSignIn.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;

        button.textContent = 'Đang xử lý...';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            alert('Form đã được gửi thành công!');
        }, 2000);
    });
});

document.querySelectorAll('.social').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.animation = 'float 0.3s ease-in-out';
    });

    icon.addEventListener('mouseleave', () => {
        icon.style.animation = 'none';
    });
});

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('focused');
        }
    });
});



