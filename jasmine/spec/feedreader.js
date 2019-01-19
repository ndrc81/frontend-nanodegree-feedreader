/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {


        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        const allFeedsLength = allFeeds.length;

        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeedsLength).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have url defined and url is not empty', () => {
            for (let i = 0; i < allFeedsLength; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            };
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have name defined and name is not empty', () => {
            for (let i = 0; i < allFeedsLength; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            };
        });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', () => {


        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         // Added variables in test suite scope for reuse in each test
         const slideMenu = document.querySelector("body");
         const menuButton = document.querySelector(".menu-icon-link");

         it('to be hidden when page loads', () => {
            expect(slideMenu.className).toBe('menu-hidden');
         });
         

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('to be visible/non-visible when the menu icon is toggled', () => {
            //expect(when menu icon is clicked)
            menuButton.click();
            expect(slideMenu.className).toBe('');
            menuButton.click()
            expect(slideMenu.className).toBe('menu-hidden')
          });
          
    });

        

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', () => {


        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        /* This fucntion makes sure the browser waits until the feed
         * is loaded before proceeding with the test */
        beforeEach((done) => {
            loadFeed(0,done);
        });

        it('to have at least one entry when loaded', () => {
            const feedContainer = document.querySelector(".feed");
            expect(feedContainer.childElementCount > 0).toBe(true);
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {


        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         /* Declaring variables outside beforeEach function to avoid
          * receiving underdefined error inside the callback */
         let entry0;
         let entry1;

         /* Here we call the loadfeed() function on the second feed
          * then store that feed in a variable then call the the
          * loadfeed() function with the first feed as part of the 
          * callback to the first loadfeed() function.  We can the
          * use the done() function as the callback to the second
          * loadfeed() function */
         beforeEach((done) => {
            loadFeed(1, ()=>{
                entry1 = document.querySelector('.entry>h2').innerHTML;
                loadFeed(0, ()=>{
                    entry0 = document.querySelector('.entry>h2').innerHTML;
                    done();
                });
            });
         });

         it('changes content when new feed is loaded', () =>{
            expect(entry0 === entry1).toBe(false);
         });
    });
}());
