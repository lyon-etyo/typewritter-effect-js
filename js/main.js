class TypeWriter {
  constructor(txtEl, words, wait = 2000) {
    this.txtEl = txtEl;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // current index of word
    const current = this.wordIndex % this.words.length;
    // get full text of current word
    const fullText = this.words[current];
    this.txtEl.style.setProperty("--length-chars", "" + fullText.length);
    // check if deleting
    if (this.isDeleting) {
      // remove char
      this.txt = fullText.substring(0, this.txt.length - 1);
    } else {
      // add char
      this.txt = fullText.substring(0, this.txt.length + 1);
    }

    // insert txt into element
    this.txtEl.innerHTML = `${this.txt}`;
    // typespeed
    let typeSpeed = 300;

    if (this.isDeleting) typeSpeed /= 2;

    // If the word is complete
    if (!this.isDeleting && this.txt === fullText) {
      // Pause at the end
      typeSpeed = this.wait;
      // set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting &&  this.txt === "") {
      this.isDeleting = false;
      // move to next word
      this.wordIndex++;
      // pause before start typing
      typeSpeed = 500;
    }

    // use recursive in setTimeout within typeSpeed
    setTimeout(() => this.type(), typeSpeed);
  }
}

document.addEventListener("DOMContentLoaded" , init);

function init() {
  const txtEl = document.querySelector(".txt-type");
  const words = JSON.parse(txtEl.dataset.words);
  const wait = txtEl.dataset.wait;
  new TypeWriter(txtEl, words, wait);
}