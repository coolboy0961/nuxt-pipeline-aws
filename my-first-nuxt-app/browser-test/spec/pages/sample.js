var Sample = function() {
    this.get = function() {
        browser.get(browser.baseUrl);
    };
    this.title = $("#__layout > div > div > h2");
    this.count = $("#__layout > div > div > h3 > span");
    this.countButton = $("#__layout > div > div > button");
};

module.exports = new Sample();