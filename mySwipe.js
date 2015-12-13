var app = angular.module('app', []);

app.directive('mySwipe', ['$rootScope', function ($rootScope) {
    return ({
        restrict: "A",
        scope: {
            directions: '=mySwipe' // array of two functions that handle swipes: goLeft (swipe right) and goRight (swipe left)
        },
        link: function (scope, element, attrs) {
            var startX, startY, dx, dy,
                state = -1, // -1 = initial, 0 = ignore, 1 = active
                domElement = element[0],
                trackTreshold = 10, // distance at which we determine horizontal or vertical move
                gestureTreshold = 50, // distance at which we determine the swipe gesture
                goLeft = scope.directions[0],
                goRight = scope.directions.length > 1 ? scope.directions[1] : null;

            element.css({ position: 'relative' })

            element.on('touchstart', function (event) {
                if (event.touches.length > 1)
                    state = 0; // ignore multiple touches
                else {
                    state = -1;
                    var touch = event.touches[0];
                    startX = touch.screenX;
                    startY = touch.screenY;
                }
            });

            element.on('touchmove', function (event) {
                if (state !== 0) {
                    var touch = event.touches[0];
                    dx = touch.screenX - startX;
                    if (state == 1) { // swipe is already active
                        // we'll use dom element for faster performance
                        domElement.style.left = dx + 'px';
                        event.preventDefault();
                    } else { // state = -1
                        dy = touch.screenY - startY;
                        if (Math.abs(dx) > trackTreshold) 
                            state = 1 - Math.floor(Math.abs(2 * dy / dx)); // when angle is less than 45 deg swipe is active
                    }
                }
            });

            element.on('touchend', function () {
                if (state != 1) return;
                var $element = $(element);
                event.preventDefault();
                if (goRight && !goRight.invalid && dx < -gestureTreshold) {
                    // at the end of animation execute passed in handler
                    $element.animate({ left: -$element.width()}, 200, function () {
                        $rootScope.$apply(goRight);
                    });
                }
                if (goLeft && !goLeft.invalid && dx > gestureTreshold) {
                    $element.animate({ left: $element.width()}, 200, function () {
                        $rootScope.$apply(goLeft);
                    });
                }
                // otherwise return element back to initial state
                $element.animate({ left: 0 });
            });
        }
    });
}]);
