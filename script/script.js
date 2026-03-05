// get all levels
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US"; // English
  window.speechSynthesis.speak(utterance);
}


const loadAllLevels = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((datas) => displayAllLevels(datas.data));
};

const removeActive = () => {
  const lessonBtns = document.querySelectorAll(".lesson-btn");
  console.log(lessonBtns);
  lessonBtns.forEach((btn) => btn.classList.remove("active"));
};

const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};
const loadAllWords = async (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayAllWords(data.data);
  removeActive();
  const clickBtn = document.getElementById(`lesson-btn-${id}`);
  console.log(clickBtn);
  clickBtn.classList.add("active");
};

const loadWordDetails = async (id) => {
  // console.log(wordDetailsContainer);

  const res = await fetch(
    `https://openapi.programming-hero.com/api/word/${id}`,
  );
  const data = await res.json();
  displayWordDetails(data.data);
};

const displayWordDetails = (word) => {
  console.log(word);

  const wordDetailsContainer = document.getElementById("word-detail-container");

  wordDetailsContainer.innerHTML = `
<div>
<h2>${word.word}(<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>

<div>
<p>meaning</p>
<p>${word.meaning}</p>
</div>

<div>
<p>Example</p>
<p>${word.sentence}</p>
</div>

<div>
<p>সমার্থক শব্দ</p>
<p>${word.synonyms}</p>
</div> 

</div>`;
  document.getElementById("show_modal").showModal();
};

const displayAllWords = (words) => {
  console.log(words);

  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
        <div>
            <h3 class="font-semibold text-2xl">এঈ LESSON এ এখনো কিছু যুক্ত করা হয় নি</h3>
            <h2 class="font-bold text-3xl">প্লিজ পরবর্তী lesson এ যান</h2>
        </div>`;

    
  }manageSpinner(false);

  words.forEach((word) => {
    console.log(word);

    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white p-8 m-2 rounded-md">
    <h2>${word.word}</h2>
    <p>meaning/pronunciation</p>
    <h2>${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}/${word.pronunciation}</h2>

    <div class="flex justify-between items-center">

    <span onclick="loadWordDetails(${word.id})" class="bg-cyan-200 p-2 rounded-md"><i class="fa-solid fa-circle-info"></i></span>

    <span onclick="pronounceWord('${word.word}')" class="bg-cyan-200 p-2 rounded-md"><i class="fa-solid fa-volume-high"></i></span>

    </div>
    </div>`;

    wordContainer.appendChild(card);
  });
};

// loadAllWords();

const getLevelContainer = document.getElementById("level-container");
console.log(getLevelContainer);
getLevelContainer.innerHTML = "";

const displayAllLevels = (levels) => {
  console.log(levels);
  levels.forEach((level) => {
    console.log(level);
    const levelNo = level.level_no;
    console.log(levelNo);

    const createdLevelContainer = document.createElement("div");
    createdLevelContainer.innerHTML = `<button id="lesson-btn-${level.level_no}" onclick="loadAllWords(${level.level_no})" class="btn alert alert-info text-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson-${level.level_no}</button>`;

    getLevelContainer.appendChild(createdLevelContainer);
  });
};
loadAllLevels();
