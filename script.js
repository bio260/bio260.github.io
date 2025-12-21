// Hardcoded organism data based on dichotomous key and assumptions
const organisms = [
    // Gram Positive Bacilli
    {
        name: 'Bacillus cereus',
        gram: 'positive',
        morphology: 'bacillus',
        tests: { MR: false, VP: false, Indole: false, Citrate: false, Urea: false, TSI_Gas: false, TSI_H2S: false },
        images: { gram: 'Gram positive bacillus all species gram staining.jpg', tsa: 'Bacillus cereus on TSA.jpg', selective: 'Bacillus cereus on TSA.jpg' }
    },
    {
        name: 'Bacillus subtilis',
        gram: 'positive',
        morphology: 'bacillus',
        tests: { MR: false, VP: false, Indole: false, Citrate: false, Urea: false, TSI_Gas: false, TSI_H2S: false },
        images: { gram: 'Gram positive bacillus all species gram staining.jpg', tsa: 'Bacillus subtilis on TSA.jpg', selective: 'Bacillus subtilis on TSA.jpg' }
    },
    {
        name: 'Bacillus megaterium',
        gram: 'positive',
        morphology: 'bacillus',
        tests: { MR: false, VP: false, Indole: false, Citrate: false, Urea: false, TSI_Gas: false, TSI_H2S: false },
        images: { gram: 'Gram positive bacillus all species gram staining.jpg', tsa: 'Bacillus subtilis on TSA.jpg', selective: 'Bacillus subtilis on TSA.jpg' } // Assumption: similar to subtilis
    },
    // Gram Positive Cocci
    {
        name: 'Staphylococcus aureus',
        gram: 'positive',
        morphology: 'coccus',
        tests: { MR: false, VP: false, Indole: false, Citrate: false, Urea: false, TSI_Gas: false, TSI_H2S: false },
        images: { gram: 'Staphylococci all species gram staining.jpg', tsa: 'Staphylococcus_aureus_on_TSA.jpg', selective: 'Staphylococcus aureus on MSA.jpg' }
    },
    {
        name: 'Staphylococcus epidermidis',
        gram: 'positive',
        morphology: 'coccus',
        tests: { MR: false, VP: false, Indole: false, Citrate: false, Urea: false, TSI_Gas: false, TSI_H2S: false },
        images: { gram: 'Staphylococci all species gram staining.jpg', tsa: 'Staphylococcus epidermidis on TSA.jpg', selective: 'Staphylococcus epidermidis on TSA.jpg' }
    },
    {
        name: 'Streptococcus pyogenes',
        gram: 'positive',
        morphology: 'coccus',
        tests: { MR: false, VP: false, Indole: false, Citrate: false, Urea: false, TSI_Gas: false, TSI_H2S: false },
        images: { gram: 'Streptococcus all species gram staining.jpg', tsa: 'Streptococcus pyogenes on TSA.jpg', selective: 'Streptococcus pyogenes on blood agar.jpg' }
    },
    {
        name: 'Streptococcus bovis',
        gram: 'positive',
        morphology: 'coccus',
        tests: { MR: false, VP: false, Indole: false, Citrate: false, Urea: false, TSI_Gas: false, TSI_H2S: false },
        images: { gram: 'Streptococcus all species gram staining.jpg', tsa: 'Streptococcus bovis on TSa.jpg', selective: 'Streptococcus bovis on TSa.jpg' }
    },
    {
        name: 'Enterococcus faecalis',
        gram: 'positive',
        morphology: 'coccus',
        tests: { MR: false, VP: false, Indole: false, Citrate: false, Urea: false, TSI_Gas: false, TSI_H2S: false },
        images: { gram: 'Streptococcus all species gram staining.jpg', tsa: 'enterococcus faecalis on blood agar.jpg', selective: 'Enterococcus faecalis on MSA.png' }
    },
    {
        name: 'Micrococcus luteus',
        gram: 'positive',
        morphology: 'coccus',
        tests: { MR: false, VP: false, Indole: false, Citrate: false, Urea: false, TSI_Gas: false, TSI_H2S: false },
        images: { gram: 'Micrococcus luteus gram staining.jpg', tsa: 'Micrococcus_luteus_on_TSA.jpg', selective: 'Micrococcus luteus on blood agar.jpg' }
    },
    {
        name: 'Micrococcus roseus',
        gram: 'positive',
        morphology: 'coccus',
        tests: { MR: false, VP: false, Indole: false, Citrate: false, Urea: false, TSI_Gas: false, TSI_H2S: false },
        images: { gram: 'Micrococcus luteus gram staining.jpg', tsa: 'Micrococcus_luteus_on_TSA.jpg', selective: 'Micrococcus luteus on blood agar.jpg' } // Assumption: similar
    },
    // Gram Negative Fermenters
    {
        name: 'Enterobacter aerogenes',
        gram: 'negative',
        morphology: 'bacillus',
        tests: { MR: false, VP: true, Indole: false, Citrate: true, Urea: false, TSI_Gas: true, TSI_H2S: false },
        images: { gram: 'Gram negative bacilli any species gram staining.jpg', tsa: 'Enterobacter_aerogenes_on_TSA.jpg', selective: 'Citrobacter_freundii_and_Enterobacter_aerogenes.jpg' }
    },
    {
        name: 'Klebsiella pneumoniae',
        gram: 'negative',
        morphology: 'bacillus',
        tests: { MR: false, VP: false, Indole: false, Citrate: true, Urea: false, TSI_Gas: true, TSI_H2S: false },
        images: { gram: 'Gram negative bacilli any species gram staining.jpg', tsa: 'Klebsiella_pneumoniae_on_TSA.jpg', selective: 'Klebsiella pneumoniae MacConkey wikipedia.jpg' }
    },
    {
        name: 'Citrobacter freundii',
        gram: 'negative',
        morphology: 'bacillus',
        tests: { MR: false, VP: false, Indole: false, Citrate: true, Urea: false, TSI_Gas: true, TSI_H2S: false },
        images: { gram: 'Gram negative bacilli any species gram staining.jpg', tsa: 'Citrobacter_freundii_on_TSA.jpg', selective: 'Citrobacter freundii on Macconkey.jpg' }
    },
    {
        name: 'Escherichia coli',
        gram: 'negative',
        morphology: 'bacillus',
        tests: { MR: true, VP: false, Indole: true, Citrate: false, Urea: false, TSI_Gas: true, TSI_H2S: false },
        images: { gram: 'Gram negative bacilli any species gram staining.jpg', tsa: 'E.coli_on_TSA.jpg', selective: 'E.coli_on_TSA.jpg' }
    },
    {
        name: 'Salmonella typhimurium',
        gram: 'negative',
        morphology: 'bacillus',
        tests: { MR: true, VP: false, Indole: false, Citrate: false, Urea: false, TSI_Gas: true, TSI_H2S: true },
        images: { gram: 'Gram negative bacilli any species gram staining.jpg', tsa: 'Salmonella_typhimurium_on_TSA.jpg', selective: 'Salmonella_typhimurium_on_MacConkey.jpg' }
    },
    {
        name: 'Shigella flexneri',
        gram: 'negative',
        morphology: 'bacillus',
        tests: { MR: true, VP: false, Indole: false, Citrate: false, Urea: false, TSI_Gas: true, TSI_H2S: false },
        images: { gram: 'Gram negative bacilli any species gram staining.jpg', tsa: 'Shigella_flexneri_on_TSA.jpg', selective: 'Shigella_flexneri_on_Mac_Conkey.jpg' }
    },
    // Gram Negative Non-Fermenters
    {
        name: 'Pseudomonas aeruginosa',
        gram: 'negative',
        morphology: 'bacillus',
        tests: { MR: false, VP: false, Indole: false, Citrate: false, Urea: false, TSI_Gas: false, TSI_H2S: false },
        images: { gram: 'Gram negative bacilli any species gram staining.jpg', tsa: 'Pseudomonas_aeruginosa_on_TSA.jpg', selective: 'pseudomonas on MacConkey.jpg' }
    },
    {
        name: 'Alcaligenes faecalis',
        gram: 'negative',
        morphology: 'bacillus',
        tests: { MR: false, VP: false, Indole: false, Citrate: true, Urea: false, TSI_Gas: false, TSI_H2S: false },
        images: { gram: 'Gram negative bacilli any species gram staining.jpg', tsa: 'Alcaligenes_faecalis_on_TSA.jpg', selective: 'Alcaligenes_faecalis_on_TSA.jpg' }
    },
    {
        name: 'Proteus mirabilis',
        gram: 'negative',
        morphology: 'bacillus',
        tests: { MR: false, VP: false, Indole: false, Citrate: false, Urea: true, TSI_Gas: true, TSI_H2S: true },
        images: { gram: 'Gram negative bacilli any species gram staining.jpg', tsa: 'Proteus_mirabilis_on_TSA.jpg', selective: 'Proteus_mirabilis_on_MacConkey.jpg' }
    },
    {
        name: 'Proteus vulgaris',
        gram: 'negative',
        morphology: 'bacillus',
        tests: { MR: false, VP: false, Indole: false, Citrate: false, Urea: true, TSI_Gas: true, TSI_H2S: true },
        images: { gram: 'Gram negative bacilli any species gram staining.jpg', tsa: 'Proteus_mirabilis_on_TSA.jpg', selective: 'Proteus_mirabilis_on_MacConkey.jpg' } // Assumption: similar
    },
    {
        name: 'Serratia marcescens',
        gram: 'negative',
        morphology: 'bacillus',
        tests: { MR: false, VP: false, Indole: false, Citrate: false, Urea: false, TSI_Gas: true, TSI_H2S: false },
        images: { gram: 'Gram negative bacilli any species gram staining.jpg', tsa: 'Serratia_marcescens_on_TSA.jpg', selective: 'Serratia_marcescens_on_MacConkey.jpg' }
    }
];

