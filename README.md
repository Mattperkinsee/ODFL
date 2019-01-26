# ODFL Website

These are some of the UI/bug improvements that I have noticed as of 1/25/2019 on the Chrome browser.

## Bugs

- [x] Uncaught SyntaxError: Unexpected token < 

        Extra <script> tag was removed
        
- [x] 'Failed to decode downloaded font error' 

        Fixed by converting the ttf to a woff and replacing the old woff font.

- [x] Back appears twice in mobile nav menus

        Temporarily fixed by limiting the init function to only run once using a boolean global variable called 'navInit'. Suspect that home.js for the index page is being loaded twice on index.html. Back works fine on other pages except for the home page. Other pages use a different (foundtion.ODFL.js) for the nav menu.

- [x] Back button goes back twice leaving no menu

        Temp fixed as well by limiting the back init function

## Thoughts

- [] Increase height of button links (e.g. Domestic, Expedited, etc)

- [x] Add responsive images for homeImage

        *Added picture element with 3 optimized images. Reduced page size from 1.1MB to 887KB on mobile and to 938KB on mobile.


