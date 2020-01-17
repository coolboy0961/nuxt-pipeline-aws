const samplePage = require("../pages/sample");

describe("サンプル画面のブラウザテスト", () => {
  it("「カウンター」文字が表示されている", () => {
    // Arrange
    const expectedTitle = "カウンター";
    
    // Act
    samplePage.get();
    const actualTitle = samplePage.title.getText();
    
    // Assert
    expect(actualTitle).toBe(expectedTitle);
  });
  
  it("「Increment」ボタンを押すと、Countの数値が正しく増える", () => {
      // Arrange
      const initCount = 0;

      // Act & Assert
      samplePage.get();
      let actualCount = samplePage.count.getText();
      expect(actualCount).toBe(initCount.toString());
      
      samplePage.countButton.click();
      actualCount = samplePage.count.getText();
      expect(actualCount).toBe((initCount + 1).toString());
      
      samplePage.countButton.click();
      actualCount = samplePage.count.getText();
      expect(actualCount).toBe((initCount + 2).toString());
  });
});
