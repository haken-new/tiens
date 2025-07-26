// Mathematics Learning Platform JavaScript

class MathLearning {
 constructor() {
 this.currentProblem = null;
 this.currentAnswer = null;
 this.difficulty = 'easy';
 this.currentTopic = 'arithmetic';
 this.stats = {
 problemsSolved: 0,
 correctAnswers: 0,
 totalAttempts: 0,
 level: 1
 };
 this.activities = [];
 this.achievements = [
 { id: 'first_problem', name: 'First Problem', description: 'Solve your first problem', target: 1, current: 0, unlocked: false },
 { id: 'ten_correct', name: '10 Correct', description: 'Get 10 problems correct', target: 10, current: 0, unlocked: false },
 { id: 'perfect_score', name: 'Perfect Score', description: 'Get 5 in a row correct', target: 1, current: 0, unlocked: false }
 ];
 this.consecutiveCorrect = 0;
 
 this.init();
 this.loadProgress();
 }

 init() {
 this.bindEvents();
 this.updateStats();
 this.updateAchievements();
 }

 bindEvents() {
 // Difficulty selector
 document.querySelectorAll('.difficulty-btn').forEach(btn => {
 btn.addEventListener('click', (e) => {
 this.setDifficulty(e.target.dataset.level);
 });
 });

 // Topic cards
 document.querySelectorAll('.topic-card').forEach(card => {
 card.addEventListener('click', (e) => {
 this.setTopic(e.currentTarget.dataset.topic);
 });
 });

 // Answer input
 const answerInput = document.getElementById('answerInput');
 answerInput.addEventListener('keypress', (e) => {
 if (e.key === 'Enter' && !document.getElementById('submitBtn').disabled) {
 this.submitAnswer();
 }
 });

 // Buttons
 document.getElementById('submitBtn').addEventListener('click', () => this.submitAnswer());
 document.getElementById('hintBtn').addEventListener('click', () => this.showHint());
 document.getElementById('newProblemBtn').addEventListener('click', () => this.generateNewProblem());
 }

 setDifficulty(level) {
 this.difficulty = level;
 document.querySelectorAll('.difficulty-btn').forEach(btn => {
 btn.classList.remove('active');
 });
 document.querySelector(`[data-level="${level}"]`).classList.add('active');
 }

 setTopic(topic) {
 this.currentTopic = topic;
 document.querySelectorAll('.topic-card').forEach(card => {
 card.style.opacity = '0.7';
 });
 document.querySelector(`[data-topic="${topic}"]`).style.opacity = '1';
 }

 generateNewProblem() {
 const problemGenerators = {
 arithmetic: this.generateArithmeticProblem.bind(this),
 algebra: this.generateAlgebraProblem.bind(this),
 geometry: this.generateGeometryProblem.bind(this),
 fractions: this.generateFractionsProblem.bind(this)
 };

 this.currentProblem = problemGenerators[this.currentTopic]();
 this.displayProblem();
 this.enableInputs();
 }

