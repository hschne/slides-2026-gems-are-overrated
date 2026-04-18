# Outline review

## Main issue with the current outline

The current draft spends too much time in "gems are bad" mode before it gets to the actually interesting argument.

That makes the audience prepare objections:

- not all gems are bad
- this is unfair to maintainers
- surely you are not suggesting we rewrite everything

But the real point of the talk is not that gems are bad. The real point is that there is often a **better third option**:

1. use the gem
2. build it yourself
3. distill the gem into a smaller local solution

That third option should become the backbone of the talk much earlier.

## What the talk is really about

A stronger core thesis would be:

> In many cases, the best alternative to a gem is not building from scratch - it is owning a smaller version of the gem's idea.

Or even shorter:

> The interesting option is not install vs reinvent. It is distill.

This is stronger than an anti-gem argument because it is not ideological. It is about economics and tradeoffs.

## Better framing

Instead of framing the talk as:

> Gems are overrated

frame it internally as:

> There is now a better middle ground between dependencies and rewrites.

The title can still stay spicy, but the structure underneath should make the audience feel you are making a practical argument, not just throwing rocks.

## What feels off in the current draft

### 1. Too much anti-gem energy too early

The talk opens by creating friction. That makes people defend gems before they have heard your actual point.

### 2. The novelty appears too late

Most people already know dependencies have costs.

The real novelty is:

- vendoring and forking are old ideas
- the economics have changed
- AI makes understanding and adaptation much cheaper
- this makes a boiled-down local version viable in many more cases

### 3. The pagination example proves the wrong thing

Right now it mostly proves that pagination is easy to implement.

But your actual point is subtler:

> I do not need to invent pagination myself. I can use the gem author's thinking without importing the entire gem.

That distinction needs to be explicit.

## Stronger storyline

### Act 1 - The old tradeoff

Start with a familiar choice:

- I need pagination
- I can add a gem
- or I can build it myself
- historically, the gem wins

This gets the audience to agree with you immediately.

A good framing line:

> For years, dependency management was just math.
> Build it myself: expensive.
> Use a gem: cheap.
> So I used the gem.

### Act 2 - The hidden flaw in that math

Then introduce the problem:

> That math only counts setup cost. It ignores ownership cost.

This is where you bring in the dependency tax:

- updates
- breakage
- security churn
- upstream decisions
- abstractions that fit everyone except you
- features you never asked for

Important framing:

> The problem with gems is often not that they are bad. It is that they solve more problem than I actually have.

And especially:

> I do not need pagination as a reusable library for the whole Ruby ecosystem.
> I need next page and previous page in this app.

### Act 3 - Reveal the third option

This is the key turn in the talk.

> The usual alternative sounds like "fine, I will build it from scratch."
> But that is a false dilemma.

Then reveal:

> I do not have to choose between importing the whole gem and reinventing the whole thing.
> I can take the part that solves my problem, strip it down, and make it local.

A memorable version:

> Not install the gem.
> Not rewrite the gem.
> Distill the gem.

That repeated phrase could become the spine of the talk.

### Act 4 - Compare the three choices

This is where the cost-benefit argument becomes explicit.

#### 1. Use the gem

Pros:

- lowest upfront cost
- battle-tested
- no deep understanding required

Cons:

- long-term dependency tax
- extra surface area
- less control
- you inherit upstream priorities

#### 2. Build from scratch

Pros:

- full control
- no dependency
- exact fit

Cons:

- highest learning cost
- easy to miss edge cases
- you do not benefit from the gem author's experience

#### 3. Distill from the gem

Pros:

- local ownership
- smaller maintenance surface
- proven ideas
- customized to your app
- no upstream churn

Cons:

- requires judgment
- not suitable for everything
- the code is yours now

One very strong line here:

> This is not about purity. It is about economics.

### Act 5 - Why this works now

AI should not be the main story. It should be the reason the tradeoff moved.

Suggested framing:

> Vendoring is old. Forking is old. Copy-pasting is ancient.
> What changed is the cost of understanding and adaptation.

And:

> AI does not remove the need for judgment.
> It removes a lot of the drudgery between "this gem seems useful" and "here are the 80 lines I actually need."

### Act 6 - Boundaries

This part is important because it makes the argument feel sane rather than reckless.

A good heuristic:

> If I can boil it down to a few files I can fully read and understand in one sitting, it is a candidate.
> If I need a week to understand it, I keep the dependency.

Good candidates:

- pagination
- icons
- helpers
- UI behavior
- glue code
- utility gems
- small adapters

Bad candidates:

- auth
- crypto
- deeply stateful systems
- protocol-heavy libraries
- anything where correctness matters more than convenience

### Act 7 - Bigger picture

A strong closing idea:

> Maybe gems become less like packages I install and more like reference implementations I learn from.

This keeps the talk provocative without turning it into an attack on open source.

## Concrete phrasing that may help

- A dependency is not just code. It is an ongoing relationship.
- The problem with gems is often not that they are bad. It is that they solve more problem than I actually have.
- My app needs one answer. A gem needs to support everybody's answers.
- I do not want a reusable abstraction for the Ruby ecosystem. I want this feature to work in this app.
- The interesting option is not install vs reinvent. It is distill.
- This is not about purity. It is about economics.
- I am not replacing expertise. I am borrowing it, then shrinking it to fit.
- If I can understand the result in one sitting, I am happy to own it.
- The library stops being a dependency and becomes a reference implementation.

