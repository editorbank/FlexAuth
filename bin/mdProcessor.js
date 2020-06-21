load('classpath:ForEachFileByRegExp.js');
load("classpath:md2html.js");
load("classpath:file.js");

function mdProcessor(startDir, prms, doByExt, doDefault) {
  if (!doByExt) doByExt={};
  if (!startDir) startDir='.';
  var scaner = new ForEachFileByRegExp(startDir, (/^(.*)[\\\/]([^\\\/]*)\.([^.]*)$/i), function (machResult) {

      var relativePath = machResult[1].substr(startDir.length+1); if(relativePath)relativePath+='/'
      var file = {
        fullName : machResult[0],
        relativePath : relativePath,
        name : machResult[2],
        ext : machResult[3],
      };
      var handler=doByExt[file.ext];
      if(handler) handler(file, prms); 
      else if(doDefault) doDefault(file, prms);
  });
}

function skipWork(file, prms){ 
  print("skip work for ${file.fullName}.")
}

function copyToTarget(file, prms){ 
  print("copy ${file.fullName} to ${prms.targetDir}/${file.relativePath}${file.name}.${file.ext} ...")
  print( "result - " + fileCopy("${file.fullName}", "${prms.targetDir}/${file.relativePath}${file.name}.${file.ext}") ? "Ok.": "Error." );
}

function convertMdToHtml(file, prms){ 
  print("md2html ${file.fullName} to ${prms.targetDir}/${file.relativePath}${file.name}.html ...")
  print( "result - " + md2html("${file.fullName}","${prms.targetDir}/${file.relativePath}${file.name}.html","${prms.tmplHtml}") ? "Ok.": "Error." );
}

print('mdProcessing...')
var sourceDir = './src/md' ;if($ARG.length>0) sourceDir = $ARG[0];
var destDir   = './target' ;if($ARG.length>1) destDir   = $ARG[1];
var tmplHtml  = ''         ;if($ARG.length>2) tmplHtml  = $ARG[2];
mdProcessor(
  sourceDir
  ,{
    "targetDir": destDir
    ,"tmplHtml": tmplHtml
  }
  ,{
    "md": convertMdToHtml,
  }
  , copyToTarget
);
print('mdDone.')

