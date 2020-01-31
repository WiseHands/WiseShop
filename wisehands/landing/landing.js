var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}

function setDisplayNoneToSidebarOverlay() {
    document.querySelector("#overlay-mobile").style.display = 'none';
}

document.getElementById("overlay-mobile").addEventListener("click", closeMenu);
function closeMenu() {
    document.querySelector(".sidebar-mobile").classList.add('sibebar-swipe-off');
    setTimeout(setDisplayNoneToSidebarOverlay, 300);
}

document.querySelector(".sidebar-mobile").addEventListener("click", showSidebar);
function showSidebar(e) {
    e.stopPropagation();
}

document.querySelector(".sidebar-mobile").addEventListener('touchstart', handleTouchStart, false);
document.querySelector(".sidebar-mobile").addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
            console.log('left swipe:', yDiff);
            closeMenu()
        } else {
            /* right swipe */
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
        } else {
            /* down swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
}



document.getElementById("mobile-menu").addEventListener("click", showMenu);
function showMenu() {
    document.querySelector("#overlay-mobile").style.display = 'block';
    document.querySelector(".sidebar-mobile").classList.remove('sibebar-swipe-off');
}
