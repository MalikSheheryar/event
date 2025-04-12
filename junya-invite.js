// Wait for DOM to be ready before accessing elements
document.addEventListener('DOMContentLoaded', function () {
  // Register billboard-y component for the Junya Invite world
  if (!AFRAME.components['billboard-y']) {
    AFRAME.registerComponent('billboard-y', {
      tick: function () {
        const camera = this.el.sceneEl.camera
        const obj3D = this.el.object3D
        if (camera) {
          const targetPos = new THREE.Vector3()
          camera.getWorldPosition(targetPos)
          obj3D.lookAt(targetPos)
          obj3D.rotation.x = 0 // lock X
          obj3D.rotation.z = 0 // lock Z
        }
      },
    })
  }

  // Register joystick controls component if needed (preserve original functionality)
  // This could be added back in if needed

  // Setup networking after a delay to ensure everything is loaded
  console.log('[CLIENT] Setting up networking initialization')
  setTimeout(() => {
    if (typeof setupNetworkedWorld === 'function') {
      console.log('[CLIENT] Initializing networked world for Junya Invite')
      // Initialize multiplayer with the proper world name and rig selector
      setupNetworkedWorld('junya-invite', '#rig', 'junya-invite')
      window.networkingInitialized = true
    } else {
      console.error('[CLIENT] setupNetworkedWorld function not found')
    }
  }, 3000) // Wait 3 seconds to ensure everything is loaded
})
