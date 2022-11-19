const { Builder, By, Key, until } = require("selenium-webdriver");

const chai = require('chai');
const should = chai.should();

let driver;

// Hàm kiểm tra trường UserName
async function fieldMessage(testcase, expect) {
  // Tìm kiếm một trang web có chức năng bình luận trong trang RapChieuPhim
  await driver.get('https://rapchieuphim.com/phim/black-panther-wakanda-bat-diet#box-comments');
  // Tìm kiếm thành phần tin nhắn
  await driver.findElement(By.name('message')).click();
  // Tìm kiếm thành phần username. Điển tên đăng nhập là "test123" vào trường username
  await driver.findElement(By.name('username')).sendKeys('test123');
  // Tìm kiếm thành phần userphone. Điển số điện thoại là "0345605483" vào trường userphone
  await driver.findElement(By.name('userphone')).sendKeys('0345605483');
  // Tìm kiếm thành phần message. Điền testcase vào trường message
  await driver.findElement(By.name('message')).sendKeys(testcase);
  // Nhấn nút gửi
  await driver.findElement(By.xpath('//button[@class="btn btn-success green"]')).submit();
  // Lấy phần tử hiển thị thông báo. Đợi 3s để trang web được load lại
  let message = await driver.wait(until.elementLocated(By.xpath('//div[@class="alert alert-danger"]/p')), 3000);
  // Lấy thông tin từ thẻ thông báo
  let text = await message.getText();
  // So sánh kết quả với mong đợi
  text.should.equal(expect);

}

describe('Kiểm tra trường nội dung bình luận', async function () {
  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });
  after(async () => await driver.quit());

  it('T12 Bình luận - Nội dung bình luận không được để trống', async () => fieldMessage("", "Nội dung bình luận xin đừng để trống"));
  it('T13 Bình luận - Nội dung không được chèn link', 
    async () => fieldMessage("https://rapchieuphim.com/phim/one-piece-film-red", "Nội dung bình luận không được chèn link"));
  it('T14 Bình luận - Không được nhập các thẻ đặc biệt', async () => fieldMessage("<?php> echo 'Hello';?>", "Không được nhập các thẻ đặc biệt"));
});
