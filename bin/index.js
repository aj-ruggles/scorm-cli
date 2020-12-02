#!/usr/bin/env node

const yargs = require("yargs");
const scopackager = require('simple-scorm-packager');
const path = require('path');

const options = yargs
 .usage("Usage: -n <name>")
 .option("n", { alias: "name", describe: "Name of the Package", type: "string", demandOption: true })
 .option("d", { alias: "description", description: "Description for the package", type: "string", demandOption: false })
 .option("t", { alias: "time", description: "Time to complete course EX:\"PT0H0M0S\"", type: "string", demandOption: false })
 .option("c", { alias: "company", description: "Name of your company", type: "string", demandOption: false })
 .argv;

const config = {
    version: '2004 3rd Edition',
    organization: options.company || "Default Company Inc." ,
    title: options.name,
    language: 'en-US',
    masteryScore: 100,
    startingPage: 'index.html',
    source: path.join(__dirname),
    package: {
      version: '0.1.0',
      author: process.env.USERNAME,
      description: options.description || "Course Description",
      keywords: ['scorm', 'IMI', 'course'],
      typicalDuration: options.time || "PT0H0M0S",
      rights: `©${new Date().getFullYear()} ${options.company || "Default Company Inc."}. All right reserved.`,
    },
  };

  scopackager(config, () => {
      console.log("SCORM Packaged.");
  });
