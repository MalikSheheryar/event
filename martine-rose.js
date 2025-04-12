// Martine Rose x Nike - Networked A-Frame integration
console.log('[CLIENT] Loading martine-rose-networked.js...')

// Wait for DOM to be ready before accessing elements
document.addEventListener('DOMContentLoaded', function () {
  console.log(
    '[CLIENT] DOM loaded, initializing Martine Rose networking components'
  )

  // Register spin component if not already registered
  if (!AFRAME.components['spin']) {
    AFRAME.registerComponent('spin', {
      schema: { speed: { type: 'number', default: 0.3 } },

      tick: function (time, timeDelta) {
        // Convert speed to smooth rotation per frame
        this.el.object3D.rotation.y += (this.data.speed * timeDelta) / 1000
      },
    })
  }

  // Register set-start-position component if not already registered
  if (!AFRAME.components['set-start-position']) {
    AFRAME.registerComponent('set-start-position', {
      init: function () {
        const rig = document.getElementById('rig')
        if (!rig) {
          console.error('Rig not found. Ensure #rig exists with id="rig"')
          return
        }

        const setPosition = (x, y, z) => {
          requestAnimationFrame(() => {
            rig.setAttribute('position', `${x} ${y} ${z}`)
          })
        }

        // Set appropriate start position based on mode
        if (this.el.sceneEl.is('vr-mode')) {
          setPosition(0, 0, 25) // VR Start Position
        } else {
          setPosition(0, 0, 25) // Desktop Start Position
        }

        // Adjust on enter and exit VR
        this.el.sceneEl.addEventListener('enter-vr', function () {
          setPosition(0, 0, 25) // VR Start Position
        })

        this.el.sceneEl.addEventListener('exit-vr', function () {
          setPosition(0, 0, 25) // Desktop Start Position
        })
      },
    })
  }

  // Initialize networking after a delay to ensure elements are loaded
  console.log('[CLIENT] Setting up networking for Martine Rose world')
  setTimeout(() => {
    if (typeof setupNetworkedWorld === 'function') {
      console.log('[CLIENT] Initializing networked world for Martine Rose')
      // Pass 'martine-rose' as the world name for proper avatar scaling (50 50 50)
      setupNetworkedWorld('martine-rose', '#rig', 'martine-rose')
      window.networkingInitialized = true
    } else {
      console.error('[CLIENT] setupNetworkedWorld function not found')
    }
  }, 2000) // Wait 2 seconds to ensure everything is loaded
})

console.log('[CLIENT] martine-rose-networked.js loaded successfully')
