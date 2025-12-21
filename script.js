// Hardcoded bacteria data
const bacteria = [
    {name: 'Alcaligenes faecalis', gram: 'negative', tsaImage: 'Alcaligenes_faecalis_on_TSA.jpg', selectiveMedia: 'MacConkey', macImage: 'pseudomonas on MacConkey.jpg', msaImage: '', biochemical: {mr: '-', vp: '-', indole: '-', citrate: '+', urea: '-', tsiGas: '+', tsiH2s: '-'}},
    {name: 'Bacillus cereus', gram: 'positive', tsaImage: 'Bacillus cereus on TSA.jpg', selectiveMedia: 'MSA', macImage: '', msaImage: 'Staphylococcus aureus on MSA.jpg', biochemical: {mr: '+', vp: '+', indole: '-', citrate: '+', urea: '+', tsiGas: '+', tsiH2s: '+'}},
    {name: 'Bacillus subtilis', gram: 'positive', tsaImage: 'Bacillus subtilis on TSA.jpg', selectiveMedia: 'MSA', macImage: '', msaImage: 'Staphylococcus aureus on MSA.jpg', biochemical: {mr: '+', vp: '-', indole: '-', citrate: '+', urea: '+', tsiGas: '+', tsiH2s: '+'}},
    {name: 'Citrobacter freundii', gram: 'negative', tsaImage: 'Citrobacter_freundii_on_TSA.jpg', selectiveMedia: 'MacConkey', macImage: 'Citrobacter freundii on Macconkey.jpg', msaImage: '', biochemical: {mr: '+', vp: '-', indole: '-', citrate: '+', urea: '+', tsiGas: '+', tsiH2s: '+'}},
    {name: 'E. coli', gram: 'negative', tsaImage: 'E.coli_on_TSA.jpg', selectiveMedia: 'MacConkey', macImage: 'E.coli__or_Citrobacter_freundii_on_MacConkey.jpg', msaImage: '', biochemical: {mr: '+', vp: '-', indole: '+', citrate: '-', urea: '-', tsiGas: '+', tsiH2s: '-'}},
    {name: 'Enterobacter aerogenes', gram: 'negative', tsaImage: 'Enterobacter_aerogenes_on_TSA.jpg', selectiveMedia: 'MacConkey', macImage: 'Citrobacter_freundii_and_Enterobacter_aerogenes.jpg', msaImage: '', biochemical: {mr: '-', vp: '+', indole: '-', citrate: '+', urea: '+', tsiGas: '+', tsiH2s: '-'}},
    {name: 'Enterococcus faecalis', gram: 'positive', tsaImage: 'enterococcus faecalis on blood agar.jpg', selectiveMedia: 'MSA', macImage: '', msaImage: 'Enterococcus faecalis on MSA.png', biochemical: {mr: '-', vp: '-', indole: '-', citrate: '-', urea: '-', tsiGas: '+', tsiH2s: '-'}},
    {name: 'Klebsiella pneumoniae', gram: 'negative', tsaImage: 'Klebsiella_pneumoniae_on_TSA.jpg', selectiveMedia: 'MacConkey', macImage: 'Klebsiella pneumoniae MacConkey wikipedia.jpg', msaImage: '', biochemical: {mr: '-', vp: '+', indole: '-', citrate: '+', urea: '+', tsiGas: '+', tsiH2s: '-'}},
    {name: 'Micrococcus luteus', gram: 'positive', tsaImage: 'Micrococcus_luteus_on_TSA.jpg', selectiveMedia: 'MSA', macImage: '', msaImage: 'Staphylococcus aureus on MSA.jpg', biochemical: {mr: '-', vp: '-', indole: '-', citrate: '-', urea: '-', tsiGas: '-', tsiH2s: '-'}},
    {name: 'Proteus mirabilis', gram: 'negative', tsaImage: 'Proteus_mirabilis_on_TSA.jpg', selectiveMedia: 'MacConkey', macImage: 'Proteus_mirabilis_on_MacConkey.jpg', msaImage: '', biochemical: {mr: '+', vp: '-', indole: '+', citrate: '+', urea: '+', tsiGas: '+', tsiH2s: '+'}},
    {name: 'Pseudomonas aeruginosa', gram: 'negative', tsaImage: 'Pseudomonas_aeruginosa_on_TSA.jpg', selectiveMedia: 'MacConkey', macImage: 'pseudomonas on MacConkey.jpg', msaImage: '', biochemical: {mr: '-', vp: '-', indole: '-', citrate: '+', urea: '-', tsiGas: '+', tsiH2s: '-'}},
    {name: 'Salmonella typhimurium', gram: 'negative', tsaImage: 'Salmonella_typhimurium_on_TSA.jpg', selectiveMedia: 'MacConkey', macImage: 'Salmonella_typhimurium_on_MacConkey.jpg', msaImage: '', biochemical: {mr: '+', vp: '-', indole: '-', citrate: '+', urea: '-', tsiGas: '+', tsiH2s: '+'}},
    {name: 'Serratia marcescens', gram: 'negative', tsaImage: 'Serratia_marcescens_on_TSA.jpg', selectiveMedia: 'MacConkey', macImage: 'Serratia_marcescens_on_MacConkey.jpg', msaImage: '', biochemical: {mr: '-', vp: '+', indole: '-', citrate: '+', urea: '+', tsiGas: '+', tsiH2s: '-'}},
    {name: 'Shigella flexneri', gram: 'negative', tsaImage: 'Shigella_flexneri_on_TSA.jpg', selectiveMedia: 'MacConkey', macImage: 'Shigella_flexneri_on_Mac_Conkey.jpg', msaImage: '', biochemical: {mr: '+', vp: '-', indole: '+', citrate: '-', urea: '-', tsiGas: '+', tsiH2s: '-'}},
    {name: 'Staphylococcus aureus', gram: 'positive', tsaImage: 'Staphylococcus_aureus_on_TSA.jpg', selectiveMedia: 'MSA', macImage: '', msaImage: 'Staphylococcus aureus on MSA.jpg', biochemical: {mr: '+', vp: '-', indole: '-', citrate: '+', urea: '+', tsiGas: '+', tsiH2s: '-'}},
    {name: 'Staphylococcus epidermidis', gram: 'positive', tsaImage: 'Staphylococcus epidermidis on TSA.jpg', selectiveMedia: 'MSA', macImage: '', msaImage: 'Staphylococcus epidermidis on Blood agar.jpg', biochemical: {mr: '-', vp: '-', indole: '-', citrate: '-', urea: '-', tsiGas: '+', tsiH2s: '-'}},
    {name: 'Streptococcus bovis', gram: 'positive', tsaImage: 'Streptococcus bovis on TSa.jpg', selectiveMedia: 'MSA', macImage: '', msaImage: 'Staphylococcus aureus on MSA.jpg', biochemical: {mr: '-', vp: '-', indole: '-', citrate: '-', urea: '-', tsiGas: '+', tsiH2s: '-'}},
    {name: 'Streptococcus pyogenes', gram: 'positive', tsaImage: 'Streptococcus pyogenes on TSA.jpg', selectiveMedia: 'MSA', macImage: '', msaImage: 'Staphylococcus aureus on MSA.jpg', biochemical: {mr: '-', vp: '-', indole: '-', citrate: '-', urea: '-', tsiGas: '+', tsiH2s: '-'}},

    // Additional for Gram stain images
    // For Gram pos cocci, but using general
];

