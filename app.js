// Mock Data for Notes
const mockNotes = [
    {
        id: 1,
        title: "Advanced Data Structures & Algorithms",
        subject: "Computer Science",
        author: "Alex Johnson",
        institution: "Stanford University",
        rating: 4.8,
        price: "Free",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        title: "Human Anatomy - Chapter 4: Nervous System",
        subject: "Medicine",
        author: "Sarah Smith",
        institution: "Johns Hopkins",
        rating: 4.9,
        price: "$4.99",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        title: "Macroeconomics: Monetary Policy Review",
        subject: "Economics",
        author: "David Lee",
        institution: "LSE",
        rating: 4.5,
        price: "Free",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        title: "Organic Chemistry Mechanisms Cheat Sheet",
        subject: "Chemistry",
        author: "Emily Chen",
        institution: "MIT",
        rating: 5.0,
        price: "$2.99",
        image: "https://images.unsplash.com/photo-1603126857599-f6e157826815?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 5,
        title: "Introduction to Machine Learning Notes",
        subject: "Computer Science",
        author: "Michael Brown",
        institution: "UC Berkeley",
        rating: 4.7,
        price: "Free",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 6,
        title: "Constitutional Law I - Case Summaries",
        subject: "Law",
        author: "Jessica Taylor",
        institution: "Harvard Law",
        rating: 4.6,
        price: "$5.99",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&auto=format&fit=crop&q=60"
    }
];

// Function to render notes on the homepage
function renderNotes(notes) {
    const container = document.getElementById('notesContainer');
    if (!container) return;

    container.innerHTML = '';

    if (notes.length === 0) {
        container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted);">No notes found matching your search.</p>';
        return;
    }

    notes.forEach(note => {
        const card = document.createElement('a');
        card.href = `note.html?id=${note.id}`;
        card.className = 'card';
        card.style.textDecoration = 'none';
        card.style.color = 'inherit';
        
        card.innerHTML = `
            <div class="note-thumbnail">
                ${note.image ? \`<img src="\${note.image}" alt="\${note.title}">\` : '<i data-lucide="file-text" style="width: 48px; height: 48px;"></i>'}
            </div>
            <div style="margin-bottom: 1rem;">
                <span class="tag">\${note.subject}</span>
                <span class="tag" style="background: \${note.price === 'Free' ? '#10B98122' : '#F59E0B22'}; color: \${note.price === 'Free' ? '#10B981' : '#F59E0B'}">\${note.price}</span>
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; line-height: 1.3;">\${note.title}</h3>
            <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1rem;">By \${note.author} • \${note.institution}</p>
            <div class="flex items-center justify-between" style="border-top: 1px solid var(--border); padding-top: 1rem; margin-top: auto;">
                <div class="flex items-center gap-2" style="color: #F59E0B;">
                    <i data-lucide="star" style="width: 16px; height: 16px; fill: currentColor;"></i>
                    <span style="color: var(--text-main); font-weight: 500;">\${note.rating}</span>
                </div>
                <button class="btn btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.875rem;" onclick="event.preventDefault(); alert('Saved to profile!')">
                    <i data-lucide="bookmark" style="width: 16px; height: 16px;"></i>
                </button>
            </div>
        `;
        container.appendChild(card);
    });

    // Re-initialize icons for newly added DOM elements
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredNotes = mockNotes.filter(note => 
            note.title.toLowerCase().includes(query) || 
            note.subject.toLowerCase().includes(query) ||
            note.author.toLowerCase().includes(query)
        );
        renderNotes(filteredNotes);
    });
}

// File Upload Drag & Drop functionality
function initUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    if (!uploadArea || !fileInput) return;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => uploadArea.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => uploadArea.classList.remove('dragover'), false);
    });

    uploadArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    });
    
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });
}

function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        document.getElementById('uploadText').innerHTML = \`<strong>Selected:</strong> \${file.name} (\${(file.size / 1024 / 1024).toFixed(2)} MB)\`;
    }
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', () => {
    // Check which page we are on
    const path = window.location.pathname;
    
    if (path.includes('index.html') || path.endsWith('/') || path.endsWith('Notesharing Platform')) {
        renderNotes(mockNotes);
        initSearch();
    }
    
    if (path.includes('upload.html')) {
        initUpload();
        
        const form = document.getElementById('uploadForm');
        if(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Note uploaded successfully! (Mocked)');
                window.location.href = 'index.html';
            });
        }
    }
    
    if (path.includes('note.html')) {
        // Mock loading note details based on URL param
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const note = mockNotes.find(n => n.id == id) || mockNotes[0];
        
        if (document.getElementById('noteTitle')) {
            document.getElementById('noteTitle').textContent = note.title;
            document.getElementById('noteAuthor').textContent = note.author;
            document.getElementById('noteSubject').textContent = note.subject;
        }
    }
});
