function fileExists(file){ return (new java.io.File(file)).exists() }

function fileRead(file){ return readFully(file) }

function fileWrite(file,text){
  dirMakeParentOf(file);
  return writeFully(file,text);

  var fw = new java.io.FileWriter(file);
  fw.write(text);
  fw.close(); 
}

function fileDelete(file){ return (new java.io.File(file)).delete() }

function dirParentOf(file){ return new java.io.File(file).getParent() }
function dirMake(dir){ return new java.io.File(dir).mkdir() }

function dirMakeParentOf(file){ 
  var dir = dirParentOf(file);
  return _mkdir(dir);
  
  function _mkdir(dir){
    if (fileExists(dir)) return true;
    var updir = dirParentOf(dir);
    if (!fileExists(updir)) {
      _mkdir(updir);
    }
    return dirMake(dir);
  }
}

function fileCopy(fileName,newFleName){
  dirMakeParentOf(newFleName);
  if( fileExists(newFleName)) fileDelete(newFleName);
  return java.nio.file.Files.copy(new java.io.File(fileName).toPath(), new java.io.File(newFleName).toPath());
}


//---

function outFile(filename,charset){

  this.filename=filename;
  this.charset=(!charset)?"UTF-8":charset;
  this.ln='\r\n';

  this.makeDirForFile=function(){
    var dir = new java.io.File(this.filename).getParentFile()
    if(!dir.exists()) java.nio.file.Files.createDirectories(dir.toPath());
  }

  this.rewrite=function(text){
    //print("[DEBUG] Rewrite file "+this.filename+", charset "+this.charset+" ...");
    this.makeDirForFile();
    var out = java.nio.file.Files.newBufferedWriter(
      java.nio.file.Paths.get(this.filename)
      ,java.nio.charset.Charset.forName(this.charset)
      ,java.nio.file.StandardOpenOption.CREATE
      ,java.nio.file.StandardOpenOption.WRITE
      ,java.nio.file.StandardOpenOption.TRUNCATE_EXISTING
    );
    out.write(text);
    out.close();
    return this;
  };
  this.append=function(text){
    this.makeDirForFile();
    var out = java.nio.file.Files.newBufferedWriter(
      java.nio.file.Paths.get(this.filename)
      ,java.nio.charset.Charset.forName(this.charset)
      ,java.nio.file.StandardOpenOption.CREATE
      ,java.nio.file.StandardOpenOption.WRITE
      ,java.nio.file.StandardOpenOption.APPEND
    );
    out.write(text);
    out.close();
    return this;
  };

  this.clear=function(){
    return this.rewrite("");
  };

  this.print=this.append;

  this.println=function(text){
    if('undefined'===typeof text)text="";
    this.print(text+this.ln);
  }
  
  this.close=function(){
    //print("[DEBUG] Close file "+this.filename+".");
  }
  
  //print("[DEBUG] Open file Create "+this.charset+": "+this.filename+" ...");
  return this;
}

function writeFully(filename,value){
  new outFile(filename)
    .rewrite(value)
    .close()
  ;
};