 generateArithmeticProblem() {
 let problem = {};
 
 switch(this.difficulty) {
 case 'easy':
 const op1 = Math.floor(Math.random() * 20) + 1;
 const op2 = Math.floor(Math.random() * 20) + 1;
 const operations = ['+', '-', '×'];
 const operation = operations[Math.floor(Math.random() * operations.length)];
 
 problem.text = `${op1} ${operation} ${op2} = ?`;
 problem.work = `Calculate: ${op1} ${operation} ${op2}`;
 
 switch(operation) {
 case '+':
 problem.answer = op1 + op2;
 break;
 case '-':
 problem.answer = Math.abs(op1 - op2);
 problem.text = `${Math.max(op1, op2)} - ${Math.min(op1, op2)} = ?`;
 break;
 case '×':
 problem.answer = op1 * op2;
 break;
 }
 break;
 
 case 'medium':
 const num1 = Math.floor(Math.random() * 100) + 10;
 const num2 = Math.floor(Math.random() * 50) + 5;
 const ops = ['+', '-', '×', '÷'];
 const op = ops[Math.floor(Math.random() * ops.length)];
 
 if (op === '÷') {
 const dividend = num2 * Math.floor(Math.random() * 10 + 2);
 problem.text = `${dividend} ÷ ${num2} = ?`;
 problem.answer = dividend / num2;
 problem.work = `Division: ${dividend} ÷ ${num2}`;
 } else {
 problem.text = `${num1} ${op} ${num2} = ?`;
 problem.work = `Calculate: ${num1} ${op} ${num2}`;
 switch(op) {
 case '+': problem.answer = num1 + num2; break;
 case '-': problem.answer = num1 - num2; break;
 case '×': problem.answer = num1 * num2; break;
 }
 }
 break;
 
 case 'hard':
 const a = Math.floor(Math.random() * 50) + 10;
 const b = Math.floor(Math.random() * 30) + 5;
 const c = Math.floor(Math.random() * 20) + 3;
 
 problem.text = `${a} + ${b} × ${c} = ?`;
 problem.answer = a + (b * c);
 problem.work = `Order of operations: ${a} + (${b} × ${c}) = ${a} + ${b * c}`;
 break;
 }
 
 return problem;
 }

 generateAlgebraProblem() {
 let problem = {};
 
 switch(this.difficulty) {
 case 'easy':
 const x = Math.floor(Math.random() * 10) + 1;
 const constant = Math.floor(Math.random() * 20) + 1;
 const result = x + constant;
 
 problem.text = `x + ${constant} = ${result}. Find x.`;
 problem.answer = x;
 problem.work = `Subtract ${constant} from both sides`;
 break;
 
 case 'medium':
 const coefficient = Math.floor(Math.random() * 5) + 2;
 const value = Math.floor(Math.random() * 10) + 1;
 const product = coefficient * value;
 
 problem.text = `${coefficient}x = ${product}. Find x.`;
 problem.answer = value;
 problem.work = `Divide both sides by ${coefficient}`;
 break;
 
 case 'hard':
 const a = Math.floor(Math.random() * 5) + 2;
 const b = Math.floor(Math.random() * 10) + 1;
 const x_val = Math.floor(Math.random() * 8) + 1;
 const result_val = a * x_val + b;
 
 problem.text = `${a}x + ${b} = ${result_val}. Find x.`;
 problem.answer = x_val;
 problem.work = `Subtract ${b}, then divide by ${a}`;
 break;
 }
 
 return problem;
 }

 generateGeometryProblem() {
 let problem = {};
 
 switch(this.difficulty) {
 case 'easy':
 const side = Math.floor(Math.random() * 10) + 3;
 problem.text = `Find the perimeter of a square with side length ${side} units.`;
 problem.answer = side * 4;
 problem.work = `Perimeter = 4 × side length = 4 × ${side}`;
 break;
 
 case 'medium':
 const length = Math.floor(Math.random() * 10) + 5;
 const width = Math.floor(Math.random() * 8) + 3;
 problem.text = `Find the area of a rectangle with length ${length} and width ${width}.`;
 problem.answer = length * width;
 problem.work = `Area = length × width = ${length} × ${width}`;
 break;
 
 case 'hard':
 const radius = Math.floor(Math.random() * 8) + 2;
 problem.text = `Find the area of a circle with radius ${radius}. (Use π ≈ 3.14)`;
 problem.answer = Math.round(3.14 * radius * radius * 100) / 100;
 problem.work = `Area = π × r² = 3.14 × ${radius}²`;
 break;
 }
 
 return problem;
 }

