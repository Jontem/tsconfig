var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');

var projectFileName = 'tsproj.yml';

function getProjectsSync(pathOrSrcFile) {
    if (!fs.existsSync(pathOrSrcFile))
        throw new Error('Invalid Path');

    var dir = fs.lstatSync(pathOrSrcFile).isDirectory() ? pathOrSrcFile : path.dirname(pathOrSrcFile);

    var projectFile = '';
    while (fs.existsSync(dir)) {
        var potentialProjectFile = dir + '/' + projectFileName;
        if (fs.existsSync(potentialProjectFile)) {
            projectFile = potentialProjectFile;
            break;
        } else {
            var before = dir;
            dir = path.dirname(dir);

            if (dir == before)
                throw new Error('No Project Found');
        }
    }
    projectFile = path.normalize(projectFile);

    var parsedProjectSpec = yaml.safeLoad(fs.readFileSync(projectFile, 'utf8'));
    if (typeof parsedProjectSpec == "string")
        throw new Error("Invalid YAML");

    return {
        projectFilePath: projectFile,
        projects: []
    };
}
exports.getProjectsSync = getProjectsSync;

function getProjectsForFileSync(path) {
    return {
        projectFilePath: '',
        projects: []
    };
}
exports.getProjectsForFileSync = getProjectsForFileSync;

function createRootProjectSync(pathOrSrcFile, spec) {
    return;
}
exports.createRootProjectSync = createRootProjectSync;
