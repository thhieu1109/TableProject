
const URL_TABLE = "http://localhost:3000/table";

const URL_DISH = "http://localhost:3000/dish";

const URL_USER = "http://localhost:3000/user";

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
