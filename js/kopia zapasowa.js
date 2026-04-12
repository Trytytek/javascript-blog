'use strict';

/* ===================== CLICK NA ARTYKUŁ ===================== */
function titleClickHandler(event){
  event.preventDefault();

  const clickedElement = this;

  /* usuń active z linków */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* dodaj active do klikniętego */
  clickedElement.classList.add('active');

  /* usuń active z artykułów */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* znajdź artykuł */
  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);

  if(targetArticle){
    targetArticle.classList.add('active');
  }
}


/* ===================== OPCJE ===================== */
const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles',
      optArticleTagsSelector = '.post-tags .list';


/* ===================== GENEROWANIE LISTY ===================== */
function generateTitleLinks(customSelector=''){
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for(let article of articles){
    const articleId = article.getAttribute('id');
    const titleElement = article.querySelector(optTitleSelector);
    const articleTitle = titleElement.innerHTML;

    html += `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
  }

  titleList.innerHTML = html;

  /* 🔥 eventy po renderze */
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  /* 🔥 ustaw pierwszy artykuł jako aktywny */
  const firstLink = document.querySelector('.titles a');
  if(firstLink){
    firstLink.click();
  }
}


/* ===================== GENEROWANIE TAGÓW ===================== */
function generateTags(){
  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    let html = '';
    const articleTags = article.getAttribute('data-tags');
    if(!articleTags) continue;

    const articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray){
      html += `<li><a href="#tag-${tag}"><span>${tag}</span></a></li>`;
    }

    tagsWrapper.innerHTML = html;
  }
}


/* ===================== KLIK NA TAG ===================== */
function tagClickHandler(event){
  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  if(!href) return;

  const tag = href.replace('#tag-','');

  /* usuń active z tagów */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  for(let activeTag of activeTagLinks){
    activeTag.classList.remove('active');
  }

  /* dodaj active do klikniętych */
  const equalTags = document.querySelectorAll(`a[href="${href}"]`);
  for(let equalTag of equalTags){
    equalTag.classList.add('active');
  }

  /* filtruj artykuły */
  generateTitleLinks(`[data-tags~="${tag}"]`);
}


/* ===================== EVENTY TAGÓW ===================== */
function addClickListenersToTags(){
  const links = document.querySelectorAll('a[href^="#tag-"]');

  for(let link of links){
    link.addEventListener('click', tagClickHandler);
  }
}


/* ===================== START ===================== */
generateTitleLinks();   // lista artykułów
generateTags();         // generowanie tagów
addClickListenersToTags(); // kliknięcia tagów
