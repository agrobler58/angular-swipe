# angular-swipe
AngularJS directive for left/right swipe gestures on touch enabled browsers

Use the directive as an attribute on any element that you'd like to become "swipable" in the following way:

```
<div id="content1" my-swipe="[goLeft, goRight]">(content ...)</div>
```

where goLeft and goRight are handler functions defined on the scope of the current controller. 
In situations where goLeft action is not applicable use null instead; where goRight is not applicable you can omit it:

```
<div id="content2" my-swipe="[null, goRight]">(content ...)</div>
<div id="content3" my-swipe="[goLeft]">(content ...)</div>
```

See an example of use at http://plnkr.co/edit/oLgGQWpl5X6hhu8uGD7P?p=preview
Note - you'll need a touch enabled device and browser to test :)