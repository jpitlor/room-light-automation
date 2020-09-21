# Room Light Automation

I had a problem: I wanted an easier way to turn my lights on and off.
The only hard requirement to the solution is that I had to be able to control my lights (and preferrably my fan) from both my door and my bed

### The Path to a Solution

The easiest, most obvious solution was to simply **buy a second remote**. I did not take this route for two reasons: 
1. I did not know for certain if my existing ceiling fan controller was compatible with any "universal" remotes, and frankly, if I was going to do that much research, I knew 
   I would be happier in the end simply going down a more complicated path
2. The pedant in me would have been mad the two remotes were different anyway

My next step was to **purchase a smart fan controller**. By smart, I mean that it integrates with Google Home/Alexa. This involved purchasing a couple things:
1. [A new fan controller](https://www.amazon.com/gp/product/B07TRTG8PS)†
2. A new fan.††

### A Lesson On Friction

I'm not talking about that force you ignored in AP Physics calculating displacement. I'm talking about how easy (or difficult) it is for a user to accomplish their goals
using a product. Ironically, I had actually made my problem at this point. To review -

Pros:
1. After connecting with the Google Home app and naming my new device, I could now control my fan/light from anywhere in the room by simply saying "hey google, turn the
   light of the ceiling fan [on/off]"
2. I could control the light/fan with routines (albeit it was a little tricky since it shows up in the app as a single switch, so it requires voice commands to control the 
   fan speed or light individually)

Cons:

**I absolutely hate voice as a UI.** It's bolded because I feel strongly about it. There are use cases where voice is useful. For example, asking for things like measuring
conversions and recipe instructions while cooking and you can't access your phone because of dirty hands. Also, when your question is simple enough that the reduced detail a
voice assistant will give you will still satisfy you (for example, most weather related questions, or simple things like "when is Lin Manuel Miranda's birthday?").

However, previously I would hit a button on my remote as I walked in the room. Given my muscle memory, this introduced no additional friction to the process of entering my
bedroom. At this point, I would enter my room, stand in the doorway (I preferred this to completing my task in the dark), say "hey google, turn the light of the ceiling fan
on", wait several seconds for the light to turn on, then go about my day. Double this for exiting the room, and you can do the math on how much friction this introduced.

### The Final Frontier

There was only one possible way to remove the friction while maintaining the newly gained benefits: motion sensors.

This step required the purchase of more things:
1. [PIR Sensors](https://www.amazon.com/gp/product/B07KZW86YR)
2. A Raspberry Pi. Depending on how permenant you want this to be, you could soulder the PIR sensor to the GPIO pins/power supply, but I recommend also getting a breadboard,
   some plain wires, and some jumper wires.†††
3. An enclosure. I wanted to 3D print one, but I made this during COVID-19 times, so my library reduced a lot of their services. I instead fashioned one out of LEGO.

It was at this point I realized I was *very* lucky. I just *happened* to purchase a Sonoff fan controller, which used the eWeLink app to get its smart functionality, and
eWeLink has a fantastic API, and conveniently, a community-made Node wrapper as an npm package. This may not be luck. In fact, it might be common, but I wasn't thinking of
APIs when I was first looking for a controller, so I was very glad that I wouldn't have to buy a new one to make this work.

Fast forward some time, I wrote the script in this repository, and now:
- I can walk in the room and the lights turn on
- I can walk out of the room and the lights turn off
- I added turning the light off to my "hey google, good night" routine, which is the only time I'd want to change the power of the light while still in the room

Overall, I'm very happy with the result!

### Footnotes

† If you've never taken your ceiling light down before, in the top of the fan there are a few wires, and there are a few matching wires in the ceiling. You could directly 
connect these if you are fine controlling the light/fan using the pull chains. If you want to use a remote, you need to use a fan controller to connect these two sets of
wires. It is what recieves the signal from the remote.

†† Depending on when the room was last renovated, this might not be neccessary. My ceiling fan was the original fan from when the house was built in the mid 90s,
and it did not have enough room to physically fit the new controller. If you aren't sure if yours is big enough, I recommend assuming it is and taking a trip to Home Depot
if it turns out it is not. It is difficult to go off of provided measurements since a lot of controllers aren't uniform rectangular prisms, and you'd most likely have to take
the fan down anyway unless you know the inner dimensions of your fan.

††† In college, given that I was in a class of CS majors and not EE majors, we were all advised to use a small resistor between our power source and whatever we put on the
breadboard because if accidentally made a short circuit, it would heat up the resistor instead of frying our supplies (which they could not afford to replace). If you were
given similar advice, you should take the resistor out before doing this. I found that it dropped the voltage too much, and my GPIO pins weren't detecting the sensors going 
off unless they had a full 5V as a source.
