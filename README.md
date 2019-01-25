# ODFL-Frontpage

These are some of the UI/bug improvements that I have noticed as of 1/25/2019 on the Chrome browser.

## Bugs

[x] Uncaught SyntaxError: Unexpected token < 

* Extra <script> tag was removed*
        
[x]'Failed to decode downloaded font error' 

    * Fixed by converting the ttf to a woff and replacing the old woff font.*

[x]Back appears twice in mobile nav menus

    * Temporarily fixed by limiting the init function to only run once using a boolean global variable called 'navInit'.*

[x]Back button goes back twice leaving no menu

    *Temp fixed as well by limiting the back init function

## Future Idea

[] Increase height of button links (e.g. Domestic, Expedited, etc)

