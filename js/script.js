document.addEventListener('DOMContentLoaded', function () {
    // Select all links with hashes
    const links = document.querySelectorAll('a[href*="#"]');

    for (const link of links) {
        link.addEventListener('click', function (e) {
            // Prevent default anchor click behavior
            e.preventDefault();

            // Store hash
            const hash = this.hash;

            // Check if the element with the hash exists
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                // Smooth scroll to the element
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // 阻止表单的默认提交行为

            let isValid = true;

            // 获取输入框
            const nameInput = document.getElementById('form-name');
            const emailInput = document.getElementById('form-email');
            const messageInput = document.getElementById('form-message');
            
            // 重置之前的错误信息
            resetValidation(nameInput, emailInput, messageInput);

            // 1. 验证姓名
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required.');
                isValid = false;
            }

            // 2. 验证邮箱
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            }

            // 3. 验证消息
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message cannot be empty.');
                isValid = false;
            }
            
            // 如果所有验证都通过
            if (isValid) {
                // 在真实项目中，这里会发送数据到后端
                // 对于此作业，我们只显示成功消息
                const successMessage = document.getElementById('form-success-message');
                successMessage.classList.remove('d-none');
                contactForm.reset(); // 清空表单
                setTimeout(() => { // 几秒后隐藏成功消息
                    successMessage.classList.add('d-none');
                }, 5000);
            }
        });
    }

    // --- Helper Functions for Validation ---
    function showError(inputElement, message) {
        const feedbackDiv = inputElement.nextElementSibling;
        inputElement.classList.add('is-invalid');
        feedbackDiv.textContent = message;
    }

    function resetValidation(...inputs) {
        inputs.forEach(input => {
            input.classList.remove('is-invalid');
            const feedbackDiv = input.nextElementSibling;
            if (feedbackDiv) {
                feedbackDiv.textContent = '';
            }
        });
    }

    function isValidEmail(email) {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }

    // --- GitHub API Fetch for Project Stats ---
    async function fetchRepoStats() {
        const repoElements = document.querySelectorAll('.repo-stats');
        for (const repoElement of repoElements) {
            const repoName = repoElement.dataset.repo;
            if (!repoName) continue;
            try {
                const response = await fetch(`https://api.github.com/repos/${repoName}`);
                if (!response.ok) {
                    throw new Error(`GitHub API error: ${response.status}`);
                }
                const data = await response.json();
                const stars = data.stargazers_count;
                const forks = data.forks_count;
                repoElement.innerHTML = `
                    <span class="me-3">
                        <i class="bi bi-star-fill"></i> ${stars} Stars
                    </span>
                    <span>
                        <i class="bi bi-git"></i> ${forks} Forks
                    </span>
                `;
            } catch (error) {
                console.error('Failed to fetch repo stats:', error);
                repoElement.innerHTML = `<small>Could not load repo stats.</small>`;
            }
        }
    }
    fetchRepoStats();
});
