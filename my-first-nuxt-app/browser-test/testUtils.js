/* eslint-disable protractor/no-shadowing */
var testUtil = function() {
  this.scrollTo = function(element) {
    element.getLocation().then(function(location) {
      return browser.executeScript(`
                var optionsObject = {
                    left: ${location.x},
                    top: ${location.y} -150,
                    behavior: "smooth",
                };
                window.scrollTo(optionsObject);
            `);
    });
  };

  this.scrollIntoView = function(toElement) {
    browser.executeScript(function(element) {
      element.scrollIntoView();
    }, toElement);
  };

  // 現在時刻取得（yyyymmddhhmmss）
  this.getCurrentTime = function() {
    // 先頭ゼロ付加
    var padZero = function(num) {
      var result;
      if (num < 10) {
        result = "0" + num;
      } else {
        result = "" + num;
      }
      return result;
    };
    var now = new Date();
    var res =
      "" +
      now.getFullYear() +
      padZero(now.getMonth() + 1) +
      padZero(now.getDate()) +
      padZero(now.getHours()) +
      padZero(now.getMinutes()) +
      padZero(now.getSeconds());
    return res;
  };
};
module.exports = new testUtil();