// Select random unknown
const unknown = bacteria[Math.floor(Math.random() * bacteria.length)];
let remaining = [...bacteria];

// Screen 1: Gram Stain
document.getElementById('gramButton').addEventListener('click', () => {
    const result = unknown.gram === 'positive' ? 'Gram Positive' : 'Gram Negative';
    document.getElementById('gramText').textContent = result;
    document.getElementById('gramImage').src = unknown.gram === 'positive' ? 'Gram positive bacillus all species gram staining.jpg' : 'Gram negative bacilli any species gram staining.jpg';
    document.getElementById('gramResult').style.display = 'block';
    document.getElementById('next1').style.display = 'inline-block';
    remaining = remaining.filter(b => b.gram === unknown.gram);
});

// Screen 2: TSA
document.getElementById('tsaText').textContent = 'Growth observed';
document.getElementById('tsaImage').src = unknown.tsaImage;

// Screen 3: Selective Media
const correctMedia = unknown.selectiveMedia;
document.getElementById('macButton').addEventListener('click', () => {
    if (correctMedia === 'MacConkey') {
        document.getElementById('selectiveText').textContent = 'Growth on MacConkey';
        document.getElementById('selectiveImage').src = unknown.macImage;
        document.getElementById('selectiveResult').style.display = 'block';
        document.getElementById('next3').style.display = 'inline-block';
        remaining = remaining.filter(b => b.selectiveMedia === 'MacConkey');
    } else {
        alert('Incorrect choice. Try again.');
    }
});
document.getElementById('msaButton').addEventListener('click', () => {
    if (correctMedia === 'MSA') {
        document.getElementById('selectiveText').textContent = 'Growth on MSA';
        document.getElementById('selectiveImage').src = unknown.msaImage;
        document.getElementById('selectiveResult').style.display = 'block';
        document.getElementById('next3').style.display = 'inline-block';
        remaining = remaining.filter(b => b.selectiveMedia === 'MSA');
    } else {
        alert('Incorrect choice. Try again.');
    }
});

