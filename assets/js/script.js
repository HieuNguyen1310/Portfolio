const left = document.getElementById("L-side");

const handleOnMove = e => {
    const p = e.clientX / window.innerWidth * 100;

    left.style.width = `${p}%`
}

document.onmousemove = e => handleOnMove(e);

document.ontouchmove = e => handleMove(e.touches[0]);

// -----------------------------

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ---------------------

const sections = document.querySelectorAll("section");

const navLi = document.querySelectorAll(".li");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach( section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 4 )) {
            current = section.getAttribute("id");
        }
    })
    
    navLi.forEach( li => {
        li.classList.remove("active");
        if ( li.classList.contains(current)) {
            li.classList.add("active");
        }
    })
})


// // -------------------------------

// let cursor = document.querySelector('.cursor');

// document.addEventListener('mousemove', moveCursor);

// function moveCursor (c) {
// 	let x = c.clientX;
// 	let y = c.clientY;
    
// 	cursor.style.left = `${x}px`;
// 	cursor.style.top = `${y}px`;
// }

// let links = Array.from(document.querySelectorAll("a"));
// console.log(links)

// links.forEach(link => {
// 	link.addEventListener('mouseover', ()=> {
// 		cursor.classList.add("change");
// 	})
// 	link.addEventListener('mouseleave', ()=> {
// 		cursor.classList.remove("change");
// 	})
// })

var cursor = {
    delay: 4,
    _x: 0,
    _y: 0,
    endX: (window.innerWidth / 2),
    endY: (window.innerHeight / 2),
    cursorVisible: true,
    cursorEnlarged: false,
    $dot: document.querySelector('.cursor'),
    
    
    init: function() {
        // Set up element sizes
        this.dotSize = this.$dot.offsetWidth;
        
        
        this.setupEventListeners();
        this.animateDotOutline();
    },
    

    setupEventListeners: function() {
        var self = this;
        
        // Anchor hovering
        document.querySelectorAll('a').forEach(function(el) {
            el.addEventListener('mouseover', function() {
                self.cursorEnlarged = true;
                self.toggleCursorSize();
            });
            el.addEventListener('mouseout', function() {
                self.cursorEnlarged = false;
                self.toggleCursorSize();
            });
        });
        
        // Click events
        document.addEventListener('mousedown', function() {
            self.cursorEnlarged = true;
            self.toggleCursorSize();
        });
        document.addEventListener('mouseup', function() {
            self.cursorEnlarged = false;
            self.toggleCursorSize();
        });
  
  
        document.addEventListener('mousemove', function(e) {
            // Show the cursor
            self.cursorVisible = true;
            self.toggleCursorVisibility();

            // Position the dot
            self.endX = e.pageX;
            self.endY = e.pageY;
            self.$dot.style.top = self.endY + 'px';
            self.$dot.style.left = self.endX + 'px';
        });
        
        // Hide/show cursor
        document.addEventListener('mouseenter', function(e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 1;
            
        });
        
        document.addEventListener('mouseleave', function(e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 0;
            
        });
    },
    
    animateDotOutline: function() {
        var self = this;
        
        self._x += (self.endX - self._x) / self.delay;
        self._y += (self.endY - self._y) / self.delay;
        self.$outline.style.top = self._y + 'px';
        
        
        requestAnimationFrame(this.animateDotOutline.bind(self));
    },
    
    toggleCursorSize: function() {
        var self = this;
        
        if (self.cursorEnlarged) {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(3)';
            
        } else {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            
        }
    },
    
    toggleCursorVisibility: function() {
        var self = this;
        
        if (self.cursorVisible) {
            self.$dot.style.opacity = 1;
            
        } else {
            self.$dot.style.opacity = 0;
            
        }
    }
}

cursor.init();







