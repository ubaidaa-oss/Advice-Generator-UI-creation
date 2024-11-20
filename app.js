async function adviceGenerator() {
    try {
      let loader = document.querySelector('.custom-loader');
      loader.style.display = 'block'; // Show loader
  
      // Fetch the advice from API
      let api = await fetch('https://api.adviceslip.com/advice');
      let apiJson = await api.json();
      console.log(apiJson.slip.advice);
  
      let advice = document.querySelector('.advice');
      let countNumber = document.querySelector('.countNumber');
  
      // Simulate 1 second delay to show loader before updating the advice
      setTimeout(() => {
        loader.style.display = 'none'; // Hide loader after 1 second
  
        // Check if the new advice is the same as the previous one
        if (advice.innerText === apiJson.slip.advice) {
          console.log("Duplicate advice, fetching again...");
          adviceGenerator(); // Fetch new advice if same
        } else {
          advice.innerText = `"${apiJson.slip.advice}"`; // Update advice
          countNumber.innerText = parseFloat(countNumber.innerText) + 1; // Increment counter
        }
      }, 1000); // 1 second delay before hiding the loader and showing the advice
    } catch (error) {
      console.error("Error fetching advice:", error);
      let advice = document.querySelector('.advice');
      advice.innerText = "Something went wrong. Please try again later.";
  
      let loader = document.querySelector('.custom-loader');
      loader.style.display = 'none'; // Hide loader in case of error
    }
  }
  
  let btn = document.querySelector('.diceCover');
  btn.addEventListener('click', () => {
    // Add the 'clicked' class to start the spin animation
    btn.classList.add('clicked');
  
    // Call the adviceGenerator function after a slight delay to let the animation complete
    setTimeout(() => {
      adviceGenerator();
      // Remove the 'clicked' class after animation completes (0.5s duration)
      btn.classList.remove('clicked');
    }, 500); // Matches the duration of the animation
  });
  