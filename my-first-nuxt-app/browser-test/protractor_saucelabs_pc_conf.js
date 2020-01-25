// Partractor config file path
var configFilePath = __dirname;

var HtmlReporter = require("protractor-beautiful-reporter");
var SpecReporter = require("jasmine-spec-reporter").SpecReporter;
var testUtil = require(configFilePath + "/testUtils");

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
    "http://localtestsite:8081",

  sauceUser: "SAMPLE_USER",
  sauceKey: "SAMPLE_KEY",
  //sauceRegion: "us-west-1",

  onPrepare: function() {
    var caps = browser.getCapabilities();
  },
  // SauceLabsテストの多重数
  maxSessions: 1,
  multiCapabilities: [
    // mobile
    {
      tunnelidentifier: "sample-saucelabs-connect-proxy",
      browserName: "Safari",
      platformName: "iOS",
      platformVersion: "13.0",
      deviceName: "iPhone XS Simulator",
      deviceOrientation: "portrait",
      name: "iPhone XS iOS 13 Safari portrait",
      shardTestFiles: true,
      maxInstances: 2
    },
    {
      tunnelidentifier: "sample-saucelabs-connect-proxy",
      browserName: "Safari",
      platformName: "iOS",
      platformVersion: "13.0",
      deviceName: "iPhone XS Simulator",
      deviceOrientation: "landscape",
      name: "iPhone XS iOS 13 Safari landscape",
      shardTestFiles: true,
      maxInstances: 2
    },
    {
      tunnelidentifier: "sample-saucelabs-connect-proxy",
      browserName: "Chrome",
      platformName: "Android",
      platformVersion: "10",
      deviceName: "Google Pixel 3 GoogleAPI Emulator",
      deviceOrientation: "portrait",
      name: "Google Pixel 3 Android 10 portrait",
      shardTestFiles: true,
      maxInstances: 2
    },
    {
      tunnelidentifier: "sample-saucelabs-connect-proxy",
      browserName: "Chrome",
      platformName: "Android",
      platformVersion: "10",
      deviceName: "Google Pixel 3 GoogleAPI Emulator",
      deviceOrientation: "landscape",
      name: "Google Pixel 3 Android 10 landscape",
      shardTestFiles: true,
      maxInstances: 2
    },

    // pc
    // chrome
    {
      tunnelidentifier: "sample-saucelabs-connect-proxy",
      browserName: "chrome",
      version: "latest",
      platform: "OS X 10.10",
      name: "OS X 10.10 Chrome",
      shardTestFiles: true,
      maxInstances: 2
    },
    {
      tunnelidentifier: "sample-saucelabs-connect-proxy",
      browserName: "chrome",
      version: "latest",
      platform: "OS X 10.11",
      name: "OS X 10.11 Chrome",
      shardTestFiles: true,
      maxInstances: 2
    },
    {
      tunnelidentifier: "sample-saucelabs-connect-proxy",
      browserName: "chrome",
      version: "latest",
      platform: "OS X 10.12",
      name: "OS X 10.12 Chrome",
      shardTestFiles: true,
      maxInstances: 2
    },
    {
      tunnelidentifier: "sample-saucelabs-connect-proxy",
      browserName: "chrome",
      version: "latest",
      platform: "OS X 10.13",
      name: "OS X 10.13 Chrome",
      shardTestFiles: true,
      maxInstances: 2
    },
    {
      tunnelidentifier: "sample-saucelabs-connect-proxy",
      browserName: "chrome",
      version: "latest",
      platform: "Windows 7",
      name: "Windows 7 Chrome",
      shardTestFiles: true,
      maxInstances: 2
    },
    {
      tunnelidentifier: "sample-saucelabs-connect-proxy",
      browserName: "chrome",
      version: "latest",
      platform: "Windows 10",
      name: "Windows 10 Chrome",
      shardTestFiles: true,
      maxInstances: 2
    },
    // firefox
    {
      tunnelidentifier: "sample-saucelabs-connect-proxy",
      browserName: "firefox",
      version: "latest",
      platform: "OS X 10.10",
      name: "OS X 10.10 Firefox",
      shardTestFiles: true,
      maxInstances: 2
    },
    {
      tunnelidentifier: "sample-saucelabs-connect-proxy",
      browserName: "firefox",
      version: "latest",
      platform: "OS X 10.11",
      name: "OS X 10.11 Firefox",
      shardTestFiles: true,
      maxInstances: 2
    },
    {
      tunnelidentifier: "sample-saucelabs-connect-proxy",
      browserName: "firefox",
      version: "latest",
      platform: "OS X 10.12",
      name: "OS X 10.12 Firefox",
      shardTestFiles: true,
      maxInstances: 2
    },
    {
      tunnelidentifier: "sample-saucelabs-connect-proxy",
      browserName: "firefox",
      version: "latest",
      platform: "OS X 10.13",
      name: "OS X 10.13 Firefox",
      shardTestFiles: true,
      maxInstances: 2
    },
    {
      tunnelidentifier: "sample-saucelabs-connect-proxy",
      browserName: "firefox",
      version: "latest",
      platform: "Windows 7",
      name: "Windows 7 Firefox",
      shardTestFiles: true,
      maxInstances: 2
    },
    {
      tunnelidentifier: "sample-saucelabs-connect-proxy",
      browserName: "firefox",
      version: "latest",
      platform: "Windows 10",
      name: "Windows 10 Firefox",
      shardTestFiles: true,
      maxInstances: 2
    },
    // IE
    {
      tunnelidentifier: "sample-saucelabs-connect-proxy",
      browserName: "internet explorer",
      version: "latest",
      platform: "Windows 7",
      name: "Windows 7 IE",
      shardTestFiles: true,
      maxInstances: 2
    },
    {
      tunnelidentifier: "sample-saucelabs-connect-proxy",
      browserName: "internet explorer",
      version: "latest",
      platform: "Windows 10",
      name: "Windows 10 IE",
      shardTestFiles: true,
      maxInstances: 2
    },
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
