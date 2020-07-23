var e="#a2c829";class t{constructor(){this.connected={},this.nodes={},this.scoreSeries=[],this.adjacentGreen=[]}addNode(t){this.nodes[t.id]=t,this.connected[t.id]=[],this.nodes[t.id].disconnected=0,this.nodes[t.id].tested=0;var o=Math.random();o<.3||o>=.3&&o<.72?(this.nodes[t.id].state=0,this.nodes[t.id].color="grey",this.nodes[t.id].opacity=.8):(this.nodes[t.id].state=1,this.nodes[t.id].color=e,this.nodes[t.id].opacity=.8)}addEdge(e,t,o=1){this.connected[e].push({node:this.nodes[t],weight:o,pathDrawn:null}),-1==this.connected[e].map(e=>JSON.stringify(e.node)).indexOf(JSON.stringify(this.nodes[t]))&&this.connected[t].push({node:this.nodes[e],weight:o,pathDrawn:null})}getConnectedGreen(t){this.adjacentGreen=[];for(const t of Object.values(this.nodes)){let r=[];var o=t.x,s=t.y;if(r.push(t),t.color==e){var n=this.connected[t.id];for(let t=0;t<n.length;t++){let c=n[t];var d=c.node.x,i=c.node.y;c.node.color==e&&(d==o&&i==s+1||d==o+1&&i==s||d==o&&i==s-1||d==o-1&&i==s)&&r.push(c.node)}this.adjacentGreen.push(r)}}}getConnections(){return this.adjacentGreen}display(){let e="";for(const t of Object.values(this.nodes))e+=t.id+" ->"+this.connected[t.id].map(e=>e.node.color).join(", ")+"\n";console.log(e)}retrieveColor(e){return this.nodes[e].color}retrieveOpacity(e){return this.nodes[e].opacity}setOpacity(){for(const e of Object.values(this.nodes))"grey"==e.color&&(e.opacity=.8)}nodesToPlot(){var e=[];for(const n of Object.values(this.nodes)){var t=n.id.split(",").map(parseFloat),o=n.color,s=n.opacity;e.push({x:t[0],y:t[1],color:o,opacity:s})}return e}gridDisplay(e,t){for(var s="",n=0;n<e;n++){for(var d=0;d<t;d++)0!=this.nodes[n+","+d].tested&&0!=this.nodes[n+","+d].disconnected?s+=o("[*"+this.nodes[n+","+d].color+"*]")+"\t":0!=this.nodes[n+","+d].disconnected?s+=o("["+this.nodes[n+","+d].color+"]")+"\t":0!=this.nodes[n+","+d].tested?s+=o("*"+this.nodes[n+","+d].color+"*")+"\t":s+=o(this.nodes[n+","+d].color)+"\t";s+="\n"}console.log(s)}resetTesting(){for(const e of Object.values(this.nodes))e.tested=0}alreadyTested(e){return this.nodes[e].tested}testing(e,t){this.nodes[e].tested=t}disconnect(e,t){this.nodes[e].disconnected=1==t?1:0}reset(){}simulate_input(e,t,o){for(var s=0;s<e;s++)for(var n=0;n<e;n++)Math.random()>1-o/100&&this.testing(s+","+n),Math.random()>1-t/100?this.disconnect(s+","+n,1):this.disconnect(s+","+n,0)}score(){var t=0,o=0,s=0;for(const n of Object.values(this.nodes))n.color==e?(o+=1,s+=this.connected[n.id].map(t=>t.node.color==e&&0==t.node.disconnected?1:0).reduce((e,t)=>e+t)/2):t+=1;return this.update_score(t,o,s),[t,o,s]}update_score(e,t,o){this.scoreSeries.push({i:e,s:t,cs:o})}retrieveScore(){return this.scoreSeries}update(){var t=JSON.parse(JSON.stringify(this.nodes)),o=JSON.parse(JSON.stringify(this.connected));for(const s of Object.values(t)){let t=0;1==s.disconnected||(t=o[s.id].map(e=>1==e.node.disconnected?0:e.weight*e.node.state).reduce((e,t)=>e+t)),s.color==e?1==s.disconnected&&1==s.tested||1==s.disconnected||(2==t||3==t||4==t?(s.state=1,s.color=e,s.opacity=1):(s.state=0,s.color="grey",s.opacity=.8)):(s.color,1==s.disconnected&&1==s.tested?(s.state=1,s.color=e,s.opacity=1):1==s.disconnected||1==s.tested&&(s.state=1,s.color=e,s.opacity=1))}for(const e of Object.values(t))this.nodes[e.id].state=e.state,this.nodes[e.id].color=e.color,this.nodes[e.id].opacity=e.opacity}}export function populate_grid(){var e=new t;let o=function(e,t){for(var o=[],s=0;s<e;s++){o[s]=[];for(var n=0;n<t;n++){o[s][n]=[];s-1<0||o[s][n].push(s-1+","+n),s+1>=e||o[s][n].push(s+1+","+n),n-1<0||o[s][n].push(s+","+(n-1)),n+1>=t||o[s][n].push(s+","+(n+1)),s-1>=0&&n-1>=0&&o[s][n].push(s-1+","+(n-1)),s-1>=0&&n+1<t&&o[s][n].push(s-1+","+(n+1)),s+1<e&&n+1<t&&o[s][n].push(s+1+","+(n+1)),s+1<e&&n-1>=0&&o[s][n].push(s+1+","+(n-1))}}return o}(15,15);for(var s=0;s<o.length;s++)for(var n=0;n<o[s].length;n++){var d=o[s][n];e.addNode({x:n,y:s,id:s+","+n,meta:d})}for(s=0;s<o.length;s++){o.length;for(n=0;n<o[s].length;n++){let t=o[s][n];for(let d=0;d<t.length;d++)e.addEdge(s+","+n,o[s][n][d])}}return e}function o(e){return e+" ".repeat(10-e.length)}