 generateFractionsProblem() {
 let problem = {};
 
 switch(this.difficulty) {
 case 'easy':
 const num1 = Math.floor(Math.random() * 5) + 1;
 const den1 = Math.floor(Math.random() * 8) + 2;
 const num2 = Math.floor(Math.random() * 5) + 1;
 
 problem.text = `${num1}/${den1} + ${num2}/${den1} = ?`;
 problem.answer = `${num1 + num2}/${den1}`;
 problem.work = `Same denominator: add numerators`;
 break;
 
 case 'medium':
 const n1 = Math.floor(Math.random() * 4) + 1;
 const d1 = Math.floor(Math.random() * 6) + 2;
 const n2 = Math.floor(Math.random() * 4) + 1;
 const d2 = Math.floor(Math.random() * 6) + 2;
 
 problem.text = `Convert ${n1}/${d1} to decimal (round to 2 places)`;
 problem.answer = Math.round((n1/d1) * 100) / 100;
 problem.work = `Divide numerator by denominator: ${n1} ÷ ${d1}`;
 break;
 
 case 'hard':
 const numerator = Math.floor(Math.random() * 8) + 1;
 const denominator = Math.floor(Math.random() * 12) + 2;
 const wholeNum = Math.floor(Math.random() * 3) + 1;
 
 problem.text = `Convert ${wholeNum} ${numerator}/${denominator} to improper fraction. Give numerator.`;
 problem.answer = (wholeNum * denominator) + numerator;
 problem.work = `Multiply whole number by denominator, then add numerator`;
 break;
 }
 
 return problem;
 }

 displayProblem() {
 document.getElementById('problemText').textContent = this.currentProblem.text;
 document.getElementById('problemWork').textContent = this.currentProblem.work;
 document.getElementById('answerInput').value = '';
 document.getElementById('resultDisplay').textContent = '';
 document.getElementById('resultDisplay').className = 'result-display';
 }

 enableInputs() {
 document.getElementById('answerInput').disabled = false;
 document.getElementById('submitBtn').disabled = false;
 document.getElementById('hintBtn').disabled = false;
 document.getElementById('answerInput').focus();
 }

 submitAnswer() {
 const userAnswer = document.getElementById('answerInput').value.trim();
 const resultDisplay = document.getElementById('resultDisplay');
 
 if (!userAnswer) {
 resultDisplay.textContent = 'Please enter an answer';
 resultDisplay.className = 'result-display result-incorrect';
 return;
 }

 const isCorrect = this.checkAnswer(userAnswer);
 this.stats.totalAttempts++;

 if (isCorrect) {
 this.stats.correctAnswers++;
 this.consecutiveCorrect++;
 resultDisplay.textContent = '✓ Correct! Well done!';
 resultDisplay.className = 'result-display result-correct';
 this.addActivity(`Solved: ${this.currentProblem.text.split('=')[0]} - Correct!`);
 this.updateAchievementProgress('first_problem', 1);
 this.updateAchievementProgress('ten_correct', 1);
 
 if (this.consecutiveCorrect >= 5) {
 this.updateAchievementProgress('perfect_score', 1);
 }
 } else {
 this.consecutiveCorrect = 0;
 resultDisplay.textContent = `✗ Incorrect. The correct answer is ${this.currentProblem.answer}`;
 resultDisplay.className = 'result-display result-incorrect';
 this.addActivity(`Attempted: ${this.currentProblem.text.split('=')[0]} - Incorrect`);
 }

 this.stats.problemsSolved++;
 this.updateStats();
 this.updateTopicProgress();
 this.saveProgress();
 
 // Disable inputs after submission
 document.getElementById('answerInput').disabled = true;
 document.getElementById('submitBtn').disabled = true;
 document.getElementById('hintBtn').disabled = true;
 }

 checkAnswer(userAnswer) {
 const correctAnswer = this.currentProblem.answer.toString();
 
 // Handle different answer formats
 if (typeof this.currentProblem.answer === 'number') {
 return Math.abs(parseFloat(userAnswer) - this.currentProblem.answer) < 0.01;
 }
 
 return userAnswer.toLowerCase() === correctAnswer.toLowerCase();
 }

 showHint() {
 const hintText = this.currentProblem.work || 'Think about the operation step by step.';
 document.getElementById('problemWork').textContent = `Hint: ${hintText}`;
 }

