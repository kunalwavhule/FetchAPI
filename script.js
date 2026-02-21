const loadingText = document.getElementById("loading");
const usersContainer = document.getElementById("users");
const postsContainer = document.getElementById("posts");

async function loadData() {

  try {
    if (loadingText) {
      loadingText.style.display = "block";
      loadingText.innerText = "Loading data...";
    }
      new Promise(resolve => setTimeout(resolve, 10000));

    const [usersResponse, postsResponse] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users"),
      fetch("https://jsonplaceholder.typicode.com/posts")
    ]);

    const users = await usersResponse.json();
    const posts = await postsResponse.json();

    if (loadingText) {
      loadingText.style.display = "none";
    }

    usersContainer.innerHTML = "";
    users.forEach(user => {
      usersContainer.innerHTML += `
        <div class="card">
          <strong>${user.name}</strong>
          <p>${user.email}</p>
        </div>
      `;
    });

    postsContainer.innerHTML = "";
    posts.slice(0, 10).forEach(post => {
      postsContainer.innerHTML += `
        <div class="card">
          <strong>${post.title}</strong>
          <p>${post.body}</p>
        </div>
      `;
    });

  } catch (error) {
    console.log("Error:", error);
    if (loadingText) {
      loadingText.innerText = "Failed to load data";
    }
  }
}

loadData();