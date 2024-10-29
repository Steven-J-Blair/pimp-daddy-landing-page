// Modal functionality
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Blog functionality
let data = null;
let currentIndex = 0;
const converter = new showdown.Converter();

fetch('blog-posts.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;
    displayStaticLink();
    displayPost(currentIndex);
  })
  .catch(error => console.error('Error fetching posts:', error));

function displayStaticLink() {
  const staticLinkContainer = document.getElementById('static-link-container');
  const staticLinkElement = document.createElement('a');
  staticLinkElement.href = data.staticLink.href;
  staticLinkElement.textContent = data.staticLink.text;
  staticLinkElement.target = data.staticLink.target;
  staticLinkElement.className = 'static-link';
  staticLinkContainer.appendChild(staticLinkElement);
}

function displayPost(index) {
  const post = data.posts[index];
  const postElement = document.getElementById('current-post');
  
  const htmlContent = converter.makeHtml(post.content);
  const sanitizedContent = DOMPurify.sanitize(htmlContent);
  
  postElement.innerHTML = `
    <div class="post-header">
      <h4>${post.title}</h4>
      <span class="date">${post.date}</span>
    </div>
    <div class="content">${sanitizedContent}</div>
  `;
}

document.getElementById('scroll-down').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % data.posts.length;
  displayPost(currentIndex);
});