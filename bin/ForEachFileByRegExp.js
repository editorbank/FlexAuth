function ForEachFileByRegExp(startDir, filterByFileName, toDo) {
    var File = Java.type('java.io.File');
    if(!startDir) startDir = '.';
    if(!filterByFileName) filterByFileName = /(.+)/g;

    function __scanSubdirs(__startDir) {
        var listFiles = (new File(__startDir)).listFiles();
        for (var i in listFiles) {
            var file = listFiles[i];
            var filename = ''+file.getPath();
            if (file.isDirectory()) {
                __scanSubdirs(filename);      
            } else if (file.isFile()) {
                var machResult = filename.match(filterByFileName);
                if (machResult) {
                    toDo(machResult);
                }
            } 
        }
    }

    __scanSubdirs(startDir);
    return this;
}
