import { mkdir, writeFile } from 'node:fs/promises';
import { courses } from '../catalog.mjs';

const ink = '#18362f', green = '#dcebdc', amber = '#f6e2c9', paper = '#f4f3eb';
const paths = {
  coding: { nodes:['Task + contract','Read / edit / bash','Independent checks','Human diff review'],
    task:['Predict the bug before running.','Repair the function in pairs.','Add one unseen edge case.'],
    evidence:['The original fails. The repair passes.','A reviewer can explain the diff.'],
    limits:['Four examples are not a full specification.','Passing checks can still miss a bug.'] },
  context: { nodes:['2,000 raw records','Code Mode script','Small summary','Independent calculation'],
    task:['Predict count, missing values and mean.','Add one statistic in Code Mode.','Name a question the summary cannot answer.'],
    evidence:['1,500 recorded values; mean 100.','Measure raw bytes versus returned bytes.'],
    limits:['Bytes are not tokens.','Smaller output can hide useful evidence.'] },
  reviewer: { nodes:['Read + human labels','Code Mode batching','JEV / small reviewer','Compare with labels'],
    task:['Write observations before categories.','Freeze a threshold on practice cases.','Inspect false accepts and false rejects.'],
    evidence:['Typed scores are returned.','Mistakes are visible against human labels.'],
    limits:['A score is not automatically calibrated.','Six examples do not validate a reviewer.'] },
  crash: { nodes:['Code Mode call','Tool A + checkpoint','SIGKILL / restart','Tool B + completion'],
    task:['Predict what the crash will lose.','Kill the process after the first result.','Reopen SQLite and count the effect.'],
    evidence:['A fresh process finishes the submission.','The completed effect occurs once in this run.'],
    limits:['The host must restart the process.','External effects still need replay discipline.'] },
  improve: { nodes:['Run the baseline','Inspect + human review','Change one thing','Fresh run + checks'],
    task:['Save a plain-language observation.','Turn one failure into a concrete check.','Change one instruction; test a new case.'],
    evidence:['Trace, verdict and result are inspectable.','The review survives a page reload.'],
    limits:['Scripted contrast is not model improvement.','Keep a separate set for final evaluation.'] },
};

function board(course, index) {
  const elements = []; let frameId = null;
  function shape(type,x,y,width,height,extra={}) {
    const id = `e${elements.length}`;
    const element = { id,type,x,y,width,height,angle:0,strokeColor:ink,backgroundColor:'transparent',
      fillStyle:'solid',strokeWidth:1.5,strokeStyle:'solid',roughness:1,opacity:100,
      groupIds:[],frameId,index:`a${String(elements.length).padStart(3,'0')}`,roundness:null,
      seed:100+elements.length,version:1,versionNonce:1000+elements.length,isDeleted:false,
      boundElements:null,updated:1,created:1,link:null,locked:false,...extra };
    elements.push(element); return id;
  }
  const text = (x,y,value,size=22,color=ink) => shape('text',x,y,980,value.split('\n').length*size*1.25,
    {text:value,originalText:value,fontSize:size,fontFamily:2,textAlign:'left',verticalAlign:'top',containerId:null,autoResize:true,lineHeight:1.25,strokeColor:color});
  function frame(x,name) { frameId = null; frameId = shape('frame',x,0,1080,680,{name}); text(x+35,28,name,20); }
  function box(x,y,label,color=green,width=330,height=95) {
    shape('rectangle',x,y,width,height,{backgroundColor:color,roundness:{type:3}}); text(x+18,y+27,label,22);
  }
  function arrow(x,y,dx,dy) { shape('arrow',x,y,Math.abs(dx),Math.abs(dy),{
    points:[[0,0],[dx,dy]],startBinding:null,endBinding:null,startArrowhead:null,endArrowhead:'arrow',lastCommittedPoint:null,elbowed:false}); }
  frame(0,'01 / The common foundation · 20 minutes');
  text(35,85,'The model proposes. Tools act.',34);
  box(40,180,'Task + context',green,290); box(390,180,'Model',green,240); box(690,180,'Reply or tool call',amber,340);
  arrow(335,228,45,0); arrow(635,228,45,0);
  box(390,340,'Tool execution',amber,240); box(40,340,'Tool result',green,290);
  arrow(810,285,-185,65); arrow(380,388,-40,0); arrow(185,330,0,-45);
  text(690,350,'read · write · edit · bash',22);
  text(40,500,'Harness = context + tools + execution + recovery',27);
  text(40,555,'Evaluation = a specific check on a specific task',25);
  text(40,610,'Predict together: [0, 100, null, 200] → count? mean?',22);

  const x=1180, path=paths[course.id];
  frame(x,`02 / Build · path ${index+1}`);
  text(x+35,85,course.title,31);
  text(x+35,135,course.question,21);
  box(x+45,210,path.nodes[0]); box(x+650,210,path.nodes[1]);
  box(x+650,360,path.nodes[2],amber); box(x+45,360,path.nodes[3],amber);
  arrow(x+390,258,245,0); arrow(x+815,315,0,30); arrow(x+635,408,-245,0); arrow(x+210,345,0,-30);
  path.task.forEach((line,i) => text(x+45,510+i*42,`${i+1}. ${line}`,22));

  const z=2360;
  frame(z,'03 / Inspect the evidence');
  text(z+35,85,'What did we actually establish?',32);
  box(z+40,170,'Observe',green,470,170); box(z+560,170,'Do not infer',amber,470,170);
  path.evidence.forEach((line,i) => text(z+58,230+i*42,line,18));
  path.limits.forEach((line,i) => text(z+578,230+i*42,line,18));
  text(z+40,395,'Leave one note in each box.',25);
  ['Observation','Change one thing','Check on a new case'].forEach((label,i) => {
    shape('rectangle',z+40+i*340,450,315,150,{backgroundColor:'#ffffff',roundness:{type:3}});
    text(z+57+i*340,470,label,21);
  });
  text(z+40,635,'Driver builds. Reviewer questions. Switch halfway.',20);
  return {type:'excalidraw',version:2,source:'https://excalidraw.com',elements,
    appState:{viewBackgroundColor:paper,gridSize:null,zoom:{value:0.7},scrollX:20,scrollY:20},files:{}};
}
await mkdir('course/boards',{recursive:true});
for (const [i,course] of courses.entries()) {
  const scene = board(course,i);
  await writeFile(`course/boards/0${i+1}-${course.id}.excalidraw`,JSON.stringify(scene,null,2));
}
console.log('Generated five editable boards with the same opening frame.');