// Screen 4: Biochemical Tests
const biochemButtons = ['mr', 'vp', 'indole', 'citrate', 'urea', 'tsiGas', 'tsiH2s'];
let biochemDone = new Set();
biochemButtons.forEach(test => {
    document.getElementById(test + 'Button').addEventListener('click', () => {
        if (biochemDone.has(test)) return;
        biochemDone.add(test);
        const result = unknown.biochemical[test] === '+' ? test.toUpperCase() + ' Positive' : test.toUpperCase() + ' Negative';
        const div = document.createElement('div');
        div.innerHTML = `<p>${result}</p><p>Image not available</p>`;
        document.getElementById('biochemResults').appendChild(div);
        remaining = remaining.filter(b => b.biochemical[test] === unknown.biochemical[test]);
        if (biochemDone.size === biochemButtons.length) {
            document.getElementById('idButton').style.display = 'inline-block';
        }
    });
});

// Navigation
document.getElementById('next1').addEventListener('click', () => {
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'block';
});
document.getElementById('next2').addEventListener('click', () => {
    document.getElementById('screen2').style.display = 'none';
    document.getElementById('screen3').style.display = 'block';
});
document.getElementById('next3').addEventListener('click', () => {
    document.getElementById('screen3').style.display = 'none';
    document.getElementById('screen4').style.display = 'block';
});
document.getElementById('idButton').addEventListener('click', () => {
    document.getElementById('screen4').style.display = 'none';
    document.getElementById('screen5').style.display = 'block';
    const select = document.getElementById('organismSelect');
    remaining.forEach(b => {
        const option = document.createElement('option');
        option.value = b.name;
        option.textContent = b.name;
        select.appendChild(option);
    });
});

// Screen 5: Final Guess
document.getElementById('submitButton').addEventListener('click', () => {
    const selected = document.getElementById('organismSelect').value;
    const resultDiv = document.getElementById('finalResult');
    if (selected === unknown.name) {
        resultDiv.innerHTML = '<p>Correct!</p>';
    } else {
        resultDiv.innerHTML = `<p>Incorrect. The unknown was ${unknown.name}.</p>`;
    }
    resultDiv.innerHTML += `<p>Full profile: Gram ${unknown.gram}, Selective Media: ${unknown.selectiveMedia}, Biochemical: ${JSON.stringify(unknown.biochemical)}</p>`;
    resultDiv.style.display = 'block';
});
