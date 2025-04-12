// Junya Watanabe Runway Archives - Main script with multiplayer integration
console.log('[CLIENT] Loading junya.js...')

// Register custom components when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Register billboard component if not already registered
  if (!AFRAME.components['billboard']) {
    AFRAME.registerComponent('billboard', {
      tick: function () {
        const camera = this.el.sceneEl.camera
        if (!camera) return

        const object3D = this.el.object3D

        // Get the camera's world position
        const cameraWorldPos = new THREE.Vector3()
        camera.getWorldPosition(cameraWorldPos)

        // Make the entity face the camera's world position
        object3D.lookAt(cameraWorldPos)

        // Correct rotation to keep the image upright
        object3D.rotation.x = 0
        object3D.rotation.z = 0
      },
    })
  }

  // Register vertical-move component if not already registered
  if (!AFRAME.components['vertical-move']) {
    AFRAME.registerComponent('vertical-move', {
      schema: {
        speed: { type: 'number', default: 10 },
      },

      init: function () {
        this.keyDown = this.keyDown.bind(this)
        document.addEventListener('keydown', this.keyDown)
      },

      keyDown: function (evt) {
        const el = this.el
        const position = el.getAttribute('position')

        switch (evt.keyCode) {
          case 82: // r key = up
            el.setAttribute('position', {
              x: position.x,
              y: position.y + this.data.speed * 0.01,
              z: position.z,
            })
            break
          case 70: // f key = down
            el.setAttribute('position', {
              x: position.x,
              y: position.y - this.data.speed * 0.01,
              z: position.z,
            })
            break
        }
      },

      remove: function () {
        document.removeEventListener('keydown', this.keyDown)
      },
    })
  }

  // Initialize multiplayer functionality after a delay to ensure everything is loaded
  setTimeout(function () {
    if (typeof setupNetworkedWorld === 'function') {
      console.log(
        '[CLIENT] Initializing networked functionality for Junya Watanabe Runway world'
      )

      // Use the main camera for networking (the one at -20 12 49)
      const mainCamera = document.querySelector('#desktopCamera')

      if (mainCamera) {
        // Initialize networking with the proper world name and camera selector
        setupNetworkedWorld(
          'junya-watanabe',
          '#desktopCamera',
          'junya-watanabe'
        )
        console.log(
          '[CLIENT] Networking initialized successfully for Junya Watanabe Runway'
        )

        // Create a spotlight to illuminate avatars better in this world
        const scene = document.querySelector('a-scene')
        if (scene) {
          const avatarLight = document.createElement('a-light')
          avatarLight.setAttribute('type', 'spot')
          avatarLight.setAttribute('color', '#ffffff')
          avatarLight.setAttribute('intensity', '1.5')
          avatarLight.setAttribute('position', '-20 15 49') // Position near the starting camera position
          avatarLight.setAttribute('angle', '60')
          avatarLight.setAttribute('penumbra', '0.5')
          scene.appendChild(avatarLight)

          console.log(
            '[CLIENT] Added additional lighting for Junya Watanabe avatars'
          )
        }
      } else {
        console.error('[CLIENT] Main camera not found, trying fallback')
        // Fallback to the first camera if the main one isn't found
        const anyCamera = document.querySelector('a-camera')
        if (anyCamera) {
          setupNetworkedWorld('junya-watanabe', 'a-camera', 'junya-watanabe')
          console.log('[CLIENT] Networking initialized with fallback camera')
        } else {
          console.error('[CLIENT] No camera found for networking')
        }
      }
    } else {
      console.error('[CLIENT] setupNetworkedWorld function not found!')
    }
  }, 2000) // 2 second delay to ensure everything is loaded
})

