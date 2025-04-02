
// Modal functionality
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

// Ensure modal covers the viewport and has a higher z-index
modal.style.position = "fixed";
modal.style.top = "0";
modal.style.left = "0";
modal.style.width = "100%";
modal.style.height = "100%";
modal.style.zIndex = "1000";
modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

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

       // Get the modal
       var modal = document.getElementById("myModal");
        
       // Get the button that opens the modal
       var btn = document.getElementById("myBtn");
       
       // Get the <span> element that closes the modal
       var span = document.getElementsByClassName("close")[0];
       
       // When the user clicks the button, open the modal 
       btn.onclick = function() {
           modal.style.display = "block";
       }
       
       // When the user clicks on <span> (x), close the modal
       span.onclick = function() {
           modal.style.display = "none";
       }
       
       // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
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
    console.log('Fetched data:', data); // Debugging line

    if (!data || !data.posts || data.posts.length === 0) {
      console.error('No posts available to display.');
      return;
    }

    // Sort posts by date in descending order (most recent first)
    data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Set currentIndex to the first post (most recent)
    currentIndex = 0; 
    console.log('Displaying post at index:', currentIndex); // Debugging line
    displayPost(currentIndex);

    // Call displayStaticLink only if needed
    if (data.staticLink) {
      displayStaticLink();
    }
  })
  .catch(error => console.error('Error fetching posts:', error));

function displayPost(index) {
  if (!data || !data.posts || data.posts.length === 0) {
    const postElement = document.getElementById('current-post');
    postElement.innerHTML = '<p>No posts available to display.</p>';
    return;
  }

    const post = data.posts[index];
    const postElement = document.getElementById('current-post');
    
    const htmlContent = converter.makeHtml(post.content);
    const sanitizedContent = DOMPurify.sanitize(htmlContent, {
      ALLOWED_TAGS: ['a', 'p', 'br', 'strong', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li'],
      ALLOWED_ATTR: ['href', 'target']
    });
    
    postElement.innerHTML = `
      <div class="post-header">
        <h5>${post.title}</h5>
        <span class="date">${post.date}</span>
      </div>
      <div class="content">${sanitizedContent}</div>
    </div>`;
  }

// Down arrow functionality
// Down arrow functionality
document.getElementById('scroll-down').addEventListener('click', () => {
  currentIndex = (currentIndex + 1 >= data.posts.length) ? 0 : currentIndex + 1;
  displayPost(currentIndex);
});

// Up arrow functionality
document.getElementById('scroll-up').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 < 0) ? data.posts.length - 1 : currentIndex - 1;
  displayPost(currentIndex);
});
