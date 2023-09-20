import minimist from 'minimist';


export default function hyperworldReadline(str){

  const rawTextArray = [];

  const regex = /(?=\S)[^"\s]*(?:"[^\\"]*(?:\\[\s\S][^\\"]*)*"[^"\s]*)*/g;
  let m;

  while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
          //console.log(`Found match, group ${groupIndex}: ${match}`);
          rawTextArray.push(match);
      });
  }



  const command = [];
  const rawArgument = [];

  let commandMode = true;
  for (let chunk of rawTextArray) {
    if((commandMode===true)&&(chunk.startsWith('-'))) commandMode = !commandMode;
    chunk = chunk.replace(/^"/,'').replace(/"$/,'')
    // strip quotes
    chunk = chunk.replace(/\\+/g,'');
    if(commandMode){
      command.push(chunk);
    }else{
      rawArgument.push(chunk);
    }
  }
  const argument = minimist(rawArgument);

  return {
    command,
    argument
  }

}
