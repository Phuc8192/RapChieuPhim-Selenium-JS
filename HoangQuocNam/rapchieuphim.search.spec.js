const { Builder, By, Key } = require("selenium-webdriver");

const chai = require('chai');
const should = chai.should();

let driver;

// Hàm kiểm tra trường UserName
async function fieldSearch(testcase, expect) {
  // Mở trang RapChieuPhim
  await driver.get('https://rapchieuphim.com');
  // Điền từ kháo vào trong trường search
  await driver.findElement(By.className('search_control')).sendKeys(testcase, Key.RETURN);
  // Lấy kết quả trả về
  let text = await driver.findElement(By.className('primary-color')).getText().then(function (value) {
    return value;
  });
  // So sánh kết quả với mong đợi
  text.should.equal(expect);
  // Thoát trình duyệt
  await driver.quit();
}

describe('Kiểm tra search', async function () {

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });
  after(async () => await driver.quit());

  it('Không tìm kiếm ký tự đặc biệt', async () => fieldSearch("ln!mik", "Không tìm được kết quả"));
  it('Nhập ICON', async () => fieldSearch("🙂", "Không tìm được kết quả"));
  it('Nhập đoạn CODE', async () => fieldSearch("echo 'nam'", "Không tìm được kết quả"));
  it('Nhập ngày tháng năm', async () => fieldSearch("9/11/2022", "Không tìm được kết quả"));
  it('Nhập 1 phép tính', async () => fieldSearch("1+1=2", "Kết quả tìm kiếm cho 1+1=2"));
});
