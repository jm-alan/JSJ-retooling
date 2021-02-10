# JavaScript Jungle Retooling

### This project is a retooling/updating of a group project to which I contributed.
### Meant to be a clone of [StackOverflow](https://www.stackoverflow.com), the updated project can be found [here](https://jsjredux.herokuapp.com), while the original project and repo can be found [here](https://javascriptjungle.herokuapp.com) and [here](https://github.com/Giiaga/JavaScriptJungle), respectively.

### This readme will serve as a running list of changes/updates/upgrades I've performed to the original codebase and data structure.

##### 12/07/2020 - Fixed a bug where voting and delete functionality was not active on AJAX-rendered new answers to a question.
##### 12/07/2020 - Created a new primary site user whose account is not accessible to the public, protecting the seeded content from unnecessary modifications.
##### 12/11/2020 - A fatal security bug allowed a potential user to submit an additional "question" to a thread via public API, and then delete that question, causing a cascade delete of the thread, effectively allowing users to delete any question they want regardless of post owner. This has been patched.
##### 12/13/2020 - Fixed a previously unnoticed issue causing the "recent" page to display each individual page in reverse order.
##### 12/13/2020 - Finally fixed a major, but intermittent issue that would cause threads not to delete correctly when deleting their corresponding question. Due to the way the homepage query is written, this was also causing a cascade effect where a thread existing with no posts would prevent the rendering of the entire homepage. That poor dependency has not yet been patched, but it should not present again in the immediate future.
##### 12/13/2020 - API to post new questions now follows a more RESTful design.
##### 12/13/2020 - Phase 1 of abstracting many of the front-end functions into their own files to make the code more modular, and consequently more maintainable.
##### 12/18/2020 - Added a bit of flare to the vote buttons on hover/click, and added persistent visual indication that a given logged-in user has voted on a given post.
##### 01/17/2020 - Posts are now editable
##### 01/17/2020 - The original implementation of the homepage fetch functionality was contrived and circular. It has been rebuilt from the ground up, with new, modular, scalable API routes implemented.
