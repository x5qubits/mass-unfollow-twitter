function unfollowProcess(followDiv) {
    return new Promise((resolve, reject) => {
        // Check if the div is found
        if (followDiv) {
            const span = followDiv.querySelector('span span');

            // Check if the span is found
            if (span) {
                const buttonText = span.textContent.trim();

                // Check if the button contains "Follow" or "Following"
                if (buttonText.includes('Following')) {
                    // Scroll to the div
                    followDiv.scrollIntoView();

                    // Simulate mouseover event
                    followDiv.dispatchEvent(new MouseEvent('mouseover'));

                    // Wait for a short time before clicking
                    setTimeout(() => {
                        // Click on the div
                        followDiv.click();

                        // Wait for a short time before looking for confirmation
                        setTimeout(() => {
                            // Select the confirmation div
                            const confirmDiv = document.querySelector('div[data-testid^="confirmationSheetConfirm"]');

                            if (confirmDiv) {
                                confirmDiv.scrollIntoView();
                                confirmDiv.click();
                                resolve(true); // Resolving with true if successful
                            } else {
                                console.error("Confirmation div not found");
                                resolve(false); // Resolving with false if confirmation div not found
                            }
                        }, 1000); // Adjust timing as needed
                    }, 1000); // Adjust timing as needed
                } else if (buttonText.includes('Follow')) {
                    console.log("Skipping 'Follow' button");
                    resolve(false); // Resolving with false if 'Follow' button is skipped
                } else {
                    console.error("Button text neither 'Following' nor 'Follow'");
                    resolve(false); // Resolving with false if button text is neither 'Following' nor 'Follow'
                }
            } else {
                console.error("Span not found");
                resolve(false); // Resolving with false if span is not found
            }
        } else {
            console.error("Follow div not found");
            resolve(false); // Resolving with false if followDiv is not found
        }
    });
}

async function executeProcess() {
    const processedElements = new Set();

    while (true) {
        // Query the DOM to get the latest set of elements
        const followDivs = document.querySelectorAll('div[aria-label^="Following"]');
        
        // Iterate over the followDivs
        for (const followDiv of followDivs) {
            // Check if the followDiv has already been processed
            if (processedElements.has(followDiv)) {
                continue; // Skip if already processed
            }

            // Process the followDiv
            const result = await unfollowProcess(followDiv);
            console.log("Process result:", result);

            // Mark the followDiv as processed
            processedElements.add(followDiv);
        }

        // Wait for one second before the next iteration
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

executeProcess();
