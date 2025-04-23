function toggleAnswer(number) {
    var answer = document.getElementById('answer' + number);
    if (answer.style.display === 'none' || answer.style.display === '') {
        answer.style.display = 'block';
    } else {
        answer.style.display = 'none';
    }
}

// 
// Необходим скрипт, если вы хотите увеличить картинку при клике вместо наведения
document.addEventListener('DOMContentLoaded', function () {
    var zoomableImages = document.querySelectorAll('.zoomable');

    zoomableImages.forEach(function (img) {
        img.addEventListener('click', function () {
            this.classList.toggle('zoomed');
        });
    });
});



// 
// функция кнопки ответ

function checkAnswers(setId) {
    const set = document.getElementById(setId);
    const inputs = set.querySelectorAll('input[data-answer]');
    inputs.forEach(input => {
        const correctAnswer = input.getAttribute('data-answer').toLowerCase();
        const userAnswer = input.value.trim().toLowerCase();

        if (userAnswer === correctAnswer) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    });
}

// кнопка для подсказки
function toggleHints(element) {
    element.classList.toggle("active");
}

// выбор ответа из трех
function handleQuizAnswers(quizContainerId = 'questions', checkButtonId = 'checkAnswers') {
	const quizContainer = document.getElementById(quizContainerId);
	const checkButton = document.getElementById(checkButtonId);

	if (!quizContainer || !checkButton) return;

	// Выбор ответа
	quizContainer.querySelectorAll('.question').forEach((question, questionIndex) => {
		const options = question.querySelectorAll('.option');
		options.forEach((option, index) => {
			option.addEventListener('click', () => {
				// Удаляем активные классы
				options.forEach(opt => {
					opt.classList.remove('selected');
					opt.style.color = ''; // сбрасываем цвет
				});
				// Добавляем класс выбранному варианту
				option.classList.add('selected');
				option.style.color = 'blue';
			});
		});
	});

	// Проверка ответов
	checkButton.addEventListener('click', () => {
		quizContainer.querySelectorAll('.question').forEach((question) => {
			const correctIndex = parseInt(question.dataset.correct, 10);
			const options = question.querySelectorAll('.option');
			options.forEach((option, index) => {
				option.style.textDecoration = 'none'; // убираем подчеркивание
				if (index === correctIndex) {
					option.style.color = 'green'; // правильный — зелёный
					option.style.fontWeight = 'bold';
				} else if (option.classList.contains('selected')) {
					option.style.color = 'red'; // выбранный, но неправильный — красный
				}
			});
		});
	});
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
	handleQuizAnswers();
});