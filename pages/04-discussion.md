---
layout: fact
---

# Why Now?

<!--
- None of this is entirely new.
- Vendoring is old. Forking is old. Copy-pasting code is as old as software.
- What changed is not the idea. What changed is the cost of understanding and adaptation.
- It has become much cheaper to look at a library, understand its architecture, identify the parts that matter, and reshape them into something project-specific.
- AI is part of that shift. Not because it removes the need for judgment, but because it removes a lot of the drudgery. It can help inspect the code, explain the internals, identify the core pieces, and produce a reduced version that I can then verify and own.
- The judgment still matters. I still have to decide whether a gem is a good candidate for this treatment, whether I understand the result, and whether the reduced version is actually safe to own. But the upfront cost of adaptation has dropped a lot, while the cost of dependency ownership has stayed more or less the same.
- That moves the tradeoff.
-->

---

<div class="h-full flex flex-col items-center justify-center gap-4 py-6">
  <img src="../img/friendly-ai-overlords.png" alt="Friendly AI overlords" class="max-h-[60vh] w-auto object-contain rounded" />
  <figcaption class="text-sm">"Create an image depicting our friendly AI overlords"</figcaption>
</div>

---
layout: quote
---

> Read the source for https://github​.com/... Copy the approach the gem takes to [do something] and boil that functionality down to a single file.

---

# Why not just fork or vendor?

- Forking keeps the architecture
- Vendoring keeps a lot of code
- Distilling keeps the essence

<!--
Forking and vendoring are related ideas, but they are not quite what I mean.

If I fork a gem, I gain control, but I still keep the whole architecture, all the assumptions, and most of the maintenance burden. I am still living inside somebody else's design.

If I vendor a gem, I bring the source into my repo and edit it locally. That helps, but I still end up carrying around a lot of code I probably don't need.

Distilling is different. The point is not to preserve the library and merely relocate it. The point is to extract the essence of what solves my problem and leave the rest behind.

That is also why the tradeoff is different from building from scratch. I am not refusing to learn from the gem. Quite the opposite. I am explicitly trying to benefit from the author's expertise while declining to take on the full packaged abstraction.

That is why distilling can land in a better place than either forking, vendoring, or starting from zero.
-->

---

# Good candidates and bad candidates

- Good: utilities, UI behavior, helpers, wrappers, pagination
- Bad: auth, crypto, deeply stateful systems, protocol-heavy libs
- Heuristic: can I fully read and understand it in one sitting?

<!--
This approach is obviously not for everything.

It works best when the dependency can be reduced to something small, local, and understandable. Utility gems are good candidates. UI behavior is often a good candidate. Small helpers, formatters, adapters, wrappers, icon helpers, pagination - these are all plausible.

There are also very obvious cases where I would not do this. Authentication. Cryptography. Deeply stateful systems. Protocol-heavy libraries. Anything where the whole point of using a well-established dependency is that many eyes have already looked for bugs and edge cases.

My rule of thumb is simple.

If I can boil it down to a few files I can fully read and understand in one sitting, it is a candidate.
If I would need a week to understand it, I should probably keep the dependency.
-->

---

# The ecosystem objection

- Does this weaken the ecosystem?
- What belongs upstream?
- Distillation is often subtraction

<!--
There is an obvious critique here, which is that this sounds a bit parasitic.

If everybody starts treating gems as source material and nobody contributes back, the ecosystem gets weaker. The whole approach depends on strong libraries existing in the first place.

I think that concern is real.

At the same time, in many of these cases, what I am doing locally is not something that belongs upstream. I am removing features, narrowing scope, deleting abstractions, and adapting things to one application's needs. That is useful to me, but not necessarily useful to the gem.

If I find a real bug, discover a missing edge case, or make a genuinely reusable improvement, I should absolutely contribute that back. But the default operation here is usually subtraction rather than addition.

So I don't think this replaces open source contribution. I think it changes what role open source plays in the workflow.
-->

---

# Bigger picture

- Gems as dependencies
- Gems as blueprints
- Gems as reference implementations

<!--
That may be the larger shift here.

Maybe libraries become less valuable as things I install unchanged and more valuable as reference implementations, blueprints, and collections of hard-won ideas I can adapt to my own app.

That is not the end of gems. And it is not the end of open source. If anything, it depends on the ecosystem continuing to produce excellent libraries.

But it might be a shift in how I use them.

Less as permanent runtime dependencies.
More as source material I can study, reshape, and own.
-->
