// Require and expose jQuery to window for Bootstrap
import { $, jQuery } from 'jquery'
window.$ = $
window.jQuery = jQuery

// Don't require all of Bootstrap, just the parts we need
// import 'bootstrap'
import 'bootstrap/js/dist/util.js'
// import 'bootstrap/js/dist/alert.js'
import 'bootstrap/js/dist/button.js'
import 'bootstrap/js/dist/carousel.js'
import 'bootstrap/js/dist/collapse.js'
import 'bootstrap/js/dist/dropdown.js'
// import 'bootstrap/js/dist/modal.js'
// import 'bootstrap/js/dist/scrollspy.js'
// import 'bootstrap/js/dist/tab.js'
// import 'bootstrap/js/dist/tooltip.js'
// import 'bootstrap/js/dist/popover.js'
