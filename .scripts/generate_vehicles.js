const fs = require('fs');
const path = require('path');

const data = name => JSON.parse(fs.readFileSync(path.join(__dirname, `../_data/${name}.json`)).toString());

const aircrafts = data('air');
const ground = data('ground');
const emptyCB = () => {};

aircrafts.airIndex.forEach((x, i) => {
    const model = aircrafts.airDB.find(y => y.model === x.model) || {};
    fs.writeFile(path.join(__dirname, '../_air', `${x.name}.md`), `---
index: ${i}
description: '${x.name} - ${x.type}, Rank: ${x.rank}, BR: ${(x.match / 3 + .67).toFixed(1)}, Silver lions: ${model.value_silv}, Research points: ${model.reqExp_resp}'
db: ${aircrafts.airDB.indexOf(model)}
---`, emptyCB);
});

ground.groundIndex.forEach((x, i) => {
    const model = ground.groundDB.find(y => y.model === x.model) || {};
    fs.writeFile(path.join(__dirname, '../_ground', `${x.name}.md`), `---
index: ${i}
description: '${x.name} - ${x.type}, Rank: ${x.rank}, BR: ${(x.match / 3 + .67).toFixed(1)}, Silver lions: ${model.value_silv}, Research points: ${model.reqExp_resp}'
db: ${ground.groundDB.indexOf(model)}
---`, emptyCB);
});