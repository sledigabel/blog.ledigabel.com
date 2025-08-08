document.addEventListener('DOMContentLoaded', function() {
  // Get the name and info elements
  const nameElement = document.querySelector('.about h1');
  const infoElement = document.querySelector('.about h2');
  
  if (!nameElement || !infoElement) return;
  
  // Store original text
  const nameText = nameElement.textContent;
  const infoText = infoElement.textContent;
  
  // Clear text initially
  nameElement.textContent = '';
  infoElement.textContent = '';
  
  // Create cursor element
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  cursor.textContent = '|';
  cursor.style.animation = 'cursor-blink 1s step-end infinite';
  nameElement.appendChild(cursor);
  
  // Typing animation for name
  let nameIndex = 0;
  const nameTypingInterval = setInterval(() => {
    if (nameIndex < nameText.length) {
      // Create a text node and insert before the cursor
      const textNode = document.createTextNode(nameText[nameIndex]);
      nameElement.insertBefore(textNode, cursor);
      nameIndex++;
    } else {
      clearInterval(nameTypingInterval);
      
      // Start typing info after a short delay
      setTimeout(() => {
        // Move cursor to info element
        nameElement.removeChild(cursor);
        infoElement.appendChild(cursor);
        
        // Start typing info
        let infoIndex = 0;
        const infoTypingInterval = setInterval(() => {
          if (infoIndex < infoText.length) {
            // Create a text node and insert before the cursor
            const textNode = document.createTextNode(infoText[infoIndex]);
            infoElement.insertBefore(textNode, cursor);
            infoIndex++;
          } else {
            clearInterval(infoTypingInterval);
            
            // Remove cursor after 5 seconds
            setTimeout(() => {
              cursor.style.display = 'none';
            }, 5000);
          }
        }, 100); // Typing speed for info
      }, 500); // Delay before starting to type info
    }
  }, 100); // Typing speed for name
});