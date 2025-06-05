// Function to fetch articles from JSON file
async function fetchArticles() {
    try {
        console.log('Starting to fetch articles...');
        // Use relative path from the current page
        const response = await fetch('./assets/js/articles.json');
        console.log('Fetch response status:', response.status);
        
        if (!response.ok) {
            console.error('Failed to fetch articles. Status:', response.status);
            throw new Error(`Failed to fetch articles: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Raw JSON data:', data);
        console.log('Articles array:', data.articles);
        
        if (!Array.isArray(data.articles)) {
            console.error('Articles data is not an array:', data);
            throw new Error('Invalid articles data format');
        }
        
        return data.articles;
    } catch (error) {
        console.error('Error loading articles:', error);
        // Show error message to user
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'عذراً، حدث خطأ أثناء تحميل المقال. يرجى المحاولة مرة أخرى.';
        }
        return [];
    }
}

// Function to get article by ID
async function getArticleById(id) {
    try {
        console.log('Getting article with ID:', id);
        const articles = await fetchArticles();
        console.log('Available articles:', articles);
        
        if (!articles || articles.length === 0) {
            console.error('No articles found in the data');
            return null;
        }
        
        const article = articles.find(article => {
            console.log('Checking article:', article.id, 'against requested ID:', id);
            return article.id === id;
        });
        
        console.log('Found article:', article);
        
        if (!article) {
            console.error('Article not found with ID:', id);
            const errorMessage = document.getElementById('error-message');
            if (errorMessage) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'عذراً، المقال غير موجود.';
            }
        }
        
        return article;
    } catch (error) {
        console.error('Error getting article:', error);
        return null;
    }
}

// Function to render article
async function renderArticle() {
    try {
        // Show loading spinner
        const loadingSpinner = document.getElementById('loading-spinner');
        if (loadingSpinner) {
            loadingSpinner.style.display = 'block';
        }

        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('article');
        console.log('Article ID from URL:', articleId);
        
        if (!articleId) {
            console.log('No article ID found in URL');
            const errorMessage = document.getElementById('error-message');
            if (errorMessage) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'عذراً، لم يتم تحديد المقال.';
            }
            return;
        }

        const article = await getArticleById(articleId);
        console.log('Article to render:', article);
        
        if (!article) {
            console.log('Article not found');
            const errorMessage = document.getElementById('error-message');
            if (errorMessage) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'عذراً، المقال غير موجود.';
            }
            return;
        }

        // Hide loading spinner
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }

        // Update page title
        document.title = `${article.title} | حور - نقل عفش الكويت`;

        // Update article content
        const articleContainer = document.getElementById('article-container');
        if (articleContainer) {
            articleContainer.innerHTML = `
                <div class="article-header">
                    <h1>${article.title}</h1>
                    <div class="article-meta">
                        <span class="date">${article.date}</span>
                    </div>
                </div>
                <div class="article-image">
                    <img src="${article.image}" alt="${article.alt}" class="img-fluid">
                </div>
                <div class="article-content">
                    ${article.content}
                </div>
            `;
        } else {
            console.error('Article container not found in DOM');
        }
    } catch (error) {
        console.error('Error rendering article:', error);
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'عذراً، حدث خطأ أثناء عرض المقال.';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', renderArticle); 