// Update scene function - called periodically to update scene elements based on camera position
function updateScene() {
  const camera = document.querySelector('a-camera')
  const textContainer = document.getElementById('scene-text')
  const headerContainer = document.querySelector('.fixed-left-text') // Header that changes

  if (!camera || !textContainer || !headerContainer) {
    console.error('Missing elements:', {
      camera,
      textContainer,
      headerContainer,
    })
    return
  }

  const position = camera.object3D.position

  // Select text images by ID
  const texts = {
    a: document.querySelector('[src="#text-a"]'),
    b: document.querySelector('[src="#text-b"]'),
    c: document.querySelector('[src="#text-c"]'),
    d: document.querySelector('[src="#text-d"]'),
    e: document.querySelector('[src="#text-e"]'),
    f: document.querySelector('[src="#text-f"]'),
    g: document.querySelector('[src="#text-g"]'),
    h: document.querySelector('[src="#text-h"]'),
    i: document.querySelector('[src="#text-i"]'),
    j: document.querySelector('[src="#text-j"]'),
  }

  // Hide all text images by default
  Object.values(texts).forEach((text) => {
    if (text) text.setAttribute('visible', 'false')
  })

  // Default to empty text
  headerContainer.textContent = ''
  textContainer.textContent = ''

  // Update text and show correct image at the right Z position (no gaps)
  if (position.z >= 0) {
    textContainer.textContent = 'AUTUMN/WINTER 1993'
    headerContainer.textContent = 'ORIGINS AND PATTERNMAKING'
    if (texts.a) texts.a.setAttribute('visible', 'true')
  } else if (position.z >= -40) {
    textContainer.textContent = 'AUTUMN/WINTER 2000'
    headerContainer.textContent = 'TECHNO COUTURE'
    if (texts.b) texts.b.setAttribute('visible', 'true')
  } else if (position.z >= -80) {
    textContainer.textContent = 'AUTUMN/WINTER 2003'
    headerContainer.textContent = 'CLASSIC CLOTHING INTERPRETTED IN MY OWN WAY'
    if (texts.c) texts.c.setAttribute('visible', 'true')
  } else if (position.z >= -123) {
    textContainer.textContent = 'SPRING/SUMMER 2006'
    headerContainer.textContent = 'THE MAD CAPSULE MARKETS'
    if (texts.d) texts.d.setAttribute('visible', 'true')
  } else if (position.z >= -162) {
    textContainer.textContent = 'AUTUMN/WINTER 2006'
    headerContainer.textContent = 'DECONSTRUCTION AND RECONSTRUCTION'
    if (texts.e) texts.e.setAttribute('visible', 'true')
  } else if (position.z >= -200) {
    textContainer.textContent = 'SPRING/SUMMER 2011'
    headerContainer.textContent = 'TOKYO DOLL'
    if (texts.f) texts.f.setAttribute('visible', 'true')
  } else if (position.z >= -242) {
    textContainer.textContent = 'SPRING/SUMMER 2015'
    headerContainer.textContent = 'GRAPHIC MARCHING'
    if (texts.g) texts.g.setAttribute('visible', 'true')
  } else if (position.z >= -283) {
    textContainer.textContent = 'AUTUMN/WINTER 2016'
    headerContainer.textContent = 'GEOMETRIES AND GRACE NOTES'
    if (texts.h) texts.h.setAttribute('visible', 'true')
  } else if (position.z >= -320) {
    textContainer.textContent = 'SPRING/SUMMER 2017'
    headerContainer.textContent = 'SPONTANEOUS PUNK CREATIVITY'
    if (texts.i) texts.i.setAttribute('visible', 'true')
  } else if (position.z >= -365) {
    textContainer.textContent = 'AUTUMN/WINTER 2021'
    headerContainer.textContent = 'FUTURE UTILITY'
    if (texts.j) texts.j.setAttribute('visible', 'true')
  }
}

// Debug function
function updateZIndicator() {
  const camera = document.querySelector('a-camera')
  if (camera) {
    const position = camera.object3D.position
    console.log('Camera position Z:', position.z)
  }
}

// Ensure script runs after the page loads
window.onload = function () {
  console.log('[CLIENT] Window loaded, setting up scene update intervals')
  setInterval(updateScene, 200)

  // Uncomment the following line for debugging
  // setInterval(updateZIndicator, 2000);
}

console.log('[CLIENT] junya.js loaded successfully')
