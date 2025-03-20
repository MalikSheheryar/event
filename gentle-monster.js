AFRAME.registerComponent("animate-camera", {
    init: function () {
        const cameraRig = document.querySelector("#cameraRig");

        setTimeout(() => {
            // Animate Position
            cameraRig.setAttribute("animation", {
                property: "position",
                from: "0 5 40",
                to: "0 0.5 2.5",
                dur: 3000,
                easing: "easeInOutQuad"
            });

            // Animate Rotation (Y-axis: 0 → 30 degrees)
            cameraRig.setAttribute("animation__rotation", {
                property: "rotation",
                from: "0 0 0",
                to: "10 0 0",
                dur: 3000,
                easing: "easeInOutQuad"
            });

            // Wait for animation to finish, then enable movement (without resetting rotation)
            setTimeout(() => {
                cameraRig.removeAttribute("animation");
                cameraRig.removeAttribute("animation__rotation");

                // Enable movement
                cameraRig.setAttribute("wasd-controls", "fly: true; acceleration: 5;");
            }, 3000); // Matches animation duration
        }, 100); // Small delay for scene initialization
    }
});

// Attach the component to the camera rig
document.querySelector("#cameraRig").setAttribute("animate-camera", "");
