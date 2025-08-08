// Immediately apply saved color scheme before page renders
(function() {
  // Get the saved color scheme from localStorage
  const savedScheme = localStorage.getItem('colorscheme');
  
  // Check if we should use dark mode
  const prefersDark = 
    savedScheme === 'dark' || 
    (savedScheme === null && 
     window.matchMedia && 
     window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  // Apply dark mode immediately if needed
  if (prefersDark) {
    document.documentElement.classList.add('dark-theme');
    document.body.classList.add('colorscheme-dark');
    document.body.classList.remove('colorscheme-light', 'colorscheme-auto');
  } else {
    // Explicitly set light mode
    document.documentElement.classList.remove('dark-theme');
    document.body.classList.add('colorscheme-light');
    document.body.classList.remove('colorscheme-dark', 'colorscheme-auto');
  }
})();

// Main functionality after DOM loads
document.addEventListener('DOMContentLoaded', function() {
  // Create toggle button
  const darkModeToggle = document.createElement('div');
  darkModeToggle.className = 'dark-mode-toggle';
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  document.body.appendChild(darkModeToggle);
  
  // Set initial icon based on current color scheme
  updateToggleIcon();
  
  // Toggle dark mode
  darkModeToggle.addEventListener('click', function() {
    if (document.body.classList.contains('colorscheme-dark')) {
      // Switch to light mode
      document.documentElement.classList.remove('dark-theme');
      document.body.classList.remove('colorscheme-dark', 'colorscheme-auto');
      document.body.classList.add('colorscheme-light');
      document.body.style.backgroundColor = '#fff';
      document.body.style.color = '#212121';
      localStorage.setItem('colorscheme', 'light');
    } else {
      // Switch to dark mode
      document.documentElement.classList.add('dark-theme');
      document.body.classList.remove('colorscheme-light', 'colorscheme-auto');
      document.body.classList.add('colorscheme-dark');
      document.body.style.backgroundColor = '#0f0f0f';
      document.body.style.color = '#33ff33';
      localStorage.setItem('colorscheme', 'dark');
    }
    updateToggleIcon();
  });
  
  // Update toggle icon based on current color scheme
  function updateToggleIcon() {
    if (document.body.classList.contains('colorscheme-dark')) {
      darkModeToggle.innerHTML = '<i class="fas fa-sun" style="color: #33ff33;"></i>';
      darkModeToggle.style.backgroundColor = '#0f0f0f';
      darkModeToggle.style.borderColor = '#33ff33';
    } else {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      darkModeToggle.style.backgroundColor = '#fff';
      darkModeToggle.style.borderColor = '#212121';
    }
  }
  
  // Set color scheme based on system preference or localStorage if not already set
  function setColorScheme() {
    const savedScheme = localStorage.getItem('colorscheme');
    
    // If user preference is set
    if (savedScheme) {
      if (savedScheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
        document.body.classList.remove('colorscheme-light', 'colorscheme-auto');
        document.body.classList.add('colorscheme-dark');
        document.body.style.backgroundColor = '#0f0f0f';
        document.body.style.color = '#33ff33';
      } else {
        document.documentElement.classList.remove('dark-theme');
        document.body.classList.remove('colorscheme-dark', 'colorscheme-auto');
        document.body.classList.add('colorscheme-light');
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#212121';
      }
    } 
    // If no user preference, check system preference
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark-theme');
      document.body.classList.remove('colorscheme-light', 'colorscheme-auto');
      document.body.classList.add('colorscheme-dark');
      document.body.style.backgroundColor = '#0f0f0f';
      document.body.style.color = '#33ff33';
      localStorage.setItem('colorscheme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-theme');
      document.body.classList.remove('colorscheme-dark', 'colorscheme-auto');
      document.body.classList.add('colorscheme-light');
      document.body.style.backgroundColor = '#fff';
      document.body.style.color = '#212121';
      localStorage.setItem('colorscheme', 'light');
    }
    
    updateToggleIcon();
  }
  
  // Apply the saved color scheme (for any elements not handled by initial script)
  setColorScheme();
  
  // Listen for system preference changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      if (!localStorage.getItem('colorscheme')) {
        if (event.matches) {
          document.documentElement.classList.add('dark-theme');
          document.body.classList.remove('colorscheme-light', 'colorscheme-auto');
          document.body.classList.add('colorscheme-dark');
          document.body.style.backgroundColor = '#0f0f0f';
          document.body.style.color = '#33ff33';
        } else {
          document.documentElement.classList.remove('dark-theme');
          document.body.classList.remove('colorscheme-dark', 'colorscheme-auto');
          document.body.classList.add('colorscheme-light');
          document.body.style.backgroundColor = '#fff';
          document.body.style.color = '#212121';
        }
        updateToggleIcon();
      }
    });
  }
});