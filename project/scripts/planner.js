const form = document.querySelector('#game-form');
const gameName = document.querySelector('#game-name');
const gameType = document.querySelector('#game-type');
const gameGoal = document.querySelector('#game-goal');
const sessionLength = document.querySelector('#session-length');
const savedPlan = document.querySelector('#saved-plan');
const planStatus = document.querySelector('#plan-status');

function showPlan(plan) {
  let firstTask = '';
  if (plan.type === 'platformer') {
    firstTask = 'Make the character move and jump on one platform.';
  } else if (plan.type === 'maze') {
    firstTask = 'Make the character move and stop when it reaches a wall.';
  } else {
    firstTask = 'Show six cards and let the player turn over one card.';
  }

  document.querySelector('#plan-output').textContent = `${plan.name}\nPlayer goal: ${plan.goal}\nPractice session: ${plan.minutes} minutes\nFirst task: ${firstTask}\nFinish line: Add a win message and a way to restart.`;
  savedPlan.hidden = false;
}

function savePlan(event) {
  event.preventDefault();
  if (gameName.value.trim() === '' || gameGoal.value.trim() === '') {
    planStatus.textContent = 'Please enter a game name and goal, not just spaces.';
    return;
  }
  const plan = {
    name: gameName.value.trim(),
    type: gameType.value,
    goal: gameGoal.value.trim(),
    minutes: Number(sessionLength.value)
  };
  showPlan(plan);
  try {
    localStorage.setItem('indiePlan', JSON.stringify(plan));
    planStatus.textContent = 'Your game plan is saved in this browser.';
  } catch {
    planStatus.textContent = 'Your plan is shown below, but your browser could not save it.';
  }
}

try {
  const plan = JSON.parse(localStorage.getItem('indiePlan'));
  if (plan && typeof plan.name === 'string' && typeof plan.goal === 'string' && ['platformer', 'maze', 'memory'].includes(plan.type) && plan.minutes >= 10 && plan.minutes <= 120) {
    gameName.value = plan.name;
    gameType.value = plan.type;
    gameGoal.value = plan.goal;
    sessionLength.value = plan.minutes;
    showPlan(plan);
    planStatus.textContent = 'Your saved plan has been restored. You can edit and save it again.';
  }
} catch {
  planStatus.textContent = 'A saved plan could not be loaded. You can create a new one.';
}

form.addEventListener('submit', savePlan);
document.querySelector('#clear-plan').addEventListener('click', () => {
  try {
    localStorage.removeItem('indiePlan');
    form.reset();
    savedPlan.hidden = true;
    planStatus.textContent = 'Your saved plan has been deleted.';
    gameName.focus();
  } catch {
    planStatus.textContent = 'Your browser could not delete the saved plan.';
  }
});