## Structural suggestions for the rewritten outline

### Opening

Get to the real point faster:

> I want to make a slightly spicy argument: in a lot of cases, adding a gem is no longer the best default.
> Not because gems are bad.
> Not because I think we should rewrite everything ourselves.
> But because there is now a third option.

### Familiar example

Use pagination, but frame it as a tradeoff everybody recognizes.

> Historically, the gem wins.
> The mistake is thinking that the gem is cheap in total, rather than just cheap to start.

### Introduce the dependency tax

Use ownership language rather than moral language.

> A dependency is a relationship.
> It comes with updates, breakage, extra features, and other people's priorities.

### Reveal the third option earlier

Do not wait too long to introduce the boiled-down local copy idea.

This is the main event.

### Use a three-column comparison slide

This will make the core argument much easier to grasp than several paragraphs.

Suggested table:

| Approach | Upfront cost | Long-term cost | Control | Fit |
|---|---:|---:|---:|---:|
| Add gem | Low | Medium/High | Low | General |
| Build from scratch | High | Low | High | Exact |
| Distill from gem | Medium | Low | High | Exact |

### Keep vendoring and forking shorter

Mention them as predecessors or nearby strategies, but do not let them take over the talk.

### Keep the disclaimer short

You only need enough to make clear this is not a cheap anti-OSS rant.

## Opening thoughts and hook options

The original rewritten opening was too explanatory and too defensive. It spent energy managing objections before earning curiosity.

A stronger opening should:

- start from a familiar developer moment
- create curiosity rather than pre-defending the talk
- imply the tradeoff instead of explaining it all at once
- leave room for the third-option reveal later

### Why the earlier opening did not work

The earlier version:

- was not actually very spicy
- did not create much appetite
- explained the thesis before giving people a reason to care
- spent too much time saying "I do not hate gems" before the audience had any reason to assume that

With the tighter structure, the defensive preamble is no longer needed. A short personal intro plus a strong hook is better.

### Recommended opening direction

A short intro, then a hook built around a very ordinary Rails decision.

A strong version of that hook is:

> I want to start with a very ordinary Rails decision.
>
> I need a gem.
> So I add a gem.
>
> That feels like I just added three lines of code.
> But of course I did not.
>
> I added a dependency, a maintenance story, a set of upstream decisions, a bunch of flexibility I probably do not need, and a future relationship with somebody else's abstraction.
>
> Sometimes that is a great trade.
> But increasingly, I do not think it is the best one.

The wording can be made more specific and natural on stage. For example, instead of "I need a gem," it may read better as:

- I need to solve a small problem in a Rails app. So I add a gem.
- I need a bit of functionality. So I add a gem.
- I need one small thing. So I add a gem.

### Alternative hook options for later reference

#### Option 1 - Familiar and clean

> A few months ago, I needed something small in a Rails app - I think it was pagination, but honestly it could have been half the internet.
>
> So I did what Ruby developers do. I reached for a gem.
>
> Three lines of code, problem solved, everybody happy.
>
> Except that is never really the end of the story, is it?
>
> Because a gem is never just three lines of code.
> It is an ongoing relationship.
> And sometimes that is a great deal.
> But sometimes it is a wildly overpriced way to get one tiny feature.

#### Option 2 - The math changed

> For years, dependency management was simple math.
>
> Build it myself? Expensive.
> Add a gem? Cheap.
>
> So I added the gem.
>
> And for something like pagination in a Rails app, that feels great. Three lines of code and the problem goes away.
>
> The catch is that this math only works if I count the setup cost and quietly ignore everything that happens after that.

#### Option 3 - Dry and playful

> I think Ruby developers are unusually good at solving today's problem and unusually optimistic about future Hans dealing with the consequences.
>
> We see a small problem, add a gem, and move on.
>
> And to be fair, that has been a fantastic trade for a very long time.
>
> But I think the math has changed.

#### Option 4 - The mismatch framing

> I think a lot of gems are solving a much bigger problem than the one I actually have.
>
> My app needs one small feature.
> The gem needs to support half the Ruby ecosystem.
>
> And that mismatch is where a lot of pain comes from.

#### Option 5 - Polished version of the currently preferred hook

> My name is Hans, I am a Ruby freelancer from Vienna.
>
> I want to start with a very ordinary Rails decision.
>
> I need a bit of functionality.
> So I add a gem.
>
> That feels like I just added three lines of code.
> But of course I did not.
>
> I added a dependency, a maintenance story, a set of upstream decisions, a bunch of flexibility I probably do not need, and a future relationship with somebody else's abstraction.
>
> Sometimes that is a great trade.
> But increasingly, I do not think it is the best one.

### Recommendation on tone

Do not announce that the talk is spicy.
Do not front-load the disclaimers.
Do not explain the full thesis immediately.

Instead:

- start concrete
- make the audience nod along
- let the argument unfold
- add the nuance later, once you have their trust

A short line later in the talk is enough to cover the ecosystem angle:

> To be clear, this only works because the Ruby ecosystem is so good. The whole point is that the gems are valuable enough to learn from.

## Best one-line summary

If the talk had to be summarized in one sentence, it should probably be this:

> The best alternative to a gem is often not building from scratch - it is owning a smaller version of the gem's idea.