let unknown;
let candidates = [...organisms];

document.addEventListener('DOMContentLoaded', () => {
    // Pick random unknown
    unknown = organisms[Math.floor(Math.random() * organisms.length)];
    console.log('Unknown:', unknown.name); // For debugging

    // Screen 1: Gram Stain
    document.getElementById('runGramStain').addEventListener('click', () => {
        document.getElementById('gramText').textContent = `Gram ${unknown.gram}`;
        document.getElementById('gramImage').src = unknown.images.gram;
        document.getElementById('gramResult').classList.remove('hidden');
        document.getElementById('next1').classList.remove('hidden');
        // Filter candidates
        candidates = candidates.filter(org => org.gram === unknown.gram);
    });

    // Screen 2: TSA
    document.getElementById('next1').addEventListener('click', () => {
        showScreen(2);
        document.getElementById('tsaText').textContent = 'Growth on TSA';
        document.getElementById('tsaImage').src = unknown.images.tsa;
    });

    // Screen 3: Selective Media
    document.getElementById('next2').addEventListener('click', () => {
        showScreen(3);
    });

    document.getElementById('macConkeyBtn').addEventListener('click', () => {
        if (unknown.gram === 'negative') {
            document.getElementById('selectiveText').textContent = unknown.tests.Citrate ? 'Ferments lactose on MacConkey' : 'Does not ferment lactose on MacConkey';
            document.getElementById('selectiveImage').src = unknown.images.selective;
            document.getElementById('selectiveResult').classList.remove('hidden');
            document.getElementById('next3').classList.remove('hidden');
            // Filter
            candidates = candidates.filter(org => org.tests.Citrate === unknown.tests.Citrate);
        } else {
            alert('Invalid test for Gram positive organism.');
        }
    });

    document.getElementById('msaBtn').addEventListener('click', () => {
        if (unknown.gram === 'positive') {
            document.getElementById('selectiveText').textContent = unknown.morphology === 'coccus' ? 'Growth on MSA' : 'No growth on MSA';
            document.getElementById('selectiveImage').src = unknown.images.selective;
            document.getElementById('selectiveResult').classList.remove('hidden');
            document.getElementById('next3').classList.remove('hidden');
            // Filter - simplistic, assuming cocci grow
            if (unknown.morphology === 'coccus') {
                candidates = candidates.filter(org => org.morphology === 'coccus');
            }
        } else {
            alert('Invalid test for Gram negative organism.');
        }
    });

    // Screen 4: Biochemical Tests
    document.getElementById('next3').addEventListener('click', () => {
        showScreen(4);
    });

    document.querySelectorAll('.biochem-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const test = e.target.dataset.test;
            const result = unknown.tests[test] ? `${test} positive` : `${test} negative`;
            const imgSrc = test === 'MR' ? 'MR_positive.jpg' : test === 'VP' ? 'VP_positive.jpg' : test === 'Indole' ? 'Indole_positive.jpg' : test === 'Citrate' ? 'Citrate_positive.jpg' : test === 'Urea' ? 'Urea_positive.jpg' : 'MacConkey_fermenter.jpg'; // Generic
            document.getElementById('biochemResults').innerHTML += `<div><p>${result}</p><img src="${imgSrc}" alt="${test} Image"></div>`;
            // Filter
            candidates = candidates.filter(org => org.tests[test] === unknown.tests[test]);
        });
    });

    // Screen 5: Final ID
    document.getElementById('idOrganism').addEventListener('click', () => {
        showScreen(5);
        const dropdown = document.getElementById('organismDropdown');
        dropdown.innerHTML = '';
        candidates.forEach(org => {
            const option = document.createElement('option');
            option.value = org.name;
            option.textContent = org.name;
            dropdown.appendChild(option);
        });
    });

    document.getElementById('submitID').addEventListener('click', () => {
        const selected = document.getElementById('organismDropdown').value;
        const isCorrect = selected === unknown.name;
        document.getElementById('idText').textContent = isCorrect ? 'Correct!' : `Incorrect. The unknown is ${unknown.name}.`;
        const profile = document.getElementById('profile');
        profile.innerHTML = `<p>Gram: ${unknown.gram}</p><p>Morphology: ${unknown.morphology}</p><p>Tests: ${JSON.stringify(unknown.tests)}</p>`;
        document.getElementById('finalResult').classList.remove('hidden');
    });

    // Modals
    document.getElementById('flowchartBtn').addEventListener('click', () => {
        document.getElementById('modalImage').src = 'Bacterial Id flow chart.jpg';
        document.getElementById('modal').classList.remove('hidden');
    });

    document.getElementById('galleryBtn').addEventListener('click', () => {
        const grid = document.getElementById('imageGrid');
        grid.innerHTML = '';
        // List of all images (from environment_details)
        const images = [
            'Alcaligenes_faecalis_on_TSA.jpg', 'Bacillus cereus on TSA.jpg', 'Bacillus subtilis on TSA.jpg', 'Bacterial Id flow chart.jpg',
            'Citrobacter freundii on Macconkey.jpg', 'Citrobacter_freundii_and_Enterobacter_aerogenes.jpg', 'Citrobacter_freundii_on_TSA.jpg',
            'E.coli and Klebsiella Mac (copyrighted).jpg', 'E.coli__or_Citrobacter_freundii_on_MacConkey.jpg', 'E.coli_on_TSA.jpg',
            'Enterobacter_aerogenes_on_TSA.jpg', 'enterococcus faecalis on blood agar.jpg', 'Enterococcus faecalis on MSA.png',
            'Gram negative bacilli any species gram staining.jpg', 'Gram positive bacillus all species gram staining.jpg',
            'Klebsiella pneumoniae MacConkey wikipedia.jpg', 'Klebsiella_pneumoniae_on_TSA.jpg', 'Micrococcus luteus gram staining.jpg',
            'Micrococcus luteus on blood agar.jpg', 'Micrococcus_luteus_on_TSA.jpg', 'Proteus_mirabilis_on_MacConkey.jpg',
            'Proteus_mirabilis_on_TSA.jpg', 'pseudomonas on MacConkey.jpg', 'Pseudomonas_aeruginosa_on_TSA.jpg',
            'Salmonella_typhimurium_on_MacConkey.jpg', 'Salmonella_typhimurium_on_TSA.jpg', 'Serratia_marcescens_on_MacConkey.jpg',
            'Serratia_marcescens_on_TSA.jpg', 'Serratia_marcescens_on_TSA(1).jpg', 'Shigella__flexneri_on_TSA.jpg',
            'Shigella_flexneri_on_Mac_Conkey.jpg', 'Shigella_flexneri_on_TSA.jpg', 'Staphylococci all species gram staining.jpg',
            'Staphylococcus aureus on Blood agar.jpg', 'Staphylococcus aureus on MSA.jpg', 'Staphylococcus epidermidis on Blood agar.jpg',
            'Staphylococcus epidermidis on TSA.jpg', 'Staphylococcus_aureus_on_TSA.jpg', 'Streptococcus all species gram staining.jpg',
            'Streptococcus bovis on TSa.jpg', 'Streptococcus pyogenes on blood agar.jpg', 'Streptococcus pyogenes on TSA.jpg'
        ];
        images.forEach(img => {
            const imgEl = document.createElement('img');
            imgEl.src = img;
            imgEl.addEventListener('click', () => {
                document.getElementById('modalImage').src = img;
                document.getElementById('galleryModal').classList.add('hidden');
                document.getElementById('modal').classList.remove('hidden');
            });
            grid.appendChild(imgEl);
        });
        document.getElementById('galleryModal').classList.remove('hidden');
    });

    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('modal').classList.add('hidden');
    });

    document.querySelector('.close-gallery').addEventListener('click', () => {
        document.getElementById('galleryModal').classList.add('hidden');
    });
});

function showScreen(num) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen${num}`).classList.add('active');
}
