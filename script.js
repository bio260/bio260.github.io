// BIO 260 Bacteria Tool - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Test-to-Bacteria Mapping System for Test Viewer
    const testDatabase = {
        "TSA": {
            description: "Tryptic Soy Agar - General purpose growth medium",
            bacteria: [
                { name: "Alcaligenes faecalis", image: "Alcaligenes_faecalis_on_TSA.jpg" },
                { name: "Bacillus cereus", image: "Bacillus cereus on TSA.jpg" },
                { name: "Bacillus subtilis", image: "Bacillus subtilis on TSA.jpg" },
                { name: "Citrobacter freundii", image: "Citrobacter_freundii_on_TSA.jpg" },
                { name: "E. coli", image: "E.coli_on_TSA.jpg" },
                { name: "Enterobacter aerogenes", image: "Enterobacter_aerogenes_on_TSA.jpg" },
                { name: "Klebsiella pneumoniae", image: "Klebsiella_pneumoniae_on_TSA.jpg" },
                { name: "Micrococcus luteus", image: "Micrococcus_luteus_on_TSA.jpg" },
                { name: "Proteus mirabilis", image: "Proteus_mirabilis_on_TSA.jpg" },
                { name: "Pseudomonas aeruginosa", image: "Pseudomonas_aeruginosa_on_TSA.jpg" },
                { name: "Salmonella typhimurium", image: "Salmonella_typhimurium_on_TSA.jpg" },
                { name: "Serratia marcescens", image: "Serratia_marcescens_on_TSA.jpg" },
                { name: "Shigella flexneri", image: "Shigella_flexneri_on_TSA.jpg" },
                { name: "Staphylococcus aureus", image: "Staphylococcus_aureus_on_TSA.jpg" },
                { name: "Staphylococcus epidermidis", image: "Staphylococcus epidermidis on TSA.jpg" },
                { name: "Streptococcus pyogenes", image: "Streptococcus pyogenes on TSA.jpg" }
            ]
        },
        "MacConkey": {
            description: "MacConkey Agar - Selective for Gram-negative bacteria",
            bacteria: [
                { name: "Citrobacter freundii", image: "Citrobacter freundii on Macconkey.jpg" },
                { name: "E. coli", image: "E.coli__or_Citrobacter_freundii_on_MacConkey.jpg" },
                { name: "Klebsiella pneumoniae", image: "Klebsiella pneumoniae MacConkey wikipedia.jpg" },
                { name: "Proteus mirabilis", image: "Proteus_mirabilis_on_MacConkey.jpg" },
                { name: "Pseudomonas aeruginosa", image: "pseudomonas on MacConkey.jpg" },
                { name: "Salmonella typhimurium", image: "Salmonella_typhimurium_on_MacConkey.jpg" },
                { name: "Serratia marcescens", image: "Serratia_marcescens_on_MacConkey.jpg" }
            ]
        },
        "Gram Stain": {
            description: "Gram staining - Differential staining technique",
            bacteria: [
                { name: "Gram-negative bacilli", image: "Gram negative bacilli any species gram staining.jpg" },
                { name: "Gram-positive bacillus", image: "Gram positive bacillus all species gram staining.jpg" },
                { name: "Micrococcus luteus", image: "Micrococcus luteus gram staining.jpg" },
                { name: "Staphylococci", image: "Staphylococci all species gram staining.jpg" },
                { name: "Streptococcus", image: "Streptococcus all species gram staining.jpg" }
            ]
        },
        "Blood Agar": {
            description: "Blood Agar - General purpose medium with blood",
            bacteria: [
                { name: "Enterococcus faecalis", image: "enterococcus faecalis on blood agar.jpg" },
                { name: "Micrococcus luteus", image: "Micrococcus luteus on blood agar.jpg" },
                { name: "Staphylococcus aureus", image: "Staphylococcus aureus on Blood agar.jpg" },
                { name: "Streptococcus pyogenes", image: "Streptococcus pyogenes on blood agar.jpg" }
            ]
        },
        "MSA": {
            description: "Mannitol Salt Agar - Selective for Staphylococcus",
            bacteria: [
                { name: "Enterococcus faecalis", image: "Enterococcus faecalis on MSA.png" },
                { name: "Staphylococcus aureus", image: "Staphylococcus aureus on MSA.jpg" }
            ]
        }
    };

    // Bacteria Data for Elimination Tool
    const bacteriaList = [
        "Alcaligenes faecalis",
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
        "Streptococcus bovis",
        "Streptococcus pyogenes"
    ];

    // DOM elements
    const testViewerBtn = document.getElementById('test-viewer-btn');
    const eliminationBtn = document.getElementById('elimination-btn');
    const testViewerSection = document.getElementById('test-viewer-section');
    const eliminationSection = document.getElementById('elimination-section');

    // Test Viewer elements
    const testMenuPage = document.getElementById('test-menu-page');
    const bacteriaMenuPage = document.getElementById('bacteria-menu-page');
    const imagePage = document.getElementById('image-page');

    const testGrid = document.getElementById('test-grid');
    const testBacteriaGrid = document.getElementById('test-bacteria-grid');

    const testTitle = document.getElementById('test-title');
    const testDescription = document.getElementById('test-description');

    const imageTitle = document.getElementById('image-title');
    const imageTest = document.getElementById('image-test');
    const bacteriaImage = document.getElementById('bacteria-image');

    const backToTestsBtn = document.getElementById('back-to-tests-btn');
    const backToBacteriaBtn = document.getElementById('back-to-bacteria-btn');

    // Elimination Tool elements
    const eliminationGrid = document.getElementById('elimination-grid');

    // State tracking
    let currentTest = null;
    let currentBacterium = null;
    const eliminatedState = {};

    // Initialize the app
    function init() {
        // Generate test viewer content
        generateTestButtons();

        // Generate elimination tool content
        generateEliminationCards();

        // Set up event listeners
        setupEventListeners();

        // Load saved elimination state from localStorage
        loadEliminationState();

        // Set initial active button
        testViewerBtn.classList.add('active');

        // Show initial page
        showTestViewerPage('test-menu');
    }

    // Load elimination state from localStorage
    function loadEliminationState() {
        const savedState = localStorage.getItem('bacteriaEliminationState');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            Object.keys(parsedState).forEach(bacteriaName => {
                if (parsedState[bacteriaName]) {
                    eliminatedState[bacteriaName] = true;
                    const card = document.querySelector(`.bacteria-card[data-bacteria="${bacteriaName}"]`);
                    if (card) {
                        card.classList.add('eliminated');
                    }
                }
            });
        }
    }

    // Save elimination state to localStorage
    function saveEliminationState() {
        localStorage.setItem('bacteriaEliminationState', JSON.stringify(eliminatedState));
    }

    // Generate test buttons for the home page
    function generateTestButtons() {
        testGrid.innerHTML = '';

        Object.keys(testDatabase).forEach(testName => {
            const button = document.createElement('button');
            button.className = 'test-button';
            button.textContent = testName;
            button.dataset.test = testName;

            button.addEventListener('click', function() {
                showBacteriaMenu(testName);
            });

            testGrid.appendChild(button);
        });
    }

    // Generate bacteria image thumbnails for a specific test
    function generateBacteriaButtons(testName) {
        testBacteriaGrid.innerHTML = '';

        const testData = testDatabase[testName];
        testData.bacteria.forEach(bacterium => {
            const container = document.createElement('div');
            container.className = 'bacteria-image-container';

            const img = document.createElement('img');
            img.className = 'bacteria-thumbnail';
            img.src = bacterium.image;
            img.alt = bacterium.name;
            img.dataset.bacterium = bacterium.name;
            img.dataset.image = bacterium.image;
            img.dataset.test = testName;

            // Add hover tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'bacteria-tooltip';
            tooltip.textContent = bacterium.name;

            container.appendChild(img);
            container.appendChild(tooltip);

            // Add click event to show full image
            container.addEventListener('click', function() {
                showImagePage(testName, bacterium.name, bacterium.image);
            });

            testBacteriaGrid.appendChild(container);
        });
    }

    // Generate bacteria cards for elimination tool
    function generateEliminationCards() {
        eliminationGrid.innerHTML = '';

        bacteriaList.forEach(bacteria => {
            const card = document.createElement('div');
            card.className = 'bacteria-card';
            card.dataset.bacteria = bacteria;

            const nameElement = document.createElement('div');
            nameElement.className = 'bacteria-name';
            nameElement.textContent = bacteria;

            card.appendChild(nameElement);
            eliminationGrid.appendChild(card);

            // Add click event for toggle functionality
            card.addEventListener('click', function() {
                toggleBacteriaElimination(bacteria);
            });
        });
    }

    // Toggle bacteria elimination
    function toggleBacteriaElimination(bacteriaName) {
        const card = document.querySelector(`.bacteria-card[data-bacteria="${bacteriaName}"]`);

        if (eliminatedState[bacteriaName]) {
            // Restore bacteria
            card.classList.remove('eliminated');
            delete eliminatedState[bacteriaName];
        } else {
            // Eliminate bacteria
            card.classList.add('eliminated');
            eliminatedState[bacteriaName] = true;
        }

        // Save state to localStorage
        saveEliminationState();
    }

    // Show bacteria menu for a specific test
    function showBacteriaMenu(testName) {
        currentTest = testName;
        const testData = testDatabase[testName];

        // Update page title (description removed as requested)
        testTitle.textContent = testName;
        testDescription.textContent = ''; // Clear description

        // Generate bacteria buttons
        generateBacteriaButtons(testName);

        // Show the bacteria menu page
        showTestViewerPage('bacteria-menu');
    }

    // Show image page for a specific bacterium
    function showImagePage(testName, bacteriumName, imageFilename) {
        currentBacterium = bacteriumName;

        // Update image information
        imageTitle.textContent = bacteriumName;
        imageTest.textContent = `Test: ${testName}`;
        bacteriaImage.src = imageFilename;
        bacteriaImage.alt = `${bacteriumName} - ${testName}`;

        // Show the image page
        showTestViewerPage('image');
    }

    // Show specific page in test viewer
    function showTestViewerPage(pageName) {
        // Hide all pages
        testMenuPage.style.display = 'none';
        bacteriaMenuPage.style.display = 'none';
        imagePage.style.display = 'none';

        // Show selected page
        if (pageName === 'test-menu') {
            testMenuPage.style.display = 'block';
        } else if (pageName === 'bacteria-menu') {
            bacteriaMenuPage.style.display = 'block';
        } else if (pageName === 'image') {
            imagePage.style.display = 'block';
        }
    }

    // Set up event listeners
    function setupEventListeners() {
        // Navigation between main sections
        testViewerBtn.addEventListener('click', function() {
            testViewerSection.style.display = 'block';
            eliminationSection.style.display = 'none';
            testViewerBtn.classList.add('active');
            eliminationBtn.classList.remove('active');
            showTestViewerPage('test-menu');
        });

        eliminationBtn.addEventListener('click', function() {
            testViewerSection.style.display = 'none';
            eliminationSection.style.display = 'block';
            eliminationBtn.classList.add('active');
            testViewerBtn.classList.remove('active');
        });

        // Test viewer navigation
        backToTestsBtn.addEventListener('click', function() {
            showTestViewerPage('test-menu');
        });

        backToBacteriaBtn.addEventListener('click', function() {
            if (currentTest) {
                showBacteriaMenu(currentTest);
            } else {
                showTestViewerPage('test-menu');
            }
        });
    }

    // Initialize the app
    init();
});
