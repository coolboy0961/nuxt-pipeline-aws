// Partractor config file path
var configFilePath = __dirname;

var HtmlReporter = require("protractor-beautiful-reporter");
var SpecReporter = require("jasmine-spec-reporter").SpecReporter;
var testUtil = require(configFilePath + "/testUtils");

// test start time
var startTime;

exports.config = {
  // Testing FrameWorkにjasmineを利用
  framework: "jasmine",

  // WebDriver を設定し、テスト前後の自動起動停止を実現
  chromeDriver: configFilePath + "/webdrivers/linux/chromedriver-79.0.3945.36",

  // async/awaitを利用するときに、これを設定すると安定性が向上する
  // SELENIUM_PROMISE_MANAGER: false,
  // selenuimServerを経由せず、直接WebDeiverでブラウザを起動する。(chromeとfirefoxのみ)
  //directConnect: true,

  // selenium server を standalone で起動する。
  //seleniumServerJar: 'webdrivers/selenium-server-standalone-3.13.0.jar',

  // リモート selenium server のにつなげる。
  seleniumAddress: "https://us1-manual.app.testobject.com/wd/hub",

  // 動作させるspecファイルを指定
  specs: [configFilePath + "/spec/**/*spec.js"],

  baseUrl:
    "http://sample-web-ci-html-deploy-destination.s3-website-ap-northeast-1.amazonaws.com",

  // SauceLabsテストの多重数
  maxSessions: 1,
  multiCapabilities: [
    // portrait
    {
      testobject_api_key: "SAMPLE_KEY",
      name: "iOS test portrait",
      browserName: "",
      platformName: "iOS",
      platformVersion: "12.4.3",
      deviceName: "iPhone 6",
      phoneOnly: "false",
      tabletOnly: "false",
      privateDevicesOnly: "false",
      shardTestFiles: true,
      maxInstances: 25
    },

    // landscape
    {
      testobject_api_key: "SAMPLE_KEY",
      name: "iOS test landscape",
      browserName: "",
      platformName: "iOS",
      platformVersion: "12.4.3",
      deviceName: "iPhone 6",
      phoneOnly: "false",
      tabletOnly: "false",
      privateDevicesOnly: "false",
      shardTestFiles: true,
      maxInstances: 25
    },
    // {
    //   testobject_api_key: "SAMPLE_KEY",
    //   name: "Android test",
    //   browserName: "",
    //   platformName: "Android",
    //   platformVersion: "8",
    //   deviceName: "motorola moto g6",
    //   //deviceOrientation: "portrait",
    //   deviceOrientation: "landscape",
    //   phoneOnly: "false",
    //   tabletOnly: "false",
    //   privateDevicesOnly: "false"
    // }
  ],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    // timeout(ms) for every spec executing
    defaultTimeoutInterval: 300000
  },
  // setting custom process for prepare test
  onPrepare: async function() {
    //Need to use Protractor on a non-Angular website
    await browser.waitForAngularEnabled(false);
    // setting for wait time
    browser.shortWaitTime = "1000";
    browser.longWaitTime = "2000";
    
    // setting for testUtil
    browser.testUtil = testUtil;
    //browser.wiremockController = new WiremockController("localhost");
    // setting for jasmine-spec-reporter
    jasmine.getEnv().addReporter(
      new SpecReporter({
        spec: {
          displayStacktrace: true
        }
      })
    );
    // setting for protractor-beautiful-reporter
    jasmine.getEnv().addReporter(
      new HtmlReporter({
        baseDirectory: configFilePath + "/report/saucelabs-mobile",
        screenshotsSubfolder: "images",
        jsonsSubfolder: "jsons",
        docTitle: "sample-web Sauce Labs mobile test Report",
        docName: "index.html"
        //preserveDirectory: false
        // takeScreenShotsOnlyForFailedSpecs: true,
      }).getJasmine2Reporter()
    );
  }
};
