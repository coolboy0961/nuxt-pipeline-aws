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
  directConnect: true,

  // selenium server を standalone で起動する。
  //seleniumServerJar: 'webdrivers/selenium-server-standalone-3.13.0.jar',

  // リモート selenium server のにつなげる。
  //seleniumAddress: 'http://localhost:4444/wd/hub',

  // 動作させるspecファイルを指定
  specs: [configFilePath + "/spec/**/*spec.js"],

  baseUrl: "http://localtestsite:8081",

  // テストさせるブラウザを指定
  capabilities: {
    shardTestFiles: true, // allows specs to be executed in parallel.
    maxInstances: 1, // total number of specs that can be run at once.

    browserName: "chrome",
    chromeOptions: {
      // args: ["--window-size=1920,1080", "disable-application-cache"]
      args: [
        "--no-sandbox",
        "--headless",
        "--disable-gpu",
        "--window-size=1024,768",
        "disable-application-cache"
      ]
    }
  },
  // 複数種類のブラウザを使ってテストする場合のみ使う
  // multiCapabilities: [
  //     // {
  //     //     browserName: 'firefox',
  //     //     'moz:firefoxOptions': {
  //     //         args: ["--headless"]
  //     //     }
  //     // },
  //     {
  //         browserName: 'chrome',
  //         chromeOptions: {
  //             args: ["--headless", "--disable-gpu", "--window-size=414,736"],
  //         }
  //     },
  // ],
  
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    // timeout(ms) for every spec executing
    defaultTimeoutInterval: 300000
  },
  beforeLaunch: function() {
    // calculator execute time
    startTime = new Date();
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
        baseDirectory: configFilePath + "/report/ci",
        screenshotsSubfolder: "images",
        jsonsSubfolder: "jsons",
        docTitle: "sample-web test Report",
        docName: "index.html",
        //preserveDirectory: false
        // takeScreenShotsOnlyForFailedSpecs: true,
      }).getJasmine2Reporter()
    );
  },
  afterLaunch: function() {
    // setting for calculator execute time
    var endTime = new Date();
    var ms = endTime.getTime() - startTime.getTime();
    var s = ms / 1000;
    console.log("Test execution time: " + s + "秒");
  }
};
