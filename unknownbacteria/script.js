// Bacteria Identification App - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // App State
    const state = {
        selectedBacterium: null,
        availableTests: {
            step1: [],
            step2: [],
            step3: []
        },
        viewedTests: {
            step1: {},
            step2: {},
            step3: {}
        },
        stepCompletion: {
            step1: false,
            step2: false,
            step3: false
        },
        eliminatedBacteria: {},
        eliminationUnlocked: false,
        displayedImages: new Set() // Track all displayed images to prevent duplicates
    };

    // DOM Elements
    const elements = {
        // Step 1
        gramStainBtn: document.getElementById('gram-stain-btn'),
        tsaBtn: document.getElementById('tsa-btn'),
        step1Images: document.getElementById('step1-images'),
        gramStainImage: document.getElementById('gram-stain-image'),
        tsaImage: document.getElementById('tsa-image'),

        // Step 2
        step2: document.getElementById('step2'),
        step2Buttons: document.getElementById('step2-buttons'),
        step2Images: document.getElementById('step2-images'),

        // Step 3
        step3: document.getElementById('step3'),
        step3Buttons: document.getElementById('step3-buttons'),
        step3Images: document.getElementById('step3-images'),

        // Elimination Section
        eliminationSection: document.getElementById('elimination-section'),
        eliminationGrid: document.getElementById('elimination-grid'),
        submitFinalGuessBtn: document.getElementById('submit-final-guess'),
        tryAnotherBtn: document.getElementById('try-another-btn'),
        result: document.getElementById('result'),
        resultTitle: document.getElementById('result-title'),
        actualBacterium: document.getElementById('actual-bacterium'),
        allTests: document.getElementById('all-tests')
    };

    // All bacteria data - Updated list (removed Streptococcus bovis and Alcaligenes faecalis)
    const allBacteria = [
        "Bacillus cereus",
        "Bacillus subtilis",
        "Citrobacter freundii",
        "E. coli",
        "Enterobacter aerogenes",
        "Enterococcus faecalis",
        "Klebsiella pneumoniae",
        "Micrococcus luteus",
        "Proteus mirabilis",
        "Pseudomonas aeruginosa",
        "Salmonella typhimurium",
        "Serratia marcescens",
        "Shigella flexneri",
        "Staphylococcus aureus",
        "Staphylococcus epidermidis",
        "Streptococcus pyogenes"
    ];

    // Biochemical test results for all organisms
    const biochemicalTests = {
        // Gram Positive Bacilli
        "Bacillus cereus": {
            gramStain: "G+",
            shape: "Bacilli",
            tsa: "Growth",
            macConkey: "NF (Growth)",
            biochemical: {
                "MR Test": { result: "negative", description: "Methyl Red Test: Negative" },
                "VP Test": { result: "negative", description: "Voges-Proskauer Test: Negative" },
                "Citrate Test": { result: "negative", description: "Citrate Utilization: Negative" },
                "TSI H2S": { result: "negative", description: "TSI H2S Production: Negative" },
                "Urease Test": { result: "negative", description: "Urease Test: Negative" },
                "Indole Test": { result: "negative", description: "Indole Test: Negative" }
            }
        },
        "Bacillus subtilis": {
            gramStain: "G+",
            shape: "Bacilli",
            tsa: "Growth",
            macConkey: "NF (Growth)",
            biochemical: {
                "MR Test": { result: "negative", description: "Methyl Red Test: Negative" },
                "VP Test": { result: "positive", description: "Voges-Proskauer Test: Positive" },
                "Citrate Test": { result: "positive", description: "Citrate Utilization: Positive" },
                "TSI H2S": { result: "negative", description: "TSI H2S Production: Negative" },
                "Urease Test": { result: "negative", description: "Urease Test: Negative" },
                "Indole Test": { result: "negative", description: "Indole Test: Negative" }
            }
        },
        // Gram Negative Bacilli
        "Citrobacter freundii": {
            gramStain: "G-",
            shape: "Bacilli",
            tsa: "Growth",
            macConkey: "F (Yellow)",
            biochemical: {
                "MR Test": { result: "negative", description: "Methyl Red Test: Negative" },
                "VP Test": { result: "positive", description: "Voges-Proskauer Test: Positive" },
                "Citrate Test": { result: "positive", description: "Citrate Utilization: Positive" },
                "TSI H2S": { result: "positive", description: "TSI H2S Production: Positive (Black)" },
                "Urease Test": { result: "negative", description: "Urease Test: Negative" },
                "Indole Test": { result: "negative", description: "Indole Test: Negative" }
            }
        },
        "E. coli": {
            gramStain: "G-",
            shape: "Bacilli",
            tsa: "Growth",
            macConkey: "F (Yellow)",
            biochemical: {
                "MR Test": { result: "negative", description: "Methyl Red Test: Negative" },
                "VP Test": { result: "negative", description: "Voges-Proskauer Test: Negative" },
                "Citrate Test": { result: "negative", description: "Citrate Utilization: Negative" },
                "TSI H2S": { result: "negative", description: "TSI H2S Production: Negative" },
                "Urease Test": { result: "negative", description: "Urease Test: Negative" },
                "Indole Test": { result: "positive", description: "Indole Test: Positive" }
            }
        },
        "Enterobacter aerogenes": {
            gramStain: "G-",
            shape: "Bacilli",
            tsa: "Growth",
            macConkey: "F (Yellow)",
            biochemical: {
                "MR Test": { result: "positive", description: "Methyl Red Test: Positive" },
                "VP Test": { result: "positive", description: "Voges-Proskauer Test: Positive" },
                "Citrate Test": { result: "positive", description: "Citrate Utilization: Positive" },
                "TSI H2S": { result: "negative", description: "TSI H2S Production: Negative" },
                "Urease Test": { result: "negative", description: "Urease Test: Negative" },
                "Indole Test": { result: "negative", description: "Indole Test: Negative" }
            }
        },
        // Gram Positive Cocci
        "Enterococcus faecalis": {
            gramStain: "G+",
            shape: "Cocci",
            tsa: "Growth",
            macConkey: "NF (Growth)",
            biochemical: {
                "MR Test": { result: "negative", description: "Methyl Red Test: Negative" },
                "VP Test": { result: "positive", description: "Voges-Proskauer Test: Positive" },
                "Citrate Test": { result: "negative", description: "Citrate Utilization: Negative" },
                "Catalase Test": { result: "negative", description: "Catalase Test: Negative" },
                "Blood Hemolysis": { result: "gamma", description: "Blood Agar Hemolysis: Gamma (None)" },
                "MSA Fermentation": { result: "positive", description: "MSA Fermentation: Positive" }
            }
        },
        "Klebsiella pneumoniae": {
            gramStain: "G-",
            shape: "Bacilli",
            tsa: "Growth",
            macConkey: "F (Yellow)",
            biochemical: {
                "MR Test": { result: "negative", description: "Methyl Red Test: Negative" },
                "VP Test": { result: "positive", description: "Voges-Proskauer Test: Positive" },
                "Citrate Test": { result: "positive", description: "Citrate Utilization: Positive" },
                "TSI H2S": { result: "negative", description: "TSI H2S Production: Negative" },
                "Urease Test": { result: "positive", description: "Urease Test: Positive" },
                "Indole Test": { result: "negative", description: "Indole Test: Negative" }
            }
        },
        "Micrococcus luteus": {
            gramStain: "G+",
            shape: "Cocci",
            tsa: "Growth",
            macConkey: "NF (Growth)",
            biochemical: {
                "MR Test": { result: "negative", description: "Methyl Red Test: Negative" },
                "VP Test": { result: "positive", description: "Voges-Proskauer Test: Positive" },
                "Citrate Test": { result: "negative", description: "Citrate Utilization: Negative" },
                "Catalase Test": { result: "positive", description: "Catalase Test: Positive" },
                "Blood Hemolysis": { result: "gamma", description: "Blood Agar Hemolysis: Gamma (None)" },
                "MSA Fermentation": { result: "negative", description: "MSA Fermentation: Negative" }
            }
        },
        "Proteus mirabilis": {
            gramStain: "G-",
            shape: "Bacilli",
            tsa: "Growth",
            macConkey: "NF (Yellow)",
            biochemical: {
                "MR Test": { result: "negative", description: "Methyl Red Test: Negative" },
                "VP Test": { result: "positive", description: "Voges-Proskauer Test: Positive" },
                "Citrate Test": { result: "positive", description: "Citrate Utilization: Positive" },
                "TSI H2S": { result: "positive", description: "TSI H2S Production: Positive (Black)" },
                "Urease Test": { result: "positive", description: "Urease Test: Positive" },
                "Indole Test": { result: "negative", description: "Indole Test: Negative" }
            }
        },
        "Pseudomonas aeruginosa": {
            gramStain: "G-",
            shape: "Bacilli",
            tsa: "Growth",
            macConkey: "NF (Yellow)",
            biochemical: {
                "MR Test": { result: "negative", description: "Methyl Red Test: Negative" },
                "VP Test": { result: "positive", description: "Voges-Proskauer Test: Positive" },
                "Citrate Test": { result: "positive", description: "Citrate Utilization: Positive" },
                "TSI H2S": { result: "negative", description: "TSI H2S Production: Negative" },
                "Urease Test": { result: "negative", description: "Urease Test: Negative" },
                "Indole Test": { result: "negative", description: "Indole Test: Negative" }
            }
        },
        "Salmonella typhimurium": {
            gramStain: "G-",
            shape: "Bacilli",
            tsa: "Growth",
            macConkey: "NF (Red)",
            biochemical: {
                "MR Test": { result: "negative", description: "Methyl Red Test: Negative" },
                "VP Test": { result: "positive", description: "Voges-Proskauer Test: Positive" },
                "Citrate Test": { result: "positive", description: "Citrate Utilization: Positive" },
                "TSI H2S": { result: "positive", description: "TSI H2S Production: Positive (Black)" },
                "Urease Test": { result: "negative", description: "Urease Test: Negative" },
                "Indole Test": { result: "negative", description: "Indole Test: Negative" }
            }
        },
        "Serratia marcescens": {
            gramStain: "G-",
            shape: "Bacilli",
            tsa: "Growth",
            macConkey: "NF (Yellow)",
            biochemical: {
                "MR Test": { result: "positive", description: "Methyl Red Test: Positive" },
                "VP Test": { result: "positive", description: "Voges-Proskauer Test: Positive" },
                "Citrate Test": { result: "positive", description: "Citrate Utilization: Positive" },
                "TSI H2S": { result: "negative", description: "TSI H2S Production: Negative" },
                "Urease Test": { result: "negative", description: "Urease Test: Negative" },
                "Indole Test": { result: "negative", description: "Indole Test: Negative" }
            }
        },
        "Shigella flexneri": {
            gramStain: "G-",
            shape: "Bacilli",
            tsa: "Growth",
            macConkey: "NF (Red)",
            biochemical: {
                "MR Test": { result: "negative", description: "Methyl Red Test: Negative" },
                "VP Test": { result: "negative", description: "Voges-Proskauer Test: Negative" },
                "Citrate Test": { result: "negative", description: "Citrate Utilization: Negative" },
                "TSI H2S": { result: "negative", description: "TSI H2S Production: Negative" },
                "Urease Test": { result: "negative", description: "Urease Test: Negative" },
                "Indole Test": { result: "positive", description: "Indole Test: Positive" }
            }
        },
        "Staphylococcus aureus": {
            gramStain: "G+",
            shape: "Cocci",
            tsa: "Growth",
            macConkey: "NF (Growth)",
            biochemical: {
                "MR Test": { result: "negative", description: "Methyl Red Test: Negative" },
                "VP Test": { result: "positive", description: "Voges-Proskauer Test: Positive" },
                "Citrate Test": { result: "positive", description: "Citrate Utilization: Positive" },
                "Catalase Test": { result: "positive", description: "Catalase Test: Positive" },
                "Blood Hemolysis": { result: "beta", description: "Blood Agar Hemolysis: Beta (Clear Zone)" },
                "MSA Fermentation": { result: "positive", description: "MSA Fermentation: Positive" }
            }
        },
        "Staphylococcus epidermidis": {
            gramStain: "G+",
            shape: "Cocci",
            tsa: "Growth",
            macConkey: "NF (Growth)",
            biochemical: {
                "MR Test": { result: "negative", description: "Methyl Red Test: Negative" },
                "VP Test": { result: "positive", description: "Voges-Proskauer Test: Positive" },
                "Citrate Test": { result: "positive", description: "Citrate Utilization: Positive" },
                "Catalase Test": { result: "positive", description: "Catalase Test: Positive" },
                "Blood Hemolysis": { result: "gamma", description: "Blood Agar Hemolysis: Gamma (None)" },
                "MSA Fermentation": { result: "negative", description: "MSA Fermentation: Negative" }
            }
        },
        "Streptococcus pyogenes": {
            gramStain: "G+",
            shape: "Cocci",
            tsa: "Growth",
            macConkey: "NF (Growth)",
            biochemical: {
                "MR Test": { result: "negative", description: "Methyl Red Test: Negative" },
                "VP Test": { result: "negative", description: "Voges-Proskauer Test: Negative" },
                "Citrate Test": { result: "negative", description: "Citrate Utilization: Negative" },
                "Catalase Test": { result: "negative", description: "Catalase Test: Negative" },
                "Blood Hemolysis": { result: "beta", description: "Blood Agar Hemolysis: Beta (Clear Zone)" }
            }
        }
    };

    // Test categories for classification
    const testCategories = {
        gramStain: ['gram staining', 'gram stain'],
        tsa: ['on TSA', 'on_TSA'],
        macConkey: ['on MacConkey', 'on_Mac_Conkey', 'MacConkey'],
        msa: ['on MSA'],
        bloodAgar: ['on Blood agar', 'on blood agar', 'blood agar'],
        other: [] // Will be populated with remaining tests
    };

    // Get a descriptive name for additional tests based on image filename
    function getDescriptiveTestName(imageName) {
        const lowerName = imageName.toLowerCase();
        
        // Enhanced test patterns to look for with more specific descriptions
        const testPatterns = [
            // Flow charts and identification guides
            { pattern: /flow chart/, name: 'Bacterial Identification Flow Chart' },
            { pattern: /id flow/, name: 'Bacterial Identification Flow Chart' },
            
            // Gram staining patterns
            { pattern: /gram staining/, name: 'Gram Staining (Any Species)' },
            { pattern: /gram stain/, name: 'Gram Staining (Any Species)' },
            { pattern: /gram negative/, name: 'Gram Negative Bacilli Staining' },
            { pattern: /gram positive/, name: 'Gram Positive Bacilli Staining' },
            
            // Specific bacterial group staining
            { pattern: /staphylococci/, name: 'Staphylococci Gram Staining' },
            { pattern: /streptococcus/, name: 'Streptococcus Gram Staining' },
            { pattern: /bacillus/, name: 'Bacillus Gram Staining' },
            { pattern: /micrococcus/, name: 'Micrococcus Gram Staining' },
            
            // Agar plate types
            { pattern: /on tsa/, name: 'TSA Plate' },
            { pattern: /on macconkey/, name: 'MacConkey Agar Plate' },
            { pattern: /on msa/, name: 'MSA Plate' },
            { pattern: /on blood agar/, name: 'Blood Agar Plate' },
            { pattern: /on blood/, name: 'Blood Agar Plate' },
            { pattern: /blood agar/, name: 'Blood Agar Plate' },
            
            // Comparison images
            { pattern: /and.*enterobacter/, name: 'Citrobacter vs Enterobacter Comparison' },
            { pattern: /and.*klebsiella/, name: 'E. coli vs Klebsiella Comparison' },
            { pattern: /or.*citrobacter/, name: 'E. coli or Citrobacter Comparison' },
            
            // Specific bacterial images (generic descriptions without bacterial names)
            { pattern: /alcaligenes/, name: 'Gram Negative Bacilli TSA Plate' },
            { pattern: /bacillus cereus/, name: 'Gram Positive Bacilli Blood Agar Plate' },
            { pattern: /bacillus subtilis/, name: 'Gram Positive Bacilli Blood Agar Plate' },
            { pattern: /citrobacter/, name: 'Gram Negative Bacilli MacConkey Plate' },
            { pattern: /enterobacter/, name: 'Gram Negative Bacilli TSA Plate' },
            { pattern: /enterococcus/, name: 'Gram Positive Cocci Blood Agar Plate' },
            { pattern: /klebsiella/, name: 'Gram Negative Bacilli MacConkey Plate' },
            { pattern: /micrococcus/, name: 'Gram Positive Cocci Gram Staining' },
            { pattern: /proteus/, name: 'Gram Negative Bacilli MacConkey Plate' },
            { pattern: /pseudomonas/, name: 'Gram Negative Bacilli TSA Plate' },
            { pattern: /salmonella/, name: 'Gram Negative Bacilli MacConkey Plate' },
            { pattern: /serratia/, name: 'Gram Negative Bacilli MacConkey Plate' },
            { pattern: /shigella/, name: 'Gram Negative Bacilli MacConkey Plate' },
            { pattern: /staphylococcus aureus/, name: 'Gram Positive Cocci Blood Agar Plate' },
            { pattern: /staphylococcus epidermidis/, name: 'Gram Positive Cocci Blood Agar Plate' },
            { pattern: /streptococcus bovis/, name: 'Gram Positive Cocci TSA Plate' },
            { pattern: /streptococcus pyogenes/, name: 'Gram Positive Cocci Blood Agar Plate' },
            
            // Generic test patterns
            { pattern: /test/, name: 'Additional Test' },
            { pattern: /result/, name: 'Test Result' }
        ];

        // Check for specific patterns
        for (const pattern of testPatterns) {
            if (pattern.pattern.test(lowerName)) {
                return pattern.name;
            }
        }

        // If no specific pattern found, try to extract meaningful words
        const meaningfulWords = ['chart', 'staining', 'plate', 'agar', 'test', 'result', 'comparison', 'identification'];
        const words = imageName.split(/[_\s-]/);
        const descriptiveWords = words.filter(word => 
            meaningfulWords.some(meaningful => word.toLowerCase().includes(meaningful))
        );

        if (descriptiveWords.length > 0) {
            return descriptiveWords.join(' ').replace(/\b\w/g, l => l.toUpperCase());
        }

        // If still no good name, return a generic but descriptive name
        return 'Additional Test';
    }

    // Initialize the app
    function init() {
        // Select next bacterium in sequence
        selectNextBacterium();

        // Set up event listeners
        setupEventListeners();

        // Always show elimination grid
        unlockEliminationGrid();
    }

    // Select a random bacterium that has both Gram Stain and TSA images
    function selectNextBacterium() {
        // First, find all bacteria that have both required Step 1 images
        const validBacteria = allBacteria.filter(bacteria => {
            const gramStainFound = findBacteriumImages(bacteria, 'gramStain').length > 0;
            const tsaFound = findBacteriumImages(bacteria, 'tsa').length > 0;
            return gramStainFound && tsaFound;
        });

        if (validBacteria.length === 0) {
            console.error('No bacteria found with both Gram Stain and TSA images!');
            return;
        }

        // Select a random bacterium from the valid bacteria list
        const randomIndex = Math.floor(Math.random() * validBacteria.length);
        state.selectedBacterium = validBacteria[randomIndex];

        console.log('Selected bacterium:', state.selectedBacterium);

        // Discover all available tests for this bacterium
        discoverAvailableTests();
    }

    // Find all images for a specific bacterium and test category
    function findBacteriumImages(bacteriumName, category) {
        const patterns = testCategories[category] || [];
        const images = [];

        // Check all image files
        const allImages = [
            'common/Bacterial Id flow chart.jpg',
            'common/Citrobacter_freundii_and_Enterobacter_aerogenes.jpg',
            'common/E.coli and Klebsiella Mac (copyrighted).jpg',
            'common/E.coli__or_Citrobacter_freundii_on_MacConkey.jpg',
            'common/Gram negative bacilli any species gram staining.jpg',
            'common/Gram positive bacillus all species gram staining.jpg',
            'common/Staphylococci all species gram staining.jpg',
            'common/Streptococcus all species gram staining.jpg',
            'alcaligenesfaecalis/Alcaligenes_faecalis_on_TSA.jpg',
            'bacilluscereus/bacillus cereus blood agar.jpeg',
            'bacilluscereus/Bacillus cereus on TSA.jpg',
            'bacillussubtilis/bacillus subtilis blood agar.jpeg',
            'bacillussubtilis/Bacillus subtilis on TSA.jpg',
            'citrobacterfreundii/Citrobacter freundii on Macconkey.jpg',
            'citrobacterfreundii/Citrobacter_freundii_on_TSA.jpg',
            'ecoli/E.coli_on_TSA.jpg',
            'enterobacteraerogenes/Enterobacter_aerogenes_on_TSA.jpg',
            'enterococcusfaecalis/enterococcus faecalis on blood agar.jpg',
            'enterococcusfaecalis/Enterococcus faecalis on MSA.png',
            'klebsiellapneumoniae/Klebsiella pneumoniae MacConkey wikipedia.jpg',
            'klebsiellapneumoniae/Klebsiella_pneumoniae_on_TSA.jpg',
            'micrococcusluteus/Micrococcus luteus gram staining.jpg',
            'micrococcusluteus/Micrococcus luteus on blood agar.jpg',
            'micrococcusluteus/Micrococcus_luteus_on_TSA.jpg',
            'proteusmirabilis/Proteus_mirabilis_on_MacConkey.jpg',
            'proteusmirabilis/Proteus_mirabilis_on_TSA.jpg',
            'pseudomonasaeruginosa/Pseudomonas_aeruginosa_on_TSA.jpg',
            'pseudomonasaeruginosa/pseudomonas on MacConkey.jpg',
            'salmonellatyphimurium/Salmonella_typhimurium_on_MacConkey.jpg',
            'salmonellatyphimurium/Salmonella_typhimurium_on_TSA.jpg',
            'serratiamarcescens/Serratia_marcescens_on_MacConkey.jpg',
            'serratiamarcescens/Serratia_marcescens_on_TSA.jpg',
            'serratiamarcescens/Serratia_marcescens_on_TSA(1).jpg',
            'shigellaflexneri/Shigella__flexneri_on_TSA.jpg',
            'shigellaflexneri/Shigella_flexneri_on_Mac_Conkey.jpg',
            'shigellaflexneri/Shigella_flexneri_on_TSA.jpg',
            'staphylococcusaureus/Staphylococcus aureus on Blood agar.jpg',
            'staphylococcusaureus/Staphylococcus aureus on MSA.jpg',
            'staphylococcusaureus/Staphylococcus_aureus_on_TSA.jpg',
            'staphylococcusepidermidis/Staphylococcus epidermidis on Blood agar.jpg',
            'staphylococcusepidermidis/Staphylococcus epidermidis on TSA.jpg',
            'streptococcusbovis/Streptococcus bovis on TSa.jpg',
            'streptococcuspyogenes/Streptococcus pyogenes on blood agar.jpg',
            'streptococcuspyogenes/Streptococcus pyogenes on TSA.jpg'
        ];

        for (const image of allImages) {
            const lowerImage = image.toLowerCase();

            // Normalize both names for matching (remove all non-letter characters)
            const normalizedImage = lowerImage.replace(/[^a-z]/g, '');
            const normalizedBacterium = bacteriumName.toLowerCase().replace(/[^a-z]/g, '');

            let containsBacterium = normalizedImage.includes(normalizedBacterium);

                // Special handling for gram staining "any species" images
                if (!containsBacterium && category === 'gramStain') {
                    const gramNegativeBacteria = ['alcaligenesfaecalis', 'citrobacterfreundii', 'ecoli', 'enterobacteraerogenes', 'klebsiellapneumoniae', 'proteusmirabilis', 'pseudomonasaeruginosa', 'salmonellatyphimurium', 'serratiamarcescens', 'shigellaflexneri'];

                    // Fix: Correct the string matching for normalized filenames (no spaces)
                    if (normalizedImage.includes('gramnegativebacillianyspeciesgramstaining') && gramNegativeBacteria.includes(normalizedBacterium)) {
                        containsBacterium = true;
                    } else if (normalizedImage.includes('grampositivebacillusallspeciesgramstaining') && ['bacilluscereus', 'bacillussubtilis'].includes(normalizedBacterium)) {
                        containsBacterium = true;
                    } else if (normalizedImage.includes('staphylococciallspeciesgramstaining') && normalizedBacterium.includes('staphylococcus')) {
                        containsBacterium = true;
                    } else if (normalizedImage.includes('streptococcusallspeciesgramstaining') && normalizedBacterium.includes('streptococcus')) {
                        containsBacterium = true;
                    }
                }

            // Check if image matches the category
            if (containsBacterium) {
                let matchesCategory = false;

                if (category === 'gramStain') {
                    matchesCategory = patterns.some(pattern =>
                        lowerImage.includes(pattern.toLowerCase())
                    );
                } else if (category === 'tsa') {
                    matchesCategory = patterns.some(pattern =>
                        lowerImage.includes(pattern.toLowerCase())
                    );
                } else if (category === 'macConkey') {
                    matchesCategory = patterns.some(pattern =>
                        lowerImage.includes(pattern.toLowerCase())
                    );
                } else if (category === 'msa') {
                    matchesCategory = patterns.some(pattern =>
                        lowerImage.includes(pattern.toLowerCase())
                    );
                } else if (category === 'bloodAgar') {
                    matchesCategory = patterns.some(pattern =>
                        lowerImage.includes(pattern.toLowerCase())
                    );
                } else if (category === 'other') {
                    // For other tests, include if it doesn't match main categories
                    const isMainCategory = Object.keys(testCategories).some(key =>
                        key !== 'other' && patterns.some(pattern =>
                            lowerImage.includes(pattern.toLowerCase())
                        )
                    );
                    matchesCategory = !isMainCategory;
                }

                if (matchesCategory) {
                    images.push(image);
                }
            }
        }

        return images;
    }

    // Discover all available tests for the selected bacterium
    function discoverAvailableTests() {
        // Clear previous test data
        state.availableTests.step1 = [];
        state.availableTests.step2 = [];
        state.availableTests.step3 = [];
        state.displayedImages.clear();

        // Step 1: Gram Stain + TSA (required)
        const gramStainImages = findBacteriumImages(state.selectedBacterium, 'gramStain');
        const tsaImages = findBacteriumImages(state.selectedBacterium, 'tsa');

        if (gramStainImages.length > 0) {
            state.availableTests.step1.push({
                type: 'gramStain',
                images: gramStainImages,
                displayName: 'Gram Stain'
            });
            // Add images to displayed set
            gramStainImages.forEach(img => state.displayedImages.add(img));
        }

        if (tsaImages.length > 0) {
            state.availableTests.step1.push({
                type: 'tsa',
                images: tsaImages,
                displayName: 'TSA Plate'
            });
            // Add images to displayed set
            tsaImages.forEach(img => state.displayedImages.add(img));
        }

        // Step 2: Selective Media Tests
        const selectiveMediaTests = [
            { type: 'macConkey', displayName: 'MacConkey Agar' },
            { type: 'msa', displayName: 'MSA Plate' },
            { type: 'bloodAgar', displayName: 'Blood Agar' }
        ];

        for (const test of selectiveMediaTests) {
            const images = findBacteriumImages(state.selectedBacterium, test.type);
            // Filter out images that have already been displayed
            const newImages = images.filter(img => !state.displayedImages.has(img));
            
            if (newImages.length > 0) {
                state.availableTests.step2.push({
                    type: test.type,
                    images: newImages,
                    displayName: test.displayName
                });
                // Add new images to displayed set
                newImages.forEach(img => state.displayedImages.add(img));
            }
        }

        // Step 3: Biochemical Tests (from the biochemical test database)
        if (biochemicalTests[state.selectedBacterium] && biochemicalTests[state.selectedBacterium].biochemical) {
            const bioTests = biochemicalTests[state.selectedBacterium].biochemical;
            
            Object.keys(bioTests).forEach((testName, index) => {
                const testData = bioTests[testName];
                
                state.availableTests.step3.push({
                    type: 'biochemical',
                    testName: testName,
                    result: testData.result,
                    description: testData.description,
                    displayName: testName
                });
            });
        }

        console.log('Available tests discovered:', state.availableTests);
        console.log('Displayed images:', Array.from(state.displayedImages));
    }

    // Set up event listeners
    function setupEventListeners() {
        // Step 1 buttons
        elements.gramStainBtn.addEventListener('click', () => showTestResult('step1', 'gramStain'));
        elements.tsaBtn.addEventListener('click', () => showTestResult('step1', 'tsa'));

        // Submit final guess button
        elements.submitFinalGuessBtn.addEventListener('click', handleFinalGuessSubmission);
        
        // Try another bacteria button
        elements.tryAnotherBtn.addEventListener('click', resetGame);
    }

    // Show test result and mark as viewed
    function showTestResult(step, testType) {
        const testData = state.availableTests[step].find(test => test.type === testType);
        if (!testData) return;

        // Mark as viewed
        state.viewedTests[step][testType] = true;

        // Update button appearance only for Step 1
        if (step === 'step1') {
            const button = document.querySelector(`.test-button[data-test="${testType}"]`);
            if (button) {
                button.disabled = true;
            }
        }

        // Show the image
        if (step === 'step1') {
            if (testType === 'gramStain') {
                const image = testData.images[0];
                elements.gramStainImage.innerHTML = `
                    <img src="${image}" alt="Gram Stain Result">
                    <h3>Gram Stain Result</h3>
                `;
            } else if (testType === 'tsa') {
                const image = testData.images[0];
                elements.tsaImage.innerHTML = `
                    <img src="${image}" alt="TSA Plate Result">
                    <h3>TSA Plate Result</h3>
                `;
            }

            elements.step1Images.style.display = 'block';

            // Check if both Step 1 tests are viewed
            const bothViewed = state.viewedTests.step1.gramStain && state.viewedTests.step1.tsa;
            if (bothViewed) {
                state.stepCompletion.step1 = true;
                unlockStep2();
            }
        }

        // For Step 2 and 3, we'll implement similar logic
        // when we generate those buttons dynamically
    }

    // Unlock Step 2 when Step 1 is complete
    function unlockStep2() {
        // Check if there are any tests available for Step 2
        if (state.availableTests.step2.length > 0) {
            elements.step2.style.display = 'block';

            // Generate Step 2 buttons
            generateStepButtons('step2', elements.step2Buttons);

            // Check if all Step 2 tests are viewed
            checkStepCompletion('step2');
        } else {
            // No Step 2 tests available, skip to Step 3
            unlockStep3();
        }
    }

    // Unlock Step 3 when Step 2 is complete
    function unlockStep3() {
        // Check if Step 3 has any tests available
        if (state.availableTests.step3.length > 0) {
            elements.step3.style.display = 'block';

            // Generate Step 3 buttons
            generateStepButtons('step3', elements.step3Buttons);

            // Check if all Step 3 tests are viewed
            checkStepCompletion('step3');
        } else {
            // No additional tests, go directly to elimination grid
            unlockEliminationGrid();
        }
    }

    // Unlock Elimination Grid when all tests are complete
    function unlockEliminationGrid() {
        elements.eliminationSection.style.display = 'block';
        generateEliminationGrid();
        state.eliminationUnlocked = true;
    }



    // Generate buttons for a step
    function generateStepButtons(step, container) {
        container.innerHTML = '';

        state.availableTests[step].forEach(test => {
            const button = document.createElement('button');
            button.className = 'test-button';
            button.textContent = `View ${test.displayName}`;
            button.dataset.test = test.type;

            button.addEventListener('click', () => {
                showTestResult(step, test.type);

                // For Step 2/3, show images or test results in the step's image container
                if (step !== 'step1') {
                    const imageContainer = step === 'step2' ? elements.step2Images : elements.step3Images;

                    if (test.type === 'biochemical') {
                        // For biochemical tests, show text result
                        const resultDiv = document.createElement('div');
                        resultDiv.className = 'test-image biochemical-result';
                        resultDiv.innerHTML = `
                            <h3>${test.displayName}</h3>
                            <p class="result-text ${test.result}">${test.description}</p>
                        `;
                        imageContainer.appendChild(resultDiv);
                    } else {
                        // For image-based tests
                        test.images.forEach(image => {
                            const imageDiv = document.createElement('div');
                            imageDiv.className = 'test-image';
                            imageDiv.innerHTML = `
                                <img src="${image}" alt="${test.displayName} Result">
                                <h3>${test.displayName} Result</h3>
                            `;
                            imageContainer.appendChild(imageDiv);
                        });
                    }

                    imageContainer.style.display = 'block';
                }

                // Mark as viewed and check completion
                state.viewedTests[step][test.type] = true;

                // Update button appearance
                button.classList.add('viewed');
                button.disabled = true;

                checkStepCompletion(step);
            });

            container.appendChild(button);
        });
    }

    // Check if all tests in a step are viewed
    function checkStepCompletion(step) {
        const allTests = state.availableTests[step];
        const viewedCount = Object.keys(state.viewedTests[step]).length;

        if (viewedCount === allTests.length && allTests.length > 0) {
            state.stepCompletion[step] = true;

            if (step === 'step2') {
                unlockStep3();
            } else if (step === 'step3') {
                unlockEliminationGrid();
            }
        }
    }

    // Generate elimination grid
    function generateEliminationGrid() {
        elements.eliminationGrid.innerHTML = '';

        allBacteria.forEach(bacteria => {
            const card = document.createElement('div');
            card.className = 'bacteria-card';
            card.dataset.bacteria = bacteria;

            const nameElement = document.createElement('div');
            nameElement.className = 'bacteria-name';
            nameElement.textContent = bacteria;

            card.appendChild(nameElement);
            elements.eliminationGrid.appendChild(card);

            // Add click event for toggle functionality
            card.addEventListener('click', function() {
                toggleBacteriaElimination(bacteria);
            });
        });
    }

    // Toggle bacteria elimination
    function toggleBacteriaElimination(bacteriaName) {
        const card = document.querySelector(`.bacteria-card[data-bacteria="${bacteriaName}"]`);

        if (state.eliminatedBacteria[bacteriaName]) {
            // Restore bacteria
            card.classList.remove('eliminated');
            delete state.eliminatedBacteria[bacteriaName];
        } else {
            // Eliminate bacteria
            card.classList.add('eliminated');
            state.eliminatedBacteria[bacteriaName] = true;
        }

        // Check how many bacteria remain and show/hide submit button
        const remainingCount = allBacteria.length - Object.keys(state.eliminatedBacteria).length;
        if (remainingCount === 1) {
            elements.submitFinalGuessBtn.style.display = 'block';
        } else {
            elements.submitFinalGuessBtn.style.display = 'none';
        }

        console.log('Eliminated bacteria:', state.eliminatedBacteria);
        console.log('Remaining bacteria count:', remainingCount);
    }



    // Handle final guess submission
    function handleFinalGuessSubmission() {
        // Find the remaining bacterium (the one not eliminated)
        const remainingBacterium = allBacteria.find(bacteria => !state.eliminatedBacteria[bacteria]);
        const isCorrect = remainingBacterium === state.selectedBacterium;

        // Show result
        elements.resultTitle.textContent = isCorrect ? 'CORRECT!' : 'INCORRECT';
        elements.resultTitle.style.color = isCorrect ? '#4caf50' : '#f44336';
        elements.actualBacterium.textContent = `The actual bacterium was: ${state.selectedBacterium}`;

        // Show all test results
        showAllTestResults();

        elements.result.style.display = 'block';
        elements.submitFinalGuessBtn.disabled = true;
        elements.submitFinalGuessBtn.style.display = 'none';
        elements.tryAnotherBtn.style.display = 'block';
    }

    // Show all test results in the final screen
    function showAllTestResults() {
        elements.allTests.innerHTML = '';

        // Combine all tests from all steps
        const allTests = [
            ...state.availableTests.step1,
            ...state.availableTests.step2,
            ...state.availableTests.step3
        ];

        // Track displayed images in results to prevent duplicates
        const displayedResultImages = new Set();

        allTests.forEach(test => {
            const card = document.createElement('div');
            card.className = 'test-result-card';

            const title = document.createElement('h4');
            title.textContent = test.displayName;
            card.appendChild(title);

            test.images.forEach(image => {
                // Only show image if it hasn't been displayed in results yet
                if (!displayedResultImages.has(image)) {
                    const img = document.createElement('img');
                    img.src = image;
                    img.alt = `${test.displayName} Result`;
                    card.appendChild(img);
                    displayedResultImages.add(image);
                }
            });

            // Only add card if it has content (title + at least one image)
            if (card.children.length > 1) {
                elements.allTests.appendChild(card);
            }
        });
    }

    // Reset the game for a new round
    function resetGame() {
        // Reset all state
        state.selectedBacterium = null;
        state.availableTests = {
            step1: [],
            step2: [],
            step3: []
        };
        state.viewedTests = {
            step1: {},
            step2: {},
            step3: {}
        };
        state.stepCompletion = {
            step1: false,
            step2: false,
            step3: false
        };
        state.eliminatedBacteria = {};
        state.eliminationUnlocked = false;
        state.displayedImages.clear();

        // Hide all steps and result
        elements.step2.style.display = 'none';
        elements.step3.style.display = 'none';
        elements.eliminationSection.style.display = 'none';
        elements.result.style.display = 'none';
        elements.tryAnotherBtn.style.display = 'none';

        // Reset Step 1 buttons
        elements.gramStainBtn.disabled = false;
        elements.tsaBtn.disabled = false;
        elements.step1Images.style.display = 'none';
        elements.gramStainImage.innerHTML = '';
        elements.tsaImage.innerHTML = '';

        // Clear Step 2 and 3 buttons and images
        elements.step2Buttons.innerHTML = '';
        elements.step2Images.innerHTML = '';
        elements.step3Buttons.innerHTML = '';
        elements.step3Images.innerHTML = '';

        // Clear elimination grid
        elements.eliminationGrid.innerHTML = '';

        // Clear result content
        elements.allTests.innerHTML = '';

        // Start a new game
        selectNextBacterium();
        unlockEliminationGrid();
    }

    // Initialize the app
    init();
});
