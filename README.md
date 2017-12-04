I love this project, it was from API week during FAC so we made 2 API calls from the frontend. I refactored the code and added some error handling in my forked version.

**WHY**

We decided that our app should allow users to type in a start station and end station for a London journey and that the app should return a brief overview on how long the journey will take with a bonus fact about the destination for the reader to learn about during their journey. We thought that this app would be useful for tourists as well as curious Londoners, and should be mobile first as most users would use it on-the-go.

**WHAT**

***Our MVP***

Our application only displays information on duration of the whole journey as well as lines that the user takes during the journey. 

Also it display information from Wikipedia on the end station.


**STRETCH goals**

On top of this, we added stretch goals of having Line information (what lines the journey involves) as well as the status of them. Finally, our last stretch goal was the provide information for what time the next train to that destination is. These were assigned as stretch goals because they weren't necessary to our MVP but would have been helpful information.
We started planning our software architecture on a whiteboard and this also proved helpful for assigning which tasks we should begin with. However, before starting on our code we created our repo, added in plenty of issues and thought about our file structure.

**HOW**

![Alt text](/picture.jpg?raw=true)

We decided to use two APIs from the given list after being unable to find external APIs which didn't require some level of user authentication for what we wanted them to do. The APIs we decided on were the TFL and Wikipedia ones.
When looking at the file architecture, we decided to go for a front-end/back-end structure. We utilised a Public folder in the directory root which would store all front-end related files. Within this we had a assets folder which would compartmentalise css specific files and images. We learnt about the use of a normalize.css file, which s a small CSS file that provides better cross-browser consistency in the default styling of HTML elements. We installed this by running npm install --save normalize.css

_Writing the function that gets the wiki "fun fact"_

We found that simply passing in the name of the station that a user had searched for would return really variable Wikipedia results. For example, proper capitalisation was important, and ambiguously named stations such as 'Bank' would return facts about banks! We refined our search inputs as such:
1. We created an if function before passing in our search string to the API url to account for ambiguous station names such as Temple, Oval, Bank, Angel, etc.
2. If our returned object had less than 50 characters in the extract, this implied the page had come up with a "Your search may refer to:" string in the extract followed by a list of page options. In these cases, we amended the search string to include ", London" to refine the page we're looking for and then ran the function again.
3. Finally, if after completing these if statements the page returned an empty string, this simply meant that the page didn't exist, in which case we passed in an error message welcoming the user to create the Wikipedia page themselves!

_The tests_

Writing tests for a  function that makes API calls and depends heavily on the DOM and browser functionality turned out to be incompatible with our current tests framework, so we decided to put that aside, and test the function for edge cases and improve it, by directly looking at the output in the browser.

_Things we would do differently next time..._

We didn't have enough time to update our readme with the level of detail that we would like - we need to update it more next time.
We potentially could have refined our Wikipedia search by location to get rid of some searching issues.
Having array of station codes to station names to have drop down menu.

