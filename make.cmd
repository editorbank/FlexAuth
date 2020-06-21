pushd %~dp0
if not exist target md target
::pandoc.exe -f markdown -t docx -o FlexAuth.docx FlexAuth.md
jjs -scripting -cp ./bin ./bin/mdProcessor.js -- ./doc ./target ./bin/md2html.tmpl.j2 
popd