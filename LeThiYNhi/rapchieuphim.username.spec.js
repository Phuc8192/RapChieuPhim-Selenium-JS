const { Builder, By, Key } = require("selenium-webdriver");

const chai = require('chai');
const should = chai.should();

let driver;

// Hàm kiểm tra trường UserName
async function fieldUserName(testcase, expect) {
  // Tìm kiếm một trang web có chức năng bình luận trong trang RapChieuPhim
  await driver.get('https://rapchieuphim.com/phim/black-panther-wakanda-bat-diet#box-comments');
  // Tìm kiếm thành phần tin nhắn
  await driver.findElement(By.name('message')).click();
  // Tìm kiếm thành phần username
  let username = await driver.findElement(By.name('username'));
  // Điển testcase vào trường username
  await username.sendKeys(testcase);
  // Tìm kiếm thành phần userphone. Điển số điện thoại là "0345605483" vào trường userphone
  await driver.findElement(By.name('userphone')).sendKeys('0345605483');
  // Tìm kiếm thành phần message. Điền message là "Phim hay quá nhaaa" vào trường message
  await driver.findElement(By.name('message')).sendKeys("Phim hay quá nhaaa");
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

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });
  after(async () => await driver.quit());

  it('T1 Tên không được nhập số ở đầu', async () => fieldUserName("12NhaTrang", "Không được nhập số ở đầu"));
  it('T2 Tên không được nhập ký tự đặc biệt', async () => fieldUserName("!!abc", "Không được nhập ký tự đặc biệt"));
  it('T3 Tên - Tên không được để trống', async () => fieldUserName("", "Tên của bạn không được để trống"));
  it('T4 Tên - Kí tự đầu không được dùng dấu cách', async () => fieldUserName("  Nha Trang", "Kí tự đầu không được dùng dấu cách"));
  it('T5 Tên - Tên không dài quá 30 kí tự', async () => fieldUserName("Nha Trang đẹp lắm mọi người ơi, chào mừng bạn đến với biển Nha Trang xinh đẹp", "Tên không dài quá 30 kí tự"));
});
