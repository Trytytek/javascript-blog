'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    console.log('remove class active from all article links',activeLinks)
        for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    /* [DONE]add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    console.log('clickedElement:', clickedElement);
    console.log('clickedElement (with plus): ' + clickedElement);

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

        for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log('articleSelector:', articleSelector);


    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle:', targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
}






/* [DONE] create a function which generates the title links */
const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles',
      optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector=''){
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  for(let article of articles){
    const articleId = article.getAttribute('id');
    const titleElement = article.querySelector(optTitleSelector);
    const articleTitle = titleElement.innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    titleList.innerHTML += linkHTML;
  }

  const links = titleList.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

/* [NEW] create a function which generates the tags */

function generateTags(){
  /* [DONE]find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log('find all articles:', articles);

  /* [DONE]START LOOP: for every article: */
  for(let article of articles){
    //console.log('loop:', article);


    /* [DONE]find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    //console.log('Find tag wrapper:', optArticleTagsSelector);


    /* [DONE]make html variable with empty string */
    let html = '';
    /* [DONE]get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log('article tags:', articleTags);
    /* [DONE]split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray)
    /* [DONE]START LOOP: for each tag */
    for(let tag of articleTagsArray){
      //console.log(tag)
      /*[DONE] generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      //console.log(linkHTML)
      /* add generated code to html variable */
      html += linkHTML;
      //console.log(tagsWrapper)
    /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

  /* [DONE] END LOOP: for every article: */
  }
}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('read the attribute:',href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');
  console.log('extracted tag:',tag);
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('find all tag links with class active:',activeTagLinks)
  /* START LOOP: for each active tag link */
  for(let activeTag of activeTagLinks){
    /* remove class active */
  activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const equalTags = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let equalTag of equalTags){
    /* add class active */
    equalTag.classList.add('active');
  /* END LOOP: for each found tag link */

  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  }
function addClickListenersToTags(){
  const links = document.querySelectorAll('a[href^="#tag-"]');
  console.log('linki tagów:',links);

  for(let link of links){
  link.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();


/*Generate Authors*/

const optArticleAuthorSelector = '.post-author';

function generateAuthors(){
  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log('znajdz post-author:', authorWrapper);
    const author = article.getAttribute('data-author');
    console.log('author:', author);
    const html = 'by <a href="#author-' + author + '">' + author + '</a>';
    authorWrapper.innerHTML = html;
  }
}

generateAuthors();


function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  //console.log('read the attribute:',href);
  const author = href.replace('#author-','');
  //console.log('extracted Author:',author);
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  //console.log('find all author links with class active:',activeAuthorLinks)
  for(let activeAuthor of activeAuthorLinks){
  activeAuthor.classList.remove('active');
  }
  const equalAuthor = document.querySelectorAll('a[href="' + href + '"]');
  for(let author of equalAuthor){
    author.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
  }
function addClickListenersToAuthors(){
  const links = document.querySelectorAll('a[href^="#author-"]');
  console.log('linki authorów:',links);

  for(let link of links){
  link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
