const { Builder, By, Key, until } = require("selenium-webdriver");

const chai = require('chai');
const should = chai.should();

let driver;

// Hàm kiểm tra trường UserName
async function fieldUserPhone(testcase, expect) {
  // Tìm kiếm một trang web có chức năng bình luận trong trang RapChieuPhim
  await driver.get('https://rapchieuphim.com/phim/black-panther-wakanda-bat-diet#box-comments');
  // Tìm kiếm thành phần tin nhắn
  await driver.findElement(By.name('message')).click();
  // Tìm kiếm thành phần username. Điển tên đăng nhập là "test123" vào trường username
  await driver.findElement(By.name('username')).sendKeys('test123');
  // Tìm kiếm thành phần tin nhắn. Điển tên đăng nhập là "test123" vào trường tin nhắn
  await driver.findElement(By.name('message')).sendKeys('test123');
  // Tìm kiếm thành phần userphone
  let userphone = await driver.findElement(By.name('userphone'));
  //Xóa số điện thoại đã nhập trước đó
  await userphone.clear();
  // Điển testcase vào trường userphone
  await userphone.sendKeys(testcase);
  // Nhấn nút gửi
  await driver.findElement(By.xpath('//button[@class="btn btn-success green"]')).submit();
  // Lấy value từ trường userphone
  let message = await userphone.getAttribute("value").then((value) => { return value; });
  // So sánh kết quả với kỳ vọng
  message.should.equal(expect);
}

async function checkAlertUserphone(testcase, expect) {
  // Tìm kiếm một trang web có chức năng bình luận trong trang RapChieuPhim
  await driver.get('https://rapchieuphim.com/phim/black-panther-wakanda-bat-diet#box-comments');
  // Tìm kiếm thành phần tin nhắn
  await driver.findElement(By.name('message')).click();
  // Tìm kiếm thành phần username. Điển tên đăng nhập là "test123" vào trường username
  await driver.findElement(By.name('username')).sendKeys('test123');

  await driver.findElement(By.name('message')).sendKeys('test123');
  // Tìm kiếm thành phần userphone
  let userphone = await driver.findElement(By.name('userphone'));
  //Xóa số điện thoại đã nhập trước đó
  await userphone.clear();
  // Điển testcase vào trường userphone
  await userphone.sendKeys(testcase);
  // Nhấn nút gửi
  await driver.findElement(By.xpath('//button[@class="btn btn-success green"]')).submit();
  // Lấy phần tử hiển thị thông báo. Đợi 3s để trang web được load lại
  let message = await driver.wait(until.elementLocated(By.xpath('//div[@class="alert alert-danger"]/p')), 3000);
  // Lấy thông tin từ thẻ thông báo
  let text = await message.getText();
  // So sánh kết quả với mong đợi
  text.should.equal(expect);
}

describe('Kiểm tra trường số điện thoại', async function () {

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });
  after(async () => await driver.quit());
  it('T6 Số điện thoại - Không được nhập chữ cái', async () => fieldUserPhone("0a9s8d7f9g12345", "0987912345"));
  it('T7 Số điện thoại - Không được nhập ký tự đặc biệt', async () => fieldUserPhone("@0909090909", "0909090909"));
  it('T8 Số điện thoại - Không được để trống ký tự đầu', async () => fieldUserPhone(" 0123456789", "0123456789"));
  it('T8 Số điện thoại - Không được để trống', async () => checkAlertUserphone(" ", "Không được để trống SĐT"));
  it('T10 Số điện thoại - Không được nhập ít hoặc hơn khoảng 10 đến 12 số', 
    async () => checkAlertUserphone("01234567", "Không được nhập ít hoặc hơn khoảng 10 đến 12 số"));
  it('T11 Số điện thoại - Ký tự bắt đầu phải là 0 hoặc 84', async () => checkAlertUserphone("8709090909", "Ký tự bắt đầu phải là 0 hoặc 84"));
});
