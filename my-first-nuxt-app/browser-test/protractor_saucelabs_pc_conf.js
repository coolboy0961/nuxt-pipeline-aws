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
  //chromeDriver: configFilePath + "/webdrivers/linux/chromedriver-79.0.3945.36",

  // async/awaitを利用するときに、これを設定すると安定性が向上する
  // SELENIUM_PROMISE_MANAGER: false,
  // selenuimServerを経由せず、直接WebDeiverでブラウザを起動する。(chromeとfirefoxのみ)
  //directConnect: true,

  // selenium server を standalone で起動する。
  //seleniumServerJar: 'webdrivers/selenium-server-standalone-3.13.0.jar',

  // リモート selenium server のにつなげる。
  //seleniumAddress: 'http://localhost:4444/wd/hub',

  // 動作させるspecファイルを指定
  specs: [configFilePath + "/spec/**/*spec.js"],

  baseUrl:
    "http://sample-web-ci-html-deploy-destination.s3-website-ap-northeast-1.amazonaws.com",

  sauceUser: "YOUR_USERNAME",
  sauceKey: "YOUR_ACCESS_KEY",
  //sauceRegion: "us-west-1",

  onPrepare: function() {
    var caps = browser.getCapabilities();
  },
  // SauceLabsテストの多重数
  maxSessions: 1,
  multiCapabilities: [
    // chrome
    {
      browserName: "chrome",
      version: "latest",
      platform: "OS X 10.10",
      name: "chrome-tests",
      shardTestFiles: true,
      maxInstances: 25
    },
    {
      browserName: "chrome",
      version: "latest",
      platform: "OS X 10.11",
      name: "chrome-tests",
      shardTestFiles: true,
      maxInstances: 25
    },
    // {
    //   browserName: "chrome",
    //   version: "latest",
    //   platform: "OS X 10.12",
    //   name: "chrome-tests",
    //   shardTestFiles: true,
    //   maxInstances: 25
    // },
    // {
    //   browserName: "chrome",
    //   version: "latest",
    //   platform: "OS X 10.13",
    //   name: "chrome-tests",
    //   shardTestFiles: true,
    //   maxInstances: 25
    // },
    // {
    //   browserName: "chrome",
    //   version: "latest",
    //   platform: "Windows 7",
    //   name: "chrome-tests",
    //   shardTestFiles: true,
    //   maxInstances: 25
    // },
    // {
    //   browserName: "chrome",
    //   version: "latest",
    //   platform: "Windows 10",
    //   name: "chrome-tests",
    //   shardTestFiles: true,
    //   maxInstances: 25
    // },
    // // firefox
    // {
    //   browserName: "firefox",
    //   version: "latest",
    //   platform: "OS X 10.10",
    //   name: "firefox-tests",
    //   shardTestFiles: true,
    //   maxInstances: 25
    // },
    // {
    //   browserName: "firefox",
    //   version: "latest",
    //   platform: "OS X 10.11",
    //   name: "firefox-tests",
    //   shardTestFiles: true,
    //   maxInstances: 25
    // },
    // {
    //   browserName: "firefox",
    //   version: "latest",
    //   platform: "OS X 10.12",
    //   name: "firefox-tests",
    //   shardTestFiles: true,
    //   maxInstances: 25
    // },
    // {
    //   browserName: "firefox",
    //   version: "latest",
    //   platform: "OS X 10.13",
    //   name: "firefox-tests",
    //   shardTestFiles: true,
    //   maxInstances: 25
    // },
    // {
    //   browserName: "firefox",
    //   version: "latest",
    //   platform: "Windows 7",
    //   name: "firefox-tests",
    //   shardTestFiles: true,
    //   maxInstances: 25
    // },
    // {
    //   browserName: "firefox",
    //   version: "latest",
    //   platform: "Windows 10",
    //   name: "firefox-tests",
    //   shardTestFiles: true,
    //   maxInstances: 25
    // },
    // // IE
    // {
    //   browserName: "internet explorer",
    //   version: "latest",
    //   platform: "Windows 7",
    //   name: "ie-tests",
    //   shardTestFiles: true,
    //   maxInstances: 25
    // },
    // {
    //   browserName: "internet explorer",
    //   version: "latest",
    //   platform: "Windows 10",
    //   name: "ie-tests",
    //   shardTestFiles: true,
    //   maxInstances: 25
    // },
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
        baseDirectory: configFilePath + "/report/saucelabs-pc",
        screenshotsSubfolder: "images",
        jsonsSubfolder: "jsons",
        docTitle: "sample-web Sauce Labs PC test Report",
        docName: "index.html"
        //preserveDirectory: false
        // takeScreenShotsOnlyForFailedSpecs: true,
      }).getJasmine2Reporter()
    );
  },
  onComplete: function() {
    var printSessionId = function(jobName) {
      browser.getSession().then(function(session) {
        console.log(
          "SauceOnDemandSessionID=" + session.getId() + " job-name=" + jobName
        );
      });
    };
  }
};
