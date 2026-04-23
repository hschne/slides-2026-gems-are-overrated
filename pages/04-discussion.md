---
layout: full
---

<script setup lang="ts">
const alternatives = [
  { icon: 'git-fork', color: '#A78BFA' },
  { icon: 'package', color: '#F59E0B' },
  { icon: 'copy', color: '#34D399' },
]
</script>

<div class="h-full flex flex-col items-center justify-center gap-8 py-6">
  <Versus :items="alternatives" />
  <p class="text-xl opacity-85">Fork · Vendor · Copy Paste</p>
</div>

<!--
- Also, how is this even better then vendoring or just forking?
- It is quite different I'd argue because the amount of ceremony and the tradeoffs with vendoring and forking are different.
- With both, you inherit a lot of the structure, 
- With copy-pasta style re-implementation we extract the essence of what solves my problem and leave the rest behind.
- But even so, even  'reading a bunch of source code, figuring out how things work and implementing our own version' isn't anything new or revolutionary
- We just didn't do it because ain't no body got time for that, right?
-->

---
layout: fact
---

# Why Now?

<!--
- So why now? 
- We'll, It has become much cheaper to look at a library, understand its architecture, identify the parts that matter, and reshape them into something project-specific.
-->

---
footer: false
---

<figure class="h-full flex flex-col items-center justify-center gap-4 py-6">
  <img src="/friendly-ai-overlords.png" alt="Friendly AI overlords" class="max-h-[60vh] w-auto object-contain rounded" />
  <figcaption class="text-sm">"Create an image depicting our friendly AI overlords"</figcaption>
</figure>

<!--
- Because now, we got our friendly AI overlords.
- Look gemini knows where I live. 
- "Our partnership yields prosperity" indeed.
-->

---
layout: quote
---

> Read the source for https://github​.com/... Copy the approach the gem takes to do ... and boil that functionality down to a single file.

<!--
- To get a custom, simple, maintainable, bug-free version of a dependency in my project
- Is just a prompt away
- AI has removed the hurdle to understand what a gem does, and mold it to your needs
- Yes, it has also remoived a lot of drudgery associated with dependencies. You can automate dependabot alerts, automatically open PRs against upstream and whatnot
- But I'd argue that the cost-benefit curve, that we saw previously, in this case, goes in favor of copy pasta.
-->

---
layout: image
image: /bcrypt.png
---

<!--
- Obviously, that's not true for every gem
- If a dependency can be reduced to something small and understandable it works.
- But if the gem has a lot of surface area, like Activerecord
- Basically if the gem needs to do a lot to be useful at all 
- Then there's no point in trying to reduce it.  
- The same is true if you really want the benefits of open source - if it's security. Like, don't try to roll your own bcrypt, with or without AI. 
- That's just asking for pain.
- But with utility gems like I showed you? And many more
- Nuke em out of your Gemfile an replace them with a single file and thank me later.
-->

---

# Valid Criticism

<img src="/discussion.png" alt="Reservations" class="max-h-[60vh] w-auto object-contain rounded" />

<!--
- There's one more thing that I want to highlight
- This is a piece of criticism to this appraoch, by RailsDesigner by the way, who you might know
- Which I completely welcome. RailsDesigner is writing kick-ass posts that I learn a lot from, and they're putting out great libraries 
- and I really get it. If everybody just uses LLMs to extract code from your open source projects
- and never contributes something back
- won't this kill the ecosystem. Isn't this just hoarding innovation?
- Isn't this approach, like, completely parasitic?
-->

---
layout: center
class: text-center
---

# The value is in substraction

<v-clicks>

# Keep contributing

# The role of OSS changes

</v-clicks>

<!--
- I think that concern is real.
- At the same time, in many of these cases, what I am doing locally is not something that belongs upstream. 
- I am removing features, narrowing scope, deleting abstractions, and adapting things to one application's needs. 
- That is useful to me, but not necessarily useful to the gem. 
- Because gems are attempting to provide a solution for many people. This is for me.-
- But if I find a real bug, discover a missing edge case, or make a genuinely reusable improvement, 
- I should absolutely contribute that back. But the default operation here is usually subtraction rather than addition.
- So I don't think this replaces or even open source contribution. I think it changes what role open source plays in the workflow.
-->

---
layout: image
image: /blueprint.png
---

<!--
- For me, I have started to think of libraries less of dependencies and more about valueble  reference implementations, blueprints, and collections of hard-won ideas I can adapt and adopt 
- It's what open source enthusiasts have been preaching forever - just read the source - just on steroids.
-->
