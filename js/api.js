
const URL_TABLE = "http://localhost:3000/table";

const URL_DISH = "http://localhost:3000/dish";

const URL_USER = "http://localhost:3000/user";

const URL_ORDER = "http://localhost:3000/orders";

async function getAll(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data; // Trả về data đúng cách
  } catch (error) {
    console.error('Có lỗi xảy ra:', error);
    return null;
  }
}

function add(url, object) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object),
  })
    .then(response => response.json())
    .then(data => {
      // After successful creation, refresh the post list
      fetchPosts();
    })
    .catch(error => console.error('Error creating post:', error));
}


// url: địa chỉ API gốc (ví dụ: "http://localhost:3000/orders").

// item: là đối tượng cần cập nhật, thường chứa thông tin như id, name, status, v.v.

function edit(url, item) {
  fetch(`${url}/${item.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Item đã được cập nhật', data);
    })
    .catch(error => console.error('Lỗi khi cập nhật', error));
}

function deleted(url, id) {
  fetch(`${url}/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => console.error('Lỗi khi xóa Item này', error));
}
