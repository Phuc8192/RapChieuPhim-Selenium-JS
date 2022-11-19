const { Builder, By, Key } = require("selenium-webdriver");

const chai = require('chai');
const should = chai.should();


// Hàm kiểm tra trường UserName
async function fieldUserName(testcase, expect) {
  // Khởi tạo một cửa sổ chrome mới
  let driver = await new Builder().forBrowser('chrome').build();
  // Tìm kiếm một trang web có chức năng bình luận trong trang RapChieuPhim
  await driver.get('https://rapchieuphim.com/phim/black-panther-wakanda-bat-diet#box-comments');
  // Tìm kiếm thành phần tin nhắn
  await driver.findElement(By.name('message')).click();
  // Tìm kiếm thành phần username
  let username = await driver.findElement(By.name('username'));
  // Điển testcase vào trường username
  await username.sendKeys(testcase);
  // Nhấn nút gửi
  await driver.findElement(By.xpath('//button[@class="btn btn-success green"]')).submit();
  // Lấy thông báo từ trường username
  let message = await username.getAttribute("validationMessage");
  // So sánh kết quả với kỳ vọng
  message.should.equal(expect);
  // Thoát trình duyệt
  await driver.quit();
}

describe('Kiểm tra trường tên', async function () {
  it('T1 Tên không được nhập số ở đầu', async () => fieldUserName("12NhaTrang", "Không được nhập số ở đầu"));
  it('T2 Tên không được nhập ký tự đặc biệt', async () => fieldUserName("!!abc", "Không được nhập ký tự đặc biệt"));
});
