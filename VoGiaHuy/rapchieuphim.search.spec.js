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

  it('Không được để trống', async () => fieldSearch("  ", "Không tìm được kết quả"));
  it('Không hiển thị kí tự trắng ở đầu', async () => fieldSearch("  adm", "Kết quả tìm kiếm cho adm"));
  it('Không hiển thị kí tự trắng ở sau', async () => fieldSearch("adm  ", "Kết quả tìm kiếm cho adm"));
  it('Chỉ hiển thị kí tự trong ngoặc tròn', async () => fieldSearch("(adm)", "Kết quả tìm kiếm cho adm"));
  it('Chỉ hiển thị kí tự trong ngoặc kép', async () => fieldSearch(' "adm" ', "Kết quả tìm kiếm cho adm"));
  it('Chỉ hiển thị kí tự trong ngoặc đơn', async () => fieldSearch(" 'adm' ", "Kết quả tìm kiếm cho adm"));
  it('Không tìm kiếm các ngôn ngữ nước ngoài', async () => fieldSearch("越南", "Không tìm được kết quả"));
  it('Không tìm kiếm được file', async () => fieldSearch("188785876_314346043466847_2038273413236048536_n.jpg", "Không tìm được kết quả"));
  it('Không tìm kiếm được đường link', async () => 
        fieldSearch("https://www.youtube.com/watch?v=NBS7OlWbgS4&list=PLnGTZv-nqOPqRXxnfi-wEdpLPyWXdxVwX", "Không tìm được kết quả"));
});