 updateStats() {
 document.getElementById('problemsSolved').textContent = this.stats.problemsSolved;
 
 const accuracy = this.stats.totalAttempts > 0 
 ? Math.round((this.stats.correctAnswers / this.stats.totalAttempts) * 100)
 : 0;
 document.getElementById('accuracyRate').textContent = `${accuracy}%`;
 
 // Level up based on correct answers
 this.stats.level = Math.floor(this.stats.correctAnswers / 10) + 1;
 document.getElementById('currentLevel').textContent = this.stats.level;
 }

 updateTopicProgress() {
 const topicCard = document.querySelector(`[data-topic="${this.currentTopic}"]`);
 if (topicCard) {
 const progressBar = topicCard.querySelector('.progress');
 const currentProgress = parseInt(progressBar.style.width) || 0;
 const newProgress = Math.min(currentProgress + 5, 100);
 progressBar.style.width = `${newProgress}%`;
 }
 }

 addActivity(text) {
 this.activities.unshift({
 text: text,
 timestamp: new Date().toLocaleTimeString()
 });
 
 // Keep only last 10 activities
 if (this.activities.length > 10) {
 this.activities = this.activities.slice(0, 10);
 }
 
 this.updateActivityDisplay();
 }

 updateActivityDisplay() {
 const activityList = document.getElementById('activityList');
 
 if (this.activities.length === 0) {
 activityList.innerHTML = '<p>No recent activity</p>';
 return;
 }
 
 activityList.innerHTML = this.activities
 .map(activity => 
 `<div class="activity-item">${activity.timestamp} - ${activity.text}</div>`
 )
 .join('');
 }

 updateAchievementProgress(achievementId, increment) {
 const achievement = this.achievements.find(a => a.id === achievementId);
 if (achievement && !achievement.unlocked) {
 achievement.current = Math.min(achievement.current + increment, achievement.target);
 
 if (achievement.current >= achievement.target) {
 achievement.unlocked = true;
 this.addActivity(`🏆 Achievement unlocked: ${achievement.name}!`);
 }
 
 this.updateAchievements();
 }
 }

 updateAchievements() {
 const achievementsContainer = document.getElementById('achievements');
 
 achievementsContainer.innerHTML = this.achievements
 .map(achievement => 
 `<div class="achievement ${achievement.unlocked ? 'unlocked' : 'locked'}">
 <i class="fas fa-${achievement.id === 'first_problem' ? 'trophy' : achievement.id === 'ten_correct' ? 'star' : 'medal'}"></i>
 <span>${achievement.name} (${achievement.current}/${achievement.target})</span>
 </div>`
 )
 .join('');
 }

 saveProgress() {
 const progressData = {
 stats: this.stats,
 activities: this.activities,
 achievements: this.achievements,
 consecutiveCorrect: this.consecutiveCorrect
 };
 
 localStorage.setItem('mathLearningProgress', JSON.stringify(progressData));
 }

 loadProgress() {
 const savedProgress = localStorage.getItem('mathLearningProgress');
 
 if (savedProgress) {
 const data = JSON.parse(savedProgress);
 this.stats = data.stats || this.stats;
 this.activities = data.activities || [];
 this.achievements = data.achievements || this.achievements;
 this.consecutiveCorrect = data.consecutiveCorrect || 0;
 
 this.updateStats();
 this.updateActivityDisplay();
 this.updateAchievements();
 }
 }
}

// Initialize the math learning platform when the page loads
document.addEventListener('DOMContentLoaded', () => {
 new MathLearning();
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
 anchor.addEventListener('click', function (e) {
 e.preventDefault();
 const target = document.querySelector(this.getAttribute('href'));
 if (target) {
 target.scrollIntoView({
 behavior: 'smooth',
 block: 'start'
 });
 }
 });
});


document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const closeNav = document.getElementById("closeNav");

    if (menuToggle && navLinks && closeNav) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.add("active");
        });

        closeNav.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    }
});