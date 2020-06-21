load("classpath:file.js");
load("classpath:js-markdown-extra.js");

function md2html(infile,outfile,tmplfile){
  if (!infile || !outfile) return false;
  var tmpl = '{{ HTML_BODY }}'; if (tmplfile) tmpl = fileRead(tmplfile);
  var md = fileRead(infile);
  var HTML_BODY = Markdown(md);
  var html = tmpl.replace(/\{\{[\s\n\r]+HTML_BODY[\s\n\r]+\}\}/,HTML_BODY);
  fileWrite(outfile,html);
  return true;
}
